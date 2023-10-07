import { Button, Center, Group, Loader, Modal, Text } from "@mantine/core";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsArrowLeftShort, BsCheckCircleFill } from "react-icons/bs";
import { MdOutlineError } from "react-icons/md";
import TopNav from "../../components/user_components/TopNav"
import styles from "../../styles/UserDashboard.module.css";
import { checkAuthKey, getAuthKey } from "../../utils/userAuth";
import { RiAlarmWarningFill } from "react-icons/ri"

const Subscribtion = () => {

    const router = useRouter()

    const [status, setStatus] = useState('loading')

    const [plans, setPlans] = useState(null)

    const getPlans = () => {
        axios.get('https://abcdmedical.herokuapp.com/api/v1/plans/get')
            .then(res => {
                if (res.data.message === "success") {
                    setPlans(res.data.plan)
                    setStatus('success')
                    return
                }

                setStatus('error')
            })
            .catch(e => {
                console.log(e)
                setStatus('error')
            })
    }

    const [subStatus, setSubStatus] = useState(null)

    const subscribe = (id) => {
        let body = {
            planId: id
        }

        setSubStatus('loading')

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthKey()}`
            }
        }

        axios.post('https://abcdmedical.herokuapp.com/api/v1/subscription/subscribe', body, config)
            .then(res => {
                console.log(res.data)

                if (res.data?.message === "processing request") {
                    setSubStatus('success')
                    return
                }

                if (res.data?.message === "failed" && res.data?.reason === "payment failed") {
                    setSubStatus('payment_error')
                    return
                }

                if (res.data?.message === "failed" && res.data?.reason === "user is already subscribed") {
                    setSubStatus('user_error')
                    return
                }
            })
            .catch(e => {
                console.log(e)
                if(e.response.data?.message === "Info incomplete"){
                    setSubStatus('profile_error')
                    return;
                }

                if(e.response.data?.message === "Add A Fucking Card"){
                    setSubStatus('card_error')
                    return;
                }
            })
    }

    useEffect(() => {
        if (!checkAuthKey())
            router.push("/")

        getPlans()
    }, [])

    return <>
        <TopNav />
        {
            status === "loading" &&
            <Center style={{ height: "90vh", width: "100%" }}>
                <Loader variant="bars" size="lg" />
            </Center>

        }
        {
            status === "success" &&
            <div className={styles.userContainer}>
                <div className={styles.subscribtion}>
                    <h1>Subscribtion plans</h1>
                    <div className={styles.subscribtionContainer}>
                        {console.log(plans)}
                        {
                            plans?.map(({ name, description, price, _id }, index) => (
                                <div className={styles.plan} key={index}>
                                    <h2>{name}</h2>
                                    <h1>
                                        &#8358;{price}
                                    </h1>
                                    <p>{description}</p>
                                    <button onClick={() => subscribe(_id)}>Subscribe</button>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
        }

        <Modal
            opened={subStatus !== null}
            centered
            size="550px"
            onClose={() => setSubStatus(null)}
        >   
            {
                subStatus === "loading" &&
                <>
                    <Center my="20px">
                        <Loader variant="oval" size="lg" />
                    </Center>
                    <Text align="center" mb="10px" size="md" weight="600"> Please wait... </Text>
                    <Text align="center" mb="5px" color="gray" size="sm"> You`&lsquo;`re being subscribed to the plan </Text>
                </>
            }
            {
                subStatus === "success" &&
                <>
                    <Center my="20px">
                        <BsCheckCircleFill color="green" size="60px" />
                    </Center>
                    <Text align="center" mb="10px" size="md" weight="600"> Successfull </Text>
                    <Text align="center" mb="5px" color="gray" size="sm"> Your subscription is being proccessed, You will receive an email when the transaction is completed </Text>
                    <Center my="15px">
                        <Link href="/">
                            <a>
                                <Group position="center">
                                    <BsArrowLeftShort />
                                    <Text size="sm">Back to Home</Text>
                                </Group>
                            </a>
                        </Link>
                    </Center>
                </>
            }
            {
                subStatus === "payment_error" &&
                <>
                    <Center my="20px">
                        <MdOutlineError color="red" size="60px" />
                    </Center>
                    <Text align="center" mb="10px" size="md" weight="600"> Payment Unsuccessful </Text>
                    <Text align="center" mb="5px" color="gray" size="sm"> We encountered an error trying to proccess your subscription </Text>
                    <Center my="15px">
                        <Link href="/">
                            <a>
                                <Group position="center">
                                    <BsArrowLeftShort />
                                    <Text size="sm">Back to Home</Text>
                                </Group>
                            </a>
                        </Link>
                    </Center>
                </>
            }
            {
                subStatus === "user_error" &&
                <>
                    <Center my="20px">
                        <RiAlarmWarningFill color="#FFCC00" size="60px" />
                    </Center>
                    <Text align="center" mb="10px" size="md" weight="600"> Payment Unsuccessful </Text>
                    <Text align="center" mb="5px" color="gray" size="sm"> You`&lsquo;`re already subcribed to a plan </Text>
                    <Text align="center" mb="5px" color="gray" size="sm"> Cancel current Subscription if you`&lsquo;`re trying to upgrade your plan </Text>
                    <Center my="15px">
                        <Link href="/">
                            <a>
                                <Group position="center">
                                    <BsArrowLeftShort />
                                    <Text size="sm">Back to Home</Text>
                                </Group>
                            </a>
                        </Link>
                    </Center>
                </>
            }
            {
                subStatus === "profile_error" &&
                <>
                    <Center my="20px">
                        <MdOutlineError color="red" size="60px" />
                    </Center>
                    <Text align="center" mb="10px" size="md" weight="600"> Subscription Unsuccessful </Text>
                    <Text align="center" mb="5px" color="gray" size="sm"> Looks like you have an empty profile </Text>
                    <Text align="center" mb="5px" color="gray" size="sm"> Your name and contact is required to proccess payment </Text>
                    <Center >
                        <Link href="/my/profile">
                            <Button component="a" my="15px">
                                Complete Profile
                            </Button>
                        </Link>
                    </Center>
                    <Center mb="15px">
                        <Link href="/">
                            <a>
                                <Group position="center">
                                    <BsArrowLeftShort />
                                    <Text size="sm">Back to Home</Text>
                                </Group>
                            </a>
                        </Link>
                    </Center>
                </>
            }
            {
                subStatus === "card_error" &&
                <>
                    <Center my="20px">
                        <MdOutlineError color="red" size="60px" />
                    </Center>
                    <Text align="center" mb="10px" size="md" weight="600"> Subscription Unsuccessful </Text>
                    <Text align="center" mb="5px" color="gray" size="sm"> Looks like you haven`&lsquo;`t added your card </Text>
                    <Text align="center" mb="5px" color="gray" size="sm"> A card is required to proccess payment </Text>
                    <Center my="15px">
                        <Link href="/my/add-card">
                            <Button component="a" my="15px">
                                Add card
                            </Button>
                        </Link>
                    </Center>
                    <Center my="15px">
                        <Link href="/">
                            <a>
                                <Group position="center">
                                    <BsArrowLeftShort />
                                    <Text size="sm">Back to Home</Text>
                                </Group>
                            </a>
                        </Link>
                    </Center>
                </>
            }
        </Modal>

    </>
}

export default Subscribtion