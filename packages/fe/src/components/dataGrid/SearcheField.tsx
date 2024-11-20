import { TextField } from "@mui/material";

type SearchFieldProps = {
    recordType: string;
    searchQuery: string;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchField = ({ recordType, searchQuery, onSearch }: SearchFieldProps) => {
    if (recordType === "detailedStorage") {
        return null;
    }

    const placeholder =
        recordType === "user" ? "Search by name, username, or email" : "Search by room or shelf";

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
