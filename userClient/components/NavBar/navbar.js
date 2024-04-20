'use client'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaShoppingCart } from 'react-icons/fa';
import { BiSolidUser } from 'react-icons/bi';
import styles from './navbar.module.css'
import Image from 'next/image';

function Navigationbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <Image src={"/assets/logo.png"}
          width={140}
          height={50}
          alt="Logo Image"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            <NavDropdown title="Shop" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/products">Products</NavDropdown.Item>
              <NavDropdown.Item href="/services">
                Services
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/reviews">Reviews</Nav.Link>
            <Nav.Link href="/order">Orders</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link href="/cart">
            <FaShoppingCart  style={{height:"25px", width:"25px"}}/>
          </Nav.Link>
          <Nav.Link href="/user">
            <BiSolidUser style={{height:"25px", width:"25px"}}/>
          </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigationbar