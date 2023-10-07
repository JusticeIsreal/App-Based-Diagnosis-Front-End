import { Grid } from "@mantine/core"
import Link from "next/link"
import Sidebar from "../../../components/admin_components/Sidebar"
import Styles from "../../../styles/Admin.module.css"

const Users = () => {

    return <>
    
        <Sidebar pageName="Payment">
            
            <Grid gutter="sm" my="25px">

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/payment/set-payment-key">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Set Payment Key</p>
                        </a>
                    </Link>
                </Grid.Col>

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/payment/active-subscriptions">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Active Subscriptions</p>
                        </a>
                    </Link>
                </Grid.Col>

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/payment/payment-log">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Payment Log</p>
                        </a>
                    </Link>
                </Grid.Col>

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/payment/approved-payments">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Approved Payments</p>
                        </a>
                    </Link>
                </Grid.Col>

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/payment/declined-payments">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Declined Payments</p>
                        </a>
                    </Link>
                </Grid.Col>

            </Grid>

        </Sidebar>
    
    </>

}

export default Users