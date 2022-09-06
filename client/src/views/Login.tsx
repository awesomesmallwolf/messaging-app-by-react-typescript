import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import logo from '../assets/doge.png'
import { validateEmail, validateProfilePhoto, validateTextField, validateUserType } from '../utilities/validation'
import { TextField } from '../components/TextField'
import { login } from '../store/auth.slice'

export interface FormFields {
  email: string
  firstName: string
  lastName: string
  profilePhoto: string
  type: string
}

export interface FormErrors {
  email?: string
  firstName?: string
  lastName?: string
  profilePhoto?: string
  type?: string
}

export const Login: React.FC = () => {
  const [user, setUser] = useState<FormFields>({ email: '', firstName: '', lastName: '', profilePhoto: '', type: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const dispatch = useDispatch()

  const validate = (name: string, value: string) => {
    switch (name) {
      case 'type':
        setErrors({ ...errors, [name]: validateUserType(value, 'User Type') })
        break
      case 'email':
        setErrors({ ...errors, [name]: validateEmail(value, 'Email Address') })
        break
      case 'firstName':
        setErrors({ ...errors, [name]: validateTextField(value, 'First Name') })
        break
      case 'lastName':
        setErrors({ ...errors, [name]: validateTextField(value, 'Last Name') })
        break
      case 'profilePhoto':
        setErrors({ ...errors, [name]: validateProfilePhoto(value) })
        break
    }
  }

  const isLoginButtonDisabled = () => {
    if (!user.email || !user.firstName || !user.lastName) {
      return true
    }
    if (!!errors.email || !!errors.firstName || !!errors.lastName) {
      return true
    }

    return false
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setUser({
      ...user,
      [name]: value,
    })

    if (errors[name as keyof FormErrors]) {
      validate(name, value)
    }
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    validate(name, value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    dispatch(login(user))
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="container bg-white m-4 p-12 w-500 text-center rounded-md shadow-lg max-w-full mx-auto">
        <img src={logo} className="block mx-auto mb-3 text-center w-24" alt="Doge" />

        <h1 className="text-3xl mb-8 font-bold text-gray-700">School Chat</h1>

        <form onSubmit={handleSubmit}>
          <TextField
            label="User Type"
            name="type"
            value={user.type}
            placeholder="Teacher | Student | Parent"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.type}
          />
          <TextField
            label="Email Address"
            name="email"
            value={user.email}
            placeholder="doge@example.com"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
          />
          <TextField
            label="First Name"
            name="firstName"
            value={user.firstName}
            placeholder="John"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.firstName}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={user.lastName}
            placeholder="Doe"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.lastName}
          />
          <div className="mb-3">
            <button
              className="w-full px-3 py-4 text-white bg-blue font-medium rounded-md shadow-md hover:bg-blue-dark disabled:opacity-50 focus:outline-none"
              disabled={isLoginButtonDisabled()}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
