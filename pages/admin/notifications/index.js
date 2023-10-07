import Sidebar from "../../../components/admin_components/Sidebar"
import { Grid } from "@mantine/core"
import Styles from "../../../styles/Admin.module.css"
import Link from "next/link"

export default function NotificationPage () {


    return <>
    
        <Sidebar pageName="Diagnosis">
            <Grid gutter="sm" my="25px">

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/notifications/send-in-app-notifications">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Send In-app Notifications</p>
                        </a>
                    </Link>
                </Grid.Col>

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/notifications/manage-in-app-notifications">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Manage In-app Notifications</p>
                        </a>
                    </Link>
                </Grid.Col>

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/notifications/send-email-notifications">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Send Email Notification</p>
                        </a>
                    </Link>
                </Grid.Col>

            </Grid>
        </Sidebar>
    
    </>

}