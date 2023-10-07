import TopNav from "../../components/user_components/TopNav";
import styles from "../../styles/UserDashboard.module.css";
import { Menu, MenuItem } from "@mantine/core";
import { BiDotsVerticalRounded,BiTrashAlt,BiRepost } from "react-icons/bi";
import renew from "../../images/icons8_renew_48px.png";
import warning from "../../images/icons8_spam_48px.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { checkAuthKey,getAuthKey } from "../../utils/userAuth";
import axios from "axios";

const Notification = () => {
    const [notifications,setNotifications] = useState([])
    useEffect(()=>{
        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthKey()}`
            }
        }

        axios.get("https://abcdmedical.herokuapp.com/api/v1/users/notifications",config)
        .then(res=>{
            setNotifications(res.data)
        })
    })

    const router = useRouter()

    useEffect(() => {
        if (!checkAuthKey())
            router.push("/")
    }, [])

    return <>
        
        <TopNav />
        <div className={styles.userContainer}>
            <div className={styles.notification}>
                <h3>Notification</h3>
                <ul>

                    {notifications.map(notification=>
                         <li key={notification.id}>
                         <div className={styles.notificationContent}>
                             <div className={styles.image}>
                                 <Image src={renew} />
                             </div>
                             <div></div>
                             <div>
                                 <p>{notification.title}</p>
                                 <span>{notification.message}</span>
                             </div>
                         </div>
 
                    
                     </li>
                    )}
                   
                   
                </ul>
            </div>
        </div>
    </>
};

export default Notification;
