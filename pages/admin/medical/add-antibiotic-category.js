import { useEffect, useState } from "react"
import Sidebar from "../../../components/admin_components/Sidebar"
import Styles from "../../../styles/AdminDiagnosis.module.css"
import { TextInput, Switch, Alert, Button, Group, Text, Anchor, Breadcrumbs, Select, Center, Loader } from "@mantine/core"
import { AiFillCheckCircle, AiFillWarning, AiOutlinePlus } from "react-icons/ai"
import { getId } from "../../../utils/generateId"
import AdminStyles from "../../../styles/Admin.module.css"
import axios from "axios"
import { getAdminAuthKey } from "../../../utils/adminAuth"
import { useForm, zodResolver} from "@mantine/form"
import {z} from "zod"

const AddAntibioticsCategory = () => {

    const items = [
        { title: 'Medical', href: '/admin/medical' },
        { title: 'Add Antibiotics Category', href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    const [categories, setCategories] = useState([])
    
    const [parent, setParent] = useState(false)

    const [getStatus, setGetStatus] = useState('loading')

    const getCategory = () => {

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.get('https://abcdmedical.herokuapp.com/api/v1/categories/antibiotic/get', config)
        .then(res => {
            if (res.status === 200) {
                setCategories(res.data)
                console.log(res.data)
                setGetStatus('success')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getCategory()
    }, [])

    const schema = z.object({
        name: z.string().min(1, { message: 'Field is required' }),
    });

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
          name: '',
          parent: '',
        },
    });

    const [sendStatus, setSendStatus] = useState(null)

    const handleSubmit = (values) => {

        setSendStatus('loading')

        const category = values

        if (!parent)
            category = {name: values.name, parent: ""}
            
        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.post('https://abcdmedical.herokuapp.com/api/v1/categories/antibiotic/create', category ,config)
        .then(res => {
            if (res.data.message === "success") {
                setSendStatus('success')
                setCategories([...categories, category])
            } else {
                setSendStatus('user_error')
            }

        })
        .catch(err => {
            setSendStatus('request_error')
            console.log(err)
        })

    }

    return <>

        <Sidebar pageName="Add Antibiotics Category">

            <Breadcrumbs
                className={AdminStyles.anchor} 
                mt="20px"
            >
                {items}
            </Breadcrumbs>

            <div className={Styles.page_container}>

                <form onSubmit={form.onSubmit((values) => handleSubmit(values))} onChange={() => setSendStatus(null)}>

                    {
                        getStatus === 'loading' &&
                        <Center style={{height: "400px", width: "100%"}}>
                            <Loader variant="bars" size="lg" />
                        </Center>
                    }

                    {
                        getStatus === 'success' &&
                        <>

                            {
                                (sendStatus !== null && sendStatus === "success") && 
                                <Alert
                                    title="Success"
                                    my="20px"
                                    color="green"
                                    icon={<AiFillCheckCircle />}
                                    style={{ maxWidth: "400px" }}
                                >
                                    Antibiotics category added succcessfully
                                </Alert>
                            }

                            {
                                (sendStatus !== null && sendStatus.includes("error")) && 
                                <Alert
                                    title="Error"
                                    my="20px"
                                    color="red"
                                    icon={<AiFillWarning />}
                                    style={{ maxWidth: "400px" }}
                                >
                                    { sendStatus === "user_error" && "Category Name exists" }
                                    { sendStatus === "request_error" && "An error occurred" }
                                </Alert>
                            }

                            <Switch 
                                my="30px"
                                value={parent}
                                onChange={(e) => setParent(e.currentTarget.checked)}
                                label="Link Category to Parent Category"
                            />

                            {
                                parent &&
                                <Select
                                    my="30px"
                                    label="Antibiotics Parent Category"
                                    data={categories.map(e =>  e.name)}
                                    {...form.getInputProps('parent')}
                                />

                            }

                            <TextInput
                                my="30px"
                                label="Antibiotics Category"
                                {...form.getInputProps('name')}
                            />

                            <Button
                                classNames={{
                                    filled: AdminStyles.button,
                                }}
                                type="submit"
                                loading={sendStatus === 'loading'}
                            >
                                Submit
                            </Button>
                        
                        </>
                    }

                </form>
                
            </div>
        </Sidebar>
    </>

}

export default AddAntibioticsCategory