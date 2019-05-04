
require('../../firebase.app');
const {
    customers,
    devices,
    logs,
    settings,
    users,
    tenants
} = require('./collections_seed');
// const db = require('./firestore');

async function seedData() {
    try {
        const _users = await users();
        const _tenants = await tenants();
         await customers();
         await devices();
         await logs();
         await settings();
        // var messageRef = db.collection('users').doc(_users[0].id)
        //         .collection('tenants').doc(_tenants[0].id);
        //         console.log(messageRef);
    } catch (e) {
        console.log(e);
    } finally {

        process.exit();
    }
}
seedData();
