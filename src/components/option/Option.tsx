import React, { type FC } from 'react'
import { BookmarkCheck, Trash2 } from 'lucide-react'
import IconButton from '../ui/IconButton'
import { useOptionContext, type TCreateOption } from '../../contexts/option.context'

interface IProps {
  data : TCreateOption
}

const Option: FC<IProps> = ({ data }) => {
  const { label, withArgs, position } = data
  const { onDeleteOption } = useOptionContext()
  return (
    <div className='bg-blue-300  border-black border-2 flex justify-between items-center px-4 py-1.5'>
      <div className='flex gap-2'>
        <p className='font-semibold'>{label}</p>
        {
          withArgs && (
            <div className='flex items-center'>
              <BookmarkCheck size={15} />
              <p className='text-sm'>with text</p>
            </div>
          )
        }
      </div>
      <IconButton text='' onClick={() => onDeleteOption(position)}>
        <Trash2 size={13}/>
      </IconButton>
    </div>
  )
}

export default Option