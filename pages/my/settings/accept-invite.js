import { Button, Center, Space } from "@mantine/core"
import TopNav from "../../../components/user_components/TopNav";

const AcceptInvite = ()=>{
    const containerStyle = {
        maxWidth:"500px",
        minWidth:"0",
        padding:"30px",
        margin:"30px auto",
        backgroundColor:"white",
        border:"1px solid whitesmoke",
        borderRadius:"10px"

    }
    return(
        <>
        <TopNav />
        <div style={containerStyle}>
            <Center><h2>Plan invite</h2></Center>
            <br />
            <Center><p>You have an invite from Cruz to join his plan</p></Center>
            <br />
            <Center><Button>Accept inite</Button></Center>
        </div>
        </>
    )
}

export default AcceptInvite