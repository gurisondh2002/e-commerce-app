import React from 'react'
import styles from './card.module.css'
import Image from 'next/image';
import axios from 'axios';
import { FaCirclePlus } from "react-icons/fa6";

function Card(props) {

    const handleAddItemToCart = async (prodId) => {
        try {
            const storedId = localStorage.getItem('userId');

            const res = await axios.post(`https://e-comm-backend-fi70.onrender.com/api/carts/addToCart/${storedId}`, {
                productInCart: prodId
            });
            console.log('Item added to cart successfully');

        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };


    return (
        <div className={`${styles.mainContainer}`}>
            <div className={`${styles.cardImage}`}>
                <Image
                    className={`${styles.img}`}
                    src={props.imageUrl}
                    height={423}
                    width={452}
                    alt="Product Image" />
            </div>
            <div className={`${styles.text}`}>
                <div className={`${styles.cardHeading}`}>
                    <strong>{props.heading}</strong>
                </div>
                <div className={`${styles.cardContent}`}>
                    {props.content}
                </div>
                <div className={`${styles.cardAmount}`}>
                    <p style={{fontWeight:"bold"}}> $ {props.amount}</p>
                    <FaCirclePlus size={24} onClick={() => handleAddItemToCart(props._id)} style={{cursor:"pointer"}}/>
                </div>
            </div>
        </div>
    )
}

export default Card;