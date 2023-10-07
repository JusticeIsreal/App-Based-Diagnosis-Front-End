import { Alert, Anchor, Breadcrumbs, Button, Group, NumberInput, Text, TextInput } from "@mantine/core"
import Sidebar from "../../../components/admin_components/Sidebar"
import AdminStyles from "../../../styles/Admin.module.css"
import { z } from "zod"
import { useForm, zodResolver } from "@mantine/form"
import { FiAlertCircle } from "react-icons/fi"
import { useState } from "react"
import { AiFillCheckCircle } from "react-icons/ai"
import axios from "axios"
import { getAdminAuthKey } from "../../../utils/adminAuth"

const CreatePlan = () => {

    const items = [
        { title: 'Plans', href: '/admin/plans' },
        { title: 'Create Plan', href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

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

    const [status, setStatus] = useState(null)

    const handleSubmit = (plan) => {

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }
        
        axios.post("https://abcdmedical.herokuapp.com/api/v1/plans/create", plan, config)
        .then(res => {
            setStatus('success')
        })
        .catch( e => {
            if(e.response.data?.message === "Please make sure all fields are filled"){
                setStatus('form_error')
                return;
            }
            
            if(e.response.data?.message === "Plan name  is in use"){
                setStatus('plan_error')
                return;
            }

            console.log(e)
            setStatus('request_error')
        })

    }

    return <>
    
        <Sidebar pageName="Create Plan">

            <Breadcrumbs
                className={AdminStyles.anchor}
                mt="20px"
            >
                {items}
            </Breadcrumbs>

            <form onSubmit={ form.onSubmit((values) => handleSubmit(values)) } onChange={ () => setStatus(null) }>
                {
                    (status !== null && status.includes("error")) &&
                    <Alert 
                    my="15px" 
                    icon={<FiAlertCircle />} 
                    title="Bummer!" 
                    color="red"
                    >
                        { status === "form_error" && "Please make sure all fields are filled" } 
                        { status === "plan_error" && "Plan name already in use (Update plan to change details)" }
                        { status === "request_error" && "An error occurred" }
                    </Alert>
                }
                {
                    (status !== null && status === "success") &&
                    <Alert 
                    my="15px" 
                    icon={<AiFillCheckCircle />} 
                    title="Success" 
                    color="green"
                    >
                        Plan created successfully
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
                        >
                            Create
                        </Button>
                    </div>
                
                </Group>
            </form>

        </Sidebar>
    
    </>

}

export default CreatePlan