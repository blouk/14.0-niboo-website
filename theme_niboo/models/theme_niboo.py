from odoo import models


class ThemeNiboo(models.AbstractModel):
    _inherit = 'theme.utils'

    def _theme_niboo_post_copy(self, mod):
            self.disable_view('theme_niboo.option_colors_2_variables')
