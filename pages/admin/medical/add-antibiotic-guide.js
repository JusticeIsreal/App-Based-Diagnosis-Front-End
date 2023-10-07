import { useEffect, useState } from "react"
import Sidebar from "../../../components/admin_components/Sidebar"
import Styles from "../../../styles/AdminDiagnosis.module.css"
import { TextInput, Switch, Textarea, Button, Group, Text, Anchor, Breadcrumbs, Select, Center, Loader, Alert } from "@mantine/core"
import { AiFillCheckCircle, AiFillWarning, AiOutlinePlus } from "react-icons/ai"
import { getId } from "../../../utils/generateId"
import AdminStyles from "../../../styles/Admin.module.css"
import { getAdminAuthKey } from "../../../utils/adminAuth"
import axios from "axios"
import {z} from "zod"
import { useForm, zodResolver } from "@mantine/form"

const AddAntibioticGuide = () => {

    const items = [
        { title: 'Medical', href: '/admin/medical' },
        { title: 'Add Antibiotics Guide', href: '#' },
    ].map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));
    
    const [categories, setCategories] = useState([])

    const [getStatus, setGetStatus] = useState('loading')

    const getCategory = () => {

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.get('https://abcdmedical.herokuapp.com/api/v1/categories/antibiotic/getnoparent', config)
        .then(res => {
            if (res.status === 200) {
                setCategories(res.data)
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

    const [sendStatus, setSendStatus] = useState(null)

    const schema = z.object({
        category: z.string().min(1, { message: 'Field is required' }),
        name: z.string().min(1, { message: 'Field is required' }),
        withoutPenicillin: z.string().min(1, { message: 'Field is required' }),
        withPenicillin: z.string().min(1, { message: 'Field is required' }),
    });

    const form = useForm({
        schema: zodResolver(schema),
        initialValues: {
            category: '',
            name: '',
            withoutPenicillin: '',
            withPenicillin: '',
        },
    });

    const handleSubmit = (values) => {

        setSendStatus('loading')

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.post('https://abcdmedical.herokuapp.com/api/v1/diagnosis/antibiotic/create', values ,config)
        .then(res => {
            if (res.data.message === "success") {
                setSendStatus('success')
            } else {
                if (res.data.reason === "name already exist")   
                    setSendStatus('name_error')
                else if (res.data.reason === "category has guide")
                    setSendStatus('category_error')
                else 
                    setSendStatus('request_error')
            }

        })
        .catch(err => {
            setSendStatus('request_error')
            console.log(err)
        })

    }

    return <>

        <Sidebar pageName="Add Antibiotics Guide">

            <Breadcrumbs
                className={AdminStyles.anchor} 
                mt="20px"
            >
                {items}
            </Breadcrumbs>

            <div className={Styles.page_container}>

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
                                Clinical category added succcessfully
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
                                { sendStatus === "name_error" && "Guide Name exists" }
                                { sendStatus === "category_error" && "Category already has a guide under"}
                                { sendStatus === "request_error" && "An error occurred" }
                            </Alert>
                        }

                        <form onSubmit={form.onSubmit((values) => handleSubmit(values))} onChange={() => setSendStatus(null)}>

                            <Select
                                my="30px"
                                label="Antibiotics Guide Category"
                                data={categories.map(r => r.name)}
                                {...form.getInputProps('category')}
                            />

                            <TextInput 
                                my="30px"
                                label="Antibiotics Guide Name"
                                {...form.getInputProps('name')}
                            />

                            <Textarea 
                                my="30px"
                                label="Antibiotics guide (has penicillin allergy) "
                                minRows={5}
                                {...form.getInputProps('withPenicillin')}
                            />

                            <Textarea 
                                my="30px"
                                label="Antibiotics guide (without penicillin allergy)"
                                minRows={5}
                                {...form.getInputProps('withoutPenicillin')}
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

                        </form>
                    </>
                }
                
            </div>
        </Sidebar>
    </>

}

export default AddAntibioticGuide