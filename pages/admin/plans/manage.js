import { Alert, Anchor, Breadcrumbs, Button, Center, Group, Loader, Menu, Modal, NumberInput, Table, TextInput } from "@mantine/core";
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

const ManagePlans = () => {

    const items = [
        { title: 'Plans', href: '/admin/plans' },
        { title: 'Manage Plans', href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const [status, setStatus] = useState(null)
    
    const [plans, setPlans] = useState([])

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
        },
        {
            name: 'Spaces',
            selector: row => row.spaces,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => 
            <Menu>
                <Menu.Item color="blue" icon={<BiPen />} onClick={() => updatePlan(row._id)}>Edit</Menu.Item>
            </Menu>
        }
    ];
    
    const getPlans = () => {

        setStatus('loading')

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.get('https://abcdmedical.herokuapp.com/api/v1/plans/get', config)
        .then (res => {
            setPlans(res.data.plan)
            console.log(res.data.plan)
            setStatus('success')
        }).catch (err => console.log(err))

    }

    useEffect(() => {
        getPlans()
    }, [])

    //UPDATE PLAN

    const [updateStatus, setUpdateStatus] = useState(null)

    const [planToUpdateId, setPlanToUpdateId] = useState(null)

    const schema = z.object({
        name: z.string().min(1, { message: 'Name is required' }),
        price: z.number().min(1, { message: 'Amount is required' }),
        description: z.string().min(1, { message: 'Description is required' }),
        spaces: z.number().min(1, { message: 'Spaces is required' })
    });

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
          name: '',
          price: 0,
          description: '',
          spaces: 0
        },
    });

    const updatePlan = (planId) => {
        let planToUpdate = plans.find(plan => plan._id == planId)
        setPlanToUpdateId(planId)

        console.log(planToUpdate)
        console.log(planId)

        let formPlan = {
            name: planToUpdate.name,
            price: planToUpdate.price,
            description: planToUpdate.description,
            spaces: planToUpdate.spaces
        }

        form.setValues(formPlan)
    }

    const handleSubmit = (value) => {
        setUpdateStatus('loading')

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        const plan = {...value, id: planToUpdateId}

        console.log(plan)
        
        axios.post("https://abcdmedical.herokuapp.com/api/v1/plans/update", plan, config)
        .then(res => {
            if (res.data.message === "success") {
                let newPlans = plans.filter(plan => plan._id !== planToUpdateId)
                setPlans([...newPlans, {...value, _id: planToUpdateId}])
                setUpdateStatus('success')
            }
        })
        .catch( e => {

            console.log(e)
            setUpdateStatus('request_error')
        })
    }

    return <>
    
        <Sidebar pageName="Manage Plans">

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
                        data={plans}
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
                opened={planToUpdateId !== null}
                onClose={() => setPlanToUpdateId(null)}
                centered
            >
                <form onSubmit={ form.onSubmit((values) => handleSubmit(values)) } onChange={ () => setUpdateStatus(null) }>
                    {
                        (updateStatus !== null && updateStatus.includes("error")) &&
                        <Alert
                        my="15px" 
                        icon={<FiAlertCircle />} 
                        title="Bummer!" 
                        color="red"
                        >
                            { updateStatus === "request_error" && "An error occurred" }
                        </Alert>
                    }
                    {
                        (updateStatus !== null && updateStatus === "success") &&
                        <Alert 
                        my="15px" 
                        icon={<AiFillCheckCircle />} 
                        title="Success" 
                        color="green"
                        >
                            Plan updated successfully
                        </Alert>
                    }

                    <Group direction="column" align="normal" spacing="20px" mb="30px" mt="10px">
                        <TextInput
                            label="Name"
                            placeholder="Individual"
                            {...form.getInputProps('name')}
                        />

                        <NumberInput
                            placeholder="1000"
                            label="Amount"
                            hideControls
                            icon="₦"
                            {...form.getInputProps('price')}
                        />

                        <TextInput
                            label="Description *(₦1000 deducted every 30 days)"
                            placeholder="₦1000 deducted every 30 days"
                            {...form.getInputProps('description')}
                        />

                        <NumberInput
                            placeholder="1"
                            label="Spaces (Number of people that can be added to plan)"
                            hideControls
                            {...form.getInputProps('spaces')}
                        />

                        <div>
                            <Button
                                classNames={{
                                    filled: AdminStyles.button,
                                }}
                                type="submit"
                                loading={updateStatus === 'loading'}
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


export default ManagePlans