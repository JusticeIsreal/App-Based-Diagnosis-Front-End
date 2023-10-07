import styles from "../../styles/Home.module.css";
import Image from "next/image";
import logo from "../../images/App-Based_Click_&_Diagnose-Logo-PNG_3.png";
import Link from "next/dist/client/link";
import { Alert, Button, Center, Loader, Modal, PasswordInput, Text, TextInput } from "@mantine/core";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FiAlertCircle } from "react-icons/fi";
import emailImg from "../../images/email_illu.png" 

const Signup = () => {

    const timer = useRef(60)

    const [displayTimer, setDisplayTimer] = useState(60)

    const [userEmail, setUserEmail] = useState(null)

    const schema = z.object({
        username: z.string().min(3, {message: 'Username should have at least 3 letters'}),
        email: z.string().email({ message: 'Invalid email' }),
        password: z.string().min(8, { message: 'Password should have at least 8 letters' }),
        confirmPassword: z.string().min(8, { message: 'Password should have at least 8 letters' })
    }).refine(data => data.password === data.confirmPassword, {message: "Password and Confirm Password should be equal", path: ["confirmPassword"]});

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
            username: '',
            confirmPassword: '',
            password: '',
            email: '',
        },
    });

    const [status, setStatus] = useState(null)

    const handleSubmit = (user) => {
        let newUser = {
            username: user.username,
            email: user.email,
            password: user.password
        }

        setUserEmail(user.email)

        setStatus("loading")

        axios.post("https://abcdmedical.herokuapp.com/api/v1/users/register", newUser)
        .then(res => {
            setStatus('success')
            console.log(res.data)
        })
        .catch( e => {
            if(e.response.data.message === " email is in use"){
                setStatus('email_error')
                return;
            }
            
            if(e.response.data.message === " username is in use"){
                setStatus('username_error')
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
                    opened={status === "success"}
                    onClose={() => setStatus(null)}
                    centered
                    size="lg"
                >
                    <Text align="center" mb="10px" color="gray" size="sm"> Thank you for registering </Text>
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
                    <h1>Sign in</h1>

                    {
                        (status !== null && status.includes("error")) &&
                        <Alert
                            mb="15px" 
                            icon={<FiAlertCircle />} 
                            title="Bummer!" 
                            color="red"
                        >
                            { status === "request_error" && "An Error Occurred" } 
                            { status === "username_error" && "Username is already taken" }  
                            { status === "email_error" && "Email already in use" } 
                        </Alert>

                    }

                    <TextInput
                        label="Username"
                        variant='filled'
                        mb="15px"
                        {...form.getInputProps('username')}
                    />

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

                    <PasswordInput
                        label="Confirm Password"
                        variant='filled'
                        mb="15px"
                        {...form.getInputProps('confirmPassword')}
                    />

                    <Button
                        fullWidth="100%" 
                        type='submit'
                        disabled={status === "loading"}
                    >
                        { status === "loading" && <Loader variant='dots' size="md" /> }
                        { status !== "loading" && "Signup" }
                    </Button>
                    <p>
                    <Link href={'/auth/login'}>
                    
                        <a> Login </a>
                    </Link>
                    if you already have an account
                    </p>
                </form>
            </div>
            <div className={styles.img}>
                <Image src={logo} alt="" />
            </div>
        </div>
    );
};

export default Signup;
