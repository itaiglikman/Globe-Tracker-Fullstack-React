import { useEffect } from "react";

function useTitle(title: string): void {
    useEffect(() => {
        document.title = "Globe Tracker | " + title;
    }, [])
}

export default useTitle;