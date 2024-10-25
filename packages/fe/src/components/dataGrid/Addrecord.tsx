import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";

type AddRecordType = {
    onAdd: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const AddRecord = ({ onAdd }: AddRecordType) => {
    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={onAdd}>
                Add New User
            </Button>
        </GridToolbarContainer>
    );
};
