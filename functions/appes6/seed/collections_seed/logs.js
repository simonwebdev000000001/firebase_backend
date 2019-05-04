const {
    Logs
} = require('../../models');


async function logs(count = 2) {
    const items = [];
    try {
        for (let i = 0; i < count; i++) {
            let item = new Logs.Schema({
                name: "log"+i,
            });
            item = await Logs.collection.add(item.toJSON());
            console.log('Item was added ', item.id);
            items.push(item);
        }
    } catch (e) {
        console.log('Item was not added ', e);
    } finally {
        return items;
    }

}
module.exports = logs;
