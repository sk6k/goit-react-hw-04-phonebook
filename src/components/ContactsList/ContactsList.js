import PropTypes from 'prop-types';
import styles from './ContactsList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={styles.list}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li key={id} className={styles.item}>
            <span className={styles.name}>{name}:</span>{' '}
            <span className={styles.number}>{number}</span>
            <button
              type="button"
              id={id}
              onClick={() => {
                onDeleteContact(id);
              }}
              className={styles.button}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
