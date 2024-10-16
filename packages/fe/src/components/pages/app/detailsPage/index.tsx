import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Drawer, IconButton, Modal, Typography } from "@mui/material";

import { ReagentForm } from "./ReagentForm";

export const ReagentDetailsPage = () => {
    // const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);

    const reagent = {
        id: 1,
        name: "Reagent A",
        category: "Category 1",
        description: "A description of Reagent A",
        casNumber: "1234-56-7",
        producer: "Producer A",
        catalogId: "CAT123",
        catalogLink: "http://example.com",
        pricePerUnit: 100,
        quantity: 5,
        units: "500ml",
    };

    const handleEditSubmit = (_updatedReagent) => {
        // console.log('Reagent updated:', updatedReagent);
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
                <Typography>
                    Quantity: {reagent.quantity} {reagent.units}
                </Typography>
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
};
