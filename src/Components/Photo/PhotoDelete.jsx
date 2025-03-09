import React from 'react';
import styles from './PhotoDelete.module.css';
import useFetch from '../../Hooks/useFetch';
import { COMMENT_DELETE } from '../../api';

function PhotoDelete({ id }) {
  const { request, loading } = useFetch();

  async function handleClick() {
    const confirm = window.confirm('Tem certeza que deseja deletar a imagem?');
    if (confirm) {
      const { url, options } = COMMENT_DELETE(
        id,
        localStorage.getItem('token'),
      );
      const { response } = await request(url, options);
      if (response.ok) window.location.reload();
    } else {
      return null;
    }
  }

  return (
    <>
      {loading ? (
        <button onClick={handleClick} disabled className={styles.delete}>
          Deletando...
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
}

export default PhotoDelete;
