import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";

export const AddRecord = () => {
    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />}>
                Add New User
            </Button>
        </GridToolbarContainer>
    );
};
