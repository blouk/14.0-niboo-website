from odoo import models


class ThemeNiboo(models.AbstractModel):
    _inherit = 'theme.utils'

    def _theme_niboo_post_copy(self, mod):
        # check why this doesn't work.
        self._reset_default_config()
