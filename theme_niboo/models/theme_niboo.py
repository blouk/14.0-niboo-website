from odoo import models


class ThemeCommon(models.AbstractModel):
    _inherit = 'theme.utils'

    def _theme_niboo_post_copy(self, mod):
        for nb in range(2, 9):
            self.disable_view('niboo_website.option_colors_%02d_variables' % nb)
