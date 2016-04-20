foam.CLASS({
  package: 'foam.apps.chat',
  name: 'BoxEnvironment',
  requires: [
    'foam.messaging.MessagePortService as BoxServer',
    'foam.box.RegistryBox'
  ],
  exports: [
    'server as messagePortService',
    'registry',
    'server'
  ],
  properties: [
    {
      name: 'server',
      factory: function() {
        return this.BoxServer.create({
          delegate: this.registry
        });
      }
    },
    {
      name: 'registry',
      factory: function() {
        return this.RegistryBox.create()
      }
    }
  ]
});

foam.CLASS({
  package: 'foam.apps.chat',
  name: 'SharedWorkerBoxEnvironment',
  extends: 'foam.apps.chat.BoxEnvironment',
  requires: [
    'foam.messaging.SharedWorkerMessagePortService as BoxServer'
  ]
});

foam.CLASS({
  package: 'foam.dao',
  name: 'TimestampDAO',
  extends: 'foam.dao.ProxyDAO',
  properties: [
    {
      class: 'String',
      name: 'property',
      value: 'id'
    }
  ],
  methods: [
    function put(obj) {
      if ( ! obj.hasOwnProperty(this.property) ) obj[this.property] = this.nextTimestamp();
      return this.delegate.put(obj);
    },
    function nextTimestamp() {
      return Date.now();
    }
  ]
});

foam.CLASS({
  package: 'foam.apps.chat',
  name: 'Message',
  properties: [
    {
      class: 'Int',
      name: 'id'
    },
    {
      class: 'String',
      name: 'from'
    },
    {
      class: 'Int',
      name: 'syncNo',
      value: -1
    },
    {
      class: 'String',
      name: 'message'
    },
    {
      class: 'DateTime',
      name: 'timestamp'
    }
  ]
});

foam.CLASS({
  package: 'foam.apps.chat',
  name: 'WorkerAgent',
  requires: [
    'foam.dao.ArrayDAO',
    'com.firebase.FirebaseDAO',
    'foam.dao.TimestampDAO',
    'foam.box.SkeletonBox',
    'foam.apps.chat.Message'
  ],
  imports: [
    'server',
    'registry',
  ],
  properties: [
    {
      name: 'messageDAO',
      factory: function() {
        return this.FirebaseDAO.create({
          of: this.Message,
          timestampProperty: this.Message.TIMESTAMP,
          secret: '0Zr5o8wSWmje7gyVvAhVocW8AjPNvjXEqfKr6B33',
          apppath: 'https://glaring-torch-184.firebaseio.com/'
        });

        return this.ArrayDAO.create({
          of: this.Message
        });
      },
      postSet: function(_, dao) {
        dao.startEvents();
        this.registry.register(
          'messageDAO',
          this.SkeletonBox.create({
            data: dao
          }));
      }
    }
  ],
  methods: [
    function execute() {
      this.server.source = self;
      this.server.start();

      // Trigger messageDAO registration
      this.messageDAO;
    }
  ]
});

foam.CLASS({
  package: 'foam.apps.chat',
  name: 'ServiceWorkerAgent',
  methods: [
    function execute() {
    }
  ]
});

foam.CLASS({
  package: 'foam.apps.chat',
  name: 'ServiceWorker',
  imports: [
    'server'
  ],
  properties: [
    {
      name: 'box',
      factory: function() {
        //        var w = new Worker('sw.js');
        //        return this.server.connect(w);

        // return navigator.serviceWorker.register('sw.js').then(function(r) {
        //   return new Promise(function(resolve, reject) {
        //     window.setTimeout(function() {
        //       resolve(this.server.connect(r.active));
        //     }.bind(this), 0);
        //   }.bind(this));
        // }.bind(this));
      }
    }
  ],
  methods: [
    function init() {
      navigator.serviceWorker.register('sw.js')
    }
  ]
});

foam.CLASS({
  package: 'foam.apps.chat',
  name: 'SharedWorker',
  imports: [
    'server'
  ],
  properties: [
    {
      name: 'worker',
      factory: function() {
        if ( global.SharedWorker ) {
          return new SharedWorker('sharedWorker.js');
        } else {
          return new Worker('worker.js');
        }
      }
    },
    {
      name: 'boxPromise',
      factory: function() {
        if ( this.worker.port ) {
          this.worker.port.start();
          return this.server.connect(this.worker.port);
        }
        return this.server.connect(this.worker);
      }
    }
  ]
});

foam.CLASS({
  package: 'foam.apps.chat',
  name: 'Client',
  requires: [
    'foam.dao.ClientDAO',
    'foam.box.SubBox',
    'foam.dao.PromiseDAO',
    'foam.apps.chat.SharedWorker',
    'foam.apps.chat.Message',
    'foam.dao.CachingDAO',
    'foam.dao.ArrayDAO',
    'foam.dao.IDBDAO',
    'com.firebase.FirebaseDAO',
    'foam.dao.TimestampDAO',
    'foam.dao.SyncDAO'
  ],
  imports: [
    'server',
  ],
  properties: [
    {
      name: 'sw',
      factory: function() {
        return this.SharedWorker.create();
      }
    },
    {
      name: 'messageDAO',
      factory: function() {
        var channel = document.location.search.substring(1).split('&').find(function(e) {
          return e.indexOf('channel=') === 0;
        });
        channel = channel && channel.substring(8);

        var dao = this.FirebaseDAO.create({
          of: this.Message,
          timestampProperty: this.Message.SYNC_NO,
          secret: '0Zr5o8wSWmje7gyVvAhVocW8AjPNvjXEqfKr6B33',
          apppath: 'https://glaring-torch-184.firebaseio.com/'
        });

        if ( channel ) {
          dao.basepath = dao.apppath + 'chat/' + channel;
        }

        dao = this.SyncDAO.create({
          delegate: this.TimestampDAO.create({
            delegate: this.ArrayDAO.create({
              of: this.Message
            }),
          }),
          remoteDAO: dao,
          syncRecordDAO: this.ArrayDAO.create({
            of: this.SyncDAO.SyncRecord
          }),
          syncProperty: this.Message.SYNC_NO
        });

        window.addEventListener('online', function() { dao.sync(); });
        dao.sync();
        return dao;

        return this.PromiseDAO.create({
          promise: this.sw.boxPromise.then(foam.Function.bind(function(box) {
              return this.ClientDAO.create({
                of: this.Message,
                box: this.SubBox.create({
                  name: 'messageDAO',
                  delegate: box
                })
              });
          }, this))
        });
      }
    }
  ],
  methods: [
    function init() {
      this.messageDAO;
    }
  ]
});
