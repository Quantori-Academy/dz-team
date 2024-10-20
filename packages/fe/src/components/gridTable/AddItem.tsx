import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";

export const AddItem = () => {
    const handleAddItem = () => {
        alert("add new reagent");
    };
    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleAddItem}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
};
