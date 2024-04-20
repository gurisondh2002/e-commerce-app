import React from 'react'
import styles from './prodsandsers.module.css'
import dynamic from 'next/dynamic'
const Card = dynamic(
    () => import('@/components/Home/ProdsAndSers/Card/card'),
    { suspense: true }
)

async function getData() {
    const res = await fetch('http://localhost:3001/productsServices/products', {cache:'no-cache'})

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    const resNew = await res.json()
    return resNew;
  }
  async function getDataSer() {
    const res = await fetch('http://localhost:3001/productsServices/services', {cache:'no-cache'})

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    const resNew = await res.json()
    return resNew;
  }

async function ProdsAndSers() { 

     const cardData = await getData();

     const cardDataSer = await getDataSer();
    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.productsContainer}`}>
                <div className={`${styles.text}`}>
                    <div className={`${styles.textHeading}`}>
                        <h1>Products of the week</h1>
                    </div>
                    <div className={`${styles.textContent}`}>
                        <p>Our latest products this week</p>
                    </div>
                </div>
                <div className={`${styles.flex}`}>
                    {cardData.map((data, index) => {
                        return index < 4 ? (
                            <Card
                                key={index}
                                imageUrl={data.imageUrl}
                                heading={data.name}
                                content={data.description}
                                amount={data.amount}
                            />
                        ) : (<></>)
                    })}
                </div>
            </div>

            <div className={`${styles.servicesContainer}`}>
                <div className={`${styles.text}`}>
                    <div className={`${styles.textHeading}`}>
                        <h1>Services of the week</h1>
                    </div>
                    <div className={`${styles.textContent}`}>
                        <p>Our latest services this week</p>
                    </div>
                </div>
                <div className={`${styles.flex}`}>
                {cardDataSer.map((data, index) => {
                        return index < 4 ? (
                            <Card
                                key={index}
                                imageUrl={data.imageUrl}
                                heading={data.name}
                                content={data.description}
                                amount={data.amount}
                            />
                        ) : (<></>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProdsAndSers