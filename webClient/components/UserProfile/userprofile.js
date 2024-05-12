import React from 'react'
import styles from './userprofile.module.css'

function UserProfile() {
  return (
    <>
    <br/>
    <br/>
    <br/>
    <div className={`${styles.mainContainer}`}>
        <div className={`${styles.userContainer}`}>
            <div className={`${styles.text}`}>
                <div className={`${styles.textHeading}`}>
                    <h2>User Profile Page</h2>
                </div>
                <div className={`${styles.textContent}`}>
                    <label>First Name:</label>
                    <br/>
                    <input readOnly type="text" value="Gurjeet" />
                    <br/>
                    <label>Last Name:</label>
                    <br/>
                    <input readOnly type="text" value="Kaur" />
                    <br/>
                    <label>Email:</label>
                    <br/>
                    <input readOnly type="email" value="guri123@gmail.com" />
                    <br/>
                    <br/>
                    <button>Logout</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default UserProfile;