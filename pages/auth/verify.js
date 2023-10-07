import { Button, Center, Container, Loader, Stack, Text } from "@mantine/core"
import { BsFillPatchCheckFill, BsChevronLeft, BsXCircleFill } from "react-icons/bs"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"

const Verify = () => {

    const router = useRouter()

    const [status, setStatus] = useState('loading')

    const makeReq = (key) => {

        let body = {key}

        axios.post("https://abcdmedical.herokuapp.com/api/v1/users/verify", body)
        .then(res => {
            if(res.data.message === "failed"){
                setStatus('user_error')
                return;
            }

            if(res.data.message === "User already verified"){
                setStatus('double_verify')
                return;
            }

            setStatus('success')
        })
        .catch( e => {
            console.log(e)
            setStatus('request_error')
        })
    }

    useEffect(() => {
        const verifyKey = new URLSearchParams(window.location.search).get(
            "key"
        );

        if(!verifyKey)
            router.push('/')

        makeReq(verifyKey)
            
    }, [])

    return <>
    
        <div style={{width: "100vw", height: "100vh", background: "white"}}>
            <Container size="300px" style={{height: "100%"}}>
                <Center style={{height: "100%"}}>

                    <Stack position="center" align="center">
                        {
                            status !== "loading" &&
                            <div style={{width: "100%", marginBottom: "40px"}}>
                                <Link href="/" passHref>
                                    <Button component="a" leftIcon={<BsChevronLeft />} variant="subtle">
                                        Home
                                    </Button>
                                </Link>
                            </div>
                        }

                        {
                            status === "loading" &&
                            <>
                                <Loader size="xl" />
                                <Text align="center" my="5px">Please wait while we verify your email address</Text>
                            </>
                        }

                        {
                            status === "success" &&
                            <>
                                <BsFillPatchCheckFill color="green" size="60px" />
                                <Text align="center" my="10px">You Account is now verified</Text>
                                <Text align="center">
                                    Proceed to &nbsp;
                                    <Link href="/auth/login">
                                        <a style={{color: "dodgerblue"}}>
                                            Login
                                        </a>
                                    </Link>
                                </Text>
                            </>
                        }

                        {
                            status === "double_verify" &&
                            <>
                                <BsFillPatchCheckFill color="green" size="60px" />
                                <Text align="center" my="10px">You Account is already verified</Text>
                                <Text align="center">
                                    Proceed to &nbsp;
                                    <Link href="/auth/login">
                                        <a style={{color: "dodgerblue"}}>
                                            Login
                                        </a>
                                    </Link>
                                </Text>
                            </>
                        }

                        {
                            status === "user_error" &&
                            <>
                                <BsXCircleFill color="red" size="60px" />
                                <Text align="center" my="5px" size="lg">Unfortunately we couldn`&lsquo;`t verify your account</Text>
                            </> 
                        }

                        {
                            status === "request_error" &&
                            <>
                                <BsXCircleFill color="red" size="60px" />
                                <Text align="center" my="5px" size="lg">An error occured</Text>
                                <Text align="center" my="5px" size="sm" color="gray">Try again later</Text>
                            </> 
                        }
                    </Stack>

                </Center>
            </Container>
        </div>
    
    </>
}

export default Verify