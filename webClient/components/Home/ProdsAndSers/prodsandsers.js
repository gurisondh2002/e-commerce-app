
'use client'
import React, { useEffect, useState } from 'react'
import styles from './prodsandsers.module.css'
import dynamic from 'next/dynamic'
import axios from 'axios'
const Card = dynamic(
    () => import('@/components/Home/ProdsAndSers/Card/card'),
    { suspense: true }
)

async function ProdsAndSers() { 

    const [cardData, setCarddata] = useState([]);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3020/api/products/getllProducts');
          setCarddata(response.data);
        } catch (error) {
          console.error(error, "err");
        }
      };

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
                        return index < 5 ? (
                            <Card
                                key={index}
                                imageUrl={data.imageUrl}
                                heading={data.title}
                                content={data.supplier}
                                amount={data.price}
                                _id={data._id}
                            />
                        ) : (<></>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProdsAndSers