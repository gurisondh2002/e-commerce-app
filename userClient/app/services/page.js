import React from 'react'
import dynamic from 'next/dynamic'
const Services = dynamic(
    ()=>import('@/components/Services/services'),
    {suspense:true}
)

function Page() {
  return (
    <Services/>
  )
}

export default Page;