import { Alert, Button, Group, PasswordInput, TextInput } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Logo from "../../../images/App-Based_Click_&_Diagnose-Logo-PNG_1.png"
import AuthStyles from "../../../styles/AdminAuth.module.css"
import { checkAdminAuthKey, setAdminAuthKey } from "../../../utils/adminAuth"
import {z} from "zod"
import { FiAlertCircle } from "react-icons/fi"
import { AiOutlineCheck } from "react-icons/ai"
import axios from "axios"

const Login = () => {

    const router = useRouter()

    useEffect(() => {
        let loggedIn = checkAdminAuthKey()

        if (loggedIn)
            router.push("/admin")

    }, [])

    const schema = z.object({
        email: z.string().email({ message: 'Invalid email' }),
        password: z.string().min(1, { message: 'Field is required' }),
    });

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
          password: '',
          email: '',
        },
    });

    const [status, setStatus] = useState('null');

    const loginFinish = (accessToken) => {
        setAdminAuthKey(accessToken)

        setTimeout(() => {
            router.push('/admin')
        }, 5000)
    }

    const handleSubmit = (admin) => {

        setStatus("loading")

        axios.post("https://abcdmedical.herokuapp.com/api/v1/admin/login", admin)
        .then(res => {
            setStatus('success')
            loginFinish(res.data.jwt.accessToken)
        })
        .catch( e => {
            if(e.response?.data.message === "Admin not found" || e.response?.data.message === "your password is incorrect"){
                setStatus('user_error')
                return;
            }

            console.log(e)
            setStatus('request_error')
        })
    }

    return <>
    
        <div className={AuthStyles.auth_container}>

            <div className={AuthStyles.auth_card}>
                <Link href="/">
                    <a className={AuthStyles.image_contain}>
                        <Image src={Logo} layout="intrinsic" alt=""/>
                    </a>
                </Link>

                <form style={{width: '100%'}} onSubmit={ form.onSubmit((values) => handleSubmit(values))}>
                    <Group style={{width: "100%"}} direction="column" align="normal" spacing="20px" my="30px">
                        {
                            (status !== null && status.includes("error")) &&
                            <Alert
                                icon={<FiAlertCircle />} 
                                title="Bummer!" 
                                color="red"
                            >
                                { status === "request_error" && "An Error Occurred" } 
                                { status === "user_error" && "Your email and/or password are not correct" }  
                            </Alert>

                        }

                        {
                            (status !== null && status.includes("success")) &&
                            <Alert
                                icon={<AiOutlineCheck />} 
                                title="Success" 
                                color="green"
                            >
                                You will be redirected to the <Link href="/admin"><a style={{textDecoration: "underlined"}}>dashboard</a></Link>
                            </Alert>

                        }

                        <TextInput
                            placeholder="Your email"
                            label="Email"
                            { ...form.getInputProps("email") }
                        />

                        <PasswordInput
                            placeholder="Password"
                            label="Password"
                            { ...form.getInputProps("password") }
                        />

                        <Button
                            classNames={{
                                filled: AuthStyles.button,
                            }}
                            type="submit"
                            loading={status === "loading"}
                        >
                            Login
                        </Button>
                    </Group>
                </form>

                <Link href="/">
                    <a className={AuthStyles.reset_password}>
                        Reset Password
                    </a>
                </Link>
            </div>

        </div>
    
    </>

}

export default Login