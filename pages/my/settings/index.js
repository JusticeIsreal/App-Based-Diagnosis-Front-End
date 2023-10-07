import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TopNav from "../../../components/user_components/TopNav";
import styles from "../../../styles/UserDashboard.module.css";
import {
  InputWrapper,
  Switch,
  TextInput,
  Button,
  Tabs,
  Modal,
  Center,
  Alert,
  Autocomplete,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { checkAuthKey, getAuthKey, getUserInfo } from "../../../utils/userAuth";
import axios from "axios";
import { FiAlertCircle } from "react-icons/fi";

const Settings = (props) => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [addTeamModal, setAddTeamModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({ renewing: false });
  const [inviteeEmail, setInviteeEmail] = useState("");
  const [inviteStatus, setInviteStatus] = useState();
  const [inviteEmailError, setInviteEmailError] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const inviteMember = () => {
    const config = {
      headers: {
        Accept: "*/*",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthKey()}`,
      },
    };
    const user = {
      email: inviteeEmail,
    };
    axios
      .post(
        "https://abcdmedical.herokuapp.com/api/v1/subscription/invite",
        user,
        config
      )
      .then((res) => {
        console.log(res.data);
        setInviteStatus(res.data);
        if (inviteStatus !== undefined && inviteStatus.message === "success") {
          displayMessage(4000, "Invitation sent successfully");
        } else {
          console.log(inviteStatus);
        }
      });
  };
  const displayMessage = (timer, message) => {
    setConfirmationModal(false);
    setAddTeamModal(false);
    setSuccessModal(true);
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessModal(false);
    }, timer);
  };

  const validateEmailField = () => {
    let emailRegex = /[a-z0-9]+@[a-z]+/;
    if (inviteeEmail.trim() === "" || !emailRegex.test(inviteeEmail)) {
      setInviteEmailError("invalid email");
      console.log(inviteeEmail);
    } else {
      setInviteEmailError("");
      inviteMember();
    }
  };

  const checkPayment = () => {
    const config = {
      headers: {
        Accept: "*/*",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthKey()}`,
      },
    };

    axios
      .get("https://abcdmedical.herokuapp.com/api/v1/subscription/info", config)
      .then((res) => {
        const data = res.data;
        setPaymentInfo(data);
      })
      .catch((e) => console.log(e));
  };

  const cancelSubscription = () => {
    const config = {
      headers: {
        Accept: "*/*",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthKey()}`,
      },
    };
    axios
      .post(
        "https://abcdmedical.herokuapp.com/api/v1/subscription/cancel",
        [],
        config
      )
      .then((res) => {
        console.log(res);
        res.data === "success"
          ? displayMessage(3000, "Subscription cancelled successfully")
          : displayMessage(3000, res.data);
      })
      .catch((err) => { });
    displayMessage(3000);
    return "message";
  };

  const router = useRouter();

  useEffect(() => {
    if (!checkAuthKey()) router.push("/");
    checkPayment();
  }, []);

  const margin = {
    marginRight: 20,
  };

  return <>
    <TopNav />
    <div className={styles.userContainer}>
      <div className={styles.settings}>
        <h2>Settings</h2>

        <Tabs>
          <Tabs.Tab label="Messages">
            <div className={styles.radioContainer}>
              <div className={styles.radio}>
                <Switch
                  size="md"
                  onLabel="ON"
                  offLabel="OFF"
                  label="Recive notifications via email"
                />
              </div>
              <div className={styles.radio}>
                <Switch
                  size="md"
                  onLabel="ON"
                  offLabel="OFF"
                  label="Recive notifications via SMS"
                />
              </div>
              <div className={styles.radio}>
                <Switch
                  size="md"
                  onLabel="ON"
                  offLabel="OFF"
                  label="Notify when subscription is about to finish"
                />
              </div>
            </div>
          </Tabs.Tab>
          <Tabs.Tab label="Subscription">
            <Modal
              onClose={() => {
                setConfirmationModal(false);
              }}
              opened={confirmationModal}
            >
              <div>
                <p style={{ marginBottom: 20 }}>
                  Are you sure you want to cancel your subscription
                </p>
                <Center>
                  <Button
                    onClick={() => {
                      setConfirmationModal(false);
                    }}
                    style={margin}
                    color={"gray"}
                  >
                    No
                  </Button>
                  <Button onClick={cancelSubscription} color={"red"}>
                    Yes
                  </Button>
                </Center>
              </div>
            </Modal>

            <Modal
              onClose={() => {
                setSuccessModal(false);
              }}
              opened={successModal}
            >
              <Center>{successMessage}</Center>
            </Modal>

            <Modal
              size={"700px"}
              onClose={() => {
                setAddTeamModal(false);
              }}
              opened={addTeamModal}
            >
              {inviteStatus !== undefined && inviteStatus.message === "failed" && (
                <Alert
                  mb="15px"
                  icon={<FiAlertCircle />}
                  title="Bummer!"
                  color="red"
                >
                  <p>{inviteStatus.reason}</p>
                </Alert>
              )}
              <Center>{<h3>Add a member to your team plan</h3>}</Center>
              <div style={{ marginTop: 20 }}>
                <TextInput
                  onChange={(e) => {
                    setInviteeEmail(e.target.value);
                  }}
                  value={inviteeEmail}
                  label={"Invitee email"}
                  error={inviteEmailError}
                />
              </div>
              <div style={{ marginTop: 20, width: "100%" }}>
                <Button
                  onClick={() => {
                    validateEmailField();
                  }}
                  style={{ width: "100%" }}
                >
                  Select a team member above
                </Button>
              </div>
            </Modal>

            <div className={styles.radio}>
              <p>Your current subscription plan is Individual</p>
              <Link href="/my/subscribe">
                <a>
                  <Button>Switch subscription</Button>
                </a>
              </Link>
            </div>

            <div className={styles.radio}>
              <p>cancel your subcription</p>
              <Button
                color={"red"}
                disabled={!paymentInfo.renewing}
                onClick={setConfirmationModal}
              >
                Cancel subscription
              </Button>
            </div>

            <div className={styles.radio}>
              <p>Add member to your team</p>
              <Button
                color={"teal"}
                onClick={() => {
                  setAddTeamModal(true);
                }}
              >
                Add member
              </Button>
            </div>
          </Tabs.Tab>
          <Tabs.Tab label="Security">
            <div className={styles.form}>
              <div className={styles.security}>
                <InputWrapper label="Change password " size="lg">
                  <TextInput label={"Old password"} type="password" />
                  <TextInput label={"New password"} type="password" />
                  <TextInput label={"Confirm password"} type="password" />
                  <Button>Change</Button>
                </InputWrapper>

                <Button color={"red"} className={styles.deleteAccountButton}>
                  Delete account
                </Button>
              </div>
            </div>
          </Tabs.Tab>
        </Tabs>

        <div className={styles.container}></div>
      </div>
    </div>
  </>
};

Settings.propTypes = {};

export default Settings;
