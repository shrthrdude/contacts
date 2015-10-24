var mongoose = require('mongoose');

var contactsSchema = new mongoose.Schema({
  first: { type: String, required: true },
  last: { type: String, required: true },
  firstAddr: { type: String, required: false },
  secondAddr: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  country: { type: String, required: false },
  postal: { type: String, required: false },
  homePhone: { type: String, required: false },
  mobilePhone: { type: String, required: false },
  workPhone: { type: String, required: false },
  workExt: { type: String, required: false },
  firstEmail: { type: String, required: false },
  secondEmail: { type: String, required: false },
  company: { type: String, required: false },
  comment: { type: String, required: false },
  linkedin: {type: String, required: false },
  facebook: { type: String, required: false },
  twitter: { type: String, required: false },
  userId: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Contact', contactsSchema);