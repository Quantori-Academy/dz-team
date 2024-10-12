import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useUnit } from "effector-react";

import { headers } from "components/Table/mockData";

// import { selectMaterial } from "stores/example";
import { $materialsList, fetchMaterialsFx, page, setPage } from "../stores/materials";
import { Table } from "./Table/Table";

export const ReagentsListPage = () => {
    const handleActionClick = () => {
        alert(`click!`);
    };

    useEffect(() => {
        fetchMaterialsFx();
    }, []);

    const materials = useUnit($materialsList);
    const currentPage = useUnit(page);

    const handleNext = () => setPage(currentPage + 1);
    const handlePrev = () => setPage(currentPage - 1);
    return (
        <Box>
            <Typography variant="h1">Reagents List</Typography>
            <button onClick={handlePrev} disabled={currentPage === 1}>
                Previous
            </button>
            <span>Page: {currentPage}</span>
            <button onClick={handleNext}>Next</button>
            <Table
                materials={materials}
                headers={headers}
                actionLabel="Edit"
                onActionClick={handleActionClick}
            />
        </Box>
    );
};

//TODO
