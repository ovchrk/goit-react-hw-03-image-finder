import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem';
import { Button } from '../Button';
import { RotatingLines } from 'react-loader-spinner';
import css from '../ImageGallery/ImageGallery.module.css';

const KEY = '34603447-420b9507c9dfa301393340c59';
const BASE_URL = 'https://pixabay.com/api/';

class ImageGallery extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const newQuery = this.props.query;
    if (prevQuery !== newQuery) {
      this.setState({ query: newQuery, loading: true, images: [] });
      fetch(
        `${BASE_URL}?q=${newQuery}&page=${this.props.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error(`По запросу ${newQuery} ничего не найдено.`)
          );
        })
        .then(res => {
          this.setState({ images: res.hits });
        })
        .finally(() => {
          this.setState({ loading: false });
          this.setState(prevState => ({ page: prevState.page + 1 }));
        });
    }
  }
  onLoadMore = () => {
    const query = this.state.query;

    this.setState({ loading: true });
    fetch(
      `${BASE_URL}?q=${query}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(`По запросу ${query} ничего не найдено.`)
        );
      })

      .then(res => {
        this.setState(prevState => ({
          images: [...prevState.images, ...res.hits],
        }));
      })
      .finally(() => {
        this.setState({ loading: false });
        this.setState(prevState => ({ page: prevState.page + 1 }));
      });
  };
  render() {
    const { images, loading } = this.state;
    return (
      <div>
        {loading === true && (
          <div className="gallery__section">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        )}

        <ul className={css.gallery}>
          {images.map(image => {
            return (
              <ImageGalleryItem
                //       onClick={this.toggleModal}
                //       getIndex={this.getIndex}
                key={image.id}
                //       index={index}
                image={image.webformatURL}
                tags={image.tags}
              />
            );
          })}
        </ul>
        {images.length > 0 && <Button onLoadMore={this.onLoadMore}></Button>}
      </div>
    );
  }
}
export { ImageGallery };
