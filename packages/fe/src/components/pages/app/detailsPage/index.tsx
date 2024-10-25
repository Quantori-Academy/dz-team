import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Drawer, IconButton, Modal, Typography } from "@mui/material";
import { useLoaderData, useNavigate } from "@tanstack/react-router";

import { useIsDesktop } from "utils/useIsDesktop";

import { ReagentForm } from "./ReagentForm";

const $Typography = (props: React.PropsWithChildren) => (
    <Typography sx={{ mb: 1 }}>{props.children}</Typography>
);

export function ReagentDetailsPage() {
    const [isEditing, setIsEditing] = useState(false);
    const reagent = useLoaderData({ from: "/_app/reagents/$id" });
    const isSmallScreen = useIsDesktop();
    const navigate = useNavigate();

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

    const fields = [
        `ID: ${reagent.id}`,
        `Name: ${reagent.name}`,
        `Category: ${reagent.category}`,
        `Description: ${reagent.description}`,
        `CAS Number: ${reagent.cas}`,
        `Producer: ${reagent.producer}`,
        `Catalog ID: ${reagent.catalogId}`,
        `Catalog Link: ${reagent.catalogLink}`,
        `Price per Unit: $${reagent.pricePerUnit}`,
        `Quantity: ${reagent.quantity}`,
        `Units: ${reagent.unit}`,
    ];

    const handleEditSubmit = () => {
        setIsEditing(false);
    };

    const handleCloseDetails = () => {
        navigate({ to: "/reagents", replace: false });
    };

    return (
        <Drawer
            anchor="right"
            open={true}
            onClose={handleCloseDetails}
            variant="temporary"
            elevation={0}
            sx={{
                transform: isSmallScreen ? "translateY(85px)" : "translateY(55px)",
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            }}
        >
            <Box
                sx={{
                    width: {
                        xs: "100%",
                        md: 400,
                    },
                    p: 2,
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
                    {fields.map((field, index) => (
                        <$Typography key={index}>{field}</$Typography>
                    ))}
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
