import React from 'react'
import styles from './footer.module.css'
import {TiSocialLinkedinCircular} from 'react-icons/ti'


function Footer() {
  return (
    <>
    <div className={`${styles.footerContainer}`}>
        <div className={`${styles.text}`}>
        <h3>Style My Home</h3>
        </div>
        <div className={`${styles.footerLists}`}>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/reviews">Reviews</a></li>
                <li><a href="/contact">Contact Us</a></li>
            </ul>
        </div>
        <div className={`${styles.footerIcons}`}>
            <TiSocialLinkedinCircular style={{height:"35px", width:"35px"}}/>
            <TiSocialLinkedinCircular style={{height:"35px", width:"35px"}}/>
            <TiSocialLinkedinCircular style={{height:"35px", width:"35px"}}/>
            <TiSocialLinkedinCircular style={{height:"35px", width:"35px"}}/>
        </div>
        <div className={`${styles.footerCopyright}`}>
            <p> &copy; 2023 StyleMyHome. All Rights Reverved</p>
        </div>
    </div>
    </>
  )
}

export default Footer