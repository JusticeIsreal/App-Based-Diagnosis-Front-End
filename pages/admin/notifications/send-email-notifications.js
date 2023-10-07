import { Alert, Anchor, Breadcrumbs, Button, Group, Text, Textarea, TextInput } from "@mantine/core"
import Sidebar from "../../../components/admin_components/Sidebar"
import AdminStyles from "../../../styles/Admin.module.css"
import { FiAlertCircle } from "react-icons/fi";
import { AiFillCheckCircle } from "react-icons/ai";
import {z} from "zod"
import { zodResolver, useForm } from "@mantine/form";
import { useState } from "react";
import { getAdminAuthKey } from "../../../utils/adminAuth";
import axios from "axios";

const SendEmailNotification = () => {

    const items = [
        { title: 'Notifications', href: '/admin/notifications' },
        { title: 'Send Email Notifications', href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const [status, setStatus] = useState(null)

    const schema = z.object({
        subject: z.string().min(1, { message: 'Field is required' }),
        message: z.string().min(1, { message: 'Field is required' }),
    });

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
          subject: '',
          message: '',
        },
    });

    const handleSubmit = (values) => {

        setStatus('loading')

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }
        
        axios.post("https://abcdmedical.herokuapp.com/api/v1/statistics/sendmail", values, config)
        .then(res => {
            if (res.data?.message === "success"){
                setStatus('success')
            } else {
                setStatus('error')
            }
        })
        .catch( e => {
            console.log(e)
            setStatus('error')
        })
        
    }

    return <>
    
        <Sidebar pageName="Send In App Notifications">

            <Breadcrumbs
                className={AdminStyles.anchor}
                my="20px"
            >
                {items}
            </Breadcrumbs>

            {
                (status !== null && status === "error") &&
                <Alert
                    title="Error"
                    my="20px"
                    color="red"
                    icon={ <FiAlertCircle />}
                    style={{maxWidth: "400px"}}
                >
                    An error occurred
                </Alert>
            }

            {
                (status !== null && status === "success") &&
                <Alert
                    title="Success"
                    my="20px"
                    color="green"
                    icon={ <AiFillCheckCircle />}
                    style={{maxWidth: "400px"}}
                >
                    Email sent succcessfully
                </Alert>
            }

            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Group direction="column" align="normal" spacing="20px" mb="30px">
                    <TextInput
                        label="Email Subject"
                        placeholder="Header"
                        {...form.getInputProps('subject')}
                    />

                    <Textarea 
                        label="Email Body"
                        placeholder="Message"
                        minRows={10}
                        {...form.getInputProps('message')}
                    />

                    <div>
                        <Button
                            classNames={{
                                filled: AdminStyles.button,
                            }}
                            type="submit"
                            loading={status === 'loading'}
                        >
                            Send
                        </Button>
                    </div>
                
                </Group>
            </form>

        </Sidebar>
    
    </>

}

export default SendEmailNotification