import { Anchor, Breadcrumbs, Button, Center, Grid, Group, Loader, Menu, Modal, Table, Text } from "@mantine/core"
import DataTable from 'react-data-table-component';
import Sidebar from "../../../components/admin_components/Sidebar"
import AdminStyles from "../../../styles/Admin.module.css"
import { BsTrash } from "react-icons/bs"
import { useEffect, useState } from "react";
import { getAdminAuthKey } from "../../../utils/adminAuth";
import axios from "axios";
import { BiTrash } from "react-icons/bi";
import { useRouter } from "next/router";

const ManageClinicalCategory = () => {

    const items = [
        { title: 'Medical', href: '/admin/medical' },
        { title: 'Manage Clinical Category', href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const router = useRouter()

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Parent',
            cell: row =>
            <>
                { row.parent && row.parent }
                { !row.parent && "No parent" }
            </>
        },
        {
            name: 'Action',
            cell: row =>
            <Menu>
                <Menu.Item color="red" icon={<BiTrash />} onClick={() => openModal(row.id)}>Delete</Menu.Item>
            </Menu>
        },
    ];

    const [categories, setCategories] = useState([])

    const [status, setStatus] = useState(null)

    const getCategories = () => {

        setStatus('loading')

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.get('https://abcdmedical.herokuapp.com/api/v1/categories/clinical/get', config)
        .then (res => {
            if (res.status === 200){
                setCategories(res.data)
                console.log(res.data)
                setStatus('success')
            }
        }).catch (err => console.log(err))

    }

    useEffect(() => {
        getCategories()
    }, [])

    const [modal, setModal] = useState(false)

    const [categoryToDelete, setCategoryToDelete] = useState(null)

    const openModal = (id) => {
        setCategoryToDelete(id)
        setModal(true)
    }

    const deleteCategory = () => {

        const category = {
            id: categoryToDelete
        }

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.post('https://abcdmedical.herokuapp.com/api/v1/categories/clinical/delete', category ,config)
        .then (res => {
            if (res.data.message === "success"){
                router.reload(window.location.pathname)
            }

        }).catch (err => console.log(err))
        .finally(() => {
            setCategoryToDelete(null)
            setModal(false)
        })
    }

    return <>
    
        <Sidebar pageName="Manage Clinical Category">

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
                        data={categories}
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
                    <Text color="gray" size="sm" mb="15px">Are you sure you want to delete this category (Deleting a parent category will also delete it&apos;s child category)</Text>

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
                                onClick={() => deleteCategory()}
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

export default ManageClinicalCategory