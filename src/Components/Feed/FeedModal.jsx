import React from 'react';
import styles from './FeedModal.module.css';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_GET } from '../../api';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from '../Photo/PhotoContent';

function FeedModal({ photo, setModalPhoto }) {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    async function fetchPhoto() {
      const { response, json } = await request(url, options);
    }
    fetchPhoto();
  }, [photo, request]);

  function handleOutSideClick(e) {
    const { target, currentTarget } = e;
    if (target === currentTarget) setModalPhoto(null);
  }

  return (
    <div onClick={handleOutSideClick} className={styles.modal}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
}

export default FeedModal;
