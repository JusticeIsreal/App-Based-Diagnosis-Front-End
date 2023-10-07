import Styles from "../../styles/AdminSideBar.module.css"
import Logo from "../../images/home_logo.png"
import Image from "next/image"
import { GoThreeBars, GoHome, GoRequestChanges, GoX } from "react-icons/go"
import { BsPeople, BsGear, BsBell } from "react-icons/bs"
import { SiAmazonpay } from "react-icons/si"
import { AiOutlineAppstoreAdd } from "react-icons/ai"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { checkAdminAuthKey, deleteAdminAuthKey } from "../../utils/adminAuth"
import { GiReceiveMoney } from "react-icons/gi"
import { ActionIcon, Center, Loader } from "@mantine/core"
import { GrPower } from "react-icons/gr"

const Sidebar = ({children, pageName}) => {

    const router = useRouter();

    const [mobile, setMobile] = useState(false)

    useEffect(() => {
        let loggedIn = checkAdminAuthKey()

        if (!loggedIn){
            router.push("/admin/auth/login")
            return;
        }

        setAdmin(true)

    }, [])

    const logout = () => {

        if (deleteAdminAuthKey())
            router.push("/admin/auth/login")

    }

    const [admin, setAdmin] = useState(false)

    return <>
    
        {
            admin &&
            <div className={Styles.sidebar_contain}>
                <div className={mobile ? `${Styles.main_sidebar} ${Styles.mobile_active}` : Styles.main_sidebar}>
                    <div className={Styles.logo_contain}>
                        <div className={Styles.logo}>
                            <Image src={Logo} layout="fill" alt="" />
                        </div>
                        <button className={Styles.toggler} onClick={() => setMobile(false)}>
                            <GoX />
                        </button>
                    </div>

                    <div className={Styles.nav_container}>
                        <ul className={Styles.nav_list}>

                            <li>
                                <Link href="/admin">
                                    <a className={ router.pathname == "/admin" ? `${Styles.nav_item} ${Styles.nav_item_active}`: Styles.nav_item}>
                                        <span>
                                            <GoHome />
                                        </span>
                                        <span>Overview</span>
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/admin/payment">
                                    <a className={ router.pathname.includes("/admin/payment") ? `${Styles.nav_item} ${Styles.nav_item_active}`: Styles.nav_item}>
                                        <span>
                                            <GiReceiveMoney />
                                        </span>
                                        <span>Payment</span>
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/admin/plans">
                                    <a className={ router.pathname.includes("/admin/plans") ? `${Styles.nav_item} ${Styles.nav_item_active}`: Styles.nav_item}>
                                        <span>
                                            <SiAmazonpay />
                                        </span>
                                        <span>Plans</span>
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/admin/users">
                                    <a className={ router.pathname.includes("/admin/users") ? `${Styles.nav_item} ${Styles.nav_item_active}`: Styles.nav_item}>
                                        <span>
                                            <BsPeople />
                                        </span>
                                        <span>Users</span>
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/admin/support">
                                    <a className={ router.pathname.includes("/admin/support") ? `${Styles.nav_item} ${Styles.nav_item_active}`: Styles.nav_item}>
                                        <span>
                                            <GoRequestChanges />
                                        </span>
                                        <span>Support</span>
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/admin/medical">
                                    <a className={ router.pathname.includes("/admin/medical") ? `${Styles.nav_item} ${Styles.nav_item_active}`: Styles.nav_item}>
                                        <span>
                                            <AiOutlineAppstoreAdd />
                                        </span>
                                        <span>Medical</span>
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/admin/notifications">
                                    <a className={ router.pathname.includes("/admin/notifications") ? `${Styles.nav_item} ${Styles.nav_item_active}`: Styles.nav_item}>
                                        <span>
                                            <BsBell />
                                        </span>
                                        <span>Notifications</span>
                                    </a>
                                </Link>
                            </li>

                            <li>
                                <Link href="/admin/settings">
                                    <a className={ router.pathname.includes("/admin/settings") ? `${Styles.nav_item} ${Styles.nav_item_active}`: Styles.nav_item}>
                                        <span>
                                            <BsGear />
                                        </span>
                                        <span>Settings</span>
                                    </a>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>

                <div className={Styles.main_content}>
                    <div className={Styles.main_content_header}>
                        <div className={Styles.toggler_contain}>
                            <button className={Styles.toggler} onClick={() => setMobile(true)}>
                                <GoThreeBars />
                            </button>
                            <p className={Styles.page_name}>{pageName}</p>
                        </div>
                        <div className={Styles.admin_name_contain}>
                            {/* <p>Admin</p> */}
                            <ActionIcon
                                onClick={() => logout()}
                            >
                                <GrPower />
                            </ActionIcon>
                            <p>Logout</p>
                        </div>
                    </div>

                    <div className={Styles.main_content_body}>
                        {children}
                    </div>
                </div>
            </div>
        }

        {
            !admin &&
            <Center style={{height: "100vh", width: "100%"}}>
                <Loader variant="bars" size="lg" />
            </Center>
        }
    
    </>

}

export default Sidebar