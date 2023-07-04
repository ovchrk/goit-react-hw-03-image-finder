import { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  render() {
    const { onClick, setIndex, index, image, tags } = this.props;
    return (
      <li onClick={onClick} className={css.gallery__item}>
        <img
          src={image}
          alt={tags}
          onClick={() => {
            setIndex(index);
          }}
          className={css.gallery__image}
        />{' '}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
