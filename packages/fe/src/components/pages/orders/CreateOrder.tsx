import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "@tanstack/react-router";

import { CommonTable } from "components/commonTable/CommonTable";
import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";
import { OrderSchema, Reagent } from "shared/generated/zod";

import { OrderReagentFormModal } from "./OrderReagentFormModal";

const headers = [
    { field: "id", headerName: "id", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "structure", headerName: "Structure", width: 170 },
    { field: "cas", headerName: "Cas", width: 170 },
    { field: "producer", headerName: "Producer", width: 170 },
    { field: "catalogId", headerName: "Catalog Id", width: 150 },
    { field: "catalogLink", headerName: "Catalog Link", width: 170 },
    { field: "units", headerName: "Units ", width: 170 },
    { field: "pricePerUnit", headerName: "Price Per Unit", width: 170 },
    { field: "quantity", headerName: "Quantity", width: 170 },
    { field: "amount", headerName: "Amount", width: 170 },
];

const boxStyles = {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
};

export const CreateOrder = () => {
    const [reagents, setReagents] = useState<Reagent[]>([]);
    const navigate = useNavigate();

    // TODO: function doesnt work yet.
    const openAddModal = async () => {
        try {
            await createModal({
                name: "reagent_modal",
                title: "Add new Reagent",
                message: (
                    <OrderReagentFormModal
                        onSubmit={(newReagent) => {
                            setReagents((prevReagents) => [...prevReagents, newReagent]);
                            removeModal();
                        }}
                        onCancel={() => {
                            removeModal();
                        }}
                    />
                ),
            });
        } catch (_) {
            removeModal();
        }
    };

    return (
        <>
            <Box sx={boxStyles}>
                <CommonTable<Reagent>
                    columns={headers}
                    data={reagents}
                    schema={OrderSchema}
                    onRowClick={(row: Reagent) => {
                        navigate({ to: `/create-order/${row.id}`, replace: false });
                    }}
                    searchBy={{
                        name: true,
                    }}
                    onAdd={openAddModal}
                    addButtonText="Create a new reagent"
                />
            </Box>
            <Outlet />
        </>
    );
};
