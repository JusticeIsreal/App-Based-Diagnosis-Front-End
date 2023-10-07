import { Anchor, Breadcrumbs, Button, Center, Grid, Group, Loader, Menu, Modal, Table, Text } from "@mantine/core"
import DataTable from 'react-data-table-component';
import Sidebar from "../../../components/admin_components/Sidebar"
import AdminStyles from "../../../styles/Admin.module.css"
import { BsTrash } from "react-icons/bs"
import { useEffect, useState } from "react";
import { getAdminAuthKey } from "../../../utils/adminAuth";
import axios from "axios";
import { BiTrash } from "react-icons/bi";

const ManageInAppNotification = () => {

    const items = [
        { title: 'Notifications', href: '/admin/notifications' },
        { title: 'Manage In App Notifications', href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Message',
            selector: row => row.message,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row =>
            <Menu>
                <Menu.Item color="red" icon={<BiTrash />} onClick={() => openModal(row.id)}>Delete</Menu.Item>
            </Menu>
        },
    ];

    const [notifs, setNotifs] = useState([])

    const [status, setStatus] = useState(null)

    const getNotifs = () => {

        setStatus('loading')

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.get('https://abcdmedical.herokuapp.com/api/v1/admin/notifications', config)
        .then (res => {
            if (res.status === 200){
                setNotifs(res.data)
                setStatus('success')
            }
        }).catch (err => console.log(err))

    }

    useEffect(() => {
        getNotifs()
    }, [])

    const [modal, setModal] = useState(false)

    const [notifToDelete, setNotifToDelete] = useState(null)

    const openModal = (id) => {
        setNotifToDelete(id)
        setModal(true)
    }

    const deleteNotif = () => {

        const notif = {
            id: notifToDelete
        }

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.post('https://abcdmedical.herokuapp.com/api/v1/admin/deletenotifs', notif ,config)
        .then (res => {
            if (res.data.message === "Success"){
                let filteredNotifs = notifs.filter(n => n.id !== notifToDelete)
                setNotifs(filteredNotifs)
            }

        }).catch (err => console.log(err))
        .finally(() => {
            setNotifToDelete(null)
            setModal(false)
        })
    }

    return <>
    
        <Sidebar pageName="Manage In App Notifications">

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
                        data={notifs}
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

            <Modal
                opened={modal}
                centered
                withCloseButton={false}
                onClose={() => setModal(false)}
            >  
                <div>
                    <Text mb="10px">Proceed with action</Text>
                    <Text color="gray" size="sm" mb="15px">Are you sure you want to delete this notification</Text>

                    <Grid gutter="lg">

                        <Grid.Col span={6}>
                            <Button
                                styles={{
                                    filled: { background: "crimson", '&:hover': {background: "crimson"} },
                                }}
                                style={{width: "100%"}}
                                onClick={() => setModal(false)}
                            >
                                Cancel
                            </Button>
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <Button
                                classNames={{
                                    filled: AdminStyles.button,
                                }}
                                style={{width: "100%"}}
                                onClick={() => deleteNotif()}
                            >
                                Delete
                            </Button>
                        </Grid.Col>

                    </Grid>
                </div>
            </Modal>

        </Sidebar>
    
    </>

}

export default ManageInAppNotification