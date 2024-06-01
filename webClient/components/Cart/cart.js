'use client'
import React, { useState, useEffect } from 'react';
import styles from './cart.module.css';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { TiDeleteOutline } from "react-icons/ti";
import {loadStripe} from '@stripe/stripe-js';

const Card = dynamic(() => import('@/components/Cart/Card/card'), { suspense: true });

function Cart() {
    const [cardData, setCartData] = useState([]);
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    const [subTotal, setSubTotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    // const email = localStorage.getItem('email')

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
                calculateTotals(res.data.cart.products);
            } else {
                console.error(`Request failed with status ${res.status}`);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const calculateTotals = (products) => {
        let subTotal = 0;
        let shipping = 0;
        products.forEach((product) => {
            subTotal += product.productInCart.price * product.quantity;
            if (product.subtotal < 200) {
                shipping += Math.floor(Math.random() * 10) + 1; // random shipping charge between 1 and 10
            }
        });
        setSubTotal(subTotal);
        setShipping(shipping);
        setGrandTotal(subTotal + shipping);
    };

    const handlePayment = async()=>{

        // if(email){
            
            const stripePromise = await loadStripe("pk_test_51PMogU04h1WM8e3aPm7SJ9uQyCNwsTmToQm5GNG9muPyJpHqFwRYEmfhqdSoQglmCFPqpCqLDBnVFB4ReR4FwbkR00vNl053U8")
            const res = await fetch(`https://e-comm-backend-fi70.onrender.com/api/orders/payment`,{
              method : "POST",
              headers  : {
                "content-type" : "application/json"
              },
              body  : JSON.stringify(cardData)
            })
            if(res.statusCode === 500) return;
  
            const data = await res.json()
            console.log(data)
  
            toast("Redirect to payment Gateway...!")
            stripePromise.redirectToCheckout({sessionId : data}) 
        // }
        // else{
        //   toast("You have not Login!")
        //   setTimeout(()=>{
        //     navigate("/login")
        //   },1000)
        // }
      
    }

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
                            <table className={`${styles.cartTable} w-full`} >
                                <thead >
                                    <tr style={{ borderRadius: '10px' }}>
                                        <th className={styles.thGrayBg}>PRODUCT</th>
                                        <th className={styles.thGrayBg}>PRICE</th>
                                        <th className={styles.thGrayBg}>QUANTITY</th>
                                        <th className={styles.thGrayBg}>SHIPPING</th>
                                        <th className={styles.thGrayBg}>SUBTOTAL</th>
                                        <th className={styles.thGrayBg}>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cardData.map((data, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className={styles.product} style={{ display: "flex", alignItems: "center", height: "100%" }}>
                                                    <img src={data.productInCart.imageUrl} style={{ borderRadius: "10px" }} alt={data.productInCart.title} height={80} width={60} />
                                                    <div style={{ display: "flex", flexDirection: "column", gap: "-1px" }}>
                                                        <p style={{ marginBottom: "-5px" }}>{data.productInCart.title}</p>
                                                        <p style={{ marginBottom: "-5px" }}>{data.productInCart.supplier}</p>
                                                        <p>{data.productInCart?.size}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ verticalAlign: "middle" }}>${data.productInCart.price}</td>
                                            <td style={{ verticalAlign: "middle" }}>
                                                <div style={{ backgroundColor: "#F6F6F6", width: "fit-content", textAlign: "center", paddingLeft: "20px", paddingRight: "20px", borderRadius: "10px" }}>
                                                    <span>-</span>
                                                    <span style={{ margin: "0 10px" }}>{data.quantity}</span>
                                                    <span>+</span>
                                                </div>
                                            </td>
                                            <td style={{ verticalAlign: "middle" }}>FREE</td>
                                            <td style={{ verticalAlign: "middle" }}>${(data.productInCart.price * data.quantity).toFixed(2)}</td>
                                            <td style={{ verticalAlign: "middle" }}>
                                                <TiDeleteOutline size={24} color='gray' />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* <div className={`${styles.orderNow}`}>
                                <button>OrderNow</button>
                            </div> */}
                            <div style={{ display: "flex", justifyContent: "flex-end", flexDirection: "column", width: "90%" }}>
                                <div style={{ display: "flex", flexDirection: "column", fontFamily: "Montserrat", gap: "10px", justifyContent: "flex-end", width: "fit-content", alignSelf: "flex-end", width: "30%", height: "calc(100% - 44px)", backgroundColor: '#F3F3F3', padding: "40px" }}>
                                    <div style={{ display: "flex", justifyContent: 'pace-between' }}>
                                        <div className="text-lg font-medium">Sub Total</div>
                                        <div className="text-lg font-medium">${subTotal.toFixed(2)}</div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: 'pace-between' }}>
                                        <div className="text-lg font-medium">Shipping</div>
                                        <div className="text-lg font-medium">{subTotal < 200 ? `$${Math.floor(Math.random() * 10) + 1}.00` : 'FREE'}</div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                        <div>Grand Total</div>
                                        <div>${grandTotal.toFixed(2)}</div>
                                    </div>
                                    <hr />
                                    <button style={{ backgroundColor: "#899DA5", border: "none", padding: "5px", color: "white" }}
                                    onClick={handlePayment}
                                    >PROCEED TO CHECKOUT</button>
                                </div>
                                {/* <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "fit-content", alignSelf: "flex-end", width: "15%", backgroundColor: '#F3F3F3', padding: "40px" }}>
                                    Proceed to Checkout
                                </div> */}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Cart;