import { Button } from "@mui/material";

type AddReagentButtonProps = {
    onClick: () => void;
};

export const AddReagentButton = ({ onClick }: AddReagentButtonProps) => (
    <Button
        variant="contained"
        onClick={onClick}
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
);
