const AsbtractCollection = require('./abstract.schema');
const db = require('../firestore');

class DevicesSchema extends AsbtractCollection {
  constructor(data) {
    super(data);
    this.name = data.name || '';
    this.lastLogin = data.lastLogin || '';
    this.ipAddress = data.ipAddress || '';
  }
}

module.exports = {
  Schema: DevicesSchema,
  collection: db.collection('devices'),
};
