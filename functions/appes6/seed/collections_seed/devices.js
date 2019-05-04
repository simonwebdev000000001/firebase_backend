const {
    Devices
} = require('../../models');


async function devices(count = 2) {
    const items = [];
    try {
        for (let i = 0; i < count; i++) {
            let item = new Devices.Schema({
                name: "device"+i,
            });
            item = await Devices.collection.add(item.toJSON());
            console.log('Item was added ', item.id);
            items.push(item);
        }
    } catch (e) {
        console.log('Item was not added ', e);
    } finally {
        return items;
    }

}
module.exports = devices;
