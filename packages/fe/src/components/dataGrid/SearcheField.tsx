import { TextField } from "@mui/material";

type SearchFieldProps = {
    searchQuery: string;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchField = ({ searchQuery, onSearch }: SearchFieldProps) => {
    return (
        <TextField
            variant="outlined"
            placeholder="Search by name, username, or email"
            value={searchQuery}
            onChange={onSearch}
            fullWidth
        />
    );
};
