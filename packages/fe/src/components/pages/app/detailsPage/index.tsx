import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    Button,
    Drawer,
    IconButton,
    Modal,
    Typography,
    useMediaQuery,
    useTheme,
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
    const [isEditing, setIsEditing] = useState(false);
    const { reagent }: { reagent: Reagent } = useLoaderData({ from: "/_app/reagents/$id" });
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
                <Typography variant="h6">Reagent not found.</Typography>
            </Box>
        );
    }

    const handleEditSubmit = () => {
        setIsEditing(false);
    };

    const handleCloseDetails = () => {
        window.location.href = "/reagents";
    };

    return (
        <Drawer
            anchor="right"
            open={true}
            variant="temporary"
            sx={{ transform: isSmallScreen ? "translateY(55px)" : "translateY(83px)" }}
        >
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
                    onClick={handleCloseDetails}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ pl: 2 }}>
                    <Typography variant="h6" sx={{ fontSize: "1.25rem", mb: 2 }}>
                        Reagent Details
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", mb: 1 }}>ID: {reagent.id}</Typography>
                    <Typography sx={{ fontSize: "1rem", mb: 1 }}>Name: {reagent.name}</Typography>
                    <Typography sx={{ fontSize: "1rem", mb: 1 }}>
                        Category: {reagent.category}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", mb: 1 }}>
                        Description: {reagent.description}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", mb: 1 }}>
                        CAS Number: {reagent.casNumber}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", mb: 1 }}>
                        Producer: {reagent.producer}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", mb: 1 }}>
                        Catalog ID: {reagent.catalogId}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", mb: 1 }}>
                        catalog Link: {reagent.catalogLink}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", mb: 1 }}>
                        Price per Unit: ${reagent.pricePerUnit}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", mb: 1 }}>
                        Quantity: {reagent.quantity}
                    </Typography>
                    <Typography sx={{ fontSize: "1rem", mb: 1 }}>
                        Units : {reagent.units}
                    </Typography>
                    <Box display="flex" justifyContent="flex-start" sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            sx={{ mt: 2 }}
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </Button>
                        <Button variant="outlined" color="error" sx={{ mt: 2, ml: 2 }}>
                            Delete
                        </Button>
                    </Box>
                </Box>
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
