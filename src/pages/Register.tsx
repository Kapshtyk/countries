import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

import Form, { InputType } from '@/components/Form'
import PageWithForm from '@/components/PageWithForm'

import { registerWithEmailAndPassword } from '@/app/auth/firebase'
import { auth } from '@/app/auth/firebase'

const Register = () => {
  const [user, loading] = useAuthState(auth)
  const [error, setError] = useState<string | null>()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (user) navigate('/countries')
  }, [user, loading, navigate])

  const register = (values: InputType) => {
    if (!values.email || !values.password || !values.name) {
      setError('Please fill in all fields')
    } else {
      registerWithEmailAndPassword(
        values.name,
        values.email,
        values.password,
        setError
      )
    }
  }

  return (
    <PageWithForm>
      <Form
        label="Register"
        initialValues={{
          email: '',
          name: '',
          password: ''
        }}
        onSubmit={register}
        responseErrors={error}
      />
      <div>
        <p className="font-extralight">
          Already have an account?{' '}
          <Link className="text-sky-400" to="/login">
            Login
          </Link>
        </p>
      </div>
    </PageWithForm>
  )
}

export default Register
