import React from "react";
import PropTypes from "prop-types"
import styles from './ImageGalleryItem.module.css'

 const ImageGalleryItem = ({ webURL, tags, largeImageURL, onImage}) => {
  return (
    <>
      
        <li className={styles.ImageGalleryItem}
      
        onClick={() => onImage(largeImageURL)}>
        <img className={styles.ImageGalleryItemImage}
           src={webURL}
            alt={tags}
          />
        </li>
    </>
  );
}


ImageGalleryItem.propTypes = {
  
  webURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string.isRequired,
  onImage: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
