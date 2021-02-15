odoo.define('theme_niboo.simpleJsAction', function(require) {
  'use strict';

  const publicWidget = require('web.public.widget');


  publicWidget.registry.simpleJsAction = publicWidget.Widget.extend({
    selector: '.niboo-prefooter',
    events: {
      'click h3': '_onclickHeader'
    },

    init: function(parent, params) {
      this._super.apply(this, arguments);
      this.time = 0;
    },

    _onclickHeader: function(e) {
      this.time++;
      alert('You just clicked ' + this.time + " time(s) the header");
    }

  });
});
