'use client'
import React, { useEffect } from 'react'
import styles from './card.module.css'
import Image from 'next/image';
import { PiPlusSquareLight } from 'react-icons/pi'
import { PiMinusSquareLight } from 'react-icons/pi'
import { useRouter } from 'next/navigation'
import { RxCross1 } from 'react-icons/rx'
import axios from 'axios'

function Card(props) {

    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

    useEffect(() => {
        if (userId) {
            fetchCart();
        }
    }, [userId]);

    const fetchCart = async () => {
        try {
            const res = await axios.get(`https://e-comm-backend-fi70.onrender.com/api/carts/find/${userId}`);
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

    const handleIncrement = async (productId, price) => {
        try {
            const response = await axios.post(`https://e-comm-backend-fi70.onrender.com/api/carts/incCartItemQuantity/${userId}`, { productInCart: productId });
            console.log(response.data);
            fetchCart(userId);
            console.log("Increment successfully");
        } catch (error) {
            console.error('Error incrementing quantity:', error);
        }
    }

    const handleDecrement = async (productId, price) => {
        try {
            const response = await axios.post(`https://e-comm-backend-fi70.onrender.com/api/carts/decCartItemQuantity/${userId}`, { productInCart: productId });
            console.log(response.data);
            fetchCart(userId);
            console.log("Decrement successfully");
        } catch (error) {
            console.error('Error decrementing quantity:', error);
        }
    };

    const handleDelete = async (cartId) => {
        try {
          const response = await axios.delete(`https://e-comm-backend-fi70.onrender.com/api/carts/deleteCartItem/${cartId}`);
          console.log(response.data);
          fetchCart(userId);
          console.log("Deleted successfully");
        } catch (error) {
          console.error('Error deleting quantity:', error);
        }
      };


    return (
        <>
            <div className={`${styles.mainContainer}`}>
                <div className={`${styles.cardImage}`}>
                    <Image
                        className={`${styles.img}`}
                        src={props.imageUrl}
                        height={323}
                        width={352}
                        alt="Product Image" />
                </div>
                <div className={`${styles.text}`}>
                    <div className={`${styles.cardHeading}`}>
                        {props.heading}
                    </div>
                    <div className={`${styles.cardContent}`}>
                        {props.content}
                    </div>
                    <div className={`${styles.cardAmount}`}>
                        <p>Amount is: {props.amount}</p>
                    </div>
                    <div className={`${styles.cardQuantity}`}>
                        <p>Quantity is: {props.quantity}</p>
                    </div>
                </div>
                <div className={`${styles.cardIcons}`}>
                    <PiPlusSquareLight style={{ height: "25px", width: "25px", margin: "10px" }} onClick={() => handleIncrement(props._id)} />
                    <PiMinusSquareLight style={{ height: "25px", width: "25px", margin: "10px" }} onClick={() => handleDecrement(props._id)} />
                    <RxCross1 style={{ height: "25px", width: "25px", margin: "10px" }} onClick={() => handleDelete(props.cartId)} />
                </div>
            </div>
        </>
    )
}

export default Card;