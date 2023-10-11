import PropTypes from 'prop-types';
import css from '../Button/Button.module.css';

export const Button = ({ onLoadMore }) => {
  return (
    <div className={css.section}>
      <button type="button" onClick={onLoadMore} className={css.button}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func,
};
