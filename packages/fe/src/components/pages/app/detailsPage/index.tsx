import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Button,
    CircularProgress,
    Drawer,
    IconButton,
    Modal,
    Typography,
} from "@mui/material";
import { useLoaderData } from "@tanstack/react-router";

import { ReagentForm } from "./ReagentForm";

export type Reagent = {
    id: number;
    name: string;
    category: string;
    description: string;
    casNumber: string;
    producer: string;
    catalogId: string;
    catalogLink: string;
    pricePerUnit: number;
    quantity: number;
    units: string;
};

export function ReagentDetailsPage() {
    // const { id } = useParams({ strict: false })
    const [isEditing, setIsEditing] = useState(false);

    const { reagent }: { reagent: Reagent } = useLoaderData({ from: undefined });

    if (!reagent) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    const handleEditSubmit = (_updatedReagent) => {
        setIsEditing(false);
    };
    // const handleCloseDetails = () => {
    //   navigate('/reagents');
    // };

    return (
        <Drawer anchor="right" open={true} variant="persistent">
            <Box
                sx={{
                    width: {
                        xs: "100%",
                        sm: "75%",
                        md: 400,
                    },
                    p: 2,
                    position: "relative",
                }}
            >
                <IconButton
                    aria-label="close"
                    // onClick={handleCloseDetails}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6">Reagent Details</Typography>
                <Typography>ID: {reagent.id}</Typography>
                <Typography>Name: {reagent.name}</Typography>
                <Typography>Category: {reagent.category}</Typography>
                <Typography>Description: {reagent.description}</Typography>
                <Typography>CAS Number: {reagent.casNumber}</Typography>
                <Typography>Producer: {reagent.producer}</Typography>
                <Typography>Catalog ID: {reagent.catalogId}</Typography>
                <Typography>catalog Link: {reagent.catalogLink}</Typography>
                <Typography>Price per Unit: ${reagent.pricePerUnit}</Typography>
                <Typography>Quantity: {reagent.quantity}</Typography>
                <Typography>Units : {reagent.units}</Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={() => setIsEditing(true)}>
                    Edit
                </Button>
                <Button variant="outlined" color="error" sx={{ mt: 2 }}>
                    Delete
                </Button>
            </Box>

            <Modal
                open={isEditing}
                onClose={() => setIsEditing(false)}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        p: 4,
                        borderRadius: 2,
                        width: 500,
                        position: "relative",
                    }}
                >
                    <IconButton
                        aria-label="close"
                        onClick={() => setIsEditing(false)}
                        sx={{ position: "absolute", top: 8, right: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Edit Reagent
                    </Typography>
                    <ReagentForm initialData={reagent} onSubmit={handleEditSubmit} />
                </Box>
            </Modal>
        </Drawer>
    );
}
