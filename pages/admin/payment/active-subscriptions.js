import { Anchor, Badge, Breadcrumbs, Center, Group, Loader, Menu, Table } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "../../../components/admin_components/Sidebar"
import AdminStyles from "../../../styles/Admin.module.css"
import { getAdminAuthKey } from "../../../utils/adminAuth";
import { formatDate } from "../../../utils/method";

const ActiveSubcriptions = () => {

    const items = [
        { title: 'Payment', href: '/admin/payment' },
        { title: 'Active Subcriptions', href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const [log, setLog] = useState()

    const columns = [
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Expires',
            cell: row =>
            <>
                <span>{ formatDate(row.expires) }</span>
            </>
        },
        {
            name: 'Status',
            cell: row =>
            <>
                <Badge variant="filled" color="blue">{row.status}</Badge>
            </>
        }
    ];

    const [status, setStatus] = useState(null)

    const getLog = () => {

        setStatus('loading')

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.get('https://abcdmedical.herokuapp.com/api/v1/statistics/allsubs', config)
        .then (res => {
            if (res.status === 200){
                setLog(res.data)
                setStatus('success')
            }

        }).catch (err => console.log(err))

    }

    useEffect(() => {
        getLog()
    },[])

    return <>
    
        <Sidebar pageName="Active Subcriptions">

            <Breadcrumbs
                className={AdminStyles.anchor}
                mt="20px"
            >
                {items}
            </Breadcrumbs>

            <Group direction="column" align="normal" spacing="20px" my="30px">
                {
                    status === "success" &&
                    <DataTable
                        columns={columns}
                        data={log}
                        pagination
                    /> 
                }

                {
                    status === "loading" &&
                    <Center style={{height: "400px", width: "100%"}}>
                        <Loader variant="bars" size="lg" />
                    </Center>
                }
            </Group>

        </Sidebar>
    
    </>
}


export default ActiveSubcriptions