import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { Checkbox } from '../ui/checkbox';

interface CheckboxProps{
    id:string,
    register: UseFormRegister<FieldValues>
    label: string;
}

const CheckboxComponent = ({id,label,register}:CheckboxProps) => {
  return (
    <div className='flex items-center gap-2'>
        <Checkbox className='border-white' {...register(id)}/>
        <label className='text-white text-sm' htmlFor={id}>
            {label}
        </label>
    </div>
  )
}

export default CheckboxComponent