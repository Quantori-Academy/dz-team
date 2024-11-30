import { Button } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";

type AddRecordProps = {
    buttonLabel?: string | null;
    onAddRecord: () => void;
};

export const AddRecord = ({ buttonLabel = "Add New Record", onAddRecord }: AddRecordProps) => {
    return (
        <GridToolbarContainer>
            <Button color="primary" onClick={onAddRecord}>
                {buttonLabel}
            </Button>
        </GridToolbarContainer>
    );
};
