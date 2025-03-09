import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Dogs from '../assets/dogs.svg?react';
import { UserContext } from '../Context/UserContext';

function Header() {
  const { data } = React.useContext(UserContext);
  return (
    <div className={styles.header}>
      <nav className={styles.nav + ' container'}>
        <Link className={styles.logo} aria-label="Dogs - Home" to="/">
          <Dogs />
        </Link>
        {data ? (
          <Link className={styles.login} to="/conta">
            {data.nome}
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Header;
