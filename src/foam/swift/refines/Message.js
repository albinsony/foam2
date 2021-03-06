/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  refines: 'foam.i18n.MessageAxiom',
  requires: [
    'foam.swift.Field',
    'foam.i18n.TranslationFormatStringParser',
  ],
  methods: [
    function writeToSwiftClass(cls) {
      var parser = this.TranslationFormatStringParser.create({
        value: this.message,
        translationHint: this.description,
      });
      var v = parser.parsedValue;
      var d = parser.parsedTranslationHint;
      cls.fields.push(this.Field.create({
        name: this.name,
        type: 'String',
        static: true,
        final: true,
        defaultValue: 'NSLocalizedString("'+v+'", comment: "'+d+'")',
      }));
    },
  ]
});
