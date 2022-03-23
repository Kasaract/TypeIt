const mongoose = require('mongoose');

const EventLogsSchema = new mongoose.Schema({
  username: String,
  language: String,
  events: [Object],
});

module.exports = mongoose.model('EventLogs', EventLogsSchema);
