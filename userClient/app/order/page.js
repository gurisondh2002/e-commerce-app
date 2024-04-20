import React from 'react'
import dynamic from 'next/dynamic'
const Orders = dynamic(
    ()=>import('@/components/Orders/orders'),
    {suspense:true}
)

function Page() {
  return (
    <Orders/>
  )
}

export default Page
