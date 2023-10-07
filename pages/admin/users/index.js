import { Grid } from "@mantine/core"
import Link from "next/link"
import Sidebar from "../../../components/admin_components/Sidebar"
import Styles from "../../../styles/Admin.module.css"

const Users = () => {

    return <>
    
        <Sidebar pageName="Users">
            
            <Grid gutter="sm" my="25px">

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/users/active">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Active Users</p>
                        </a>
                    </Link>
                </Grid.Col>

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/users/blocked">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Blocked Users</p>
                        </a>
                    </Link>
                </Grid.Col>

            </Grid>

        </Sidebar>
    
    </>

}

export default Users