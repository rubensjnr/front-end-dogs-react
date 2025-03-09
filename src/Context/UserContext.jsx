import React from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from '../api';

export const UserContext = React.createContext();

export function UserStorage({ children }) {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  async function getUser(token) {
    try {
      const { url, options } = USER_GET(token);
      const response = await fetch(url, options);
      const json = await response.json();
      setData(json);
      setLogin(true);
    } catch (err) {
    } finally {
    }
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Erro: Dados inválidos');
      const json = await response.json();
      window.localStorage.setItem('token', json.token);
      await getUser(json.token);
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  const userLogout = React.useCallback(async function () {
    setData(null);
    setLoading(false);
    setError(null);
    setLogin(false);
    window.localStorage.removeItem('token');
  }, []);

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido');
          await getUser(token);
        } catch (err) {
          userLogout();
          setError(err);
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{
        userLogin,
        data,
        userLogout,
        error,
        login,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
