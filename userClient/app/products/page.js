import React from 'react'
import dynamic from 'next/dynamic'
const Products = dynamic(
    ()=>import('@/components/Products/products'),
    {suspense:true}
)

function Page() {
  return (
    <Products/>
  )
}

export default Page