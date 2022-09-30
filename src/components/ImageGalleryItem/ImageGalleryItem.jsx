import React from "react";
import PropTypes from "prop-types"
import styles from './ImageGalleryItem.module.css'

export default function ImageGalleryItem({ images, onImage }) {
  return (
    <>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li className={styles.ImageGalleryItem} key={id}>
          <img
            src={webformatURL}
            alt="response from API"
            className={styles.ImageGalleryItemImage}
            onClick={() => onImage(largeImageURL, tags, id)}
          />
        </li>
      ))}
    </>
  );
}


ImageGalleryItem.propTypes = {
  id: PropTypes.string,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  onImage: PropTypes.func,
};