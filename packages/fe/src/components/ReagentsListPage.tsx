import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useUnit } from "effector-react";

import { selectMaterial } from "stores/example";

import { $reagentsList, fetchMaterials, Material } from "../stores/materials";

export const ReagentsListPage = () => {
    const materials: Material[] = useUnit($reagentsList);

    useEffect(() => {
        fetchMaterials();
    }, []);
    return (
        <Box>
            <Typography variant="h1">Reagents List</Typography>

            <ul>
                {materials.map((material) => (
                    <li key={material.id} onClick={() => selectMaterial(material.id)}>
                        {material.name}
                    </li>
                ))}
            </ul>
        </Box>
    );
};
