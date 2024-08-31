import "./Pagination.css";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    // update page state in VacationsList:
    changePage: (newPage: number) => void;
}

function Pagination(props: PaginationProps): JSX.Element {
    // set the active page button as the current page from VacationsList:
    let activePage = props.currentPage;

    // create page numbers array, get the length from the totalPages, set the value(_) by the index:
    let pageNumbers = Array.from({ length: props.totalPages }, (_, index) => index + 1);

    // update the current page according to button press:
    function updateCurrentPage(pageNumber: number) {
        // if same page was clicked do nothing:
        if (activePage === pageNumber) return;
        activePage = pageNumber;
        props.changePage(pageNumber);
    }

    // if there is only one page - no pagination component:
    if (props.totalPages === 1) return null;

    return (
        <div className="Pagination">
            {/* quick first page */}
            <span onClick={() => updateCurrentPage(1)} title="first page">&laquo;</span>
            {pageNumbers.map((pageNumber) => ( //run over pages array, create each page span:
                <span onClick={() => updateCurrentPage(pageNumber)}
                    className={activePage === pageNumber ? "active" : ""}
                    key={pageNumber}
                    title={"page " + pageNumber}>
                    {pageNumber}
                </span>
            ))}
            {/* quick last page */}
            <span onClick={() => updateCurrentPage(props.totalPages)} title="last page">&raquo;</span>
        </div >
    );
}

export default Pagination;
