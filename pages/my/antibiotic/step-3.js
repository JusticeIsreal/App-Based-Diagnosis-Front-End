import TopNav from "../../../components/user_components/TopNav";
import styles from "../../../styles/UserDashboard.module.css";
import { Burger, Button, Center, Loader, Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import { checkAuthKey, getAuthKey } from "../../../utils/userAuth";
import DiagnoseWrapper from "../../../components/user_components/diagnose-wrapper";
import axios from "axios";

const Step3 = () => {
    const [restart, setRestart] = useState();
    const [learnMoreMenu, setlearnMoreMenu] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (!checkAuthKey()) router.push("/");
    }, []);

    const [status, setStatus] = useState("loading");

    const [guide, setGuide] = useState(null)

    const [penicillin, setPenicillin] = useState(null)

    const getGuide = () => {

        try {
            setPenicillin(localStorage.getItem("penicillin"))
        } catch (error) {
            console.log(error)
        }

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAuthKey()}`
            }
        }

        const body = {
            id: localStorage.getItem("guide"),
        }

        axios.post("https://abcdmedical.herokuapp.com/api/v1/diagnosis/antibiotic/single", body, config)
        .then(res => {
            setGuide(res.data)
            setStatus("success")
        })
        .catch(error => console.error(error))
    }

    useEffect(() => {
        getGuide()
    }, [])

    return (
        <>
            <TopNav />
            <DiagnoseWrapper>
                <div className={styles.userContainer}>
                    <Modal
                        className={styles.restartDiagnoseModal}
                        onClose={() => {
                            setRestart(false);
                        }}
                        opened={restart}
                    >
                        <p>If you restart your diagnose will be lost</p>

                        <Button
                            onClick={() => {
                                setRestart(false);
                            }}
                            color={"blue"}
                        >
                            Cancel
                        </Button>
                        
                        <Button 
                            color={"red"}
                            onClick={() => {
                                router.push("/my/antibiotic")
                            }}
                        >
                            Restart
                        </Button>
                    </Modal>

                    <div
                        className={`${styles.learnMoreBar} ${
                            learnMoreMenu === false
                                ? styles.hide
                                : styles.learnMoreBar
                        }`}
                    >
                        <Burger
                            onClick={() => {
                                setlearnMoreMenu(false);
                            }}
                            opened={learnMoreMenu}
                        />
                        <p>
                            Rheumatic fever (acute rheumatic fever) is a disease
                            that can affect the heart, joints, brain, and skin.
                            Rheumatic fever can develop if strep throat, scarlet
                            fever, and strep skin infections are not treated
                            properly.
                        </p>
                    </div>
                    
                    <div className={styles.diagnoseBox}>
                        {
                            status === "success" &&
                            <>

                                <h1>{guide.name}</h1>
                                {/* <p className={styles.diagnoseQuestion}>
                                    What is Phenoxymethylpenicillin?{" "}
                                    <span
                                        onClick={() => {
                                            setlearnMoreMenu(true);
                                        }}
                                    >
                                        learn more
                                    </span>
                                </p> */}
                                <div className={styles.diagnoseBoxOptions}>
                                    <p>Diagnose complete</p>
                                    <div className={styles.prescriptionContainer}>
                                        <div className={styles.prescription}>
                                            <h3>Prescription</h3>
                                            <p
                                                className={
                                                    styles.MoreprescriptionDetails
                                                }
                                            >
                                                {penicillin === "yes" && guide.withPenicillin}
                                                {penicillin === "no" && guide.withoutPenicillin}
                                            </p>
                                        </div>

                                        {/* <div className={styles.prescription}>
                                            <h3>Dosage</h3>
                                            <p>Dose 1.2g IM every 4 weeks.</p>
                                            <p
                                                className={
                                                    styles.MoreprescriptionDetails
                                                }
                                            >
                                                The oral dose is less effective.
                                                Prophylaxis against rheumatic fever is
                                                indicated for 5 years after the first
                                                episode or until the age of 21 years to
                                                prevent valvular damage.
                                            </p>
                                        </div> */}
                                    </div>
                                </div>
                                <div className={styles.btn}>
                                    <Button
                                        onClick={() => {
                                            setRestart(true);
                                        }}
                                        color={"blue"}
                                    >
                                        Restart diagnose
                                    </Button>
                                </div>

                                {/* <div className={styles.btn}>
                                    <Link
                                        href={"/my/diagnosis/diagnose-result"}
                                        target="_blank"
                                    >
                                        <a href="">
                                            <Button color={"teal"}>
                                                Download pdf for diagnose
                                            </Button>
                                        </a>
                                    </Link>
                                </div> */}
                            
                            </>
                        }

                        {
                            status === "loading" &&
                            <Center style={{height: "300px", width: "100%"}}>
                                <Loader variant="bars" size="lg" />
                            </Center>
                        }
                        
                    </div>
                </div>
            </DiagnoseWrapper>
        </>
    );
};

export default Step3;