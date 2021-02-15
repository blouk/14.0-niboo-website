/* Not neccessary JS*/

odoo.define('theme_niboo.editor.snippets.options', function (require) {
'use strict';
  var options = require('web_editor.snippets.options');

options.registry.RotationSpeed = options.Class.extend({

    async start () {
      return this._super(...arguments);
    },

    async _computeWidgetState (methodName, params) {
      //options values selected.
        if (methodName === 'selectDataAttribute') {
            const attrName = params.attributeName;
            const attrValue = (this.$target[0].dataset[attrName] || params.attributeDefaultValue).trim();
            console.log('value of options:' + attrValue)
         };
        return this._super(...arguments);
    },

});
});
