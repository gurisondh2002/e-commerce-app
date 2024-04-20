import React from 'react'
import styles from './contact.module.css'
import {BiSolidPhoneCall} from 'react-icons/bi'
import {MdOutlineAttachEmail} from 'react-icons/md'

function Contact() {
  return (
    <div className={`${styles.contactContainer}`}>
        <div className={`${styles.leftContainer}`}>
            <h1>Get In Touch</h1>
            <div className={`${styles.contactPhone}`}>
                <BiSolidPhoneCall style={{height:"40px" , width:"40px" , marginRight:"20px"}}/> 
                <h3>+91 6283973058</h3>
            </div>
            <div className={`${styles.contactEmail}`}>
                <MdOutlineAttachEmail style={{height:"40px" , width:"40px" , marginRight:"20px"}}/> 
                <h3 className={`${styles.emailContainer}`} style={{maxWidth:"100%"}}>gurisondh2992@hmail.com</h3>
            </div>
        </div>
        <div className={`${styles.rightContainer}`} style={{backgroundImage:`url('/assets/contact.webp')`}}>
        </div>
    </div>
  )
}

export default Contact;