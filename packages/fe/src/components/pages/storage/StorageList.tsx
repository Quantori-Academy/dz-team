import { useCallback } from "react";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Outlet, useNavigate } from "@tanstack/react-router";

import { base } from "api/request";
import { CommonTable } from "components/commonTable/CommonTable";
import { removeModal } from "components/modal/store";
import { useModal } from "hooks/useModal";
import { useSession } from "hooks/useSession";
import { StorageLocation, StorageLocationSchema } from "shared/generated/zod";

import { StorageAddForm } from "./StorageAddForm";

const columns: GridColDef[] = [
    { field: "name", headerName: "Storage Name", width: 170 },
    { field: "room", headerName: "Storage Room", width: 170 },
    { field: "description", headerName: "Storage Description", width: 170 },
];

const BoxStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
};

export const StorageList = () => {
    const { openModal } = useModal();
    const handleAddFormOpen = useCallback(() => {
        openModal({
            name: "add_storage_modal",
            title: "Add New Storage",
            message: <StorageAddForm onClose={() => removeModal()} />,
        });
    }, [openModal]);

    const navigate = useNavigate();

    const { isAdmin } = useSession();

    return (
        <Box sx={BoxStyle}>
            <CommonTable<StorageLocation>
                columns={columns}
                url={`${base}/api/v1/storage-locations`}
                schema={StorageLocationSchema}
                onRowClick={(row) => {
                    navigate({ to: `/storage/${row.id}`, replace: false });
                }}
                searchBy={{
                    name: true,
                    room: true,
                }}
                {...(isAdmin && {
                    onAdd: handleAddFormOpen,
                    addButtonText: "Add Storage",
                })}
            />
            <Outlet />
        </Box>
    );
};
