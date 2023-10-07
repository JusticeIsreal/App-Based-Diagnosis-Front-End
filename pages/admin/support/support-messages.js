import { Alert, Anchor, Badge, Breadcrumbs, Button, Center, Group, Loader, Menu, Modal, NumberInput, Textarea, TextInput } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BiPen } from "react-icons/bi";
import Sidebar from "../../../components/admin_components/Sidebar"
import AdminStyles from "../../../styles/Admin.module.css"
import { getAdminAuthKey } from "../../../utils/adminAuth";
import { z } from "zod"
import { zodResolver, useForm } from "@mantine/form"
import { FiAlertCircle } from "react-icons/fi";
import { AiFillCheckCircle } from "react-icons/ai";

const SupportMessages = () => {

    const items = [
        { title: 'Support', href: '/admin/support' },
        { title: 'Support Messages', href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const [status, setStatus] = useState(null)
    
    const [messages, setMessages] = useState([])

    const columns = [
        {
            name: 'Sender',
            selector: row => row.sender,
            sortable: true,
        },
        {
            name: 'Message',
            selector: row => row.message,
            sortable: true,
        },
        {
            name: 'Status',
            sortable: true,
            cell: row => 
            <>
                { row.status === 'new' && <Badge variant="filled" color="blue">{row.status}</Badge> }
                { row.status === 'treated' && <Badge variant="filled" color="green">{row.status}</Badge> }
                { row.status === 'open' && <Badge variant="filled" color="yellow">{row.status}</Badge> }
            </>
        },
        {
            name: 'Actions',
            cell: row => 
            <Menu>
                <Menu.Item color="blue" icon={<BiPen />} onClick={() => replyToMessage({id: row.id, reply: row.reply})}>Edit</Menu.Item>
            </Menu>
        }
    ];
    
    const getMessages = () => {

        setStatus('loading')

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.get('https://abcdmedical.herokuapp.com/api/v1/support/getAll', config)
        .then (res => {
            if (res.status === 200){
                setMessages(res.data)
                setStatus('success')
            }
        }).catch (err => console.log(err))

    }

    useEffect(() => {
        getMessages()
    }, [])

    //REPLY TO MESSAGE

    const [replyStatus, setReplyStatus] = useState(null)

    // const [messageToReplyTo, setMessageToReplyTo] = useState(null)

    const schema = z.object({
        id: z.string().min(1, { message: 'Id is required' }),
        reply: z.string().min(1, { message: 'Reply is required' }),
    });

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
            id: '',
            reply: '',
        },
    });

    const replyToMessage = (message) => {
        form.setValues(message)
    }

    const handleSubmit = (value) => {
        setReplyStatus('loading')

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }
        
        axios.post("https://abcdmedical.herokuapp.com/api/v1/support/reply", value, config)
        .then(res => {
            if (res.data.message === "success") {
                setReplyStatus('success')
            }
        })
        .catch( e => {

            console.log(e)
            setReplyStatus('request_error')
        })
    }

    return <>
    
        <Sidebar pageName="Support Message">

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
                        data={messages}
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
                opened={form.values.id !== ''}
                onClose={() => form.setFieldValue('id', '')}
                centered
                withCloseButton={false}
            >
                <form onSubmit={ form.onSubmit((values) => handleSubmit(values)) } onChange={ () => setReplyStatus(null) }>
                    {
                        (replyStatus !== null && replyStatus.includes("error")) &&
                        <Alert
                        my="15px" 
                        icon={<FiAlertCircle />} 
                        title="Bummer!" 
                        color="red"
                        >
                            { replyStatus === "request_error" && "An error occurred" }
                        </Alert>
                    }
                    {
                        (replyStatus !== null && replyStatus === "success") &&
                        <Alert 
                        my="15px" 
                        icon={<AiFillCheckCircle />} 
                        title="Success" 
                        color="green"
                        >
                            Message replied to successfully
                        </Alert>
                    }

                    <Group direction="column" align="normal" spacing="20px" mb="30px" mt="10px">

                        <Textarea
                            label="Reply"
                            placeholder="Message"
                            minRows={5}
                            {...form.getInputProps('reply')}
                        />

                        <div>
                            <Button
                                classNames={{
                                    filled: AdminStyles.button,
                                }}
                                type="submit"
                                loading={replyStatus === 'loading'}
                            >
                                Update
                            </Button>
                        </div>
                    
                    </Group>
                </form>
            </Modal>

        </Sidebar>
    
    </>
}


export default SupportMessages