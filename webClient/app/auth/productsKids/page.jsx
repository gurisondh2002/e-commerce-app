import React from 'react'
import dynamic from 'next/dynamic'
const ProductsKids = dynamic(
    ()=>import('@/components/ProductKid/products'),
    {suspense:true}
)

function Page() {
  return (
    <ProductsKids/>
  )
}

export default Page