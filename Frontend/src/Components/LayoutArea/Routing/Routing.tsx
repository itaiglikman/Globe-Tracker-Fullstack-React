import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import FollowChart from "../../FollowChart/FollowChart";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import UpdateVacation from "../../VacationsArea/UpdateVacation/UpdateVacation";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {

    return (
        <Routes>
            {/* register route */}
            <Route path="/register" element={<Register />} />

            {/* login route */}
            <Route path="/login" element={<Login />} />

            {/* Landing Page Route: */}
            <Route path="/home" element={<Home />} />

            {/* vacations route: */}
            <Route path="/vacations" element={<VacationsList />} />

            {/* follow chart route: */}
            <Route path="/vacations/follow-chart" element={<FollowChart />} />

            {/* add vacation route: */}
            <Route path="/vacations/add-vacation" element={<AddVacation />} />

            {/* update vacation route: */}
            <Route path="/vacations/update-vacation/:vacationId" element={<UpdateVacation />} />

            {/* default route: */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* page not found rout: */}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;

