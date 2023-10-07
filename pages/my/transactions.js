import TopNav from "../../components/user_components/TopNav";
import styles from "../../styles/UserDashboard.module.css";
import UserTransactionTable from '../../components/user_components/UserTransactionTable'
import { useEffect } from "react";
import { useRouter } from "next/router";
import { checkAuthKey } from "../../utils/userAuth";

const Transactions = () => {

  const router = useRouter()

  useEffect(() => {
    if (!checkAuthKey())
      router.push("/")
  }, [])

  return <>
    <TopNav />
    <div className={styles.userContainer}>
      <UserTransactionTable />
    </div>
  </>
}

export default Transactions