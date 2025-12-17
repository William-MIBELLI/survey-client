import React from 'react'
import SignupForm from '../components/forms/SignupForm'

const Signup = () => {
  return (
    <div className='flex flex-col w-full h-full bg-green-300 items-center justify-center'>
      <div className="flex flex-col gap-7">
        <h1 className='titleFont text-9xl my-3'>Signup</h1>
        <p className='font-semibold ml-30'>Signup in a minute,for free, and start to build the survey you dream of 🤩</p>
      </div>
      <SignupForm/>
      <img className="w-1/6 absolute bottom-60 right-50 z-10" src="src/assets/login.png"></img>

    </div>
  )
}

export default Signup