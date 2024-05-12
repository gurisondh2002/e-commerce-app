import React from 'react'
import styles from './card.module.css'
import Image from 'next/image';

function Card(props) {
    return (
        <div className={`${styles.mainContainer}`}>
            <div className={`${styles.cardImage}`}>
                <Image  
                className={`${styles.img}`}
                src={props.imageUrl}  
                height={323} 
                width={352}
                alt="Product Image"/>
            </div>
            <div className={`${styles.text}`}>
                <div className={`${styles.cardHeading}`}>
                    {props.heading}
                </div>
                <div className={`${styles.cardContent}`}>
                    {props.content}
                </div>
                <div className={`${styles.cardAmount}`}>
                    <p>Price : $ {props.amount}</p>
                </div>
            </div>
                <button>Add To Cart</button>
        </div>
    )
}

export default Card;