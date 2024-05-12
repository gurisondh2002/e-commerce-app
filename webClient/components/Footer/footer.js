import React from 'react'
import styles from './footer.module.css'
import {TiSocialLinkedinCircular} from 'react-icons/ti'


function Footer() {
  return (
    <>
    <div className={`${styles.footerContainer}`}
        style={{
            background: "linear-gradient(to top, #BFEFFF, #FFFFFF)", 
            boxShadow: "none",
          }}
    >
        <div className={`${styles.text}`}>
        <h3>Trendzy</h3>
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
            <p> &copy; 2023 Trendzy. All Rights Reverved</p>
        </div>
    </div>
    </>
  )
}

export default Footer