import React from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';
import PropTypes from 'prop-types';

function Feed({ user }) {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);

  React.useEffect(() => {
    let wait = false;
    function infiniteScroll() {
      if (infinite) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !wait) {
          wait = true;
          setPages((pages) => [...pages, pages.length + 1]);
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    }
    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scrool', infiniteScroll);
    window.addEventListener('touchmove', infiniteScroll);

    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scrool', infiniteScroll);
      window.removeEventListener('touchmove', infiniteScroll);
    };
  }, [infinite]);

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos
          key={page}
          user={user}
          page={page}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
        />
      ))}
      {!infinite && (
        <p
          style={{
            color: '#888',
            textAlign: 'center',
            padding: '2rem 0 4rem 0',
          }}
        >
          Não existem mais postagens.
        </p>
      )}
    </div>
  );
}
Feed.defaultProps = {
  user: 0,
};

Feed.PropTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default Feed;
