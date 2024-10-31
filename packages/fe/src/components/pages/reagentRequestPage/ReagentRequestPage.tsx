import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useUnit } from "effector-react";
import { theme } from "theme";

import { $reagentRequestStore, reagentRequestFx } from "stores/dataReagentRequests";

import { Table } from "../Table/Table";

const reagentRequestHeaders = [
    { key: "reagentName", label: "Reagent Name" },
    { key: "structure", label: "Structure" },
    { key: "casNumber", label: "CAS Number" },
    { key: "desiredQuantity", label: "Desired Quantity" },
    { key: "status", label: "Status" },
    { key: "userComments", label: "User Comments" },
    { key: "procurementComments", label: "Procurement Comments" },
    { key: "creationDate", label: "Date Created" },
    { key: "dateModified", label: "Date Modified" },
];

export function ReagentRequestPage() {
    const dataReagentRequests = useUnit($reagentRequestStore);
    const getReagentRequests = useUnit(reagentRequestFx);

    useEffect(() => {
        getReagentRequests();
    }, [getReagentRequests]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Typography variant="h4" sx={{ color: theme.palette.text.primary, mt: 5, mb: 5 }}>
                Reagent Request Management
            </Typography>

            <Table data={dataReagentRequests} headers={reagentRequestHeaders} />

            <Link>
                <Button variant="contained" color="primary" sx={{ mt: 5 }}>
                    Create a Reagent Request
                </Button>
            </Link>
        </Box>
    );
}
