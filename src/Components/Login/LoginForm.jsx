import React from 'react';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../Context/UserContext';
import Error from '../Helper/Error';
import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css';

import { Link } from 'react-router-dom';
import Head from '../Helper/Head';

function LoginForm() {
  const username = useForm();
  const password = useForm();
  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" description="Pagina de Login." />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" name="usuario" type="text" {...username} />

        <Input label="Senha" name="senha" type="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error && 'Dados incorretos.'} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a Senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
}

export default LoginForm;
