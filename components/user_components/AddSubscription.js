import { InputWrapper,TextInput,Textarea,Button } from '@mantine/core'
import styles from "../../styles/UserDashboard.module.css";


const AddSubscription = () => {
  return (
    <div className={styles.addSubscription}>
        <h3>Add subscription plan</h3>
        <form>
            <InputWrapper>
              <TextInput label='Name'/>
              <TextInput label='Ammount'/>
              <Textarea label='Description'/>
              <Button>Add plan</Button>
            </InputWrapper>
        </form>
    </div>
  )
}

export default AddSubscription