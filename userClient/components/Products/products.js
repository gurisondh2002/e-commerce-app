import React from 'react'
import styles from './products.module.css'
import dynamic from 'next/dynamic'
const Card = dynamic(
    ()=>import('@/components/Products/Card/card'),
    {suspense:true}
)

async function getData() {
        const res = await fetch('http://localhost:3001/productsServices/products', {cache:'no-cache'})
    
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
        const resNew = await res.json()
        return resNew;
      }

async function Products() {

    const cardData = await getData();

    
    return (
        <>
        <br/>
        <br/>
        <div className={`${styles.container}`}>
            <div className={`${styles.productsContainer}`}>
                <div className={`${styles.text}`}>
                    <div className={`${styles.textHeading}`}>
                        <h1>All Products Available...</h1>
                    </div>
                    <div className={`${styles.textContent}`}>
                        <p>Our latest products</p>
                    </div>
                </div>
                <div className={`${styles.flex}`}>
                    {cardData.map((data, index) => (
                        <Card
                            key={index}
                            imageUrl={data.imageUrl}
                            heading={data.name}
                            content={data.description}
                            amount = {data.amount}
                        />
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default Products;