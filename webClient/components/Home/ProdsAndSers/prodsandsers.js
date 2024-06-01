'use client'
import React, { useEffect, useState } from 'react'
import styles from './prodsandsers.module.css'
import dynamic from 'next/dynamic'
import axios from 'axios'
import Link from 'next/link'
const Card = dynamic(
    () => import('@/components/Home/ProdsAndSers/Card/card'),
    { suspense: true }
)

const subCategories = [
    { name: 'Clothing', imageUrl: 'https://static.vecteezy.com/system/resources/previews/025/265/731/original/new-clothes-top-outline-black-icon-illustration-isolated-on-square-white-background-simple-flat-cartoon-outlined-drawing-brand-new-clean-fresh-clothes-free-vector.jpg' },
    { name: 'Bags', imageUrl: 'https://t4.ftcdn.net/jpg/02/73/80/67/360_F_273806760_iAomZ7bkcoCNd9cF6PYkJgRFkevDXgl5.jpg' },
    { name: 'Watches', imageUrl: 'https://static.vecteezy.com/system/resources/previews/007/383/801/original/smart-watch-silhouette-black-and-white-icon-design-element-on-isolated-white-background-free-vector.jpg' },
    { name: 'Shoes', imageUrl: 'https://st2.depositphotos.com/3254189/5652/v/450/depositphotos_56521537-stock-illustration-running-shoe-icon-sneakers-vector.jpg' },
    { name: 'Accessories', imageUrl: 'https://cdn-icons-png.freepik.com/512/7695/7695937.png' },
    { name: 'Skin Care', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTAf7Q7EEyM71WQK7lnI0XwvpaIZi7I9uAF8J7sFBIkA&ss' }
];

function ProdsAndSers() {
    const [cardData, setCardData] = useState([]);
    const [activeButton, setActiveButton] = useState('all');

    useEffect(() => {
        handleButtonClick('all');
        handleSubCategoryClick('');
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://e-comm-backend-fi70.onrender.com/api/products/getllProducts');
            setCardData(response.data);
        } catch (error) {
            console.error(error, "err");
        }
    };

    const fetchCategoryData = async (category) => {
        try {
            const response = await axios.get(`https://e-comm-backend-fi70.onrender.com/api/products/getllProducts/${category}`);
            setCardData(response.data);
        } catch (error) {
            console.error(error, "err");
        }
    };

    const handleButtonClick = async (category) => {
        setActiveButton(category);
        // setActiveSubCategory('');
        if (category === 'all') {
            await fetchData();
        } else {
            await fetchCategoryData(category);
        }
    };

    const handleSubCategoryClick = async (subCategory) => {
        try {
            const response = await axios.get(`https://e-comm-backend-fi70.onrender.com/api/products/getllProducts/${subCategory}`);
            // setCardData(response.data);
        } catch (error) {
            console.error(error, "err");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.productsContainer} style={{marginBottom:"70px"}}>
                <div className={styles.text}>
                    <div className={styles.textHeading}>
                        <h1 style={{ fontWeight: "bold" }}>Hot Categories</h1>
                    </div>
                    <div className={styles.textContent}>
                        <p>Check out the most promising products</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", gap: "100px", marginBottom: "10px", flexWrap: "wrap" }}>
                        {subCategories.map((subCategory) => (
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Link
                                    key={subCategory.name}
                                    href={`/auth/products/categories/${subCategory.name}`}
                                    // onClick={() => handleSubCategoryClick(subCategory.name)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        marginTop: '10px',
                                        border: '1px solid gray',
                                        borderRadius: '50px',
                                        padding: '10px',
                                        width: "90px",
                                        color: 'black',
                                        backgroundColor: 'transparent'
                                    }}
                                    className={styles.selectClass}
                                >
                                    <img src={subCategory.imageUrl} alt={subCategory.name} style={{ width: '62px', height: '62px' }} />

                                </Link>
                                <span style={{ textAlign: "center", marginTop: "5px" }}>{subCategory.name}</span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <div className={styles.productsContainer}>
                <div className={styles.text}>
                    <div className={styles.textHeading}>
                        <h1 style={{ fontWeight: "bold" }}>New Arrivals</h1>
                    </div>
                    <div className={styles.textContent}>
                        <p>Check out the most promising products</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                        <button
                            onClick={() => handleButtonClick('all')}
                            style={{
                                width: "100px",
                                marginTop: "10px",
                                border: "1px solid gray",
                                borderRadius: "30px",
                                padding: "5px",
                                color: activeButton === 'all' ? 'black' : 'gray',
                                backgroundColor: activeButton === 'all' ? '#bfefff' : 'transparent'
                            }}
                            className={styles.selectClass}>
                            All
                        </button>
                        <button
                            onClick={() => handleButtonClick('women')}
                            style={{
                                width: "100px",
                                marginTop: "10px",
                                border: "1px solid gray",
                                borderRadius: "30px",
                                padding: "5px",
                                color: activeButton === 'women' ? 'black' : 'gray',
                                backgroundColor: activeButton === 'women' ? '#bfefff' : 'transparent'
                            }}
                            className={styles.selectClass}>
                            Women
                        </button>
                        <button
                            onClick={() => handleButtonClick('Mens')}
                            style={{
                                width: "100px",
                                marginTop: "10px",
                                border: "1px solid gray",
                                borderRadius: "30px",
                                padding: "5px",
                                color: activeButton === 'Mens' ? 'black' : 'gray',
                                backgroundColor: activeButton === 'Mens' ? '#bfefff' : 'transparent'
                            }}
                            className={styles.selectClass}>
                            Men
                        </button>
                        <button
                            onClick={() => handleButtonClick('kids')}
                            style={{
                                width: "100px",
                                marginTop: "10px",
                                border: "1px solid gray",
                                borderRadius: "30px",
                                padding: "5px",
                                color: activeButton === 'kids' ? 'black' : 'gray',
                                backgroundColor: activeButton === 'kids' ? '#bfefff' : 'transparent'
                            }}
                            className={styles.selectClass}>
                            Kids
                        </button>
                    </div>
                </div>
                <div className={styles.flex}>
                    {cardData.map((data, index) => (
                        index < 5 && (
                            <Card
                                key={data._id}
                                imageUrl={data.imageUrl}
                                heading={data.title}
                                content={data.supplier}
                                amount={data.price}
                                disPrice={data.discountPrice}
                                discount={data.discount}
                                _id={data._id}
                            />
                        )
                    ))}
                </div>
                <Link
                    href="/auth/products"
                    style={{
                        width: "200px",
                        marginTop: "50px",
                        border: "1px solid gray",
                        borderRadius: "30px",
                        padding: "5px",
                        color: 'gray',
                        textAlign:"center",
                        textDecoration:'none',
                        backgroundColor: '#bfefff'
                    }}
                    // className={styles.selectClass}
                    >
                    View All Products
                </Link>
            </div>
        </div>
    )
}

export default ProdsAndSers
