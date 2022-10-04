import React from "react";
import { Component } from "react";
import axios from "axios";
import Notiflix from "notiflix";
import ImageGallery from "./ImageGallery/ImageGallery";
// import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import LoadMoreBtn from "./Button/Button"
import Modal from "./Modal/Modal";
import Loader from "./Loader/Loader" 
import  { BASE_URL, API_KEY, PER_PAGE } from "./../api/images"
import Searchbar from "./SearchBar/SearchBar";


export default class App extends Component {
  state = {
    hits: [],
    name: '',
    page: 1,
    showModal: false,
    loading: false,
    largeImageURL: '',
    tags: '',
    error: null,
  };

  toggleModal = (imageURL, tag) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: imageURL,
      tags: tag,
    }));
  };

  getValue = ({ name, page }) => {
    this.setState({ loading: true });
    try {
      axios
        .get(
          `${BASE_URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}`
        )
        .then(response => {
          if (!response.data.hits.length) {
            Notiflix.Notify.failure('No images found!');
          } else if (name === this.state.name) {
            this.setState(state => ({
              hits: [...state.hits, ...response.data.hits],
              name: name,
              page: state.page + 1,
            }));
          } else {
            this.setState(state => ({
              hits: response.data.hits,
              name: name,
              page: state.page + 1,
            }));
          }
        });
    } catch (error) {
      console.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  loadMore = () => {
    this.getValue(this.state);
  };

  render() {
    const { hits, showModal, loading, largeImageURL, tags, error } = this.state;

    return (
      <div>
        <Searchbar onSubmitHandler={this.getValue} />

        {loading && <Loader />}
        {error && <p>Oops! Something went wrong!</p>}
        {hits && (
          <ImageGallery images={hits} onImage={this.toggleModal} />)}
        {/* // <ImageGallery>
        // <ImageGalleryItem images={hits} onImage={this.toggleModal} />
        // </ImageGallery> )}  */}

        {showModal && (
          <Modal onClose={this.toggleModal} url={largeImageURL} alt={tags} />
        )}

        {hits.length > 0 && (
          <LoadMoreBtn onButtonClick={() => this.loadMore()} />
        )}
      </div>
    );
  }
}


