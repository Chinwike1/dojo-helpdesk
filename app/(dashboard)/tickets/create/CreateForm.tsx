import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { addTicket } from '../actions'
import SubmitButton from '@/app/components/SubmitButton'

type FormValues = {
  title: string
  body: string
  priority: string
}

export default function CreateForm() {
  // const { register, handleSubmit } = useForm<FormValues>({
  //   defaultValues: {
  //     title: '',
  //     body: '',
  //     priority: 'low',
  //   },
  // })

  // const submitForm: SubmitHandler<FormValues> = async (data) => {
  //   setIsLoading(true)

  //   const newTicket = {
  //     title: data.title,
  //     body: data.body,
  //     priority: data.priority,
  //   }

  //   const res = await fetch('http://localhost:3000/api/tickets', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(newTicket),
  //   })

  //   const sbTicket = await res.json()

  //   if (sbTicket.error) {
  //     console.log(sbTicket.error)
  //   }

  //   if (sbTicket.data) {
  //     router.refresh()
  //     router.push('/tickets')
  //   }

  //   setIsLoading(false)
  // }

  return (
    <form className='w-1/2' action={addTicket}>
      <label htmlFor='Title'>
        <span>Title:</span>
        <input type='text' name='title' />
      </label>
      <label htmlFor='Body'>
        <span>Body:</span>
        <textarea name='body'></textarea>
      </label>
      <label htmlFor='Priority'>
        <span>Priority:</span>
        <select name='priority'>
          <option value='low'>Low Priority</option>
          <option value='medium'>Medium Priority</option>
          <option value='high'>High Priority</option>
        </select>
      </label>
      <SubmitButton />
    </form>
  )
}
