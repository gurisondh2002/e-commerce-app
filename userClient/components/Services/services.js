import React from 'react'
import styles from './services.module.css'
import dynamic from 'next/dynamic'
const Card = dynamic(
    ()=>import('@/components/Services/Card/card'),
    {suspense:true}
)

function Services() {

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
  return (
    <>
    <br/>
    <br/>
    <br/>
    <div className={`${styles.container}`}>
        <div className={`${styles.servicesContainer}`}>
                <div className={`${styles.text}`}>
                    <div className={`${styles.textHeading}`}>
                        <h1>Services of the week</h1>
                    </div>
                    <div className={`${styles.textContent}`}>
                        <p>Our latest services this week</p>
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
                        />
                    ))}
                </div>
            </div>
    </div>
    </>
  )
}

export default Services;