import React from 'react'
import Form from './Form'
import Input from '../ui/Input'
import Button from '../ui/Button'

const SignupForm = () => {
  return (
    <Form>
      <Input label='Email'/>
      <Input label='Firstname'/>
      <Input label='Lastname'/>
      <Input label='Password'/>
      <Input label='Confirm password' />
      <Button text='Signup'/>
    </Form>
  )
}

export default SignupForm



//PART 1 => EMAIL

//PART 2 => NOM PRENOM

//PART 3 => PASSWORD

//PART 4 => PHOTO