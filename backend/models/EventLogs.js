const mongoose = require('mongoose');

const EventLogsSchema = new mongoose.Schema({
  events: [Object],
});

module.exports = mongoose.model('EventLogs', EventLogsSchema);
