import styles from "../../../styles/Reciept.module.css";
import navLogo from '../../../images/App-Based_Click_&_Diagnose-Logo-PNG_3.png'
import signatureText from '../../../images/App-Based_Click_&_Diagnose-Logo-PNG_4.png'
import doctor from '../../../images/doctor.png'
import Image from "next/dist/client/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { checkAuthKey } from "../../../utils/userAuth";
import DiagnoseWrapper from "../../../components/user_components/diagnose-wrapper";


const DiagnoseResult = () => {

    const router = useRouter()

    useEffect(() => {
        if (!checkAuthKey())
            router.push("/")
    }, [])

    return <>
        <DiagnoseWrapper>
            <div className={styles.reciept}>
                <h1><div className={styles.recieptLogo}> <Image src={navLogo} /></div> Diagnose reciept</h1>
                <div className={styles.recieptTop}>
                    <div>
                        <label>Reciept number:</label> <input />
                    </div>
                    <div>
                        <label>Date:</label> <input />
                    </div>
                </div>

                <div className={styles.patientDetails}>
                    <h3> Patient details</h3>
                    <div>
                        <label>Firstname:</label> <input />
                    </div>
                    <div>
                        <label>Surname:</label> <input />
                    </div>
                </div>

                <div className={styles.content}>
                    <div>
                        <label> diagnose name:</label> <input />
                    </div>
                    <div className={styles.content}>
                        <label> Prescription:</label> <textarea></textarea>
                    </div>
                </div>

                <div className={styles.signature}>
                    <div className={styles.signatureContainer}>
                        <Image src={signatureText} />
                    </div>
                </div>

                <h4>DISCLAIMER</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro et recusandae eligendi ipsam, consequuntur voluptates odit quibusdam saepe iste sequi?
                </p>
            </div>
        </DiagnoseWrapper>
    </>
};

export default DiagnoseResult;
