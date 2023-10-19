import React, { useEffect, useState } from 'react'
import { ZodError, z } from 'zod'

import useForm from '@/hooks/useForm'

import { Button, InputElement } from '@/ui'

const InputSchema = z.object({
  email: z.string().email('Email is not valid').optional(),
  password: z
    .string()
    .min(6, 'Password should consist of at least 6 characters')
    .optional(),
  name: z
    .string()
    .min(3, 'Name should consist of at least 3 characters')
    .optional()
})

enum EInputs {
  email = 'email',
  password = 'password',
  name = 'text'
}

export type InputType = z.infer<typeof InputSchema>

interface Error {
  responseErrors?: string
}

interface IForm {
  label: string
  initialValues: InputType
  onSubmit: (values: InputType) => void
  responseErrors?: string | null
}

export const Form = ({
  label,
  initialValues,
  onSubmit,
  responseErrors
}: IForm) => {
  const { values, handleChange, isFormTouched } = useForm(initialValues)
  const [errors, setErrors] = useState<InputType & Error>({})
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (responseErrors) setErrors({ ...errors, responseErrors })
  }, [responseErrors])

  useEffect(() => {
    if (isFormTouched) {
      setIsValid(Object.keys(errors).length === 0)
    }
  }, [errors, isFormTouched])

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(values)
  }

  const validateField = (field: keyof typeof EInputs) => {
    try {
      if (field in errors) {
        const newErrors = { ...errors }
        delete newErrors[field]
        setErrors(newErrors)
      }
      InputSchema.pick({ [field]: true }).parse(values)
    } catch (error) {
      const { issues = [] } = error as ZodError
      setErrors({ ...errors, [field]: issues[0].message })
    }
  }

  return (
    <form
      className="flex flex-col gap-3 justify-between"
      onSubmit={(e) => handleSubmitForm(e)}
      autoComplete="off"
    >
      <h1 className="font-bold text-4xl m-2 text-center">{label}</h1>
      {Object.keys(initialValues).map((key) => {
        return (
          <InputElement
            key={key}
            type={EInputs[key as keyof typeof EInputs]}
            id={key}
            data-cy={key}
            name={key}
            value={values[key]}
            placeholder={key}
            onBlur={() => validateField(key as keyof typeof EInputs)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
        )
      })}
      {errors && (
        <ul className="text-sm font-extralight text-[var(--error-color-500)]">
          {Object.values(errors).map((error) => {
            return <li key={error}>{error}</li>
          })}
        </ul>
      )}
      <Button type="submit" data-cy="submit" disabled={!isValid}>
        {label}
      </Button>
    </form>
  )
}

export default Form
