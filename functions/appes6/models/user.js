const AsbtractCollection = require('./abstract.schema');
const db = require('../firestore');

class UserSchema extends AsbtractCollection {
    constructor(data) {
        super(data);
        this.role = data.role || '';
        this.title = data.title || '';
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.email = data.email || '';
        this.phoneMobile = data.phoneMobile || '';
        this.tenant = data.tenant || '';
        this.tenantName = data.tenantName || '';
        this.settings = data.settings || '';
        this.portal = data.portal || '';
        this.location = data.location || '';
    }
}
module.exports = {
    Schema: UserSchema,
    collection:db.collection("users")
};