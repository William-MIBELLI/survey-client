import React from 'react'
import { useParams } from 'react-router'

const Survey = () => {

  const { surveyId } = useParams()

  return (
    <div>{surveyId}</div>
  )
}

export default Survey