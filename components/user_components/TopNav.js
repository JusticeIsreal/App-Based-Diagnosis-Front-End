import { Tooltip, Menu, MenuItem, Skeleton, Center } from "@mantine/core";
import { Autocomplete } from "@mantine/core";
import navLogo from "../../images/App-Based_Click_&_Diagnose-Logo-PNG_4.png";
import Image from "next/image";
import Link from "next/link";
import profileImg from "../../styles/kingsley-osei-abrah-9KmzY22Tz-4-unsplash.jpg";
import {NextLink} from "@mantine/next"

import {
    FaCog,
    FaBell,
    FaFlag,
    FaUserAlt,
    FaSignOutAlt,
    FaHome,
    FaCashRegister,
    FaFirstAid,
} from "react-icons/fa";

import styles from "../../styles/UserDashboard.module.css";
import { deleteAuthKey } from "../../utils/userAuth";
import { useRouter } from "next/router";

const TopNav = () => {
    const router = useRouter();

    const logOut = () => {
        if (deleteAuthKey()) {
            router.push("/");
            router.reload();
        }
    };

    return (
        <div className={styles.nav}>
            <a href="" className={styles.logo}>
                <Image src={navLogo} />
            </a>

            <ul className={styles.navigation}>
                <li>
                    <Link href="/">
                        <a>
                            {" "}
                            <FaHome />
                            Home
                        </a>
                    </Link>
                </li>
                <li>
                    <Menu
                        control={
                            <a>
                                {" "}
                                <FaFirstAid />
                                Medical
                            </a>
                        }
                    >
                        <MenuItem component={NextLink} href="/my/clinical">
                            Clinical Guide
                        </MenuItem>
                        <MenuItem component={NextLink} href="/my/antibiotic">
                            Antibiotic Guide
                        </MenuItem>
                    </Menu>
                </li>
                <li>
                    <Link href={"/my/notification"}>
                        <a>
                            {" "}
                            <FaBell /> notifications
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={"/my/settings"}>
                        <a>
                            <FaCog /> Settings
                        </a>
                    </Link>
                </li>
            </ul>

            <ul>
                <li>
                    <Menu
                        withArrow
                        closeOnItemClick
                        control={
                            <button>
                                <Image src={profileImg} alt="" />
                            </button>
                        }
                    >
                        <Menu.Label>More</Menu.Label>
                        <Menu.Item>
                            <Link href="/my/profile">
                                <a>
                                    <FaUserAlt /> Account
                                </a>
                            </Link>
                        </Menu.Item>

                        <Menu.Item>
                            <Link href={"/my/transactions"}>
                                <a>
                                    <FaCashRegister /> Transactions
                                </a>
                            </Link>
                        </Menu.Item>

                        <Menu.Item>
                            <Link href={"/my/support"}>
                                <a>
                                    <FaFlag /> Support
                                </a>
                            </Link>
                        </Menu.Item>

                        <Menu.Item onClick={() => logOut()}>
                            <FaSignOutAlt /> Logout
                        </Menu.Item>
                    </Menu>
                </li>
            </ul>
        </div>
    );
};

export default TopNav;
