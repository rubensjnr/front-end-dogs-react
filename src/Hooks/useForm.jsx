import React from 'react';

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    messageOne: 'Informe um e-mail valido.',
  },
  password: {
    regex:
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#\.])[0-9a-zA-Z$*&@#\.]{8,}$/,
    messageOne:
      'A senha deve conter maiusculas, minusculas, caracter especial e números.',
    messageTwo: 'A senha deve conter no mínimo 8 dígitos',
  },
  number: {
    regex: /^\d+$/,
    messageOne: 'Utilize apenas números',
  },
};

function useForm(type) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);

  function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  function validate(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setError('Preencha um valor.');
      return false;
    } else if (type === 'password' && value.length < 8) {
      setError(types.password.messageTwo);
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].messageOne);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  return {
    value,
    error,
    setValue,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
}
export default useForm;
