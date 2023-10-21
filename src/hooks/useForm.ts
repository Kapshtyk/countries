import { useState } from 'react'

export default function useForm(initialValues: { [key: string]: string }) {
  const [values, setValues] = useState(initialValues)
  const [isFormTouched, setIsFormTouched] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
    setIsFormTouched(true)
  }

  const resetForm = () => {
    setValues(initialValues)
    setIsFormTouched(false)
    const form = document.querySelector('form')
    if (form) {
      form.reset()
    }
  }

  return {
    values,
    handleChange,
    isFormTouched,
    resetForm
  }
}
