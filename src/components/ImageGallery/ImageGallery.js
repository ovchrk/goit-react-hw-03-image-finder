import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem';
import { Button } from '../Button';
import { RotatingLines } from 'react-loader-spinner';
import { Modal } from '../Modal';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import css from '../ImageGallery/ImageGallery.module.css';

const KEY = '34603447-420b9507c9dfa301393340c59';
const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = 'https://pixabay.com/api/';

class ImageGallery extends Component {
  constructor() {
    super();
    this.onLoadMore = this.onLoadMore.bind(this);
  }
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    showModal: false,
    activeIndex: null,
    error: null,
  };

  async componentDidUpdate(prevProps) {
    const prevQuery = prevProps.query;
    const newQuery = this.props.query;
    if (prevQuery !== newQuery) {
      this.setState({ query: newQuery, images: [], loading: true, page: 1 });

      try {
        const res = await axios.get(
          `${BASE_URL}?q=${newQuery}&page=${this.props.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        if (res.data.total === 0) {
          this.setState({ loading: false });
          toast.error(
            `Nothing was fount on your request '${newQuery}'. Please enter valid request!`
          );
        }
        this.setState({ images: res.data.hits });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ loading: false });
        this.setState(prevState => ({ page: prevState.page + 1 }));
      }
    }
  }
  async onLoadMore() {
    const query = this.state.query;

    this.setState({ loading: true });
    try {
      const res = await axios.get(
        `${BASE_URL}?q=${query}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState(prevState => ({
        images: [...prevState.images, ...res.data.hits],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
      this.setState(prevState => ({ page: prevState.page + 1 }));
    }
    // fetch(
    //   `${BASE_URL}?q=${query}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    // )
    //   .then(res => {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //   })
    //   .then(res => {
    //     this.setState(prevState => ({
    //       images: [...prevState.images, ...res.hits],
    //     }));
    //   })
    //   .finally(() => {
    //     this.setState({ loading: false });
    //     this.setState(prevState => ({ page: prevState.page + 1 }));
    //   });
  }
  setActiveIndex = index => {
    this.setState({ index });
  };
  openModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, loading, showModal, index } = this.state;
    return (
      <div>
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img
              src={images[index].largeImageURL}
              alt={images[index].tags}
              width="700px"
              height="450"
            />
          </Modal>
        )}
        <Toaster position="top-center" reverseOrder={false} />

        <ul className={css.gallery}>
          {images.map((image, index) => {
            return (
              <ImageGalleryItem
                onClick={this.openModal}
                setIndex={this.setActiveIndex}
                key={image.id}
                index={index}
                image={image.webformatURL}
                tags={image.tags}
              />
            );
          })}
        </ul>
        {loading && (
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
        {images.length >= 12 && <Button onLoadMore={this.onLoadMore}></Button>}
      </div>
    );
  }
}
ImageGallery.propTypes = {
  query: PropTypes.string,
  page: PropTypes.number,
};
export { ImageGallery };
