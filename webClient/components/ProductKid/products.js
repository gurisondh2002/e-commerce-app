
'use client'
import React, { useEffect, useState } from 'react'
import styles from './products.module.css'
import dynamic from 'next/dynamic'
import axios from 'axios'
const Card = dynamic(
    ()=>import('@/components/Products/Card/card'),
    {suspense:true}
)


async function Products() {

    const [cardData, setCarddata] = useState([]);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const response = await axios.get('https://e-comm-backend-fi70.onrender.com/api/products/getllProducts/kids');
          setCarddata(response.data);
        } catch (error) {
          console.error(error, "err");
        }
      };

    
    return (
        <>
        <br/>
        <br/>
        <div className={`${styles.container}`}>
            <div className={`${styles.productsContainer}`}>
                <div className={`${styles.text}`}>
                    <div className={`${styles.textHeading}`}>
                        <h2>All Products Available...</h2>
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
                       heading={data.title}
                       content={data.supplier}
                       amount={data.price}
                       disPrice={data.discountPrice}
                       discount={data.discount}
                       _id={data._id}
                   />
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default Products;