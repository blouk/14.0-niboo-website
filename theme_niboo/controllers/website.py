from odoo import http, fields
from odoo.http import request
import json


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
        return request.render("theme_niboo.message", {"message": message})


    @http.route(
        ["""/get/partners"""],
        type="json",
        auth="public",
        website=True,
    )
    def get_partners(self):

        Partner = request.env['res.partner']
        partners = Partner.sudo().search([])
        values = []
        for partner in partners:
            values.append({'name':partner.name,'id':partner.id})
        return json.dumps(values)
