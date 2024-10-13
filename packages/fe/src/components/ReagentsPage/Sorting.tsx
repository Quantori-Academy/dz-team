import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useUnit } from "effector-react";

import { setSort, sort } from "../../stores/materials";

interface SortingProps {
    handleApplySort?: () => void;
}

export const Sorting = ({ handleApplySort }: SortingProps) => {
    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSort(event.target.value);
    };

    const currentSort = useUnit(sort);
    return (
        <Box>
            {" "}
            <FormControl fullWidth>
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                    labelId="sort-label"
                    id="sort-select"
                    value={currentSort}
                    label="Sort By"
                    onChange={handleSortChange}
                >
                    <MenuItem value="name">Sort by Name</MenuItem>
                    <MenuItem value="category">Sort by Category</MenuItem>
                </Select>
            </FormControl>
            <Button
                style={{ margin: "20px" }}
                onClick={handleApplySort}
                color="primary"
                variant="contained"
            >
                Apply Sort
            </Button>
        </Box>
    );
};
