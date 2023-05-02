import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <>
      <p className={styles.label}>Find contacts by name</p>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={styles.input}
      ></input>
    </>
  );
};

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
