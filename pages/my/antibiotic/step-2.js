import TopNav from "../../../components/user_components/TopNav";
import styles from "../../../styles/UserDashboard.module.css";
import { Burger } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import { MdChevronLeft } from 'react-icons/md'
import { checkAuthKey } from "../../../utils/userAuth";
import DiagnoseWrapper from "../../../components/user_components/diagnose-wrapper";

const Diagnose = () => {

    const router = useRouter()
    const [learnMoreMenu, setlearnMoreMenu] = useState(false);

    useEffect(() => {
        if (!checkAuthKey())
            router.push("/")
    }, [])

    const setOption = (option) => {
        
        try{

            localStorage.setItem("penicillin", option)
            router.push("/my/antibiotic/step-3")

        } catch (e) { console.log(err)  }

    }

    return <>
        <TopNav />
        <DiagnoseWrapper>
        <div className={styles.userContainer}>
            <div className={`${styles.learnMoreBar} ${learnMoreMenu === false ? styles.hide:styles.learnMoreBar}`}>
                <Burger onClick={()=>{
                    setlearnMoreMenu(false);
                }} opened={learnMoreMenu}/>
                <p>
                Rheumatic fever (acute rheumatic fever) is a disease that can affect the heart, joints, brain, and skin. Rheumatic fever can develop if strep throat, scarlet fever, and strep skin infections are not treated properly.
                </p>
            </div>
            <div className={styles.diagnoseBox}>
                {/* <h1>Rheumatic Fever</h1> */}
                <p className={styles.diagnoseQuestion}>What is penicillin? <span  onClick={()=>{
                    setlearnMoreMenu(true);
                }}>learn more</span></p>
                <div className={styles.diagnoseBoxOptions}>
                    <p>Is your patient allergic to penicilin</p>
                    <div className={`${styles.optionsContainer}` } >
                        <div className={styles.options} onClick={() => setOption("yes")}>Yes</div>
                        <div className={styles.options} onClick={() => setOption("no")}>No</div>
                    </div>

                    <p className={styles.diagnoseBackArrow} onClick={() => router.back()}> <MdChevronLeft />Back</p>
                </div>

            </div>
            </div>
        </DiagnoseWrapper>
    </>
};

export default Diagnose;
