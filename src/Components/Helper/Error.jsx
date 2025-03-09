import React from 'react'

function Error({error}) {
    if(!error) return null
  return (
    <p style={{color: '#f31','font-size': '0.875rem', margin: '0.5rem 0rem', position:'absolute'}}>{error}</p>
  )
}

export default Error;