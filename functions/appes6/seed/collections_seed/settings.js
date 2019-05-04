const {
    Settings
} = require('../../models');


async function settings(count = 2) {
    const items = [];
    try {
        for (let i = 0; i < count; i++) {
            let item = new Settings.Schema({
                name: "log"+i,
            });
            item = await Settings.collection.add(item.toJSON());
            console.log('Item was added ', item.id);
            items.push(item);
        }
    } catch (e) {
        console.log('Item was not added ', e);
    } finally {
        return items;
    }

}
module.exports = settings;
