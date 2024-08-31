import { ThumbsUpDownOutlined, ThumbUp, ThumbUpOffAlt } from "@mui/icons-material";
import { Calendar, Delete, DollarSign, Pencil } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import noImage from "../../../Assets/Images/no-image.jpg";
import VacationModel from "../../../Models/VacationModel";
import authStore from "../../../Redux/AuthState";
import FollowService from "../../../Services/FollowService";
import notifyService from "../../../Services/NotifyService";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
    deleteVacation: Function;
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>(props.vacation);

    // get current user from global state:
    let user = authStore.getState().user;

    // set true or false for roleId:
    let isAdmin = (user?.roleId === 1);

    // reformat the dates for a single string:
    function fullVacationDate() {
        let start = new Date(vacation.startDate).toLocaleDateString("en-GB");
        let finish = new Date(vacation.finishDate).toLocaleDateString("en-GB");
        let fullVacation = `${start} - ${finish}`;
        return fullVacation;
    }

    // onclick activate deleteVacation in VacationList:
    function handleDelete(): void {
        props.deleteVacation(props.vacation);
    }

    // add follow by userId and vacationId:
    async function follow(): Promise<void> {
        try {
            // update follow local state:
            let vacationToAddFollow = { ...vacation };
            vacationToAddFollow.followersCount = vacation.followersCount + 1;
            vacationToAddFollow.isFollowing = 1;
            setVacation(vacationToAddFollow);

            // update server and global state:
            await FollowService.addFollow(user.userId, vacation.vacationId);
            notifyService.success(`${user.firstName} followed ${vacation.destination}`);
        } catch (err) { notifyService.error(err) }
    }

    // unfollow by userId and vacationId:
    async function unfollow() {
        try {
            // update follow local state:
            let vacationToRemoveFollow = { ...vacation };
            vacationToRemoveFollow.followersCount = vacation.followersCount - 1;
            vacationToRemoveFollow.isFollowing = 0;
            setVacation(vacationToRemoveFollow);

            // update server and global state:
            await FollowService.deleteFollow(user.userId, vacation.vacationId);
            notifyService.success(`${user.firstName} unfollowed ${vacation.destination}`);
        } catch (err) { notifyService.error(err) }
    }

    return (
        <div className="VacationCard">
            <div className="top-area"> 
                <img className="vacation-img" src={vacation.imageUrl ? vacation.imageUrl : noImage} />
            </div>
            <div className="head-area">
                <h3 className="destination">{vacation.destination}</h3>
                <div className="actions">
                    <div className="follow-area">
                        {!isAdmin && //actions for regular user:
                            <>
                                {vacation.isFollowing === 0 && //display if user isn't following
                                    <button className="button" onClick={follow} title="click to follow">
                                        <ThumbUpOffAlt />
                                    </button>
                                }

                                {vacation.isFollowing === 1 && //display if user is following
                                    <button className="button" onClick={unfollow} title="click to unfollow">
                                        <ThumbUp />
                                    </button>
                                }
                            </>}
                        {isAdmin && <ThumbsUpDownOutlined titleAccess="followers" />}
                        <span className="followers-count">{vacation.followersCount}</span>
                    </div>
                    {/* actions for isAdmin: */}
                    {isAdmin && <>
                        <NavLink className="button" to={"/vacations/update-vacation/" + vacation.vacationId} title="update vacation">
                            <Pencil className="lucide" />
                        </NavLink>
                        <button className="button" onClick={handleDelete} title="delete vacation">
                            <Delete className="lucide" />
                        </button>
                    </>}
                </div>
            </div>
            <div className="info-area">
                <span className="date"><Calendar className="lucide lucide-info " /> {fullVacationDate()}</span>
                <span className="price"><DollarSign className="lucide lucide-info" /> {vacation.price}</span>
            </div>
            <div className="description-area">{vacation.description}</div>
        </div>
    );
}

export default VacationCard;

