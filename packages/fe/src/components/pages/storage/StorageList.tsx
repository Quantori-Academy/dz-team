import { Box } from "@mui/material";
import { useGate } from "effector-react";

import { StorageGate } from "stores/storage";

export const StorageList = () => {
    useGate(StorageGate);

    return <Box>Hello storage</Box>;
};
