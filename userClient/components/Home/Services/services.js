import React from 'react'
import { RiEBike2Fill } from 'react-icons/ri'
import styles from './services.module.css'
import { TbTruckReturn } from 'react-icons/tb'
import { MdOutlinePayment } from 'react-icons/md'
import { AiOutlineCustomerService } from 'react-icons/ai'

function Services() {
    return (
        <div>
            <ul className={`${styles.servicesListing}`}>
                <li>
                    <div className={`${styles.serviceShipping}`}>
                        <RiEBike2Fill style={{ height: "40px", width: "40px", margin: "10px" }} />
                        <div className={`${styles.text}`}>
                            <strong><p>Free Shipping</p></strong>
                            <p style={{ color: "grey" }}>On All Orders Over $599</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className={`${styles.serviceShipping}`}>
                        <TbTruckReturn style={{ height: "40px", width: "40px", margin: "10px" }} />
                        <div>
                            <strong><p>Easy Returns</p></strong>
                            <p style={{ color: "grey" }}>30 Day Return Policy</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className={`${styles.serviceShipping}`}>
                        <MdOutlinePayment style={{ height: "40px", width: "40px", margin: "10px" }} />
                        <div>
                            <strong><p>Secure Payment</p></strong>
                            <p style={{ color: "grey" }}>100% Secure Gaurantee</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className={`${styles.serviceShipping}`}>
                        <AiOutlineCustomerService style={{ height: "40px", width: "40px", margin: "10px" }} />
                        <div>
                            <strong><p>Special Support</p></strong>
                            <p style={{ color: "grey" }}>24/7 Dedicated Support</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Services;