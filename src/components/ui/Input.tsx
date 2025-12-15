import React, { type FC } from 'react'

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Input: FC<IProps> = (props) => {
  return (
    <div className='flex flex-col'>
      <label className='text-xs' htmlFor={props.name}>{props.label}</label>
      <input className='border-4 border-black bg-blue-100 shadowInput px-2 py-1 outline-none'  {...props} />
    </div>
  )
}

export default Input