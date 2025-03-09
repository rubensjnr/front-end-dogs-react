import React from 'react';
import styles from './FeedPhotoItem.module.css';
import Image from '../Helper/Image';

function FeedPhotosItem({ photo, setModalPhoto }) {
  function handleClick() {
    setModalPhoto(photo);
  }

  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image alt={photo.title} src={photo.src} />
      <span className={styles.visualizacao}>{photo.acessos}</span>
    </li>
  );
}

export default FeedPhotosItem;
