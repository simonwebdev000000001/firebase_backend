const {
    users,
    tenants
} = require('./collections.seed');
// const db = require('./firestore');
async function seedData() {
    try {
        const _users = await users();
        const _tenants = await tenants();
        // var messageRef = db.collection('users').doc(_users[0].id)
        //         .collection('tenants').doc(_tenants[0].id);
        //         console.log(messageRef);
    } catch (e) {
        console.log(e);
    } finally {

        process.exit();
    }
}
console.log("333");
seedData();