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

const ManageAntibioticsGuide = () => {

    const items = [
        { title: 'Medical', href: '/admin/medical' },
        { title: 'Manage Antibiotics Guide', href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const customStyles = {
        cells: {
            style: {
                width: "150px",
            },
        },
    };

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
        },
        {
            name: 'Without Penicillin',
            cell: row => 
            <Text my="5px" size="sm">
                {row.withoutPenicillin}
            </Text>,
            sortable: true,
        },
        {
            name: 'With Penicillin',
            cell: row => 
            <Text my="5px" size="sm">
                {row.withPenicillin}
            </Text>,
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

    const [guide, setGuide] = useState([])

    const [status, setStatus] = useState(null)

    const getGuide = () => {

        setStatus('loading')

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.get('https://abcdmedical.herokuapp.com/api/v1/diagnosis/antibiotic/get', config)
        .then (res => {
            if (res.status === 200){
                setGuide(res.data)
                setStatus('success')
            }
        }).catch (err => console.log(err))

    }

    useEffect(() => {
        getGuide()
    }, [])

    const deleteGuide = () => {
        
        const guide = {
            id: guideToDelete
        }

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.post('https://abcdmedical.herokuapp.com/api/v1/diagnosis/antibiotic/delete', guide ,config)
        .then (res => {
            if (res.data.message === "success"){
                let filteredGuides = guide.filter(a => a.id !== guideToDelete)
                setGuide(filteredGuides)
            }

        }).catch (err => console.log(err))
        .finally(() => {
            setGuideToDelete(null)
            setModal(false)
        })
    }

    const [modal, setModal] = useState(false)

    const [guideToDelete, setGuideToDelete] = useState(null)

    const openModal = (id) => {
        setGuideToDelete(id)
        setModal(true)
    }

    const [updateModal, setUpdateModal] = useState(false)

    const openEditModal = (guide) => {
        form.setValues(guide)
        setUpdateModal(true)
    }

    const schema = z.object({
        name: z.string().min(1, { message: 'Field is required' }),
        withPenicillin: z.string().min(1, { message: 'Field is required' }),
        withoutPenicillin: z.string().min(1, { message: 'Field is required' }),
    });

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
          id: '',
          category: '',
          name: '',
          withPenicillin: '',
          withoutPenicillin: ''
        },
    });

    const [updateStatus, setUpdateStatus] = useState(null)

    const updateGuide = (value) => {
        console.log(value)

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.post('https://abcdmedical.herokuapp.com/api/v1/diagnosis/antibiotic/update', value ,config)
        .then (res => {
            if (res.data.message === "success"){
                let filteredGuide = guide.filter(a => a.id !== value.id)

                let newGuide = [...filteredGuide, value]
                setGuide(newGuide)
                setUpdateStatus("success")

                setTimeout(() => {
                    setUpdateModal(false)
                    setUpdateStatus(null)
                }, [2000])

            }else if (res.data.message === "failed" && res.data.reason === 'name already exist'){
                setUpdateStatus("guide_error")
            }

        }).catch (err => {
            console.log(err)
            setUpdateStatus("request_error")
        })
    }

    return <>
    
        <Sidebar pageName="Manage Antibiotics Guide">

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
                        data={guide}
                        pagination
                        customStyles={customStyles}
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
                    <Text color="gray" size="sm" mb="15px">Are you sure you want to delete guide</Text>

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
                                onClick={() => deleteGuide(guideToDelete)}
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
                    <Text mb="10px">Edit Guide</Text>
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
                            { updateStatus === "guide_error" && "Name already in use"}
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
                            Guide Updated
                        </Alert>
                    }

                    <form onSubmit={ form.onSubmit((values) => updateGuide(values))}>

                        <Group direction="column" align="normal" spacing="10px">
                            <TextInput
                                label="Antibiotics Guide Name"
                                {...form.getInputProps('name')}
                            />

                            <Textarea
                                label="Antibiotics guide (has penicillin allergy) "
                                minRows={5}
                                {...form.getInputProps('withPenicillin')}
                            />

                            <Textarea
                                mb="10px"
                                label="Antibiotics guide (without penicillin allergy)"
                                minRows={5}
                                {...form.getInputProps('withoutPenicillin')}
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

export default ManageAntibioticsGuide