odoo.define('theme_niboo.simpleJsAction', async function(require) {
      'use strict';

      const publicWidget = require('web.public.widget');
      const core = require('web.core');
      const qweb = core.qweb;
      const ajax = require('web.ajax');

      await ajax.loadXML('/theme_niboo/static/src/xml/modal.xml', qweb);

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
            $('.niboo-modal').remove();
            $('body').append( $(qweb.render('niboo_theme.modal', {
                clicks: this.time
              })).modal());
          }
      });
})
