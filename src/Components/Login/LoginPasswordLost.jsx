import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PASWORD_LOST } from '../../api';
import { useHref } from 'react-router-dom';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

function LoginPasswordLost() {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(e) {
    e.preventDefault();
    if (login.validate()) {
      const { url, options } = PASWORD_LOST({
        login: login.value,
        url: window.location.href.replace('perdeu', 'resetar'),
      });
      await request(url, options);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Perdeu a senha" />
      <h1 className="title">Perdeu a senha?</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Email ou Usuário" type="text" name="email" {...login} />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar Email</Button>
        )}
        {data && (
          <p style={{ color: '#4c1', marginTop: '1rem', fontSize: '1.25rem' }}>
            {data}
          </p>
        )}
        <Error error={error} />
      </form>
    </section>
  );
}

export default LoginPasswordLost;
