import React from 'react'
import styles from "../../styles/UserDashboard.module.css";


const UserTransactionTable = () => {
  return (
    <div className={styles.UserTransactionTable}>
        <h2>Transactions</h2>
        <table>
            <tr key="">
                <th>Transaction type</th>
                <th>Account</th>
                <th>Ammount</th>
                <th>Date</th>
            </tr>
            <tr key="">
                <td>Subscription</td>
                <td>UBA</td>
                <td>$10</td>
                <td>2022-01-28</td>
            </tr>
        </table>
    </div>
  )
}

export default UserTransactionTable