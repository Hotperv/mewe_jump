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
					var tempUser = req.body;
					tempUser.email = tempUser.email.toLowerCase();
					User.create(tempUser, function(errCreate, user) {
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
	processLogin: function(req, res) {
		if(req.param("email") && req.param("password"))
		{
			User.findOne({email: req.param("email").toLowerCase()}, function(err, user){
				if(user && user.email && user.email.toLowerCase() == req.param("email").toLowerCase() && user.password && user.password == req.param("password") )
				{
					var tempUser = _.clone(user);
					tempUser.login = true;
					console.log(JSON.stringify(tempUser, null, 4))
					res.cookie('meweauth', tempUser, { maxAge: 7776000000 });
					// return res.redirect("/user/registration");
					return res.send(200, {success:true, message: "Email and password matched!.", redirect: "/home"})
				}
				else if(user && user.email && user.email.toLowerCase() == req.param("email").toLowerCase())
				{
					return res.send(200, {success:false, message: "Incorrect email and password combination."})
				}
				else
				{
					return res.send(200, {success:false, message: "User does not exist."})
				}
			})
		}
		else
		{
			return res.send(200, {success:false, message: "Email and Password are required."})
		}
	},
	registration: function(req,res) {
		return res.view({ title: "Registraiton | MeWe Jump"});
	}
};

