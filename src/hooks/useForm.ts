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

  return {
    values,
    handleChange,
    isFormTouched
  }
}
