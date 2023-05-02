import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import styles from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = event => {
    event.preventDefault();
    const actualContacts = [...contacts];
    const addedContact = {
      id: nanoid(),
      name: event.target[0].value,
      number: event.target[1].value,
    };
    const names = actualContacts.map(contact => contact.name.toLowerCase());
    if (names.includes(addedContact.name.toLowerCase())) {
      return alert(`${addedContact.name} is already in contacts.`);
    }
    actualContacts.push(addedContact);
    setContacts(actualContacts);
    event.target[0].value = '';
    event.target[1].value = '';
  };

  const filterFun = event => {
    setFilter(event.currentTarget.value);
  };

  const showContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const contactsToShow = showContacts();

  return (
    <div className={styles.container}>
      <h1 className={styles.classname}>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2 className={styles.subtitle}>Contacts</h2>
      <Filter value={filter} onChange={filterFun} />
      <ContactsList contacts={contactsToShow} onDeleteContact={deleteContact} />
    </div>
  );
};

export default App;

// import { Component } from 'react';
// import ContactForm from './ContactForm/ContactForm';
// import ContactsList from './ContactsList/ContactsList';
// import Filter from './Filter/Filter';
// import { nanoid } from 'nanoid';

// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts)
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//   }

//   handleAddContact = event => {
//     event.preventDefault();
//     const actualContacts = [...this.state.contacts];
//     const addedContact = {
//       id: nanoid(),
//       name: event.target[0].value,
//       number: event.target[1].value,
//     };
//     const names = actualContacts.map(contact => contact.name.toLowerCase());
//     if (names.includes(addedContact.name.toLowerCase())) {
//       return alert(`${addedContact.name} is already in contacts.`);
//     }
//     actualContacts.push(addedContact);
//     this.setState(() => ({ contacts: actualContacts }));
//     event.target[0].value = '';
//     event.target[1].value = '';
//   };

//   filterFun = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   showContacts = () => {
//     const { filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   render() {
//     const { filter } = this.state;
//     const contactsToShow = this.showContacts();
//     return (
//       <>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={this.handleAddContact} />
//         <h2>Contacts</h2>
//         <Filter value={filter} onChange={this.filterFun} />
//         <ContactsList
//           contacts={contactsToShow}
//           onDeleteContact={this.deleteContact}
//         />
//       </>
//     );
//   }
// }

// export default App;
