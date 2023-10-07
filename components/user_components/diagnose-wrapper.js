import { Button, Center, Group, Loader, Modal, Text } from "@mantine/core"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BsArrowLeftShort } from "react-icons/bs"
import { FcLockLandscape } from "react-icons/fc"
import { getAuthKey } from "../../utils/userAuth"

const DiagnoseWrapper = ({ children }) => {

    const [status, setStatus] = useState('loading')

    const checkSub = () => {

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthKey()}`
            }
        }

        axios.get('https://abcdmedical.herokuapp.com/api/v1/subscription/info', config)
            .then(res => {

                if (res.data?.sub === "no sub ") {
                    setStatus("no_sub")
                    return
                }

                if (res.data.name) {
                    setStatus("sub")
                    return
                }

                setStatus("error")

            })
            .catch(e => console.log(e))

    }

    useEffect(() => {
        checkSub()
    }, [])

    return <>

        {
            status === "loading" &&
            <Center style={{ height: "90vh", width: "100%" }}>
                <Loader variant="bars" size="lg" />
            </Center>
        }

        {status === "sub" &&
            children
        }

        <Modal
            opened={status === "no_sub"}
            centered
            size="550px"
            withCloseButton={false}
            closeOnEscape={false}
            closeOnClickOutside={false}
        >
            <Center my="20px">
                <FcLockLandscape size="70px" />
            </Center>
            <Text align="center" mb="10px" size="md" weight="600"> Access Denied </Text>
            <Text align="center" mb="5px" color="gray" size="sm"> You don`&lsquo;`t have access to this feature </Text>
            <Text align="center" mb="15px" color="gray" size="sm"> Please add your card and subscribe to a plan </Text>
            <Center mb="15px">
                <Link
                    href="/"
                    passHref
                >
                    <Button component="a" >
                        Subscribe
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
        </Modal>


    </>

}

export default DiagnoseWrapper