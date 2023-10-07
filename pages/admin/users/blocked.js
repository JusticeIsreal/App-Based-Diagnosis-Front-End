import { Alert, Anchor, Badge, Breadcrumbs, Button, Center, Grid, Group, Loader, Menu, Modal, Text, Textarea, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { CgUnblock } from "react-icons/cg";
import Sidebar from "../../../components/admin_components/Sidebar"
import AdminStyles from "../../../styles/Admin.module.css"
import DataTable from "react-data-table-component"
import { getAdminAuthKey } from "../../../utils/adminAuth";
import axios from "axios";
import { formatDate } from "../../../utils/method";
import { BiEnvelope } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";
import { AiFillCheckCircle } from "react-icons/ai";
import {z} from "zod"
import { useForm, zodResolver } from "@mantine/form"

const BlockedUsers = () => {

    const items = [
        { title: 'Users', href: '/admin/users' },
        { title: 'Blocked Users', href: '#' },
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
            name: 'Join Date',
            cell: row =>
            <>
                <span>{ formatDate(row.joined) }</span>
            </>
        },
        {
            name: 'Status',
            cell: row =>
            <>
                {row.status === "open" && <Badge variant="filled" color="green">Active</Badge> }
                {row.status === "blocked" && <Badge variant="filled" color="red">Blocked</Badge> }
            </>
        },
        {
            name: 'Actions',
            cell: row => 
            <Menu>
            <Menu.Item color="blue" icon={<BiEnvelope /> } onClick={() => openMailModal(row.email)}>Send Mail</Menu.Item>
                <Menu.Item color="green" icon={<CgUnblock /> } onClick={() => openModal(row.email)}>Unblock</Menu.Item>
            </Menu>
        }
    ];

    const [users, setUsers] = useState(null)

    const [status, setStatus] = useState(null)

    const getBlockedUsers = () => {

        setStatus('loading')

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.get('https://abcdmedical.herokuapp.com/api/v1/statistics/users', config)
        .then (res => {
            if (res.status === 200){
                console.log(res.data)
                setUsers(res.data.filter(user => user.status === 'blocked'))
                setStatus('success')
            }

        }).catch (err => console.log(err))

    }

    useEffect(() => {
        getBlockedUsers()
    }, [])

    const unBlockUser = () => {
        
        const user = {
            email: userToUnBlock
        }

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.post('https://abcdmedical.herokuapp.com/api/v1/users/unblock', user,config)
        .then (res => {
            if (res.data.message === "success"){
                let filteredUsers = users.filter(user => user.email !== userToUnBlock)
                setUsers(filteredUsers)
            }

        }).catch (err => console.log(err))
        .finally(() => {
            setUserToUnBlock(null)
            setModal(false)
        })
    }

    const [modal, setModal] = useState(false)

    const [userToUnBlock, setUserToUnBlock] = useState(null)

    const openModal = (email) => {
        setUserToUnBlock(email)
        setModal(true)
    }

    const [mailModal, setMailModal] = useState(false)

    const openMailModal = (email) => {
        mailForm.setFieldValue("email", email)
        setMailModal(true)
    }

    const mailSchema = z.object({
        email: z.string().email({ message: 'Please enter a valid email' }),
        subject: z.string().min(1, { message: 'Field is required' }),
        message: z.string().min(1, { message: 'Field is required' })
    });

    const mailForm = useForm({
        schema: zodResolver(mailSchema),
        initialValues: {
          email: '',
          subject: '',
          message: '',
        },
    });

    const [mailStatus, setMailStatus] = useState(null)

    const sendMail = (mail) => {

        setMailStatus("loading")

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.post('https://abcdmedical.herokuapp.com/api/v1/statistics/sendsinglemail', mail ,config)
        .then (res => {
            if (res.data.message === "success"){
                setMailStatus("success")
                
                setTimeout(() => {
                    setMailModal(false)
                    setMailStatus(null)
                }, [3000])
            }else{
                setMailStatus("error")
            }

        }).catch (err => {
            console.log(err)
            setMailStatus("error")
        })
    }

    return <>
    
        <Sidebar pageName="Blocked Users">

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
                        data={users}
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
                    <Text color="gray" size="sm" mb="15px">Unblocked User will be able to login</Text>

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
                                onClick={() => unBlockUser()}
                            >
                                Unblock
                            </Button>
                        </Grid.Col>

                    </Grid>
                </div>
            </Modal>

            <Modal
                opened={mailModal}
                centered
                withCloseButton={false}
                onClose={() => setMailModal(false)}
            >  
                <div>
                    <Text mb="10px">Proceed with action</Text>
                    {/* <Text color="gray" size="sm" mb="15px">Blocked User won&apso;t be able to login</Text> */}

                    <form onSubmit={mailForm.onSubmit((value) => sendMail(value))}>

                        {
                            (mailStatus !== null && mailStatus.includes("error")) &&
                            <Alert
                                mb="15px" 
                                icon={<FiAlertCircle />} 
                                title="Bummer!" 
                                color="red"
                                style={{maxWidth: "400px"}}
                            >
                                An Error has occurred. Try again later
                            </Alert>
                        }
                        {
                            (mailStatus !== null && mailStatus === "success") &&
                            <Alert 
                                mb="15px" 
                                icon={<AiFillCheckCircle />} 
                                title="Success" 
                                color="green"
                                style={{maxWidth: "400px"}}
                            >
                                Email Sent Successfully
                            </Alert>
                        }

                        <TextInput
                            label="Email Subject"
                            placeholder="Header"
                            mb="10px"
                            {...mailForm.getInputProps('subject')}
                        />

                        <Textarea
                            label="Email Body"
                            placeholder="Message"
                            minRows={5}
                            mb="15px"
                            {...mailForm.getInputProps('message')}
                        />

                        <Grid gutter="lg">

                            <Grid.Col span={6}>
                                <Button
                                    styles={{
                                        filled: { background: "crimson", '&:hover': {background: "crimson"} },
                                    }}
                                    style={{width: "100%"}}
                                    type="button"
                                    onClick={() => setMailModal(false)}
                                >
                                    Cancel
                                </Button>
                            </Grid.Col>

                            <Grid.Col span={6}>
                                <Button
                                    classNames={{
                                        filled: AdminStyles.button,
                                    }}
                                    type="submit"
                                    style={{width: "100%"}}
                                    loading={mailStatus === "loading"}
                                >
                                    Send Email
                                </Button>
                            </Grid.Col>

                        </Grid>
                    </form>
                </div>
            </Modal>

        </Sidebar>
    
    </>
}


export default BlockedUsers