import { Alert, Button, Center, Container, Group, Loader, Modal, PasswordInput, Stack, Text, TextInput } from "@mantine/core"
import { BsFillPatchCheckFill, BsArrowLeftShort, BsXCircleFill } from "react-icons/bs"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import passwordImg from "../../images/password_illu.png"
import emailImg from "../../images/email_illu.png"
import Image from "next/image"
import { z } from "zod"
import { useForm, zodResolver } from "@mantine/form"
import { FiAlertCircle } from "react-icons/fi"

const ChangePassword = () => {

    const router = useRouter()

    const [key, setKey] = useState()

    const [status, setStatus] = useState(null)

    const schema = z.object({
        password: z.string().min(8, { message: 'Password should have at least 8 letters' }),
        confirmPassword: z.string().min(8, { message: 'Password should have at least 8 letters' })
    });

    useEffect(() => {
        const verifyKey = new URLSearchParams(window.location.search).get(
            "key"
        );

        if(!verifyKey)
            router.push('/')

        setKey(verifyKey)

    }, [])

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
          password: '',
          confirmPassword: ''
        },
    });

    const handleSubmit = (user) => {
        let body = {
            password: user.password,
            key: key
        }

        setStatus("loading")

        axios.post("https://abcdmedical.herokuapp.com/api/v1/users/changepass", body)
        .then(res => {
            if (res.data.message === "success"){
                setStatus('success')
                return;
            }

            if (res.data.message === "failed"){
                setStatus('user_error')
                return;
            }
        })
        .catch( e => {
            console.log(e)
            setStatus('request_error')
        })
    }

    return <>
    
        <div style={{width: "100vw", height: "100vh", background: "white"}}>

            <Modal
                opened={status === "success" || status === "user_error"}
                onClose={() => setStatus(null)}
                centered
                size="lg"
            >
                <Center my="20px">
                    {
                        status === "success" &&
                        <BsFillPatchCheckFill color="green" size="60px" />
                    }
                    {
                        status === "user_error" &&
                        <BsXCircleFill color="red" size="60px" />
                    }
                </Center>
                <Text align="center" mb="10px" size="md" weight="600"> Password reset </Text>
                { status === "success" && <Text align="center" mb="15px" color="gray" size="sm"> Your password has been successfully reset </Text> }
                { status === "user_error" && <Text align="center" mb="15px" color="gray" size="sm"> Password reset was unsuccessfully </Text> }
                <Center mb="15px">
                    <Link href="/auth/login">
                        <a>
                            <Group position="center">
                                <BsArrowLeftShort />
                                <Text size="sm">Back to Login</Text>
                            </Group>
                        </a>
                    </Link>
                </Center>
            </Modal>

            <Container size="400px" style={{height: "100%"}}>
                <Center style={{height: "100%"}}>

                    <Stack position="center" align="center" style={{width: "100%"}}>

                        <Center>
                            <div style={{position: "relative", width: "150px"}}>
                                <Image src={passwordImg} alt=""></Image>
                            </div>
                        </Center>

                        <Text size="lg" weight={600}>
                            Set New Password
                        </Text>

                        <Text color="gray" size="sm" >
                            Your new password must be different to previously used passwords
                        </Text>

                        <form style={{width: "100%"}} onSubmit={form.onSubmit((values) => handleSubmit(values))}>

                            {
                                (status !== null && status === "request_error") &&
                                <Alert
                                    mb="15px" 
                                    icon={<FiAlertCircle />} 
                                    title="Bummer!" 
                                    color="red"
                                >
                                    { status === "request_error" && "An Error Occurred, Try Again" } 
                                </Alert>

                            }

                            <PasswordInput
                                label="Password"
                                variant="filled"
                                mb="10px"
                                {...form.getInputProps('password')}
                            />

                            <PasswordInput
                                label="Confirm Password"
                                variant="filled"
                                {...form.getInputProps('confirmPassword')}
                            />

                            <Button
                                my="20px"
                                fullWidth
                                disabled={status === "loading"}
                                type="submit"
                            >
                                { status === "loading" && <Loader variant='dots' size="md" /> }
                                { status !== "loading" && "Reset Password" }
                            </Button>
                        </form>

                        <Link href="/auth/login">
                            <a>
                                <Group position="center">
                                    <BsArrowLeftShort />
                                    <Text size="sm">Back to Login</Text>
                                </Group>
                            </a>
                        </Link>
                    </Stack>

                </Center>
            </Container>
        </div>
    
    </>
} 

export default ChangePassword