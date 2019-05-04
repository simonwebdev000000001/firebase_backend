const AsbtractCollection = require('./abstract.schema');
const db = require('../firestore');

class TenantsSchema extends AsbtractCollection {
    constructor(data) {
        super(data);
        this.users = data.users || '';
        this.settings = data.settings || '';
        this.portals = data.portals || '';
        this.services = data.services || '';
        this.name = data.name || '';
        this.addressLine1 = data.addressLine1 || '';
        this.addressLine2 = data.addressLine2 || '';
        this.city = data.city || '';
        this.state = data.state || '';
        this.zipcode = data.zipcode || '';
        this.country = data.country || '';
    }
}
module.exports = {
    Schema: TenantsSchema,
    collection:db.collection("tenants")
};