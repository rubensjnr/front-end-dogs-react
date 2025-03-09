import React from 'react'
import styles from './Input.module.css'

function Input({type, onChange, value, label,name, error, onBlur}) {
  return <div className={styles.wrapper}>
    <label className={styles.label} htmlFor={name}>{label}</label>
    <input
    className={styles.input}
    name={name}
    id={name}
    onChange={onChange}
    value={value}
    type={type} 
    onBlur={onBlur}
    />

    {error && <p className={styles.error}>{error}</p>}
  </div>
    
}

export default Input