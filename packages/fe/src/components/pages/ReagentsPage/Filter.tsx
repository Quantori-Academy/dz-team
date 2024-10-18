import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

type filterTypes = {
    currentFilter: string;
    filterBy: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export const Filter = ({ currentFilter, filterBy }: filterTypes) => {
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px" }}>
            <FormControl variant="outlined" fullWidth size="small" sx={{ width: "400px" }}>
                <InputLabel>Filter by</InputLabel>
                <Select value={currentFilter} onChange={filterBy} label="Filter by">
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                </Select>
            </FormControl>
            <TextField
                type="text"
                label={`Filter by name or category `}
                variant="outlined"
                value={currentFilter}
                size="small"
                onChange={filterBy}
                sx={{ width: "400px" }}
            />
        </Box>
    );
};
