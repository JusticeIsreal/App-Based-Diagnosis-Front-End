import { Grid } from "@mantine/core"
import Link from "next/link"
import Sidebar from "../../../components/admin_components/Sidebar"
import Styles from "../../../styles/Admin.module.css"

const Plans = () => {

    return <>
    
        <Sidebar pageName="Plans">
            
            <Grid gutter="sm" my="25px">

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/plans/create">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Create Plans</p>
                        </a>
                    </Link>
                </Grid.Col>

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/plans/manage">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Manage Plans</p>
                        </a>
                    </Link>
                </Grid.Col>

            </Grid>

        </Sidebar>
    
    </>

}

export default Plans