import { Alert, Button, Center, Container, Group, Loader, Modal, Stack, Text, TextInput } from "@mantine/core"
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

const ForgotPassword = () => {

    const timer = useRef(60)

    const [displayTimer, setDisplayTimer] = useState(60)

    const router = useRouter()

    const [userEmail, setUserEmail] = useState()

    const [status, setStatus] = useState(null)

    const schema = z.object({
        email: z.string().email({ message: 'Invalid email' })
    });

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
          email: '',
        },
    });

    const interval = () => {
        timer.current = timer.current - 1

        setDisplayTimer(timer.current)

        if (timer.current < 0) {
            timer.current = 60
            setDisplayTimer(timer.current)
            return;
        }
        setTimeout(interval, 1000)
    }

    const handleSubmit = (user) => {
        let newUser = user

        setUserEmail(user.email)

        setStatus("loading")

        axios.post("https://abcdmedical.herokuapp.com/api/v1/users/genPassLink", newUser)
        .then(res => {
            if (res.data.message === "success"){
                setStatus('success')
                return;
            }

            setStatus('request_error')
        })
        .catch( e => {
            console.log(e)
            setStatus('request_error')
        })
    }

    const resendEmail = () => {
        axios.post("https://abcdmedical.herokuapp.com/api/v1/users/genPassLink", {email: userEmail})
        .then(res => {
            console.log(res.data)
        })
        .catch( e => {
            console.log(e)
        })
    }

    const countDown = () => {
        interval()
        resendEmail()
    }

    return <>
    
        <div style={{width: "100vw", height: "100vh", background: "white"}}>

            <Modal
                opened={status === "success"}
                onClose={() => setStatus(null)}
                centered
                size="lg"
            >
                <Center>
                    <div style={{ position: "relative", width: "150px" }}>
                        <Image src={emailImg} alt=""></Image>
                    </div>
                </Center>
                <Text align="center" mb="10px" size="md" weight="600"> Check your email </Text>
                <Text align="center" mb="15px" color="gray" size="sm"> We`&lsquo;`ve sent a password reset link to {userEmail} </Text>
                <Center mb="15px">
                    <Button onClick={() => countDown()} disabled={displayTimer !== 60}>
                        {displayTimer === 60 && "Resend"}
                        {displayTimer < 60 && `Try Again In ${displayTimer}`}
                    </Button>
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
                            Forgot Password?
                        </Text>

                        <Text color="gray" size="sm" >
                            No worries we will send you reset instructions
                        </Text>

                        <form style={{width: "100%"}} onSubmit={form.onSubmit((values) => handleSubmit(values))}>

                            {
                                (status !== null && status.includes("error")) &&
                                <Alert
                                    mb="15px" 
                                    icon={<FiAlertCircle />} 
                                    title="Bummer!" 
                                    color="red"
                                >
                                    { status === "request_error" && "An Error Occurred" } 
                                </Alert>

                            }

                            <TextInput
                                label="Email"
                                variant="filled"
                                {...form.getInputProps('email')}
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

export default ForgotPassword