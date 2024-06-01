'use client'
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart } from 'react-icons/fa';
import { BiSolidUser } from 'react-icons/bi';
import styles from './navbar.module.css';
import Image from 'next/image';
import axios from 'axios';

function Navigationbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const storedId = localStorage.getItem('userId');
      const response = await axios.get(`https://e-comm-backend-fi70.onrender.com/api/carts/getCart/${storedId}`);
      setCartCount(response.data.totalProductQuantity);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{
        background: "linear-gradient(to bottom, #BFEFFF, #FFFFFF)", 
        boxShadow: "none",
        position: "fixed",
        width: "100%", 
        zIndex: 1000,
      }}
    > 
      <Container>
        <Navbar.Brand href="/auth">
          <Image src={"/assets/opt1.png"}
            width={140}
            height={50}
            alt="Logo Image" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" style={{gap:"50px"}}>
            <Nav.Link href="/auth" className={styles.navLink}>Home</Nav.Link>
            <Nav.Link href="/auth/about" className={styles.navLink}>About Us</Nav.Link>
            <Nav.Link href="/auth/products" className={styles.navLink}>Products</Nav.Link>
            <Nav.Link href="/auth/reviews" className={styles.navLink}>Reviews</Nav.Link>
            <Nav.Link href="/auth/order" className={styles.navLink}>Orders</Nav.Link>
            <Nav.Link href="/auth/contact" className={styles.navLink}>Contact Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/auth/cart">
              <FaShoppingCart style={{ height: "25px", width: "25px" }} />
              <span className={styles.cartCount}>{cartCount}</span>
            </Nav.Link>
            <Nav.Link href="/auth/user">
              <BiSolidUser style={{ height: "25px", width: "25px" }} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigationbar;