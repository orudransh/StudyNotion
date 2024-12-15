const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URL } = process.env;

exports.connect = () => {
	mongoose.connect(MONGODB_URL)
		// {
		// useNewUrlparser: true,
		// 	useUnifiedTopology: true,
		// })
	.then( () => console.log("DB Connection Success"))
	.catch((error) => {
		console.log("DB Connection Failed");
		console.error(error);
		process.exit(1);
	})
};
