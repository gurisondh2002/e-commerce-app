import React, { useEffect, useState } from 'react'
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

    const [margin, setMargin] = useState('100px');

    useEffect(() => {
        const updateMargin = () => {
            if (window.innerWidth < 768) {
                setMargin('20px');
            } else {
                setMargin('100px');
            }
        };

        window.addEventListener('resize', updateMargin);
        updateMargin(); // Set the initial margin based on current screen size

        return () => {
            window.removeEventListener('resize', updateMargin);
        };
    }, []);

    const fetchWomen = async () => {
        try {
            const response = await axios.get('https://e-comm-backend-fi70.onrender.com/api/products/getllProducts/women');
            setCarddata(response.data);
        } catch (error) {
            console.error(error, "err");
        }
    };

    const fetchMen = async () => {
        try {
            const response = await axios.get('https://e-comm-backend-fi70.onrender.com/api/products/getllProducts/men');
            setCarddata(response.data);
        } catch (error) {
            console.error(error, "err");
        }
    };

    const fetchKids = async () => {
        try {
            const response = await axios.get('https://e-comm-backend-fi70.onrender.com/api/products/getllProducts/kids');
            setCarddata(response.data);
        } catch (error) {
            console.error(error, "err");
        }
    };

    const handleWomenClick = (e) => {
        router.push("/auth/productsWomen")
    }

    const handleMenClick = (e) => {
        router.push("/auth/productsMen")
    }

    const handleKidCLick = (e) => {
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
            <div style={{ marginTop: margin, margin }}>
                <div style={{ display: "flex", flexDirection: 'column' }}>
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <div
                                    className="d-flex flex-column flex-md-row align-items-center text-white p-3"
                                    onClick={handleWomenClick}
                                    style={{ cursor: 'pointer', borderRadius: '30px', background:"#6CDDFF" }}
                                >
                                    <div className="flex-grow-1">
                                        <h3 className="font-weight-bold">Collection For WOMEN</h3>
                                        <h5 className="font-weight-bold">
                                            Up to <span style={{ color: '#004743' }}>10%</span> OFF
                                        </h5>
                                        <button
                                            className="btn btn-light mt-2"
                                            style={{ color: '#004743', fontWeight: 'bold', borderRadius: '20px' }}
                                        >
                                            SHOP NOW
                                        </button>
                                    </div>
                                    <img
                                        src="/assets/women1.png"
                                        className="ml-md-3"
                                        style={{ width: 'auto', height: '200px' }}
                                        alt="Women's Collection"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6 mb-4">
                                <div
                                    className="d-flex flex-column flex-md-row align-items-center text-white p-3"
                                    onClick={handleMenClick}
                                    style={{ cursor: 'pointer', borderRadius: '30px' , background:"#58C4E4"}}
                                >
                                    <div className="flex-grow-1">
                                        <h3 className="font-weight-bold">Collection For MEN</h3>
                                        <h5 className="font-weight-bold">
                                            Up to <span style={{ color: '#004743' }}>10%</span> OFF
                                        </h5>
                                        <button
                                            className="btn btn-light mt-2"
                                            style={{ color: '#004743', fontWeight: 'bold', borderRadius: '20px' }}
                                        >
                                            SHOP NOW
                                        </button>
                                    </div>
                                    <img
                                        src="/assets/men.png"
                                        className="ml-md-3"
                                        style={{ width: 'auto', height: '200px' }}
                                        alt="Men's Collection"
                                    />
                                </div>
                            </div>

                            <div className="col-12">
                                <div
                                    className="d-flex flex-column flex-md-row align-items-center bg-light text-dark p-3 mt-4"
                                    onClick={handleKidCLick}
                                    style={{ cursor: 'pointer', borderRadius: '30px' }}
                                >
                                    <div className="flex-grow-1 text-center text-md-left">
                                        <h3 style={{ color: '#004743', fontSize: '40px', margin: '10px' }}>
                                            Baby & Kids fashion
                                        </h3>
                                        <h5
                                            className="font-weight-bold"
                                            style={{ color: '#004743', fontSize: '35px', margin: '10px' }}
                                        >
                                            Up to <span style={{ color: '#004743' }}>10%</span> OFF
                                        </h5>
                                        <button
                                            className="btn btn-dark mt-2 p-2"
                                            style={{ color: 'white', fontWeight: 'bold', borderRadius: '30px' }}
                                        >
                                            SHOP NOW
                                        </button>
                                    </div>
                                    <img
                                        src="/assets/child.png"
                                        className="ml-md-3 mt-3 mt-md-0"
                                        style={{ width: 'auto', height: '300px', maxHeight: '600px' }}
                                        alt="Kids' Collection"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div style={{ width: "100%", backgroundColor: "#E3ECE9", borderRadius: "20px", display: "flex", cursor: "pointer", flexDirection: "row", justifyContent: "space-between", marginTop: "25px", flexWrap: "wrap" }}
                        onClick={handleKidCLick}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "20px", textAlign: "center", width: "100%", boxSizing: "border-box" }}>
                            <h3 style={{ color: "#004743", fontSize: "30px", margin: "0" }}>Baby & Kids fashion</h3>
                            <h5 style={{ color: "#004743", fontWeight: "bold", fontSize: "25px", margin: "0" }}>Up to <span style={{ color: "#004743" }}>10%</span> OFF</h5>
                            <button style={{ backgroundColor: "#004743", width: "150px", marginTop: "10px", border: "none", borderRadius: "30px", padding: "15px", fontWeight: "bold", color: "white" }}>SHOP NOW</button>
                        </div>
                        <img src="/assets/child.png" style={{ marginRight: "20px", width: "100%", maxWidth: "220px", height: "auto", alignSelf: "center" }} alt="Kids' Collection" />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Services;
