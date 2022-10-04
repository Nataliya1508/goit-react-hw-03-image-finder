import React from "react";
// import { Component } from "react";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem"
import PropTypes from "prop-types"
import styles from './ImageGallery.module.css'



const  ImageGallery = ({ images, onImage }) => {
  
    return (
  
      <ul className={styles.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webURL={webformatURL}
            largeImageURL={largeImageURL}
            className={styles.ImageGalleryItemImage}
            tags={tags}
            onClick={onImage}
          />
          
      ))}
      
</ul>
    
    )
  }


ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ), 

  onImage: PropTypes.func.isRequired,
};

export default ImageGallery;