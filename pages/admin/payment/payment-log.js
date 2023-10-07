import { Anchor, Badge, Breadcrumbs, Center, Group, Loader, Menu, Table } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BiBlock } from "react-icons/bi";
import Sidebar from "../../../components/admin_components/Sidebar"
import AdminStyles from "../../../styles/Admin.module.css"
import { getAdminAuthKey } from "../../../utils/adminAuth";
import { formatDate } from "../../../utils/method";

const PaymentLog = () => {

    const items = [
        { title: 'Payment', href: '/admin/payment' },
        { title: 'Payment Log', href: '#' },
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
            name: 'Amount',
            selector: row => row.amount,
            sortable: true,
        },
        {
            name: 'Date',
            cell: row =>
            <>
                <span>{ formatDate(row.date) }</span>
            </>
        },
        {
            name: 'Status',
            cell: row =>
            <>
                {row.status === "success" && <Badge variant="filled" color="green">Success</Badge> }
                {row.status === "failed" && <Badge variant="filled" color="red">Failed</Badge> }
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

        axios.get('https://abcdmedical.herokuapp.com/api/v1/statistics/transactions', config)
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
    
        <Sidebar pageName="Payment Log">

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


export default PaymentLog