'use client'
import React, {useState, useEffect} from 'react'
import styles from './cart.module.css'
import dynamic from 'next/dynamic'
const Card = dynamic(
    ()=>import('@/components/Cart/Card/card'),
    {suspense:true}
)

async function fetchCartDb(email) {
    const res = await fetch('http://localhost:3001/user/cart', {
        cache: 'no-cache',
        method: "GET",
        headers: {
            'Content-Type': 'application/json', // Ensure that the content type is set to JSON
            'email': email
        },
    })
    const resRef = await res.json()
    return resRef
}

async function handleDbOrder(){
    const res = await fetch('http://localhost:3001/user/order/create', {
        cache: 'no-cache',
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // Ensure that the content type is set to JSON
            'email': localStorage.getItem('email')
        },
    })
    const resRef = await res.json()
    return resRef
}

function Cart() {
    const handleOrderNow = async() => {
        await handleDbOrder().then(()=>{
            router.push('/order')
        })
    }

    // const [cardData , setCardData ] = useState([{
    //     id:"",
    //     name:"",
    //     description:"",
    //     amount:"",
    //     cartItems:{
    //         quantity:""
    //     }
    // }])
    const callFetch = async () => {
        console.log(localStorage.getItem('email'))
        const res = await fetchCartDb(localStorage.getItem('email'))
        return res
    }


    const cardData = [
        {
            name:"Demo",
            amount:500,
            imageURL: "https://images.pexels.com/photos/669580/pexels-photo-669580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            description: "This is a demo product",
        },
        {
            name:"Demo",
            amount:500,
            imageURL: "https://images.pexels.com/photos/669580/pexels-photo-669580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            description: "This is a demo product",
        },
        {
            name:"Demo",
            amount:500,
            imageURL: "https://images.pexels.com/photos/669580/pexels-photo-669580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            description: "This is a demo product",
        },
        {
            name:"Demo",
            amount:500,
            imageURL: "https://images.pexels.com/photos/669580/pexels-photo-669580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            description: "This is a demo product",
        }
    ]

    const [isEmpty, setIsEmpty] = useState(false);
    useEffect(() => {
        callFetch().then((res) => {
            console.log(res)
            if (res.message == "Cart is empty!!") {
                setIsEmpty(true)
            }
            else{
                setIsEmpty(false)
                setCardData(res)
            }
        }
        )
    },[])

    console.log(isEmpty)
    
  return (
    <>
    <br/>
    <br/>
    <br/>
    <div className={`${styles.container}`}>
            <div className={`${styles.cartContainer}`}>
            {isEmpty == true ? (<>
                Cart is Empty
            </>) : (<>
                <div className={`${styles.text}`}>
                    <div className={`${styles.textHeading}`}>
                        <h1>Your Cart:</h1>
                    </div>
                </div>
                <div className={`${styles.flex}`}>
                    {cardData.map((data, index)=>(
                        <Card 
                        key = {index}
                        imageUrl = {data.imageURL}
                        heading = {data.name}
                        content = {data.description}
                        amount = {data.amount}
                        // qty = {data.cartItems.quantity}
                        />
                    ))}
                </div>
                <div className={`${styles.orderNow}`}>
                    <button onClick={handleOrderNow}>Order Now</button>
                </div>
                </>
            )}
            </div>
            </div>
            </>
  )
}

export default Cart;