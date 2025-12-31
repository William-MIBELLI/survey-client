import React, { type FC } from 'react'
import { Check as CheckIcon } from 'lucide-react'

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Check: FC<IProps> = ({ label, name, className, ...props }) => {
  return (
    <div className={`flex my-4 gap-2 items-center  ${className ?? ""}`}>
      <div className='relative flex items-center justify-center w-5 h-5'>
        <input
          className='peer appearance-none w-5 h-5 border-2 border-black rounded-none bg-white checked:bg-black cursor-pointer transition-colors shrink-0'
          name={name}
          id={name}
          type='checkbox'
          {...props}
        />
        <CheckIcon size={16} className='absolute text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity' />
      </div>
      <label className='font-semibold text-sm italic cursor-pointer select-none' htmlFor={name}>{label}</label>
    </div>
  )
}

export default Check
