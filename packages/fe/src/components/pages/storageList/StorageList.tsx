import { useRef } from "react";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useUnit } from "effector-react";

import { base } from "api/request";
import { UserRole } from "api/self";
import { StorageLocation, StorageLocationSchema } from "api/storage/contract";
import { CommonTable, CommonTableRef } from "components/commonTable/CommonTable";
import { TableContext } from "components/commonTable/TableContext";
import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";
import { $auth } from "stores/auth";

import { StorageAddForm } from "../storage/StorageAddForm";

const columns: GridColDef[] = [
    { field: "name", headerName: "Storage Name", width: 170 },
    { field: "room", headerName: "Storage Room", width: 170 },
    { field: "description", headerName: "Storage Description", width: 170 },
];

const boxStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
};

export const StorageList = () => {
    const auth = useUnit($auth);
    const tableRef = useRef<CommonTableRef | null>(null);
    const role = auth && (auth.self.role as UserRole);
    const isAdmin = role === UserRole.admin;
    const navigate = useNavigate();
    const handleAddFormOpen = async () => {
        try {
            await createModal({
                name: "storage_modal",
                title: "Add New Storage",
                message: <StorageAddForm onClose={removeModal} />,
            });
            // TODO fix refresh invoke

            tableRef.current?.refresh();
            removeModal();
        } catch (_) {
            removeModal();
        }
    };

    return (
        <TableContext.Provider value={{ ref: tableRef }}>
            <Box sx={boxStyle}>
                <CommonTable<StorageLocation>
                    ref={tableRef}
                    columns={columns}
                    url={`${base}/api/v1/storage-locations`}
                    schema={StorageLocationSchema}
                    onRowClick={(row: StorageLocation) => {
                        navigate({ to: `/storageList/${row.id}`, replace: false });
                    }}
                    searchBy={{
                        name: true,
                        room: true,
                    }}
                    {...(isAdmin && {
                        onAdd: handleAddFormOpen,
                        addButtonText: "Add New Storage",
                    })}
                />
                <Outlet />
            </Box>
        </TableContext.Provider>
    );
};
