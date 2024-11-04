import { useEffect } from "react";
import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link } from "@tanstack/react-router";
import { useUnit } from "effector-react";

import { $reagentRequestStore, reagentRequestFx } from "stores/dataReagentRequests";

const reagentRequestColumns: GridColDef[] = [
    { field: "reagentName", headerName: "Reagent Name", width: 200 },
    { field: "structure", headerName: "Structure", width: 200 },
    { field: "casNumber", headerName: "CAS Number", width: 150 },
    { field: "desiredQuantity", headerName: "Desired Quantity", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "userComments", headerName: "User Comments", width: 200 },
    { field: "procurementComments", headerName: "Procurement Comments", width: 200 },
    { field: "creationDate", headerName: "Date Created", width: 150 },
    { field: "dateModified", headerName: "Date Modified", width: 150 },
];

export function ReagentRequestPage() {
    const dataReagentRequests = useUnit($reagentRequestStore);
    const getReagentRequests = useUnit(reagentRequestFx);

    useEffect(() => {
        getReagentRequests();
    }, [getReagentRequests]);

    return (
        <>
            <DataGrid rows={dataReagentRequests} columns={reagentRequestColumns} />
            {/* TODO: Add link when Create Reagent Request page is ready */}
            <Link>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Create a Reagent Request
                </Button>
            </Link>
        </>
    );
}
