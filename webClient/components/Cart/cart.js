'use client'
import React, { useState, useEffect } from 'react';
import styles from './cart.module.css';
import dynamic from 'next/dynamic';
import axios from 'axios';

const Card = dynamic(() => import('@/components/Cart/Card/card'), { suspense: true });

function Cart() {
    const [cardData, setCartData] = useState([]);
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

    useEffect(() => {
        if (userId) {
            fetchCart();
        }
    }, [userId]);

    const fetchCart = async () => {
        try {
            const res = await axios.get(`http://localhost:3020/api/carts/find/${userId}`);
            if (res.status === 200) {
                console.log("Cart data fetched:", res.data.cart.products);
                setCartData(res.data.cart.products);
            } else {
                console.error(`Request failed with status ${res.status}`);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    return (
        <>
            <br />
            <br />
            <br />
            <div className={`${styles.container}`}>
                <div className={`${styles.cartContainer}`}>
                    {cardData.length === 0 ? (
                        <>
                            Cart is Empty
                        </>
                    ) : (
                        <>
                            <div className={`${styles.text}`}>
                                <div className={`${styles.textHeading}`}>
                                    <h1>Your Cart:</h1>
                                </div>
                            </div>
                            <div className={`${styles.flex}`}>
                                {cardData.map((data, index) => (
                                    <Card
                                        key={index}
                                        imageUrl={data.productInCart.imageUrl}
                                        heading={data.productInCart.title}
                                        content={data.productInCart.supplier}
                                        amount={data.productInCart.price}
                                        _id={data.productInCart._id}
                                        cartId={data._id}
                                        quantity={data.quantity}
                                    />
                                ))}
                            </div>
                            <div className={`${styles.orderNow}`}>
                                <button>Order Now</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Cart;
