import TopNav from "./TopNav";
import React, { useEffect, useState } from "react";
import styles from "../../styles/UserDashboard.module.css";
import {
    InputWrapper,
    Switch,
    Menu,
    Button,
    MenuItem,
    Tabs,
    Skeleton,
} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import noNotification from "../../images/no-inbox.webp";
import doctor from "../../images/doctor.png";
import { checkAuthKey, getAuthKey, getUserInfo } from "../../utils/userAuth";
import { useRouter } from "next/router";
import { BiDotsVerticalRounded, BiTrashAlt, BiRepost } from "react-icons/bi";
import renew from "../../images/icons8_renew_48px.png";
import warning from "../../images/icons8_spam_48px.png";
import axios from "axios";

const Userhome = () => {
    const router = useRouter();

    const [userDetails, setUserDetails] = useState(null);

    const [paymentInfo, setPaymentInfo] = useState(null)

    const checkPayment = () => {
        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthKey()}`
            }
        }

        axios.get('https://abcdmedical.herokuapp.com/api/v1/subscription/info' ,config)
        .then(res => {
            const data = res.data
            setPaymentInfo(data)
            
        })
        .catch(e => console.log(e))
    }

    const dateDiff = (date) => {
        let now = new Date();
        let otherDate = new Date(date);
          
        // To calculate the time difference of two dates
        let Difference_In_Time = otherDate.getTime() - now.getTime();
          
        // To calculate the no. of days between two dates
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        return Math.trunc(Difference_In_Days);
    }

    useEffect(() => {
        if (!checkAuthKey()) router.push("/");

        setUserDetails(getUserInfo());

        checkPayment()
    }, []);

    return <>
        <TopNav />
        <div className={styles.userContainer}>
            <div className={styles.homeContainer}>
                <div className={styles.notificationMessage}></div>
                <div className={styles.welcomeMessage}>
                    <h1>Welcome {userDetails?.name},</h1>
                    <p>Welcome to your dashbaord</p>
                </div>
                <div className={styles.homecontent}>
                    <div className={styles.homeAccountDetails}>

                        {
                            (paymentInfo !== null && paymentInfo?.sub !== "no sub ") &&
                            <div className={styles.subscription}>
                                <div>
                                    <h3>Subscription Plan</h3>
                                    <h2>Team</h2>
                                </div>
                                <div className={styles.timeleft}>
                                    <span>Expiring date</span>
                                    <h3> 
                                        { dateDiff(paymentInfo?.expires) } days
                                    </h3>
                                </div>
                            </div>

                        }

                        {
                            (paymentInfo !== null && paymentInfo?.sub === "no sub ") &&
                            <div
                                className={styles.subscription}
                                style={{
                                    margin: "20px 0",
                                    backgroundColor: " rgb(253, 230, 200)",
                                }}
                            >
                                <div>
                                    <h3>Subscription Plan</h3>
                                    <p
                                        style={{
                                            marginTop: "10px",
                                            fontSize: "18px",
                                        }}
                                    >
                                        You don`&lsquo;`t have an active subscription plan{" "}
                                        <span style={{ fontWeight: 600 }}>
                                            Subscribe to be able to access most parts of the application
                                        </span>
                                    </p>
                                    <Link href={"/my/add-card"}>
                                        <a>
                                            <Button
                                                style={{
                                                    marginTop: "15px",
                                                }}
                                            >
                                                Subscribe
                                            </Button>
                                        </a>
                                    </Link>
                                </div>
                            </div>

                        }
                        
                        {
                            paymentInfo === null &&
                            <div className={styles.subscription} style={{backgroundColor: "white"}}>
                                <div>
                                    <Skeleton width="200px" height="20px" mb="20px" />
                                    <Skeleton width="100px" height="20px" />
                                </div>
                                <div className={styles.timeleft}>
                                    <Skeleton width="80%" height="20px" />
                                    <Skeleton width="50%" height="20px" />
                                </div>
                            </div>
                        }

                        <Tabs>
                            <Tabs.Tab label={<h3>Recent diagnosis</h3>}>
                                <div className={styles.recentDiagnosis}>
                                    <h3></h3>
                                    <ul>
                                        <li>Rheumatic Fever</li>
                                        <li>Influenza </li>
                                        <li>Streptococcal Infection</li>
                                    </ul>
                                </div>
                            </Tabs.Tab>

                            <Tabs.Tab label={<h3>Recent antibiotic guide</h3>}>
                                <div className={styles.recentDiagnosis}>
                                    <h3></h3>
                                    <ul>
                                        <li>Rheumatic Fever</li>
                                        <li>Influenza </li>
                                        <li>Streptococcal Infection</li>
                                    </ul>
                                </div>
                            </Tabs.Tab>
                        </Tabs>
                    </div>
                    <div className={styles.moreDetails}>
                        {!userDetails?.fields.firstname &&
                            !userDetails?.fields.lastname &&
                            !userDetails?.fields.number && (
                                <div className={styles.profileUpdate}>
                                    <h3>Let Know you more</h3>
                                    <div className={styles.img}>
                                        <Image src={doctor} />
                                    </div>
                                    <p style={{ margin: "10px 0" }}>
                                        Your Name is needed to proccess payment
                                    </p>
                                    <Link href={"/my/profile"}>
                                        <a>
                                            <Button>Complete profile</Button>
                                        </a>
                                    </Link>
                                </div>
                            )}
                        <div className={styles.notifications}>
                            <h3>Recent notification</h3>
                            <div className={styles.information}>
                                <div className={styles.img}>
                                    <Image src={noNotification} />
                                </div>
                                <h3>No notification</h3>
                                <p>your recent notification will show here</p>
                            </div>
                            <ul>
                                {/* <li>
                                    <div className={styles.notificationContent}>
                                        <div className={styles.image}>
                                            <Image src={renew} />
                                        </div>
                                        <div></div>
                                        <div>
                                            <p>Your subscribtion was renewed</p>
                                            <span>11:32am</span>
                                        </div>
                                    </div>

                                    <div className={styles.more}>
                                        <Menu
                                            control={
                                                <button>
                                                    <BiDotsVerticalRounded />
                                                </button>
                                            }
                                        >
                                            <MenuItem icon={<BiTrashAlt />}>
                                                Delete
                                            </MenuItem>
                                            <MenuItem icon={<BiRepost />}>
                                                Report
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default Userhome;
