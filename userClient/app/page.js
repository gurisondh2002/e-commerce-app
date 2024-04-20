import Image from 'next/image'
import styles from './page.module.css'
import { Herr_Von_Muellerhoff } from 'next/font/google'
import dynamic from 'next/dynamic'
const Login = dynamic(
    ()=>import('@/components/Login/login'),
    {suspense:true}
)

export default function Home() {
  return (
    <div>
      <Login/>
      {/* <PageBanner /> */}
      {/* <Services />
      <ProdsAndSers/> */}
    </div>
  )
}
