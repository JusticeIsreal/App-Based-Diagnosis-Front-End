import React, { useEffect, useState } from "react";
import styles from "../../styles/UserDashboard.module.css";
import profileImg from "../../styles/kingsley-osei-abrah-9KmzY22Tz-4-unsplash.jpg";
import UserTransactionTable from "../../components/user_components/UserTransactionTable";
import Image from "next/dist/client/image";
import TopNav from "../../components/user_components/TopNav";
import { TextInput, Button, Center, Loader, Grid, Alert } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { checkAuthKey, getAuthKey, updateUserInfo } from "../../utils/userAuth";
import { useForm, zodResolver } from "@mantine/form";
import axios from "axios";
import { FiAlertCircle } from "react-icons/fi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { z } from "zod";

const UserProfile = () => {

    const router = useRouter()

    useEffect(() => {
        if (!checkAuthKey())
            router.push("/")
    }, [])

    const [userInfo, setUserInfo] = useState()

    const [getStatus, setGetStatus] = useState('loading')

    const getUserInfo = () => {

        const config = {
            "headers": {
                "Accept": "*/*",
                'Access-Control-Allow-Headers': 'x-access-token',
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthKey()}`
            }
        }

        axios.get('https://abcdmedical.herokuapp.com/api/v1/users/info', config)
        .then(res => {
            setUserInfo(res.data)
            form.setValues({...defaultValue, ...res.data})
            updateUserInfo({...defaultValue,...res.data})
            setGetStatus('success')
        })
        .catch(e => setGetStatus('error'))
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    const schema = z.object({
        username: z.string(),
        firstname: z.union([z.string().min(3, {message: 'Firstname should be atleast three letters long'}), z.string().length(0)]),
        lastname: z.union([z.string().min(3, {message: 'Lastname should be atleast three letters long'}), z.string().length(0)]),
        email: z.string(),
        number: z.union([z.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g, {message: 'A valid contact is required'}), z.string().length(0)])
    });

    const defaultValue = {
        username: '',
        firstname: '',
        lastname: '',
        verified: '',
        email: '',
        number: ''
    }

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: defaultValue
    })

    const [updateStatus, setUpdateStatus] = useState(null)

    const handleSubmit = (body) => {

        setUpdateStatus('loading')
        
        const config = {
            "headers": {
                "Accept": "*/*",
                'Access-Control-Allow-Headers': 'x-access-token',
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthKey()}`
            }
        }

        let user ={
            firstname: body.firstname,
            lastname: body.lastname,
            number: body.number
        }

        axios.post('https://abcdmedical.herokuapp.com/api/v1/users/complete', user ,config)
        .then(res => {
            if (res.data.message === "success"){
                setUpdateStatus('success')
                return
            }

            if (res.data.message === "failed"){
                setUpdateStatus('error')
                return
            }
        })
        .catch(e => setUpdateStatus('error'))


    }

    return <>
    
        <TopNav />

        {
            getStatus === 'loading' &&
            <Center style={{height: "90vh", width: "100vw"}}>
                <Loader variant="bars" size="lg" />
            </Center>
        }
        { 
            getStatus === 'success' &&
            <div className={styles.userContainer}>
                <div className={styles.UserProfile}>
                    <div className={styles.profileSideBar}>
                        <div className={styles.profileImgContainer}>
                            <Image src={profileImg} alt="" />
                        </div>
                        <div>
                            <h1>{userInfo?.username}</h1>
                            <h4>{userInfo?.email}</h4>
                            {/* <Link href={'/my/settings'}>
                                <a>
                                    <Button>Settings</Button>
                                </a>
                            </Link> */}
                        </div>
                    </div>
                    <div>
                        <form className={styles.profileDetails} onSubmit={form.onSubmit((values) => handleSubmit(values))}>

                            {
                                (updateStatus !== null && updateStatus !== "loading") &&
                                <Alert 
                                    style={{maxWidth: "400px"}}
                                    mb="15px" 
                                    icon={(updateStatus === "success" && <AiOutlineCheckCircle />) || (updateStatus === "error" && <FiAlertCircle />)} 
                                    title={(updateStatus === "success" && "Success!") || (updateStatus === "error" && "Bummer!")}
                                    color={(updateStatus === "success" && "green") || (updateStatus === "error" && "red")}
                                >
                                    {
                                        (updateStatus === "success" && "Profile updated successfully") || 
                                        (updateStatus === "error" && "An Error ocurred, Try Again")
                                    }
                                </Alert>
                            }
                            
                            <Grid>

                                <Grid.Col span={12} md={4}>
                                    <TextInput 
                                        label={'Username'} 
                                        // defaultValue={userInfo?.username} 
                                        disabled
                                        {...form.getInputProps('username')}
                                    />
                                </Grid.Col>

                                <Grid.Col span={12} md={4}>
                                    <TextInput 
                                        label={'Email'} 
                                        // defaultValue={userInfo?.email}
                                        disabled
                                        {...form.getInputProps('email')}
                                    />
                                </Grid.Col>

                                <Grid.Col span={12} md={4}>
                                    <TextInput
                                        label={'First Name'}
                                        // defaultValue={userInfo?.firstname}
                                        {...form.getInputProps('firstname')}
                                    />
                                </Grid.Col>

                                <Grid.Col span={12} md={4}>
                                    <TextInput
                                        label={'Surname'}
                                        // defaultValue={userInfo?.lastname}
                                        {...form.getInputProps('lastname')}
                                    />
                                </Grid.Col>

                                <Grid.Col span={12} md={4}>
                                    <TextInput
                                        label={'Contact'}
                                        // defaultValue={userInfo?.number}
                                        {...form.getInputProps('number')}
                                    />
                                </Grid.Col>

                            </Grid>
                            
                            <Button 
                                my="20px" 
                                type="submit"
                                disabled={updateStatus === "loading"}
                            >
                                { 
                                    updateStatus === "loading" && 
                                    <Loader variant="dots" size="md" />
                                }
                                {
                                    updateStatus !== "loading" && 
                                    "Update"
                                }
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        }
    </>
};

export default UserProfile;
