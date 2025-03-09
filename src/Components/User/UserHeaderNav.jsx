import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import MinhasFotos from '../../assets/feed.svg?react';
import Estatisticas from '../../assets/estatisticas.svg?react';
import AdicionarFoto from '../../assets/adicionar.svg?react';
import Sair from '../../assets/sair.svg?react';
import styles from './UserHeaderNav.module.css';
import { useNavigate } from 'react-router-dom';
import useMedia from '../../Hooks/useMedia';

function UserHeaderNav() {
  const mobile = useMedia('(max-width: 40rem)');
  const { userLogout } = React.useContext(UserContext);
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  function handleLogout() {
    userLogout();
    navigate('/login');
  }

  return (
    <>
      {mobile && (
        <button
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          aria-label="Menu"
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to="/conta" end>
          <MinhasFotos />
          {mobile && 'Minhas Fotos'}
        </NavLink>

        <NavLink to="/conta/estatisticas">
          <Estatisticas />
          {mobile && 'Estatítsticas'}
        </NavLink>

        <NavLink to="/conta/postar">
          <AdicionarFoto />
          {mobile && 'Adicionar Foto'}
        </NavLink>

        <button onClick={handleLogout}>
          {' '}
          <Sair />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
}

export default UserHeaderNav;
