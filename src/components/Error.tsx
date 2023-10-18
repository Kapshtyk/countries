import React from 'react'

interface IError {
  message?: string
}

const Error = ({ message }: IError) => {
  return <h1>Ooops! Something went wrong. {message ?? 'try again later'}</h1>
}

export default Error
