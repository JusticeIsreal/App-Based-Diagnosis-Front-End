import { Alert, Anchor, Breadcrumbs, Button, Center, Grid, Group, Loader, Menu, Modal, PasswordInput, Select, Table, Text, Textarea, TextInput } from "@mantine/core"
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

const ManageFaq = () => {

    const items = [
        { title: 'Support', href: '/admin/support' },
        { title: 'Manage Faq', href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const columns = [
        {
            name: 'Question',
            selector: row => row.question,
            sortable: true,
        },
        {
            name: 'Answer',
            selector: row => row.answer,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => <>
                <Menu>
                    <Menu.Item color="blue" onClick={() => openEditModal(row)} icon={<CgPen /> }>Edit</Menu.Item>
                    <Menu.Item color="red" onClick={() => openModal(row.id)} icon={<BsTrash /> }>Delete</Menu.Item>
                </Menu>
            </>
        }
    ];

    const [faqs, setFaqs] = useState([])

    const [status, setStatus] = useState(null)

    const getFaqs = () => {

        setStatus('loading')

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.get('https://abcdmedical.herokuapp.com/api/v1/faq/get', config)
        .then (res => {
            if (res.status === 200){
                setFaqs(res.data)
                setStatus('success')
            }
        }).catch (err => console.log(err))

    }

    useEffect(() => {
        getFaqs()
    }, [])

    const deleteFaq = () => {
        
        const faq = {
            id: faqToDelete
        }

        // console.log(faq)

        // return;

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.post('https://abcdmedical.herokuapp.com/api/v1/faq/delete', faq ,config)
        .then (res => {
            if (res.data.message === "success"){
                let filteredFaqs = faqs.filter(a => a.id !== faqToDelete)
                setFaqs(filteredFaqs)
            }

        }).catch (err => console.log(err))
        .finally(() => {
            setFaqToDelete(null)
            setModal(false)
        })
    }

    const [modal, setModal] = useState(false)

    const [faqToDelete, setFaqToDelete] = useState(null)

    const openModal = (id) => {
        setFaqToDelete(id)
        setModal(true)
    }

    const [updateModal, setUpdateModal] = useState(false)

    const openEditModal = (faq) => {
        form.setValues(faq)
        setUpdateModal(true)
    }

    const schema = z.object({
        id: z.string().min(1, { message: 'Please enter a valid id' }),
        question: z.string().min(1, { message: 'Field is required' }),
        answer: z.string().min(1, { message: 'Field is required' }),
    });

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
            id: '',
            question: '',
            answer: ''
        },
    });

    const [updateStatus, setUpdateStatus] = useState(null)

    const updateFaq = (value) => {

        setUpdateStatus("loading")

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.post('https://abcdmedical.herokuapp.com/api/v1/faq/update', value ,config)
        .then (res => {
            if (res.data.message === "success"){
                let filteredFaqs = faqs.filter(a => a.id !== value.id)

                let newFaqs = [...filteredFaqs, value]
                setFaqs(newFaqs)
                setUpdateStatus("success")

                setTimeout(() => {
                    setUpdateModal(false)
                    setUpdateStatus(null)
                }, [2000])

            }else if (res.data.message === "failed"){
                setUpdateStatus("error")
            }

        }).catch (err => {
            console.log(err)
            setUpdateStatus("error")
        })
    }

    return <>
    
        <Sidebar pageName="Manage Faq">

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
                        data={faqs}
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
                    <Text color="gray" size="sm" mb="15px">Are you sure you want to delete faq</Text>

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
                                onClick={() => deleteFaq()}
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
                    <Text mb="10px">Edit Faq</Text>

                    {
                        (updateStatus !== null && updateStatus === "error") &&
                        <Alert
                            mb="15px" 
                            icon={<FiAlertCircle />} 
                            title="Bummer!" 
                            color="red"
                            style={{maxWidth: "400px"}}
                        >
                            An Error has occurred
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
                            Faq Updated
                        </Alert>
                    }

                    <form onSubmit={ form.onSubmit((values) => updateFaq(values))}>

                        <Group direction="column" align="normal" spacing="20px">
                            <TextInput
                                label="Question"
                                placeholder="question"
                                {...form.getInputProps('question')}
                            />

                            <Textarea
                                label="Answer"
                                placeholder="answer"
                                minRows={5}
                                {...form.getInputProps('answer')}
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

export default ManageFaq