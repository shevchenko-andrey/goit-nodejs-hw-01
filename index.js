const { Command } = require('commander');
const contactsPath = `./contacts`;
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require(contactsPath);
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      try {
        const contacts = await listContacts();
        console.table(contacts);
      } catch (error) {
        console.log('Contacts not found');
      }
      break;

    case 'get':
      try {
        const contacts = await getContactById(id);
        console.log(contacts);
      } catch (error) {
        console.log(`Contact with id ${id} not found`);
      }
      break;

    case 'add':
      try {
        const newContact = await addContact(name, email, phone);
        console.log(newContact);
      } catch (error) {
        console.log(`Sorry contact with ${name} has not been added`);
      }

      break;

    case 'remove':
      try {
        const remoteContact = await removeContact(id);
        console.log(remoteContact);
      } catch (error) {
        console.log(`Sorry but contact with id ${id} is not deleted`);
      }

      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
