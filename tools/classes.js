/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

var classes = [
  'foam.core.Axiom',
  'foam.core.Serializable',
  'foam.core.Exception',
  'foam.core.ContextAgent',
  'foam.core.Identifiable',
  'foam.mlang.predicate.Predicate',
  'foam.mlang.predicate.True',
  'foam.mlang.predicate.False',
  'foam.mlang.predicate.And',
  'foam.mlang.predicate.Gt',
  'foam.mlang.predicate.Or',
  'foam.mlang.predicate.AbstractPredicate',
  'foam.mlang.predicate.Nary',
  'foam.mlang.predicate.Unary',
  'foam.mlang.predicate.Binary',
  'foam.mlang.predicate.ArrayBinary',
  'foam.mlang.predicate.Contains',
  'foam.mlang.predicate.ContainsIC',
  'foam.mlang.predicate.StartsWith',
  'foam.mlang.predicate.StartsWithIC',
  'foam.mlang.predicate.Gt',
  'foam.mlang.predicate.Gte',
  'foam.mlang.predicate.Neq',
  'foam.mlang.predicate.Not',
  'foam.mlang.predicate.Lt',
  'foam.mlang.predicate.In',
  'foam.mlang.predicate.Lte',
  'foam.mlang.predicate.Has',
  'foam.mlang.predicate.Keyword',
  'foam.mlang.sink.Count',
  'foam.mlang.sink.GroupBy',
  'foam.mlang.F',
  'foam.mlang.Expr',
  'foam.mlang.AbstractExpr',
  'foam.mlang.predicate.Eq',
  'foam.mlang.Constant',
  'foam.mlang.ArrayConstant',
  'foam.box.Box',
  'foam.box.Skeleton',
  'foam.box.AbstractSkeleton',
  'foam.box.ProxyBox',
  'foam.box.SubBox',
  'foam.box.Message',
  'foam.box.RegisterSelfMessage',
  'foam.box.SubBoxMessage',
  'foam.box.SubscribeMessage',
  'foam.box.NamedBox',
  'foam.box.HTTPBox',
  'foam.box.HTTPReplyBox',
  'foam.nanos.app.AppConfig',
  'foam.nanos.http.WebAgent',
  'com.google.foam.demos.heroes.Hero',
  'com.google.auth.TokenVerifier',
  'foam.box.RemoteException',
  'foam.box.RPCMessage',
  'foam.box.RPCReturnBox',
  'foam.box.RPCReturnMessage',
  'foam.box.RPCErrorMessage',
  'foam.box.BoxRegistry',
  'foam.box.NoSuchNameException',
  'foam.box.ReplyBox',
  'foam.box.LocalBoxRegistry',
  'foam.box.BoxRegistryBox',
  'foam.box.RawWebSocketBox',
  'foam.box.ReturnBox',
  'foam.box.BoxService',
  'foam.box.CheckAuthenticationBox',
  'foam.box.SessionReplyBox',
  'foam.box.SessionClientBox',
  'foam.dao.DAO',
  'foam.dao.BaseClientDAO',
  'foam.dao.ClientDAO',
  'foam.dao.ClientSink',
  'foam.dao.ResetSink',
  'foam.dao.DAOSink',
  'foam.dao.MergedResetSink',
  'foam.dao.Sink',
  'foam.dao.ArraySink',
  'foam.dao.AbstractSink',
  'foam.mlang.sink.AbstractUnarySink',
  'foam.dao.PredicatedSink',
  'foam.dao.OrderedSink',
  'foam.dao.LimitedSink',
  'foam.dao.SkipSink',
  'foam.dao.DedupSink',
  'foam.dao.ReadOnlyDAO',
  'foam.dao.RelationshipDAO',
  'foam.dao.ManyToManyRelationship',
  'foam.dao.ManyToManyRelationshipImpl',
  'foam.dao.ManyToManyRelationshipDAO',
  'foam.dao.SQLStatement',
  'foam.dao.EasyDAO',
  'foam.dao.EnabledAwareDAO',
  'foam.dao.LastModifiedAwareDAO',
  'foam.mlang.order.Comparator',
  'foam.mlang.order.Desc',
  'foam.mlang.sink.Count',
  'foam.mlang.sink.Max',
  'foam.mlang.sink.Min',
  'foam.mlang.sink.Sum',
  'foam.mlang.sink.Map',
  'foam.nanos.actioncommand.ActionCommand',
  'foam.nanos.NanoService',
  'foam.nanos.boot.NSpec',
  'foam.nanos.app.Mode',
  'foam.nanos.bench.Benchmark',
  'foam.nanos.auth.EnabledAware',
  'foam.nanos.auth.Group',
  'foam.nanos.auth.LastModifiedAware',
  'foam.nanos.auth.LastModifiedByAware',
  'foam.nanos.auth.Permission',
  'foam.nanos.auth.DayOfWeek',
  'foam.nanos.auth.Hours',
  'foam.nanos.auth.Address',
  'foam.nanos.auth.Phone',
  'foam.nanos.auth.User',
  'foam.nanos.auth.Country',
  'foam.nanos.auth.AuthService',
  'foam.nanos.auth.ClientAuthService',
  'foam.nanos.auth.HtmlDoc',
  'foam.nanos.auth.PasswordExpiryAuthService',
  'foam.nanos.auth.twofactor.authy.AuthyService',
  'foam.nanos.auth.token.Token',
  'foam.nanos.auth.token.TokenService',
  'foam.nanos.auth.token.ClientTokenService',
  'foam.nanos.auth.token.AbstractTokenService',
  'foam.nanos.auth.email.EmailTokenService',
  'foam.nanos.auth.email.EmailDocService',
  'foam.nanos.auth.email.EmailDocInterface',
  'foam.nanos.auth.email.ClientEmailDocService',
  'foam.nanos.auth.resetPassword.ResetPasswordTokenService',
  'foam.nanos.auth.PreventDuplicateEmailDAO',
  'foam.nanos.auth.ServiceProvider',
  'foam.nanos.auth.twofactor.OTPAuthService',
  'foam.nanos.auth.twofactor.AbstractOTPAuthService',
  'foam.nanos.auth.twofactor.AbstractTOTPAuthService',
  'foam.nanos.auth.twofactor.ClientOTPAuthService',
  'foam.nanos.auth.twofactor.GoogleTOTPAuthService',
  'foam.nanos.http.HttpParameters',
  'foam.nanos.http.DefaultHttpParameters',
  'foam.nanos.session.Session',
  'foam.nanos.pool.AbstractFixedThreadPool',
  'foam.nanos.pm.PMInfo',
  'foam.nanos.script.Language',
  'foam.nanos.auth.Language',
  'foam.nanos.auth.Region',
  'foam.nanos.logger.LogLevelFilterLogger',
  'foam.nanos.logger.RepeatLogger',
  'foam.nanos.logger.Logger',
  'foam.nanos.logger.ProxyLogger',
  'foam.nanos.logger.AbstractLogger',
  'foam.nanos.logger.FileLogger',
  'foam.nanos.menu.Menu',
  'foam.nanos.menu.DAOMenu',
  'foam.nanos.menu.ListMenu',
  'foam.nanos.menu.MenuBar',
  'foam.nanos.menu.PopupMenu',
  'foam.nanos.menu.SubMenu',
  'foam.nanos.menu.SubMenuView',
  'foam.nanos.menu.TabsMenu',
  'foam.nanos.menu.ViewMenu',
  'foam.nanos.notification.email.EmailMessage',
  'foam.nanos.notification.email.EmailService',
  'foam.nanos.notification.email.EmailTemplate',
  'foam.nanos.notification.email.SMTPEmailService',
  'foam.nanos.notification.email.ClientEmailService',
  'foam.nanos.notification.push.PushService',
  'foam.nanos.notification.push.FirebasePushService',
  'foam.nanos.notification.Notification',
  'foam.nanos.script.Script',
  'foam.nanos.test.Test',
  'foam.nanos.cron.Cron',
  'foam.dao.history.PropertyUpdate',
  'foam.dao.history.HistoryRecord',
  'foam.mop.MOP',
  'foam.u2.Element',
  'foam.u2.Visibility',
  'foam.nanos.export.ExportDriverRegistry',
  'foam.dao.pg.ConnectionPool',
  'foam.lib.json.OutputterMode',
  'foam.lib.parse.Parser',
  'foam.lib.parse.PStream',
  'foam.lib.json.OutputJSON',
  'foam.lib.json.UnknownFObject',
  'foam.lib.json.UnknownFObjectArray',
  'foam.blob.Buffer',
  'foam.blob.Blob',
  'foam.blob.BlobService',
  'foam.blob.AbstractBlob',
  'foam.blob.AbstractBlobService',
  'foam.blob.SubBlob',
  'foam.blob.IdentifiedBlob',
  'foam.blob.BlobStore',

  'foam.nanos.geocode.GoogleMapsAddressComponent',
  'foam.nanos.geocode.GoogleMapsCoordinates',
  'foam.nanos.geocode.GoogleMapsGeocodeResponse',
  'foam.nanos.geocode.GoogleMapsGeocodeResult',
  'foam.nanos.geocode.GoogleMapsGeometry',
  'foam.nanos.geocode.GoogleMapsBoundary',

  'foam.nanos.demo.DemoObject',
  'foam.nanos.demo.relationship.Student',
  'foam.nanos.demo.relationship.Professor',
  'foam.nanos.demo.relationship.Course',
  'foam.nanos.demo.relationship.CourseType',
  'foam.nanos.demo.relationship.StudentCourseJunction',
  'foam.nanos.fs.File',

  'foam.crypto.hash.Hasher',
  'foam.crypto.hash.Hashable',

  'foam.crypto.sign.Signer',
  'foam.crypto.sign.Signable',
  'foam.crypto.sign.SignedFObject',

  'foam.nanos.http.Command',
  'foam.nanos.http.Format',
  'foam.nanos.http.DefaultHttpParameters',
  'foam.nanos.http.HttpParameters',
  'foam.nanos.dig.DIG',
  'foam.nanos.dig.DUG',

  'foam.lib.query.TestModel',
  'foam.lib.query.FooEnum'
];

var abstractClasses = [
  'foam.nanos.menu.AbstractMenu',
//  'foam.json.Outputter'
];


var skeletons = [
  'foam.dao.DAO',
  'foam.mop.MOP',
  'foam.nanos.auth.AuthService',
  'foam.nanos.auth.email.EmailDocInterface',
  'foam.nanos.auth.twofactor.OTPAuthService',
  'foam.nanos.auth.token.TokenService',
  'foam.nanos.notification.email.EmailService',
  'foam.nanos.notification.push.PushService',

];

var proxies = [
  'foam.dao.DAO',
  'foam.dao.Sink',
  'foam.mop.MOP',
  'foam.lib.parse.Parser',
  'foam.lib.parse.PStream',
  'foam.blob.Blob',
  'foam.blob.BlobService',
  'foam.nanos.auth.AuthService',
  'foam.nanos.auth.twofactor.OTPAuthService',
  'foam.nanos.http.WebAgent',
  'foam.nanos.notification.email.EmailService',
  'foam.nanos.notification.push.PushService'
];

var blacklist = [
];

module.exports = {
    classes: classes,
    abstractClasses: abstractClasses,
    skeletons: skeletons,
    proxies: proxies,
    blacklist: blacklist
}
