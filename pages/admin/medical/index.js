import Sidebar from "../../../components/admin_components/Sidebar"
import { Grid } from "@mantine/core"
import Styles from "../../../styles/Admin.module.css"
import Link from "next/link"

export default function DiagnosisPage () {


    return <>
    
        <Sidebar pageName="Diagnosis">
            <Grid gutter="sm" my="25px">

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/medical/add-antibiotic-guide">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Add Antibiotics Guide</p>
                        </a>
                    </Link>
                </Grid.Col>

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/medical/manage-antibiotic-guide">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Manage Antibiotics Guide</p>
                        </a>
                    </Link>
                </Grid.Col>

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/medical/add-antibiotic-category">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Add Antibiotics Category</p>
                        </a>
                    </Link>
                </Grid.Col>

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/medical/manage-antibiotic-category">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Manage Antibiotics Category</p>
                        </a>
                    </Link>
                </Grid.Col>

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/medical/add-clinical-guide">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Add Clinical Guide</p>
                        </a>
                    </Link>
                </Grid.Col>
                
                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/medical/manage-clinical-guide">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Manage Clinical Guide</p>
                        </a>
                    </Link>
                </Grid.Col>

                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/medical/add-clinical-category">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Add Clinical Category</p>
                        </a>
                    </Link>
                </Grid.Col>
                
                <Grid.Col span={12} xs={6} sm={4}>
                    <Link href="/admin/medical/manage-clinical-category">
                        <a className={Styles.navigation_card}>
                            <p className={Styles.navigation_card_header}>Manage Clinical Category</p>
                        </a>
                    </Link>
                </Grid.Col>

            </Grid>
        </Sidebar>
    
    </>

}