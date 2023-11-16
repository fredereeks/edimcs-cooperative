"use client"
import React, { useState } from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import { LoginFormDataProps } from '@/types'

export default function AccountForm({ handleSignup }: { handleSignup: (formData: FormData) => Promise<LoginFormDataProps | null> }) {
    const [showSignUp, setShowSignUp] = useState<boolean>(false)
    

  return (
    <>
    {showSignUp ? <SignupForm setShowSignUp={setShowSignUp} handleSignup={handleSignup} key={'345788345'} /> : <LoginForm setShowSignUp={setShowSignUp} key={'93450735'} />}
    </>
  )
}
