import { Alert, Anchor, Breadcrumbs, Button, Group, PasswordInput, Select, Text, TextInput } from "@mantine/core"
import Sidebar from "../../../components/admin_components/Sidebar"
import AdminStyles from "../../../styles/Admin.module.css"
import { useForm, zodResolver } from "@mantine/form"
import { z } from "zod"
import { useState } from "react"
import axios from "axios"
import { getAdminAuthKey } from "../../../utils/adminAuth"
import { AiFillCheckCircle } from "react-icons/ai"
import { FiAlertCircle } from "react-icons/fi"

const AddAdmin = () => {

    const items = [
        { title: 'Settings', href: '/admin/settings' },
        { title: 'Add Admin', href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const schema = z.object({
        email: z.string().email({ message: 'Enter a valid email address' }),
        username: z.string().min(1, { message: 'Field is required' }),
        password: z.string().min(1, { message: 'Field is required' }),
        role: z.string().min(1, { message: 'Field is required' })
    });

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
          email: '',
          username: '',
          password: '',
          role: ''
        },
    });

    const [status, setStatus] = useState(null)

    const handleSubmit = (admin) => {

        setStatus('loading')

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }
        
        axios.post("https://abcdmedical.herokuapp.com/api/v1/admin/register", admin, config)
        .then(res => {
            setStatus('success')
        })
        .catch( e => {
            if(e.response.data?.message === " username is in use`"){
                setStatus('user_error')
                return;
            }
            
            if(e.response.data?.message === " email is in use"){
                setStatus('email_error')
                return;
            }

            console.log(e)
            setStatus('request_error')
        })

    }

    return <>
    
        <Sidebar pageName="Add Admin">

            <Breadcrumbs
                className={AdminStyles.anchor}
                my="20px"
            >
                {items}
            </Breadcrumbs>

            {
                (status !== null && status.includes("error")) &&
                <Alert 
                my="15px" 
                icon={<FiAlertCircle />} 
                title="Bummer!" 
                color="red"
                style={{maxWidth: "400px"}}
                >
                    { status === "user_error" && "Username already in use" }
                    { status === "email_error" && "Email already in use" }
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
                style={{maxWidth: "400px"}}
                >
                    Admin created successfully
                </Alert>
            }

            <form onSubmit={ form.onSubmit((values) => handleSubmit(values))}>

                <Group direction="column" align="normal" spacing="20px" my="30px">
                    <TextInput
                        label="Admin Username"
                        {...form.getInputProps('username')}
                    />

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

                    <div>
                        <Button
                            classNames={{
                                filled: AdminStyles.button,
                            }}
                            type="submit"
                            loading={status === 'loading'}

                        >
                            Add
                        </Button>
                    </div>
                
                </Group>

            </form>

        </Sidebar>
    
    </>

}

export default AddAdmin