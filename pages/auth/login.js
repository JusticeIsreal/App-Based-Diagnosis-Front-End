import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import logo from '../../images/App-Based_Click_&_Diagnose-Logo-PNG_3.png'
import { Alert, Button, Center, Loader, Modal, PasswordInput, Text, TextInput } from '@mantine/core'
import { z } from 'zod'
import { useForm, zodResolver } from '@mantine/form'
import { FiAlertCircle } from "react-icons/fi"

import Link from 'next/dist/client/link'
import axios from 'axios'
import { useRef, useState } from 'react'
import emailImg from "../../images/email_illu.png" 
import { setAuthKey, setUserInfo } from '../../utils/userAuth'
import { useRouter } from 'next/router'

const Login = () => {

    const timer = useRef(60)

    const [displayTimer, setDisplayTimer] = useState(60)

    const [userEmail, setUserEmail] = useState(null)

    const router = useRouter()

    const schema = z.object({
        email: z.string().email({ message: 'Invalid email' }),
        password: z.string().min(8, { message: 'Password should have at least 8 letters' })
    });

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
          password: '',
          email: '',
        },
    });

    const [status, setStatus] = useState(null)

    const loginFinish = ({accessToken, details}) => {
        setAuthKey(accessToken)
        setUserInfo(details)
        router.push('/')
    }

    const handleSubmit = (user) => {
        let newUser = user

        setUserEmail(user.email)

        setStatus("loading")

        axios.post("https://abcdmedical.herokuapp.com/api/v1/users/login", newUser)
        .then(res => {
            setStatus('success')
            loginFinish(res.data)
        })
        .catch( e => {
            if(e.response.data?.message === "User not found" || e.response.data?.message === "your password is incorrect"){
                setStatus('user_error')
                return;
            }
            
            if(e.response.data?.message === " verify your email"){
                setStatus('verify_error')
                resendEmail()
                return;
            }

            console.log(e)
            setStatus('request_error')
        })
    }

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

    const resendEmail = () => {
        axios.post("https://abcdmedical.herokuapp.com/api/v1/users/generate", {email: userEmail})
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

    return (
        <div className={styles.formContainer}>
            <div className={styles.form}>

                <Modal
                    opened={status === "verify_error"}
                    onClose={() => setStatus(null)}
                    centered
                    size="lg"
                >
                    <Text align="center" mb="10px" color="gray" size="sm"> Looks like your email is not verified </Text>
                    <Center>
                        <div style={{position: "relative", width: "150px"}}>
                            <Image src={emailImg} alt=""></Image>
                        </div>
                    </Center>
                    <Text align="center" mb="10px" size="md"> Verify Your Email Address </Text>
                    <Text align="center" mb="15px" color="gray" size="sm"> Account activation link has been sent to the e-mail address you provided </Text>
                    <Center mb="15px">
                        <Button onClick={() => countDown()} disabled={displayTimer !== 60}>
                            { displayTimer === 60 && "Resend" }
                            { displayTimer < 60 && `Try Again In ${ displayTimer }` }
                        </Button>
                    </Center>
                    <Text align="center" mb="10px" color="gray" size="sm"> 
                        Already verified? <Link href="/auth/login">
                            <a>Login</a>
                        </Link> 
                    </Text>
                </Modal>

                <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <h1>Login</h1>
                    
                    {
                        (status !== null && status.includes("error")) &&
                        <Alert 
                            mb="15px" 
                            icon={<FiAlertCircle />} 
                            title="Bummer!" 
                            color="red"
                        >
                            { status === "request_error" && "An Error Occurred" } 
                            { status === "user_error" && "Your email and/or password are not correct" }
                            { status === "verify_error" && "Your email is not verified" }  
                        </Alert>

                    }

                    <TextInput
                        label="Email"
                        variant='filled'
                        mb="15px"
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        label="Password"
                        variant='filled'
                        mb="15px"
                        {...form.getInputProps('password')}
                    />

                    <Button 
                        fullWidth="100%" 
                        type='submit'
                        disabled={status === "loading"}
                    >
                        { status === "loading" && <Loader variant='dots' size="md" /> }
                        { status !== "loading" && "Login" }
                    </Button>

                    <p>
                        New User?
                        <Link href={'/auth/signup'}>
                        
                            <a> Signup </a>
                        </Link>
                        </p>
                        <p>
                        <Link href={'/auth/forgot-password'}>
                        
                            <a> Forgot password </a>
                        </Link>
                    </p>
                </form>
            </div>
            <div className={styles.img}>
                <Image src={logo} alt="" />
            </div>
        </div>
    )
}

export default Login