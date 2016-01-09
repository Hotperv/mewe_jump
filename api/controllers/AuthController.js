/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function(req, res) {
		return res.view({ title: "Login | MeWe Jump"});
	},
	registration: function(req,res) {
		return res.view({ title: "Registraiton | MeWe Jump"});
	}
};

