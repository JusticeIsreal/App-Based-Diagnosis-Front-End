import { Alert, Anchor, Breadcrumbs, Button, Center, Grid, Group, Loader, Menu, Modal, PasswordInput, Select, Table, Text, TextInput } from "@mantine/core"
import DataTable from 'react-data-table-component';
import Sidebar from "../../../components/admin_components/Sidebar"
import AdminStyles from "../../../styles/Admin.module.css"
import { BsTrash } from "react-icons/bs"
import { useEffect, useState } from "react";
import { getAdminAuthKey } from "../../../utils/adminAuth";
import axios from "axios";
import { FiAlertCircle } from "react-icons/fi";
import { AiFillCheckCircle } from "react-icons/ai";
import { useForm, zodResolver } from "@mantine/form"
import { z } from "zod"
import { CgPen } from "react-icons/cg";

const AdminManagment = () => {

    const items = [
        { title: 'Settings', href: '/admin/settings' },
        { title: 'Admins Managment', href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const columns = [
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => <>
                <Menu>
                    <Menu.Item color="blue" onClick={() => openEditModal(row)} icon={<CgPen /> }>Edit</Menu.Item>
                    <Menu.Item color="red" onClick={() => openModal(row.email)} icon={<BsTrash /> }>Delete</Menu.Item>
                </Menu>
            </>
        }
    ];

    const [admins, setAdmins] = useState([])

    const [status, setStatus] = useState(null)

    const getAdmins = () => {

        setStatus('loading')

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.get('https://abcdmedical.herokuapp.com/api/v1/admin/all', config)
        .then (res => {
            if (res.status === 200){
                setAdmins(res.data.admins)
                setStatus('success')
            }
        }).catch (err => console.log(err))

    }

    useEffect(() => {
        getAdmins()
    }, [])

    const deleteAdmin = () => {
        
        const admin = {
            email: adminToDelete
        }

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.post('https://abcdmedical.herokuapp.com/api/v1/admin/delete', admin ,config)
        .then (res => {
            if (res.data.message === "success"){
                let filteredAdmins = admins.filter(a => a.email !== adminToDelete)
                setAdmins(filteredAdmins)
            }

        }).catch (err => console.log(err))
        .finally(() => {
            setAdminToDelete(null)
            setModal(false)
        })
    }

    const [modal, setModal] = useState(false)

    const [adminToDelete, setAdminToDelete] = useState(null)

    const openModal = (email) => {
        setAdminToDelete(email)
        setModal(true)
    }

    const [updateModal, setUpdateModal] = useState(false)

    const openEditModal = (admin) => {
        let newAdmin = {
            oldMail: admin.email,
            role: admin.role,
            email: admin.email,
            password: ''
        }
        form.setValues(newAdmin)
        setUpdateModal(true)
    }

    const schema = z.object({
        oldMail: z.string().email({ message: 'Please enter a valid Email address' }),
        role: z.string().min(1, { message: 'Field is required' }),
        email: z.string().email({ message: 'Please enter a valid Email address' }),
        password: z.string().min(1, { message: 'Field is required' }),
    });

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
          oldMail: '',
          role: '',
          email: '',
          password: ''
        },
    });

    const [updateStatus, setUpdateStatus] = useState(null)

    const updateAdmin = (value) => {
        console.log(value)

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.post('https://abcdmedical.herokuapp.com/api/v1/admin/updateinfo', value ,config)
        .then (res => {
            if (res.data.message === "success"){
                let filteredAdmins = admins.filter(a => a.email !== value.oldMail)
                let updatedAdmin = admins.find(a => a.email === value.oldMail)

                let newAdmins = [...filteredAdmins, {username: updatedAdmin.username, role: value.role, email: value.email}]
                setAdmins(newAdmins)
                setUpdateStatus("success")

                setTimeout(() => {
                    setUpdateModal(false)
                    setUpdateStatus(null)
                }, [2000])

            }else if (res.data.message === "failed" && res.data.reason === 'email already exists'){
                setUpdateStatus("admin_error")
            }

        }).catch (err => {
            console.log(err)
            setUpdateStatus("request_error")
        })
    }

    return <>
    
        <Sidebar pageName="Admins Managements">

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
                        data={admins}
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
                onClose={() => setModal(false)}
                withCloseButton={false}
            >
                <div>
                    <Text mb="10px">Proceed with action</Text>
                    <Text color="gray" size="sm" mb="15px">Are you sure you want to delete admin</Text>

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
                                onClick={() => deleteAdmin(adminToDelete)}
                            >
                                Delete
                            </Button>
                        </Grid.Col>

                    </Grid>
                </div>
            </Modal>

            <Modal
                opened={updateModal}
                centered
                withCloseButton={false}
                onClose={() => setUpdateModal(false)}
            >  
                <div>
                    <Text mb="10px">Edit Admin</Text>
                    {/* <Text color="gray" size="sm" mb="15px">Blocked User won&lsquo;t be able to login</Text> */}

                    {
                        (updateStatus !== null && updateStatus.includes("error")) &&
                        <Alert
                            mb="15px" 
                            icon={<FiAlertCircle />} 
                            title="Bummer!" 
                            color="red"
                            style={{maxWidth: "400px"}}
                        >
                            { updateStatus === "request_error" && "An Error has occurred"}
                            { updateStatus === "admin_error" && "Email already in use"}
                        </Alert>
                    }
                    {
                        (updateStatus !== null && updateStatus === "success") &&
                        <Alert 
                            mb="15px" 
                            icon={<AiFillCheckCircle />} 
                            title="Success" 
                            color="green"
                            style={{maxWidth: "400px"}}
                        >
                            Admin Updated
                        </Alert>
                    }

                    <form onSubmit={ form.onSubmit((values) => updateAdmin(values))}>

                        <Group direction="column" align="normal" spacing="20px">
                            <TextInput
                                label="Admin Email"
                                {...form.getInputProps('email')}
                            />

                            <Select
                                label="Role"
                                data={[
                                    "admin",
                                ]}
                                {...form.getInputProps('role')}
                            />

                            <PasswordInput
                                label="Password"
                                {...form.getInputProps('password')}
                            />

                            <Grid gutter="lg">

                                <Grid.Col span={6}>
                                    <Button
                                        styles={{
                                            filled: { background: "crimson", '&:hover': {background: "crimson"} },
                                        }}
                                        style={{width: "100%"}}
                                        type="button"
                                        onClick={() => setUpdateModal(false)}
                                    >
                                        Cancel
                                    </Button>
                                </Grid.Col>

                                <Grid.Col span={6}>
                                    <Button
                                        classNames={{
                                            filled: AdminStyles.button,
                                        }}
                                        loading={updateStatus === "loading"}
                                        type="submit"
                                        style={{width: "100%"}}
                                    >
                                        Update
                                    </Button>
                                </Grid.Col>

                            </Grid>
                        
                        </Group>

                    </form>
                </div>
            </Modal>

        </Sidebar>
    
    </>

}

export default AdminManagment