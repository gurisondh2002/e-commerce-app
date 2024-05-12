'use client'
import Image from 'next/image'
import { Herr_Von_Muellerhoff } from 'next/font/google'
import dynamic from 'next/dynamic'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      <PageBanner />
      <Services />
      <ProdsAndSers/>
    </div>
  )
}

const PageBanner = dynamic(
    ()=>import('@/components/Home/PageBanner/pagebanner'),
    {
      suspense:true,
      ssr: false,
    }
)
const Services = dynamic(
  ()=>import('@/components/Home/Services/services'),
  {
    suspense:true,
    ssr: false,
  }
)
const ProdsAndSers = dynamic(
  ()=>import('@/components/Home/ProdsAndSers/prodsandsers'),
  {
    suspense:true,
    ssr: false,
  }
)
const Login = dynamic(
  ()=>import('@/components/Login/login'),
  {
    suspense:true,
    ssr: false,
  }
)