const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(contactsPath, (err, data) => {
            if (err) {
                reject(err);
            }
            const contacts = [...JSON.parse(data.toString())];
            resolve(contacts);
        });
    });
};

const getContactById = async function (contactId) {
    const contacts = await listContacts();
    const user = contacts.find(contact => contact.id === contactId);
    if (user) {
        return user;
    }

    return 'Not have user ID';
};

const removeContact = async function (contactId) {
    const contacts = await listContacts();
    const userDeleted = await getContactById(contactId);
    const newContacts = contacts.filter(user => user.id !== userDeleted.id);
    return changeInDatabase(newContacts);
};

const changeInDatabase = changes => {
    return new Promise((resolve, reject) => {
        fs.writeFile(contactsPath, JSON.stringify(changes), err => {
            if (err) {
                reject(err);
            }

            resolve('Good write');
        });
    });
};

const addContact = async function (name, email, phone) {
    const contacts = await listContacts();
    const newUser = {
        id: contacts.length + 1,
        name: name,
        email: email,
        phone: phone,
    };
    const newContacts = [...contacts, newUser];

    return changeInDatabase(newContacts);
};

module.exports = { listContacts, getContactById, removeContact, addContact };
