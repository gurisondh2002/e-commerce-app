import React from 'react'
import dynamic from 'next/dynamic'
const Login = dynamic(
    ()=>import('@/components/Login/login'),
    {suspense:true}
)

function Page() {
  return (
    <Login/>
  )
}

export default Page
