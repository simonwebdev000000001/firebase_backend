 const {
     User
 } = require('../../models');


 async function users(count = 2) {
     const items = [];
     try {
         for (let i = 0; i < count; i++) {
             let _user = new User.Schema({
                 firstName: "Alan",
                 lastName: "Mathison",
                 email: `test@test${i}.test.com`
             });
             _user = await User.collection.add(_user.toJSON());
             items.push(_user);
             console.log('Useer was added ', _user.id);
         }
     } catch (e) {
         console.log('Useer was not added ', e);
     } finally {
         return items;
     }

 }
 module.exports = users;