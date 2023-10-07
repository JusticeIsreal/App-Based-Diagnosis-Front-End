import Sidebar from "../../../components/admin_components/Sidebar"
import { Grid } from "@mantine/core"
import Styles from "../../../styles/Admin.module.css"
import Link from "next/link"

export default function IndexPage () {

    return <>
    
        <Sidebar pageName="Diagnosis">
            <Grid gutter="sm" my="25px">

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/support/create-faq">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Create FAQ</p>
                        </a>
                    </Link>
                </Grid.Col>

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/support/manage-faq">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Manage FAQ</p>
                        </a>
                    </Link>
                </Grid.Col>

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/support/support-messages">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Support Messages</p>
                        </a>
                    </Link>
                </Grid.Col>

            </Grid>
        </Sidebar>
    
    </>

}