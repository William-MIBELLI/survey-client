import React, { type FC } from 'react'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  start?: Date
  end?: Date
}

const DateSlot: FC<IProps> = ({ start, end, className, ...props }) => {

  const mStart = !start ? "-" : new Date(start).toLocaleDateString()
  const mEnd = !end ? "-" : new Date(end).toLocaleDateString()
  
  if (!start && !end) {
    return (
      <div className='font-semibold'>No date slot</div>
    )
  }

  return (
    <div className={`flex gap-2 text-sm ${className ?? ""}`} {...props}>
      <p className='font-semibold'>From</p>
      <p>
        {mStart}
      </p>
      <p className='font-semibold'>to</p>
      <p>
        {mEnd}
      </p>
    </div>
  )
}

export default DateSlot