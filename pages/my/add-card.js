import { Button, Center, Text } from "@mantine/core"
import axios from "axios"
import { useEffect, useState } from "react"
import TopNav from "../../components/user_components/TopNav"
import { getAuthKey } from "../../utils/userAuth"

const AddCard = () => {

    const [loading, setLoading] = useState(false)

    const paystack = () => {

        setLoading(true)

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthKey()}`
            }
        }

        axios.post('https://abcdmedical.herokuapp.com/api/v1/users/card', {} ,config)
        .then(res => {
            const data = res.data

            if (data.message === "success"){
                window.location.replace(data.url.authorization_url)
            }
            
        })
        .catch(e => console.log(e))

    }

    return <>

        <TopNav />
        <Center style={{width: "100%", height: "90vh"}}>
            <div 
                style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    gap: "10px"
                }}
            >
                <Text mb="2px">Please add card to be used for billing</Text>
                <Text mb="10px">You will be redirected to our payment gateway to complete proccess</Text>
                <Button loading={loading} onClick={() => paystack()}>Add Card</Button>
            </div>
        </Center>
    
    </>

}
export default AddCard