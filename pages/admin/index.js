import { Badge, Center, Loader, Skeleton, Table } from "@mantine/core";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory";
import Sidebar from "../../components/admin_components/Sidebar"
import Styles from "../../styles/AdminHome.module.css"
import AdminStyles from "../../styles/Admin.module.css"
import { useEffect, useState } from "react";
import { getAdminAuthKey } from "../../utils/adminAuth";
import axios from "axios";
import DataTable from "react-data-table-component"

const AdminHomePage = () => {

    const chartData = [
        {quarter: 1, earnings: 13000},
        {quarter: 2, earnings: 16500},
        {quarter: 3, earnings: 14250},
        {quarter: 4, earnings: 19000}
    ];

    const [newUser, setNewUser] = useState([])

    const [getUsersStatus, setGetUsersStatus] = useState(null)

    const columns = [
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Status',
            cell: row =>
            <>
                {row.status === "open" && <Badge variant="filled" color="green">Active</Badge> }
                {row.status === "blocked" && <Badge variant="filled" color="red">Blocked</Badge> }
            </>
        },
        {
            name: 'Card',
            cell: row =>
            <>
                {row.hasCard && <Badge variant="filled" color="green">Added card</Badge> }
                {!row.hasCard && <Badge variant="filled" color="red">No Card</Badge> }
            </>
        }
    ];

    const getUsers = () => {

        setGetUsersStatus('loading')

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.get('https://abcdmedical.herokuapp.com/api/v1/statistics/recentusers', config)
        .then (res => {
            // setNewUser(res.data.plan)
            if (res.data?.length > 0){
                setNewUser(res.data)
                setGetUsersStatus('success')
            }

        }).catch (err => console.log(err))

    }

    const [stats, setStats] = useState(null)

    const [statStatus, setStatStatus] = useState(null)

    const getStats = () => {

        setStatStatus('loading')

        const config = {
            "headers": {
                "Accept": "*/*",
                // "Content-Type": "application/json",
                "Authorization": `Bearer ${getAdminAuthKey()}`
            }
        }

        axios.get('https://abcdmedical.herokuapp.com/api/v1/statistics/all', config)
        .then (res => {
            // setNewUser(res.data.plan)
            if (res.status === 200){
                setStats(res.data)
                setStatStatus('success')
            }

        }).catch (err => console.log(err))

    }

    useEffect(() => {
        getUsers()
        getStats()
    }, [])


    return <>

        <Sidebar pageName="Overview">
            <div className={Styles.stat_cards_container}>
                { 
                    (statStatus !== null && statStatus !== "loading") &&
                    <div className={Styles.stat_cards_display}>
                        <div className={Styles.stat_card}>
                            <p className={Styles.stat_value}>{stats.active_sub}</p>
                            <p className={Styles.stat_name}>Active Subs</p>
                        </div>
                        <div className={Styles.stat_card}>
                            <p className={Styles.stat_value}>{stats.ended_sub}</p>
                            <p className={Styles.stat_name}>Ended Subs</p>
                        </div>
                        <div className={Styles.stat_card}>
                            <p className={Styles.stat_value}>{stats.non_renewing_sub}</p>
                            <p className={Styles.stat_name}>Non-renewing Subs</p>
                        </div>
                        <div className={Styles.stat_card}>
                            <p className={Styles.stat_value}>{stats.users}</p>
                            <p className={Styles.stat_name}>Users</p>
                        </div>
                    </div> 
                }

                {
                    (statStatus !== null && statStatus === "loading") &&
                    <div className={Styles.stat_cards_display}>
                        <div className={Styles.stat_card}>
                            {/* <p className={Styles.stat_value}>100</p> */}
                            <Skeleton width="40%" height="20px" mb="10px" />
                            <p className={Styles.stat_name}>Active Subs</p>
                        </div>
                        <div className={Styles.stat_card}>
                            <Skeleton width="40%" height="20px" mb="10px" />
                            <p className={Styles.stat_name}>Ended Subs</p>
                        </div>
                        <div className={Styles.stat_card}>
                            <Skeleton width="40%" height="20px" mb="10px" />
                            <p className={Styles.stat_name}>Non-renewing Subs</p>
                        </div>
                        <div className={Styles.stat_card}>
                            <Skeleton width="40%" height="20px" mb="10px" />
                            <p className={Styles.stat_name}>Users</p>
                        </div>
                    </div>
                }

                <div className={Styles.chart_container}>
                    <VictoryChart
                        domainPadding={20}
                    >
                        <VictoryAxis
                            // tickValues specifies both the number of ticks and where
                            // they are placed on the axis
                            tickValues={[1, 2, 3, 4]}
                            tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                        />
                        <VictoryAxis
                            dependentAxis
                            // tickFormat specifies how ticks should be displayed
                            tickFormat={(x) => (`$${x / 1000}k`)}
                        />
                        <VictoryBar 
                            data={chartData}
                            style={{
                                data: { fill: "#c4ddff" },
                                // labels: { fontSize: 12 },
                            }}
                            // data accessor for x values
                            x="quarter"
                            // data accessor for y values
                            y="earnings"
                        />
                    </VictoryChart>
                </div>
            </div>

            <div>
                <p className={Styles.users_text}>Recent Users</p>
                <div className={AdminStyles.table_container}>
                    {
                        getUsersStatus === "success" &&
                        <DataTable
                            columns={columns}
                            data={newUser}
                        /> 
                    }

                    {
                        getUsersStatus === "loading" &&
                        <Center style={{height: "400px", width: "100%"}}>
                            <Loader variant="bars" size="lg" />
                        </Center>
                    }
                </div>
            </div>
        </Sidebar>

    </>

} 

export default AdminHomePage