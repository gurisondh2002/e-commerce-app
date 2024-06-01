'use client'
import { useState } from 'react'
import styles from './registration.module.css'
import { useRouter } from 'next/navigation'
import { useBootstrapBreakpoints } from 'react-bootstrap/esm/ThemeProvider'


async function sendRegistrationData(data) {
    const res = await fetch('https://e-comm-backend-fi70.onrender.com/user/register', { 
        cache: 'no-cache' ,
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json', // Ensure that the content type is set to JSON
          },
    })
    const resRef = await res.json()
    return resRef
}

function Registration() {
    const router = useRouter()
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    })
    const handleFirstChange = (e) => {
        e.preventDefault();
        setData((prevState) => {
            return { ...prevState, first_name: e.target.value }
        })
    }
    const handleLastChange = (e) => {
        e.preventDefault();
        setData((prevState) => {
            return { ...prevState, last_name: e.target.value }
        })
    }
    const handleEmailChange = (e) => {
        e.preventDefault();
        setData((prevState) => {
            return { ...prevState, email: e.target.value }
        })
    }
    const handlePassChange = (e) => {
        e.preventDefault();
        setData((prevState) => {
            return { ...prevState, password: e.target.value }
        })
    }

    const [displayMessage, setDisplayMessage] = useState("")

    const handleRegisterationSubmit = async (e) => {
        e.preventDefault()
        const response = await sendRegistrationData(data)
        console.log(response)
        if(response.message == "User successfully Registered!"){
            router.push("/login")
        }
        else{
            setDisplayMessage(response.message)
        }
    }

    return (
        <div className={`${styles.containerMain}`} style={{ backgroundImage: `url('/assets/register.jpg')`}}>
            <div className={`${styles.registerContainer}`}>
                {
                    displayMessage !== "" ? <h1 style={{color:"black",fontSize:"40px"}}>{displayMessage}</h1> : <></> 
                }
                <h2>Register Now</h2>
                <form className={`${styles.registerInput}`}>
                    <label htmlFor='first_name'>First Name:</label>
                    <input onChange={handleFirstChange} id='first_name' type='text' placeholder='Enter first name...' value={data.first_name} />
                    <br />
                    <label htmlFor='last_name'>Last Name:</label>
                    <input onChange={handleLastChange} id='last_name' type='text' placeholder='Enter last name...' value={data.last_name} />
                    <br />
                    <label htmlFor='email'>Email:</label>
                    <input onChange={handleEmailChange} id='email' type='email' placeholder='Enter email...' value={data.email} />
                    <br />
                    <label htmlFor='password'>Password:</label>
                    <input onChange={handlePassChange} id='password' type='password' placeholder='Enter password...' value={data.password} />
                    <br />
                    <button onClick={handleRegisterationSubmit}>Register</button>
                    <br />
                    <p>Already have an account? <a href="/login" style={{ color: "black" }}>Login Here</a></p>
                </form >
            </div>
        </div>
    )
}

export default Registration
  