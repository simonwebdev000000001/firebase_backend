const AsbtractCollection = require('./abstract.schema');
const db = require('../firestore');

class LogsSchema extends AsbtractCollection {
  constructor(data) {
    super(data);
    for (let i = 0; i < 5; i++) {
      this[`var${i}`] = data[`var${i}`] || '';
    }
    this.event = data.event || '';
    this.eventId = data.eventId || '';
  }
}

module.exports = {
  Schema: LogsSchema,
  collection: db.collection('logs'),
};
