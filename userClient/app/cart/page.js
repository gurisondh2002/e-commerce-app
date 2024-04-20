import React from 'react'
import dynamic from 'next/dynamic'
const Cart = dynamic(
    ()=>import('@/components/Cart/cart'),
    {suspense:true}
)

function Page() {
  return (
    <Cart/>
  )
}

export default Page