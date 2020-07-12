const db = require("../sequelizers");
const Users = db.user;
const bcrypt = require('bcrypt');


const model = {
	createUser: async ({ username, password, email }) => {
		bcrypt.hash(password, 10, async function(err, hash){
			password = hash;
			return await Users.create({ username, password, email });
	});
	},
	getAllUsers: async () => {
		return await Users.findAll();
	},
	getUser: async obj => {
		return await Users.findOne({
		where: obj,
	})
	},
}
module.exports = model;