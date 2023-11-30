'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

type FormFields = {
  email: string
  password: string
  confirmPassword?: string // TODO: Add this field to form and validate
}

export default function Signup() {
  // state
  const [error, setError] = useState('')

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>()

  const submitForm: SubmitHandler<FormFields> = async (data) => {
    const supabase = createClientComponentClient()

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    })

    if (error) setError(error.message)
    if (!error) {
      router.push('/verify')
    }
  }

  return (
    <main>
      <h1 className='text-center text-primary my-4'>Sign up</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <label htmlFor='Email'>
          <span>Email:</span>
          <input type='email' {...register('email')} />
        </label>
        <label htmlFor='Password'>
          <span>Password:</span>
          <input type='password' {...register('password')} />
        </label>
        <button
          className='btn-primary disabled:bg-indigo-300'
          disabled={isSubmitting}
          type='submit'
        >
          Submit
        </button>
      </form>
      {error && <div className='error'>{error}</div>}
    </main>
  )
}
