import React from 'react'
import styles from './card.module.css'
import Image from 'next/image';
import {PiPlusSquareLight} from 'react-icons/pi'
import {PiMinusSquareLight} from 'react-icons/pi'
import { useRouter } from 'next/navigation'
import {RxCross1} from 'react-icons/rx'

async function updateCart(method,prodId){
    const res = await fetch('http://localhost:3001/user/cart/update', {
        cache: 'no-cache',
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // Ensure that the content type is set to JSON
            'email': localStorage.getItem('email')
        },
        body: JSON.stringify({method: method, pid:prodId})
    })
    const resRef = await res.json()
    return resRef
}
async function deleteProductFromCart(prodId){
    const res = await fetch('http://localhost:3001/user/cart/delete', {
        cache: 'no-cache',
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // Ensure that the content type is set to JSON
            'email': email
        },
        body: JSON.stringify({pid: prodId})
    })
    const resRef = await res.json()
    return resRef
}

function Card(props) {
    const router = useRouter();
    const increaseQuantity = async()=>{
        await updateCart("Increase",props.id).then(()=>{
            window.location.reload(true);
        })
    }
    const decreaseQuantity = async() => {
        await updateCart("Decrease",props.id).then(()=>{
            window.location.reload(true);
        })
    }
    const deleteFromCart = async() => {
        await deleteProductFromCart(props.id).then(()=>{
            window.location.reload(true);
        })
    }
    return (
        <>
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
                <p>Amount is: {props.amount}</p>
                </div>
                <div className={`${styles.cardQuantity}`}>
                    <p>Quantity is: {props.qty}</p>
                </div>
            </div>
            <div className={`${styles.cardIcons}`}>
                <PiPlusSquareLight style={{height:"25px", width:"25px", margin:"10px"}} onClick={increaseQuantity}/>
                <PiMinusSquareLight style={{height:"25px", width:"25px", margin:"10px"}} onClick={decreaseQuantity}/>
                <RxCross1 style={{height:"25px", width:"25px", margin:"10px"}} onClick={deleteFromCart}/>
            </div>
        </div>
    </>
    )
}

export default Card;