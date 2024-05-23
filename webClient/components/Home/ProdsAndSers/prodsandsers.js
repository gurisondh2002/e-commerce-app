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
    const [activeButton, setActiveButton] = useState('all');

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

    const fetchWomen = async () => {
        try {
            const response = await axios.get('http://localhost:3020/api/products/getllProducts/women');
            setCarddata(response.data);
        } catch (error) {
            console.error(error, "err");
        }
    };

    const fetchMen = async () => {
        try {
            const response = await axios.get('http://localhost:3020/api/products/getllProducts/men');
            setCarddata(response.data);
        } catch (error) {
            console.error(error, "err");
        }
    };

    const fetchKids = async () => {
        try {
            const response = await axios.get('http://localhost:3020/api/products/getllProducts/kids');
            setCarddata(response.data);
        } catch (error) {
            console.error(error, "err");
        }
    };

    const handleButtonClick = async (category) => {
        setActiveButton(category);
        switch (category) {
            case 'all':
                await fetchData();
                break;
            case 'women':
                await fetchWomen();
                break;
            case 'men':
                await fetchMen();
                break;
            case 'kids':
                await fetchKids();
                break;
            default:
                break;
        }
    };

    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.productsContainer}`}>
                <div className={`${styles.text}`}>
                    <div className={`${styles.textHeading}`}>
                        <h1 style={{ fontWeight: "bold" }}>New Arrivals</h1>
                    </div>
                    <div className={`${styles.textContent}`}>
                        <p>Check out most promising products</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                        <button onClick={() => handleButtonClick('all')} style={{ width: "100px", marginTop: "10px", border: "1px solid gray", borderRadius: "30px", padding: "5px", color: activeButton === 'all' ? 'white' : 'gray', backgroundColor: activeButton === 'all' ? '#6CDDFF' : 'transparent' }} className={`${styles.selectClass}`}>All</button>
                        <button onClick={() => handleButtonClick('women')} style={{ width: "100px", marginTop: "10px", border: "1px solid gray", borderRadius: "30px", padding: "5px", color: activeButton === 'women' ? 'white' : 'gray', backgroundColor: activeButton === 'women' ? '#6CDDFF' : 'transparent' }} className={`${styles.selectClass}`}>Women</button>
                        <button onClick={() => handleButtonClick('men')} style={{ width: "100px", marginTop: "10px", border: "1px solid gray", borderRadius: "30px", padding: "5px", color: activeButton === 'men' ? 'white' : 'gray', backgroundColor: activeButton === 'men' ? '#6CDDFF' : 'transparent' }} className={`${styles.selectClass}`}>Mens</button>
                        <button onClick={() => handleButtonClick('kids')} style={{ width: "100px", marginTop: "10px", border: "1px solid gray", borderRadius: "30px", padding: "5px", color: activeButton === 'kids' ? 'white' : 'gray', backgroundColor: activeButton === 'kids' ? '#6CDDFF' : 'transparent' }} className={`${styles.selectClass}`}>Kids</button>
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
                                disPrice={data.discountPrice}
                                discount={data.discount}
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
