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
                        <RiEBike2Fill style={{ height: "60px", width: "60px", margin: "10px" }} />
                        <div className={`${styles.text}`}>
                            <strong><p style={{ margin: "5px 0", fontSize: "23px" }}>Free Shipping</p></strong>
                            <p style={{ color: "grey", margin: "0", fontSize: "16px" }}>On All Orders Over $599</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className={`${styles.serviceShipping}`}>
                        <TbTruckReturn style={{ height: "60px", width: "60px", margin: "10px" }} />
                        <div>
                            <strong><p style={{ margin: "5px 0", fontSize: "23px" }}>Easy Returns</p></strong>
                            <p style={{ color: "grey", margin: "0", fontSize: "16px" }}>30 Day Return Policy</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className={`${styles.serviceShipping}`}>
                        <MdOutlinePayment style={{ height: "60px", width: "60px", margin: "10px" }} />
                        <div>
                            <strong><p style={{ margin: "5px 0", fontSize: "23px" }}>Secure Payment</p></strong>
                            <p style={{ color: "grey", margin: "0", fontSize: "16px" }}>100% Secure Guarantee</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className={`${styles.serviceShipping}`}>
                        <AiOutlineCustomerService style={{ height: "60px", width: "60px", margin: "10px" }} />
                        <div>
                            <strong><p style={{ margin: "5px 0", fontSize: "23px" }}>Special Support</p></strong>
                            <p style={{ color: "grey", margin: "0", fontSize: "16px" }}>24/7 Dedicated Support</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Services;
