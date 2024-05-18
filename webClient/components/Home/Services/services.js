import React from 'react'
import { RiEBike2Fill } from 'react-icons/ri'
import styles from './services.module.css'
import { TbTruckReturn } from 'react-icons/tb'
import { MdOutlinePayment } from 'react-icons/md'
import { AiOutlineCustomerService } from 'react-icons/ai'
import Image from 'next/image'
import women from '../../../public/assets/women.png'
import { useRouter } from 'next/navigation'

function Services() {

    const router = useRouter();

    const fetchWomen = async () => {
        try {
            const response = await axios.get('http://localhost:3020/api/products/getllProducts/women');
            setCarddata(response.data);
        } catch (error) {
            console.error(error, "err");
        }
    };

    const fetchMen = async () => {
        try {
            const response = await axios.get('http://localhost:3020/api/products/getllProducts/men');
            setCarddata(response.data);
        } catch (error) {
            console.error(error, "err");
        }
    };

    const fetchKids = async () => {
        try {
            const response = await axios.get('http://localhost:3020/api/products/getllProducts/kids');
            setCarddata(response.data);
        } catch (error) {
            console.error(error, "err");
        }
    };

    const handleWomenClick= (e) =>{
        router.push("/auth/productsWomen")
    }

    const handleMenClick= (e) =>{
        router.push("/auth/productsMen")
    }

    const handleKidCLick= (e) =>{
        router.push("/auth/productsKids")
    }


    return (
        <>
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
            <div style={{ marginTop: "100px", margin: "100px" }}>
                {/* <ul className={`${styles.servicesListing}`}>
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
        </ul> */}
                <div style={{ display: "flex", flexDirection: 'column', margin: "50px" }}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "30px" }}>
                        <div style={{ width: "50%", backgroundColor: "#6CDDFF", borderRadius: "20px", display: "flex", cursor:"pointer", flexDirection: "row", justifyContent: "space-between" }}
                        onClick={handleWomenClick}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "20px", }}>
                                <h3 style={{ color: "white", fontWeight: "bold" }}>Collection For WOMEN</h3>
                                <h5 style={{ color: "white", fontWeight: "bold" }}>Up to <span style={{ color: "#004743" }}>10%</span> OFF</h5>
                                <button style={{ backgroundColor: "white", width: "150px", marginTop: "10px", border: "none", borderRadius: "20px", padding: "8px", fontWeight: "bold", color: "#004743" }}>SHOP NOW</button>
                            </div>
                            <Image src={"/assets/women1.png"}
                                style={{ marginRight: "20px" }}
                                width={160}
                                height={200}
                                alt="Logo Image" />
                        </div>

                        <div style={{ width: "50%", backgroundColor: "#58C4E4", borderRadius: "20px", display: "flex",cursor:"pointer", flexDirection: "row", justifyContent: "space-between" }}
                        onClick={handleMenClick}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "20px", }}>
                                <h3 style={{ color: "white", fontWeight: "bold" }}>Collection For MEN</h3>
                                <h5 style={{ color: "white", fontWeight: "bold" }}>Up to <span style={{ color: "#004743" }}>10%</span> OFF</h5>
                                <button style={{ backgroundColor: "white", width: "150px", marginTop: "10px", border: "none", borderRadius: "20px", padding: "8px", fontWeight: "bold", color: "#004743" }}>SHOP NOW</button>
                            </div>
                            <Image src={"/assets/men.png"}
                                style={{ marginRight: "20px" }}
                                width={220}
                                height={200}
                                alt="Logo Image" />
                        </div>



                    </div>

                    <div style={{ width: "100%", backgroundColor: "#E3ECE9", borderRadius: "20px", display: "flex", cursor:"pointer", flexDirection: "row", justifyContent: "space-between", marginTop: "25px" }}
                    onClick={handleKidCLick}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "100px", textAlign:"center"}}>
                            <h3 style={{ color: "#004743",  fontSize:"45px"}}>Baby & Kids fashion</h3>
                            <h5 style={{ color: "#004743", fontWeight: "bold" , fontSize:"35px"}}>Up to <span style={{ color: "#004743" }}>10%</span> OFF</h5>
                            <button style={{ backgroundColor: "white", width: "150px", marginTop: "10px", marginLeft:"150px", border: "none", borderRadius: "30px", padding: "15px", fontWeight: "bold", backgroundColor: "#004743" , color:"white"}}>SHOP NOW</button>
                        </div>
                        <Image src={"/assets/child.png"}
                            style={{ marginRight: "20px" }}
                            width={520}
                            height={400}
                            alt="Logo Image" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Services;
