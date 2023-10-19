import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

import Form, { InputType } from '@/components/Form'
import PageWithForm from '@/components/PageWithForm'

import { auth, loginWithEmailAndPassword } from '@/app/services/auth/firebase'

const Login = () => {
  const [user, loading] = useAuthState(auth)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (user) navigate('/countries')
  }, [user, loading, navigate])

  const login = async (values: InputType) => {
    if (!values.email || !values.password) {
      alert('Please fill in all fields')
    } else {
      await loginWithEmailAndPassword(values.email, values.password, setError)
    }
  }

  return (
    <PageWithForm>
      <Form
        label="Login"
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={login}
        responseErrors={error}
      />
      <div>
        <p className="font-extralight">
          Don't have an account?{' '}
          <Link className="text-[var(--main-color-400)]" to="/register">
            Register
          </Link>
        </p>
      </div>
    </PageWithForm>
  )
}

export default Login
