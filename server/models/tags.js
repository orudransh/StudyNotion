const mongoose = require("mongoose");

// Define the Section schema
const tagsSchema = new mongoose.Schema({
	name: {
      type: String,
      required: true,
	},
	description:
		{
            type: String,
      },
      course: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Course",
      },
});

// Export the Section model
module.exports = mongoose.model("Tag", tagsSchema);
