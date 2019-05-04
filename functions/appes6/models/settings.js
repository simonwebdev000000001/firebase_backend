const AsbtractCollection = require('./abstract.schema');
const db = require('../firestore');

class SettingsSchema extends AsbtractCollection {
    constructor(data) {
        super(data);
        for (let i = 0; i <10 ; i++) {
            this[`var${i}`] = data[`var${i}`] || '';
        }
    }
}
module.exports = {
    Schema: SettingsSchema,
    collection:db.collection("settings")
};
