const Tenant = require('./tenants');
const db = require('../firestore');

class CustomersSchema extends Tenant.Schema {
 
}
module.exports = {
    Schema: CustomersSchema,
    collection:db.collection("customers")
};