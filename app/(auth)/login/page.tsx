'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormFields = {
  email: string
  password: string
}

export default function Login() {
  const [error, setError] = useState('')

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormFields>()

  const submitForm: SubmitHandler<FormFields> = async (data) => {
    setError('')

    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      setError(error.message)
    }
    if (!error) {
      router.push('/')
    }
  }

  return (
    <>
      <h1 className='text-center text-primary my-4'>Login</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <label htmlFor='Email'>
          <span>Email:</span>
          <input
            type='email'
            {...register('email', {
              required: 'Please enter a valid email',
            })}
          />
        </label>
        <label htmlFor='Password'>
          <span>Password:</span>
          <input
            type='password'
            {...register('password', {
              required: 'Please enter your password',
            })}
          />
        </label>
        <button
          className='btn-primary disabled:cursor-not-allowed disabled:bg-indigo-300'
          disabled={isSubmitting}
          type='submit'
        >
          Submit
        </button>
      </form>
      {error && <div className='error'>{error}</div>}
    </>
  )
}
