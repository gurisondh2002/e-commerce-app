import React from 'react'
import dynamic from 'next/dynamic'
const Categories = dynamic(
    ()=>import('@/components/Products/categories'),
    {suspense:true}
)

function Page() {
  return (
    <Categories/>
  )
}

export default Page