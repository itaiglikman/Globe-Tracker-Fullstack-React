import { BarChart3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FiltersModel from "../../../Models/FiltersModel";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import authStore from "../../../Redux/AuthState";
import filterService from "../../../Services/FilterService";
import notifyService from "../../../Services/NotifyService";
import VacationService from "../../../Services/VacationService";
import useTitle from "../../../Utils/UseTitle";
import Spinner from "../../Spinner/Spinner";
import FilterVacations from "../FilterVacations/FilterVacations";
import Pagination from "../Pagination/Pagination";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";


function VacationsList(): JSX.Element {

    useTitle("Vacations");
    const [vacations, setVacations] = useState<VacationModel[]>([]); //all vacations array
    const [filterVacations, setFilterVacations] = useState<VacationModel[]>([]); // vacations array by current filter
    const [vacationsByPage, setVacationsByPage] = useState<VacationModel[]>([]); // vacations array for current page
    const [page, setPage] = useState<number>(1); // current page to display
    const [user, setUser] = useState<UserModel>(); //logged user
    const [onDeleted, setOnDeleted] = useState<boolean>(false); //delete status
    const [noVacationsMsg, setNoVacationsMsg] = useState<string>(""); // custom message for user if no vacations available

    const navigate = useNavigate();

    // pagination data:
    let cardsLimitPerPage = 9; // card limits in each page:
    let totalCards = filterVacations ? filterVacations.length : vacations.length; // all existing vacations:
    let totalPages = Math.ceil(totalCards / cardsLimitPerPage); // amount of pages needed:

    useEffect(() => {
        // set logged user by current global state:
        let loggedUser = authStore.getState().user;
        setUser(loggedUser);

        // subscribe for user log changes:
        let authUnsubscribe = authStore.subscribe(() => setUser(loggedUser));

        // get vacations from db for displaying:
        VacationService.getFollowVacations(loggedUser?.userId)
            .then(dbVacations => {
                // set vacations from db:
                setVacations(dbVacations);
                // initial set for filterVacations:
                setFilterVacations(dbVacations);

                // set pagination vacations:
                let initialVacationsByPage = VacationService.getVacationsPage(page, cardsLimitPerPage, dbVacations);
                setVacationsByPage(initialVacationsByPage);
            })
            .catch(err => {
                notifyService.error(err);
                // on unauthorized request - send to login page:
                if (err.response.status === 401) navigate("/login");
            });

        return authUnsubscribe;

        // trigger onDelete change for render and display vacationsStore change:
    }, [onDeleted]);

    // useEffect for changes in page and filterVacations:
    useEffect(() => {

        // get the current vacations:
        let currentVacations = filterVacations ? filterVacations : vacations;

        // get the vacations by current page:
        let currentVacationsByPage = VacationService.getVacationsPage(page, cardsLimitPerPage, currentVacations);

        // update vacations for display:
        setVacationsByPage(currentVacationsByPage);

    }, [page, filterVacations,]);


    // function will handle filters change:
    function handleFilters(currentFilters: FiltersModel) {

        // get the right vacations according to the current filters:
        let currentFilteredVacations = filterService.getFilters(currentFilters, vacations);
        
        // in case there are filtered vacations:
        if (currentFilteredVacations?.length > 0) {
            setFilterVacations(currentFilteredVacations); // update vacations:
            setNoVacationsMsg(""); // set msg default:
            setPage(1); // display first page:
            return currentFilters;
        }

        //if no filtered vacations - set error msg:
        setNoVacationsMsg("No Available Vacations for this filter");
    }

    // on page change: get the value from pagination component and update page state:
    function handlePageChange(newPage: number) {
        setPage(newPage);
    }

    // delete a single vacation:
    // get vacation id from card component
    async function deleteVacation(vacation: VacationModel): Promise<void> {
        try {
            // Swal popup alert for confirming delete:
            let swal = await Swal.fire({
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Delete it!",
                heightAuto: false, // don't break local layout
                padding: 10,
                width: 400,
                imageUrl: vacation.imageUrl,
                imageWidth: 400,
                imageHeight: 200,
            });
            if (swal.isConfirmed) { // on confirming delete:
                // execute delete in db and global state:
                await VacationService.deleteVacation(vacation.vacationId);

                handleFilters({ all: true, active: false, future: false, followed: false });

                // trigger useEffect on delete to render the page and display the change by vacationsStore:
                setOnDeleted(prev => !prev);

                // notyf user for successful delete:
                notifyService.success("The Vacation has been deleted.");
            }
            // notyf user nothing was deleted:
            else { notifyService.error("Nothing has been deleted."); }
        } catch (err: any) { notifyService.error(err) }
    }

    const renderPagination = () => ( //pagination element:
        <Pagination
            totalPages={totalPages}
            currentPage={page}
            changePage={handlePageChange}
        />
    );

    // display spinner while waiting for vacations form db:
    if (vacations.length === 0) return <Spinner />

    return (
        <div className="VacationsList">
            <h2>Vacations List</h2>

            {user?.roleId === 1 && //follow chart link only admin
                <NavLink to={"/vacations/follow-chart"} title="followers chart"><BarChart3 /></NavLink>
            }

            <FilterVacations //filters:
                getCurrentFilters={handleFilters}
            />

            {noVacationsMsg //if there is message:
                ? //display msg:
                noVacationsMsg
                : // no msg - display vacations: 
                <>
                    {renderPagination()} {/* head pagination */}

                    <div className="vacationsContainer">
                        {vacationsByPage.map(v =>
                            <VacationCard key={v.vacationId}
                                vacation={v}
                                deleteVacation={deleteVacation}
                            />)}
                    </div>

                    {renderPagination()} {/* bottom pagination */}
                </>
            }
        </div>
    );
}

export default VacationsList;
