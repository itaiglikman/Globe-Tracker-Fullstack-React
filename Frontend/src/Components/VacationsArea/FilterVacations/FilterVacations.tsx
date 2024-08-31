import { useEffect, useState } from "react";
import FiltersModel from "../../../Models/FiltersModel";
import authStore from "../../../Redux/AuthState";
import "./FilterVacations.css";

interface FilterVacationsProps {
    // pass the filters' mode
    getCurrentFilters: (currentFilters: FiltersModel) => void;
}

function FilterVacations(props: FilterVacationsProps): JSX.Element {

    // states for each filter:
    const [all, setAll] = useState<boolean>(true);
    const [active, setActive] = useState<boolean>(false);
    const [future, setFuture] = useState<boolean>(false);
    const [followed, setFollowed] = useState<boolean>(false);

    // check if logged user is admin:
    let isAdmin = authStore.getState().user?.roleId === 1 ? true : false;

    // on page load send the default filters(all):
    useEffect(() => {
        props.getCurrentFilters({ all: true, active: false, future: false, followed: false });
    }, []);

    // send current filters:
    function handleClickChange(currentFilters: FiltersModel) {
        props.getCurrentFilters(currentFilters);
    }

    // on All Vacations click:
    // change filters states according to the possible combinations:
    function handleAllClick() {
        // get current filters states:
        let currentFilters = new FiltersModel(all, active, future, followed)

        // allowed combination: only All Vacations:
        setAll(currentFilters.all = true);
        setActive(currentFilters.active = false);
        setFuture(currentFilters.future = false);
        setFollowed(currentFilters.followed = false);

        // send updated filters:
        handleClickChange(currentFilters);
    }

    // on Active Vacations click:
    // change filters states according to the possible combinations:
    function handleActiveClick() {
        // get current filters states:
        let currentFilters = new FiltersModel(all, active, future, followed)
        // if was clicked already:
        if (active) setActive(currentFilters.active = false);

        // allowed combination: Active and Followed Vacations:
        else {
            setActive(currentFilters.active = true);
            setAll(currentFilters.all = false);
            setFuture(currentFilters.future = false);
        }

        // send updated filters:
        handleClickChange(currentFilters);
    }

    // on Future Vacations click:
    // change filters states according to the possible combinations:
    function handleFutureClick() {

        // get current filters states:
        let currentFilters = new FiltersModel(all, active, future, followed)

        // if was clicked already:
        if (future) setFuture(currentFilters.future = false);

        // allowed combination: Future and Followed Vacations:
        else {
            setFuture(currentFilters.future = true);
            setAll(currentFilters.all = false);
            setActive(currentFilters.active = false);
        }

        // send updated filters:
        handleClickChange(currentFilters);
    }

    // on Followed Vacations click:
    // change filters states according to the possible combinations:
    function handleFollowedClick() {
        // get current filters states:
        let currentFilters = new FiltersModel(all, active, future, followed)

        // if was clicked already:
        if (followed) setFollowed(currentFilters.followed = false);

        // allowed combination: all but All Vacations:
        else {
            setFollowed(currentFilters.followed = true);
            setAll(currentFilters.all = false);
        }

        // send updated filters:
        handleClickChange(currentFilters);
    }

    return (
        <div className="FilterVacations">
            <input type="checkbox" onChange={handleAllClick} name="allVacations" value="allVacations" checked={all} />
            <label>All</label>

            <input type="checkbox" onChange={handleActiveClick} name="activeVacations" value="activeVacations" checked={active} />
            <label>Active</label>

            <input type="checkbox" onChange={handleFutureClick} name="futureVacations" value="futureVacations" checked={future} />
            <label>To Be</label>

            {!isAdmin && //display followed filter only for regular users:
                <>
                    < input type="checkbox" onChange={handleFollowedClick} name="followedVacations" value="followedVacations" checked={followed} />
                    <label>Followed</label>
                </>
            }

        </div >
    );
}

export default FilterVacations;
