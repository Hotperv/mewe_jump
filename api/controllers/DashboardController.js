/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
		var _cookie = (req.cookies && req.cookies.meweauth ? req.cookies.meweauth : false)

		if(_cookie && _cookie.login)
		{
			return res.view({ title: "Dashboard | MeWe Jump", user:_cookie, menu: "dashboard"});
		}
		else
		{
			return res.redirect("/")
		}
	}
};

