import React from 'react'

interface IError {
  message?: string
}

const ErrorComponent = ({ message }: IError) => {
  return (
    <div className="max-w-lg">
      <h1>Ooops! Something went wrong.</h1>
      <p className="text-error-500 font-normal text-lg">
        {message ?? 'try again later'}
      </p>
    </div>
  )
}

export default ErrorComponent
