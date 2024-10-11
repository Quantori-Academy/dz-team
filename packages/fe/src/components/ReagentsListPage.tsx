import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useUnit } from "effector-react";

import { headers } from "components/Table/mockData";

// import { selectMaterial } from "stores/example";
import { $reagentsList, fetchMaterials, Material } from "../stores/materials";
import { Table } from "./Table/Table";

export const ReagentsListPage = () => {
    const handleActionClick = () => {
        alert(`click!`);
    };
    const materials: Material[] = useUnit($reagentsList);

    useEffect(() => {
        fetchMaterials();
    }, []);
    return (
        <Box>
            <Typography variant="h1">Reagents List</Typography>

            <Table
                materials={materials}
                headers={headers}
                actionLabel="Edit"
                onActionClick={handleActionClick}
            />
        </Box>
    );
};
