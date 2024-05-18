import React from 'react'
import dynamic from 'next/dynamic'
const ProductsWomen = dynamic(
    ()=>import('@/components/ProductWomen/products'),
    {suspense:true}
)

function Page() {
  return (
    <ProductsWomen/>
  )
}

export default Page