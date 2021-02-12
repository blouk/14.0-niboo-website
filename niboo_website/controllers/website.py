from odoo import http, fields
from odoo.http import request


class Website(http.Controller):
    @http.route(
        ["""/message"""],
        methods=["GET", "POST"],
        type="http",
        auth="public",
        website=True,
    )
    def message(self, **post):
        message = "Write your message here!"
        if "message" in post:
            message = post["message"]
        return request.render("niboo_website.message", {"message": message})
