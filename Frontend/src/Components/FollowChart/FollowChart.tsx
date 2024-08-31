import { FileDown } from "lucide-react";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Label, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import VacationModel from "../../Models/VacationModel";
import authStore from "../../Redux/AuthState";
import notifyService from "../../Services/NotifyService";
import VacationService from "../../Services/VacationService";
import useProtectedPage from "../../Utils/UseProtectedPage";
import useTitle from "../../Utils/UseTitle";
import "./FollowChart.css";

interface FollowData {
    vacation: string;
    followers: number;
}

function FollowChart(): JSX.Element {
    const [followData, setFollowData] = useState<FollowData[]>([]);
    const navigate = useNavigate();
    useTitle("Follow Chart");

    // custom hook for protecting pages from unauthorized access.
    // hook get if access is for admin only or not.
    // if no logged user or not admin - display error message and navigate user.
    useProtectedPage(true); //catch entering of logged unauthorized user

    useEffect(() => {
        // get vacations array:
        let loggedUser = authStore.getState().user;
        VacationService.getFollowVacations(loggedUser?.userId)
            .then(dbVacations => {
                let newFollowData = createFollowData(dbVacations);
                setFollowData(newFollowData);
            })
            .catch(err => {
                if (err.response.status === 401) navigate("/login");
                notifyService.error(err)
            });
    }, []);


    function createFollowData(currentVacations: VacationModel[]): FollowData[] {
        let newFollowData: FollowData[] = [];
        for (let i = 0; i < currentVacations.length; i++) {
            newFollowData.push({ vacation: currentVacations[i].destination, followers: currentVacations[i].followersCount });
        }
        return newFollowData;
    }


    return (
        <div className="FollowChart">
            <h2>Followers Analytics</h2>
            <ResponsiveContainer width="100%" height={300} minWidth={400}>
                <BarChart data={followData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <XAxis dataKey="vacation" tick={{ width: 30, fontSize: 12, fill: "black", fontWeight: "100" }} angle={-45} >
                        <Label value="vacations" offset={30} position="bottom" fill="#8884d8" />
                    </XAxis>
                    <YAxis allowDecimals={false}>
                        <Label value="followers" angle={-90} fill="#8884d8" />
                    </YAxis>
                    <Bar dataKey="followers" barSize={30} fill="#8884d8" legendType="circle">
                        <LabelList dataKey="followers" position="top" fill="black" />
                    </Bar>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip label={"followers"} />
                </BarChart>
            </ResponsiveContainer>
            {/* csv download: */}
            <CSVLink
                data={followData}
                filename={`${new Date().toLocaleDateString()}-vacations-followers.csv`}
                className="csv"
                title="csv">
                <FileDown />
            </CSVLink>
        </div>
    );
}

export default FollowChart;
