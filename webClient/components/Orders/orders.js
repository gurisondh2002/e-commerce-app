import React from 'react'
import styles from './orders.module.css'

function Orders() {
  return (
    <div className={`${styles.mainContainer}`}>
        <div className={`${styles.orderContainer}`}>
            <div className={`${styles.orderHeading}`}>
                <h2>Your Orders...</h2>
            </div>
            <div className={`${styles.orderTable}`} style={{overflowX: "auto"}}>
                <table border ="2">
                    <tr>
                        <td>Name</td>
                        <td>Amount</td>
                        <td>Quantity</td>
                        <td>Total Amount</td>
                        <td>Total Tax</td>
                        <td>Total final Amount</td>
                    </tr>
                    <tr>
                        <th>abc</th>
                        <th>abc</th>
                        <th>abc</th>
                        <th>abc</th>
                        <th>abc</th>
                        <th>abc</th>
                    </tr>
                    <tr>
                        <th>abc</th>
                        <th>abc</th>
                        <th>abc</th>
                        <th>abc</th>
                        <th>abc</th>
                        <th>abc</th>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                        <th>20</th>
                        <th>90</th>
                        <th>110</th>
                    </tr>
                </table>
                </div>
                <div className={`${styles.orderNow}`}>
                    <button>Order Now</button>
                </div>
        </div>

    </div>
  )
}

export default Orders;