console.log('This is index.js:');
const { Command } = require('commander');
const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} = require('./contacts');

async function bootstrap(value) {
    const result = await value;
    console.log(result);
}

const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            await bootstrap(listContacts());
            break;

        case 'get':
            bootstrap(getContactById(id));
            break;

        case 'add':
            bootstrap(addContact(name, email, phone));
            break;

        case 'remove':
            bootstrap(removeContact(id));
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);
