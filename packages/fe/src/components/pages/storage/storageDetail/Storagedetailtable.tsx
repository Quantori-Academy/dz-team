import { Box, Typography } from "@mui/material";

import { StorageLocationDetailContractType } from "api/storage/contract";
import { Grid } from "components/dataGrid/Grid";
import { DetailsEditPage } from "components/DetailsEditPage/DetailsEditPage";
import { useSession } from "hooks/useSession";
import { Reagent } from "shared/generated/zod";

const boxStyle = { display: "flex", flexDirection: "column", gap: "20px" };

const reagentColumns = [
    { field: "name", headerName: "Name", width: 120 },
    { field: "structure", headerName: "Structure", width: 120 },
    { field: "description", headerName: "Description", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "expirationDate", headerName: "Expiration Date", width: 120 },
    { field: "producer", headerName: "Producer", width: 120 },
    { field: "category", headerName: "Category", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
];

const fields = [
    { label: "Name", name: "name", required: true },
    { label: "Room", name: "room", required: true },
    { label: "CreatedAt", name: "createdAt", disabled: true },
    { label: "UpdatedAt", name: "updatedAt", disabled: true },
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

export const StorageDetailTable = ({ handleAction, reagents }: TableType) => {
    const { isProcurementOfficer, isAdmin, isResearcher } = useSession();

    const permissions = {
        canEdit: !isResearcher,
        canDelete: !isResearcher,
    };
    return (
        <>
            {isAdmin || isProcurementOfficer ? (
                <DetailsEditPage
                    baseUrl="/storageList"
                    url="/_app/storageList/$id"
                    fields={fields}
                    onAction={handleAction}
                    editableFields={permissions.canEdit ? ["name", "room", "description"] : []}
                    permissions={permissions}
                >
                    {reagents.length > 0 ? (
                        <Box sx={boxStyle}>
                            <Typography variant="h6">Reagents</Typography>
                            <Grid
                                rows={reagents}
                                headers={reagentColumns}
                                recordType="detailedStorage"
                            />
                        </Box>
                    ) : (
                        <Box sx={boxStyle}>
                            <Typography>No reagents in this storage.</Typography>
                        </Box>
                    )}
                </DetailsEditPage>
            ) : (
                <DetailsEditPage
                    baseUrl="/storageList"
                    url="/_app/storageList/$id"
                    fields={fields}
                    permissions={permissions}
                >
                    {reagents.length > 0 ? (
                        <Box sx={boxStyle}>
                            <Typography variant="h6">Reagents</Typography>
                            <Grid
                                rows={reagents}
                                headers={reagentColumns}
                                recordType="detailedStorage"
                            />
                        </Box>
                    ) : (
                        <Typography>No reagents available for this storage.</Typography>
                    )}
                </DetailsEditPage>
            )}
        </>
    );
};
