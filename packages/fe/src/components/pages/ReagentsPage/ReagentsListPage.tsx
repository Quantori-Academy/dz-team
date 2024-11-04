import { useEffect, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useGate, useUnit } from "effector-react";

import { $ReagentsList, fetchReagentsFx, ReagentsGate } from "stores/reagents";

import { Table } from "../Table/Table";
import { AddReagentForm } from "./AddReagentForm";

const header = [
    { key: "name", label: "Name" },
    { key: "structure", label: "Structure" },
    { key: "description", label: "Description" },
    { key: "quantity", label: "Quantity" },
    { key: "unit", label: "Unit" },
    { key: "size", label: "Size" },
    { key: "expirationDate", label: "Expiration Date" },
    { key: "storageLocation", label: "Storage Location" },
    { key: "cas", label: "CAS" },
    { key: "producer", label: "Producer" },
    { key: "catalogId", label: "Catalog ID" },
    { key: "catalogLink", label: "Catalog Link" },
    { key: "pricePerUnit", label: "Price Per Unit" },
];

export const ReagentsListPage = () => {
    useGate(ReagentsGate);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAddReagentClick = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleRowClick = (row: { id: string }) => {
        navigate({ to: `/reagents/${row.id}`, replace: false });
    };

    const reagents = useUnit($ReagentsList);

    useEffect(() => {
        fetchReagentsFx();
    }, []);

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "30px",
                    marginTop: "5%",
                }}
            >
                <Button
                    variant="contained"
                    onClick={handleAddReagentClick}
                    sx={{
                        width: "30%",
                        bgcolor: "primary.main",
                        borderRadius: "4px 4px 0 0",
                        mb: -1,
                        marginRight: "auto",
                        background: "linear-gradient(0deg, #BFBFBF, #BFBFBF), #BFBFBF",
                        color: "#000000",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 600,
                        fontSize: "14px",
                        lineHeight: "17px",
                    }}
                >
                    Add Reagent
                </Button>
            </Box>
            <Table data={reagents} headers={header} onRowClick={handleRowClick} />
            <Modal open={isModalOpen} onClose={handleModalClose}>
                <AddReagentForm onClose={handleModalClose} />
            </Modal>
            <Outlet />
        </Box>
    );
};
