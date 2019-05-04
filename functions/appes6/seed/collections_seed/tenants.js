const {
    Tenant
} = require('../../models');


async function tenants(count = 2) {
    const items = [];
    try {
        for (let i = 0; i < count; i++) {
            let item = new Tenant.Schema({
                name: "Alan",
            });
            item = await Tenant.collection.add(item.toJSON());
            console.log('tenants was added ', item.id);
            items.push(item);
        }
    } catch (e) {
        console.log('Useer was not added ', e);
    } finally {
        return items;
    }

}
module.exports = tenants;
