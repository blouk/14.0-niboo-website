odoo.define('theme_niboo.dynamicSnippet', async function(require) {
  'use strict';

  const publicWidget = require('web.public.widget');
  const ajax = require('web.ajax');
  const core = require('web.core');
  const qweb = core.qweb;

  await ajax.loadXML('/theme_niboo/static/src/xml/partner.xml', qweb);

  publicWidget.registry.DynamicSnippet = publicWidget.Widget.extend({
    selector: '.s-dyn',
    start: function() {

      const $container = this.$el.find('.niboo-s-dyn-container');
      $container.empty();
      ajax.jsonRpc('/get/partners', 'call', {}).then(function(result) {
        _.forEach(JSON.parse(result), function(i,e){
        $container.append($(qweb.render('niboo_theme.partner',{partner:i})));
        });

      });
    }

  });
});
