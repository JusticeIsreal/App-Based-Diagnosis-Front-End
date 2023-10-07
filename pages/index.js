import Head from 'next/head'
import Image from 'next/image'
import { FaAdjust } from "react-icons/fa"
import AddSubscription from '../components/user_components/AddSubscription'
import HomeContent from '../components/HomeContent'
import SubscriptionTable from '../components/user_components/SubscriptionTable'
import Userhome from '../components/user_components/Home'
import { checkAuthKey } from '../utils/userAuth'
import { useEffect, useState } from 'react'


export default function Index() {

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        setLoggedIn(checkAuthKey())
    }, [])
    
    return <>
        <div >
            <div>
                { loggedIn && <Userhome /> }
                { !loggedIn && <HomeContent /> }
            </div>
        </div>
    </>

}