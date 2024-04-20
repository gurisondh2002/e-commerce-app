'use client'
import React from 'react'
import styles from './about.module.css'
// import { useNavigation } from 'next/navigation'

function About() {

  // const navigation = useNavigation()

  const handleClick = (e) => {
    e.preventDefault()
    redirect('/contact')
  }

  return (
    <>
      <div className={`${styles.mainContainer}`}>
        <div className={`${styles.aboutContainer}`}>
          <div className={`${styles.leftContainer}`}>
            <div className={`${styles.text}`}>
              <div className={`${styles.aboutHeading}`}>
                <h1>Our Story</h1>
              </div>
              <div className={`${styles.aboutContent}`}>
                <p>STYLE MY HOME is a trendsetting Online Store, offering first-rate products and exceptional customer service to shoppers from all over the world. We’re a business made up of innovators and forward-thinkers, with the drive to constantly update and improve your shopping experience.</p>
                <p>Our name has become synonymous with quality, sustainability and reliability. We are proud to have produced years of happy customers and look forward to continuing our work for many more to come! Browse our site to explore our extensive selection and subscribe to stay in the know about special offers and discounts!</p>
              </div>
            </div>
            <div className={`${styles.aboutButton}`}>
              <button onClick={handleClick}>Get In Touch</button>
            </div>
          </div>
          <div className={`${styles.rightContainer}`} style={{ backgroundImage: `url('/assets/about.webp')` }}>
          </div>
        </div>
      </div>
    </>
  )
}

export default About