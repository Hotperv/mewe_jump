/**
 * IncidentController
 *
 * @description :: Server-side logic for managing incidents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
		if(req.param("type") && req.param("lat") && req.param("lng"))
		{
			Incident.create({email: req.param("email").toLowerCase()}, function(err, incident){
				if(!err)
				{
					return res.send(200, {success:true, incident: incident})
				}
				else
				{
					return res.send(200, {success:false, message: "Unable to process incident. Please try again later."})
				}
			})
		}
		else
		{
			return res.send(200, {success:false, message: "Incident Type and Position are required."})
		}
	},
	index: function(req, res) {
		var _cookie = (req.cookies && req.cookies.meweauth ? req.cookies.meweauth : false)

		if(_cookie && _cookie.login)
		{
			return res.view({ title: "Incident | MeWe Jump", user:_cookie, menu: "incident"});
		}
		else
		{
			return res.redirect("/")
		}
	}
};

