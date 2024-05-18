import React from 'react'
import dynamic from 'next/dynamic'
const ProductsMen = dynamic(
    ()=>import('@/components/ProductMen/products'),
    {suspense:true}
)

function Page() {
  return (
    <ProductsMen/>
  )
}

export default Page