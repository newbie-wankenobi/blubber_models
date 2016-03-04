var mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost/blubber_app");

var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  // password: String,
  moderator: { type:Boolean, default: false }
});


var User = mongoose.model("User", userSchema)


module.exports = User;
