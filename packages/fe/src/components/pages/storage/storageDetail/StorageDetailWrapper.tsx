import { Box, Typography } from "@mui/material";
import { useUnit } from "effector-react";

import { UserRole } from "api/self";
import { StorageLocationDetailContractType } from "api/storage/contract";
import { Grid } from "components/dataGrid/Grid";
import { DetailsEditPage } from "components/DetailsEditPage/DetailsEditPage";
import { Reagent } from "shared/generated/zod";
import { $auth } from "stores/auth";

const boxStyle = { display: "flex", flexDirection: "column", gap: "20px", marginTop: "15px" };

const reagentColumns = [
    { field: "name", headerName: "Name", width: 120 },
    { field: "structure", headerName: "Structure", width: 120 },
    { field: "description", headerName: "Description", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "unit", headerName: "unit", width: 120 },
    { field: "expirationDate", headerName: "Expiration Date", width: 120 },
    { field: "producer", headerName: "Producer", width: 120 },
    { field: "category", headerName: "Category", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
];

const fields = [
    { label: "Name", name: "name", required: true },
    { label: "Room", name: "room", required: true },
    { label: "Description", name: "description", required: false },
];

type HandleAction = (
    type: "submit" | "delete",
    data?: StorageLocationDetailContractType,
) => Promise<void>;

type TableType = {
    reagents: Reagent[];
    handleAction: HandleAction;
};

export const StorageDetailWrapper = ({ handleAction, reagents }: TableType) => {
    const auth = useUnit($auth);
    const role = auth && (auth.self.role as UserRole);
    const isResearcher = role === UserRole.researcher;

    return (
        <>
            <DetailsEditPage
                baseUrl="/storageList"
                url="/_app/storageList/$id"
                fields={fields}
                onAction={!isResearcher ? handleAction : undefined}
                editableFields={!isResearcher ? ["name", "room", "description"] : []}
                addEditButton={!isResearcher}
                addDeleteButton={!isResearcher}
            >
                {reagents?.length > 0 ? (
                    <Box sx={boxStyle}>
                        <Typography variant="h6">Reagents</Typography>
                        <Grid
                            rows={reagents}
                            headers={reagentColumns}
                            searchPlaceholder="Search reagents by name or description"
                            showToolbar={false}
                        />
                    </Box>
                ) : (
                    <Box sx={boxStyle}>
                        <Typography>No reagents in this storage.</Typography>
                    </Box>
                )}
            </DetailsEditPage>
        </>
    );
};
