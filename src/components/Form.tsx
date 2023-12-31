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
  const { values, handleChange, isFormTouched, resetForm } = useForm(initialValues)
  const [validationErrors, setValidationErrors] = useState<InputType>({})
  const [validationAndResponseErrors, setValidationAndResponseErrors] = useState<InputType & Error>({})
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (responseErrors) {
      setValidationAndResponseErrors({ ...validationErrors, responseErrors })
      setTimeout(() => {
        setValidationAndResponseErrors({ ...validationErrors })
      }, 5000)
    }
  }, [responseErrors])

  useEffect(() => {
    if (validationErrors && responseErrors) {
      setValidationAndResponseErrors({ ...validationErrors, responseErrors })
    } else if (validationErrors) {
      setValidationAndResponseErrors({ ...validationErrors })
    }
  }, [validationErrors])

  useEffect(() => {
    if (isFormTouched) {
      setIsValid(Object.keys(validationErrors).length === 0)
    }
  }, [validationErrors, isFormTouched])

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(values)
    resetForm()
  }

  const validateField = (field: keyof typeof EInputs) => {
    try {
      if (field in validationErrors) {
        const newErrors = { ...validationErrors }
        delete newErrors[field]
        setValidationErrors(newErrors)
      }
      InputSchema.pick({ [field]: true }).parse(values)
    } catch (error) {
      const { issues = [] } = error as ZodError
      setValidationErrors({ ...validationErrors, [field]: issues[0].message })
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)
            }
          />
        )
      })}
      {validationAndResponseErrors && (
        <ul className="text-sm font-extralight text-error-500">
          {Object.values(validationAndResponseErrors).map((error) => {
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
