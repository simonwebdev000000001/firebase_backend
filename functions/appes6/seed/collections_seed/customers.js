const {
    Customer
} = require('../../models');


async function customers(count = 2) {
    const items = [];
    try {
        for (let i = 0; i < count; i++) {
            let item = new Customer.Schema({
                name: "Alan",
            });
            item = await Customer.collection.add(item.toJSON());
            console.log('Item was added ', item.id);
            items.push(item);
        }
    } catch (e) {
        console.log('Useer was not added ', e);
    } finally {
        return items;
    }

}
module.exports = customers;
