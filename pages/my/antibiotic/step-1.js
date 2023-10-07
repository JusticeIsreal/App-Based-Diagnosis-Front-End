import TopNav from "../../../components/user_components/TopNav";
import styles from "../../../styles/UserDashboard.module.css";
import { Burger, Tabs, Button, List, Text, ThemeIcon, Center, Loader } from "@mantine/core";
import React, { useState, useEffect } from "react";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import { MdChevronLeft } from "react-icons/md";
import { checkAuthKey, getAuthKey } from "../../../utils/userAuth";
import DiagnoseWrapper from "../../../components/user_components/diagnose-wrapper";
import { AiOutlineCheckCircle } from "react-icons/ai";
import axios from "axios";
import { RiErrorWarningLine } from "react-icons/ri";

const Step1 = () => {
    const router = useRouter();
    const [learnMoreMenu, setlearnMoreMenu] = useState(false);

    useEffect(() => {
        if (!checkAuthKey())
            router.push("/")

        getCategories()
    }, [])

    const [pageName, setPageName] = useState(null)

    const [type, setType] = useState(null)

    const [categories, setCategories] = useState([])

    const [loading, setLoading] = useState(true)

    const getCategories = () => {
        const search = localStorage.getItem("search")

        if (!search)
            router.push("/my/antibiotic")

        setPageName(search)

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthKey()}`
            }
        }

        const body = {
            name: search
        }

        axios.post("https://abcdmedical.herokuapp.com/api/v1/diagnosis/antibiotic/singlecat", body ,config )
        .then(res => {
            if (res.data.message === "success") {
                setType(res.data.type)
                setCategories(res.data.data)
                console.log(res.data)
            }
        }).catch(err => { console.log(err) })

        setLoading(false)
    }

    const forGuide = (id) => {

        try {
            localStorage.setItem("guide", id)
            router.push("/my/antibiotic/step-2")

        } catch (err) { console.log(err) }

    }

    const forCategory = (name) => {

        try {
            localStorage.setItem("search", name)
            window.location.reload(false)

        } catch (err) { console.log(err) }

    }

    const handleClick = (data) => {

        if (type === "categories")
            forCategory(data.name)

        if (type === "diagnosis")
            forGuide(data.id)
    }

    return <>
        <TopNav />
        <DiagnoseWrapper>
            <div className={styles.userContainer}>
                <div
                    className={`${styles.learnMoreBar} ${
                        learnMoreMenu === false ? styles.hide : styles.learnMoreBar
                    }`}
                >
                    <Burger
                        onClick={() => {
                            setlearnMoreMenu(false);
                        }}
                        opened={learnMoreMenu}
                    />
                    <p>
                        Rheumatic fever (acute rheumatic fever) is a disease that
                        can affect the heart, joints, brain, and skin. Rheumatic
                        fever can develop if strep throat, scarlet fever, and strep
                        skin infections are not treated properly.
                    </p>
                </div>
                <div className={styles.diagnoseBox}>
                    <h1 style={{textTransform: 'capitalize'}}>{pageName}</h1>
                    <Text mb="20px" className={styles.diagnoseQuestion}>
                    Here are the categories under {pageName}
                    </Text>
                    {
                        !loading && categories.length > 0 &&
                        <List
                            icon={
                                <ThemeIcon color="blue" size={24} radius="xl">
                                    <AiOutlineCheckCircle />
                                </ThemeIcon>
                            }
                            spacing="sm"
                            style={{width: "fit-content"}}
                            styles={{
                                item: { cursor: 'pointer'}                        
                            }}
                        >
                            {
                                categories.map((cat, index) => (
                                    <List.Item key={index} onClick={() => handleClick(cat)}>
                                        {cat.name}
                                    </List.Item>
                                ))
                            }
                        </List>
                    }
                    {
                        !loading && categories.length == 0 &&
                        <Center style={{height: "250px", width: "100%"}}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <ThemeIcon color="red" size={100} radius="100%" mb="20px">
                                    <RiErrorWarningLine size="100%" />
                                </ThemeIcon>
                                <Text>No Category or Guide available for this category</Text>
                            </div>
                        </Center>
                    }
                </div>
            </div>
        </DiagnoseWrapper>
    </>
};

export default Step1;
