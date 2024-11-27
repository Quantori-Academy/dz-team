import { TextField } from "@mui/material";

type SearchFieldProps = {
    searchQuery: string;
    placeholder: string;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchField = ({ searchQuery, placeholder, onSearch }: SearchFieldProps) => {
    return (
        <TextField
            variant="outlined"
            placeholder={placeholder}
            value={searchQuery}
            onChange={onSearch}
            fullWidth
        />
    );
};
