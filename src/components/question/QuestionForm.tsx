import React, { type FC } from 'react'

interface IProps {
  defaultValues?: any
  onSubmit: () => void
}

const QuestionForm: FC<IProps> = ({ defaultValues, onSubmit}) => {
  return (
    <div>QuestionForm</div>
  )
}

export default QuestionForm