import { useEffect, useState } from 'react'
import TopNav from "../../components/user_components/TopNav";
import styles from "../../styles/UserDashboard.module.css";
import { InputWrapper, TextInput, Select, Button, Modal, Textarea } from '@mantine/core';
import { useRouter } from 'next/router';
import { checkAuthKey } from '../../utils/userAuth';


const Support = () => {

  const [open, setOpen] = useState(false);

  const router = useRouter()

  useEffect(() => {
    if (!checkAuthKey())
      router.push("/")
  }, [])

  return <>

    <TopNav />
    <div className={styles.userContainer}>
      <div className={styles.supportCard}>
        <h3>Customer support</h3>
        <p>If have any issue or something is missing</p>
        <Button onClick={() => { setOpen(true) }}>Create request</Button>
      </div>
      <Modal onClose={() => setOpen(false)} opened={open}>
        <InputWrapper className={styles.supportCardForm}>
          <TextInput label={'Subjects'} />
          <Select
            label="Priorty"
            placeholder="low"
            data={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" }
            ]}
          />
          <Textarea label={'Details'} />
          <Button>Create request</Button>
        </InputWrapper>
      </Modal>
    </div>

  </>
}

export default Support