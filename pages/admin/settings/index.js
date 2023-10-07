import { Grid } from "@mantine/core"
import Link from "next/link"
import Sidebar from "../../../components/admin_components/Sidebar"
import Styles from "../../../styles/Admin.module.css"

const Settings = () => {

    return <>
    
        <Sidebar pageName="Settings">
            
            <Grid gutter="sm" my="25px">

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/settings/admins-management">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Admin Management</p>
                        </a>
                    </Link>
                </Grid.Col>

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/settings/add-admin">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Add Admin</p>
                        </a>
                    </Link>
                </Grid.Col>

            </Grid>

        </Sidebar>
    
    </>

}

export default Settings