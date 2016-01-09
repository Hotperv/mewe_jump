/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
		if(req.param("first_name") && req.param("last_name") && req.param("email") && req.param("password"))
		{
			User.findOne({email: req.param("email").toLowerCase()}, function(err, user){
				if(user && user.email && user.email.toLowerCase() == req.param("email").toLowerCase())
				{
					return res.send(200, {success:false, message: "Email already exist."})
				}
				else
				{
					User.create(req.body, function(errCreate, user) {
						return res.send(200, {success:true, user: user})
					})
				}
			})
		}
		else
		{
			return res.send(200, {success:false, message: "First Name, Last Name, Email, and Password are required."})
		}
		
	},
	login: function(req, res) {
		return res.view({ title: "Login | MeWe Jump"});
	},
	registration: function(req,res) {
		return res.view({ title: "Registraiton | MeWe Jump"});
	}
};

