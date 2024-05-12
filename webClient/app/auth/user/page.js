import React from 'react'
import dynamic from 'next/dynamic'
const UserProfile = dynamic(
    ()=>import('@/components/UserProfile/userprofile'),
    {suspense:true}
)

function Page() {
  return (
    <UserProfile/>
  )
}

export default Page;