import React from 'react'
import styles from './pagebanner.module.css'

function PageBanner() {
  return (
    <div className={`${styles.containerMain}`} style={{backgroundImage: `url('/assets/homePage.webp')`}}>
        <h2 className={`${styles.bannerText}`}><span style={{color:"white"}}>Style your home </span>with my home....</h2>
    </div>
  )
}

export default PageBanner