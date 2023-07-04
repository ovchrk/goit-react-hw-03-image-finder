import { Component } from 'react';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  render() {
    const { image, tags } = this.props;
    return (
      <li className={css.gallery__item}>
        <img src={image} alt={tags} className={css.gallery__image} />{' '}
      </li>
    );
  }
}
