import TopNav from "../../../components/user_components/TopNav";
import styles from "../../../styles/UserDashboard.module.css";
import Link from "next/dist/client/link";

import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import doctor from "../../../images/doctor.png";
import Image from "next/dist/client/image";
import { MdSearch } from "react-icons/md";
import {
    TextInput,
    Autocomplete,
    Modal,
    Button,
    Chips,
    Chip,
    Burger,
} from "@mantine/core/";
import { useRouter } from "next/router";
import { checkAuthKey, getAuthKey } from "../../../utils/userAuth";
import DiagnoseWrapper from "../../../components/user_components/diagnose-wrapper";
import axios from "axios";

const Clinical = () => {

    const router = useRouter()

    useEffect(() => {
        if (!checkAuthKey())
            router.push("/")
    }, [])

    const [searchData, setSearchData] = useState([])

    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        fetchSearchData()
    }, [])

    const fetchSearchData = () => {

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthKey()}`
            }
        }

        const body = {
            name: ""
        }

        axios.post("https://abcdmedical.herokuapp.com/api/v1/diagnosis/clinical/search", body ,config )
        .then(res => {
            if (res.status === 200) {
                setSearchData(res.data.map(r => r.name))
            }
        }).catch(err => { console.log(err) })

    }

    const start = () => {

        try {

            localStorage.setItem("clinical", searchValue)
            router.push("/my/clinical/step-1")

        } catch (e) {
            console.log("Error: " + e)
        }

    }

    return <>
        <TopNav />
        <DiagnoseWrapper>
            <div className={styles.userContainer}>

            <div className={styles.diagnoseBox}>
                <div className={styles.startingDiagnose}>
                    <h1>Get guided on your Clinical Prescriptions</h1>
                    <div className={styles.startingDiagnoseContainer}>
                        <div className={styles.startingDiagnoseContainerSearch}>
                            <Autocomplete
                                label={"Search here"}
                                radius={50}
                                size={'md'}
                                icon={<MdSearch />}
                                placeholder="Search Prescription"
                                value={searchValue}
                                data={searchData}
                                onChange={setSearchValue}
                            />
                            <div
                                className={styles.startingDiagnoseContainerBox}
                            >
                                {searchValue}
                            </div>

                           
                        </div>
                        <div className={styles.startingDiagnoseContainerText}>
                                <p>
                                    Please search for your disease and get diagnose,
                                    the information you give is save and secured and
                                    wont be shared
                                </p>
                                <h4>Result will include</h4>
                                <ul>
                                    <li>Medication</li>
                                    <li>Recomendation on what to do next</li>
                                </ul>
                            </div>
                    </div>
                    <Button 
                        size={'md'} 
                        color={"teal"} 
                        onClick={() => start()}
                        disabled={!searchData.find(r => r === searchValue)}
                    >
                        Start prescription
                    </Button>
                </div>
            </div>
            </div>
        </DiagnoseWrapper>
    </>
};

export default Clinical;
