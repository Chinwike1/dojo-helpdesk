'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormValues = {
  title: string
  body: string
  priority: string
}

export default function CreateForm() {
  const router = useRouter()

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: '',
      body: '',
      priority: 'low',
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  const submitForm: SubmitHandler<FormValues> = async (data, e) => {
    setIsLoading(true)

    const newTicket = {
      title: data.title,
      body: data.body,
      priority: data.priority,
      user_email: 'hello@chinwike.space',
    }

    const res = await fetch('http://localhost:4000/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTicket),
    })

    if (res.status === 201) {
      router.refresh()
      router.push('/tickets')
    }
  }

  return (
    <form className='w-1/2' onSubmit={handleSubmit(submitForm)}>
      <label htmlFor='Title'>
        <span>Title:</span>
        <input type='text' required {...register('title')} />
      </label>
      <label htmlFor='Body'>
        <span>Body:</span>
        <textarea required {...register('body')}></textarea>
      </label>
      <label htmlFor='Priority'>
        <span>Priority:</span>
        <select {...register('priority')}>
          <option value='low'>Low Priority</option>
          <option value='medium'>Medium Priority</option>
          <option value='high'>High Priority</option>
        </select>
      </label>
      <button
        onClick={() => setIsLoading(!isLoading)}
        type='submit'
        className='btn-primary'
        disabled={isLoading}
      >
        {!isLoading ? <span>Add Ticket</span> : <span>Adding...</span>}
      </button>
    </form>
  )
}
