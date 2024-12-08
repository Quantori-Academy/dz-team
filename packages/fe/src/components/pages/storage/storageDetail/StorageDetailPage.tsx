import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { useLoaderData } from "@tanstack/react-router";

import { StorageLocationDetailContractType } from "api/storage/contract";
import { deleteStorage } from "api/storage/deleteStorage";
import { editStorage } from "api/storage/editStorage";

import { StorageDetailWrapper } from "./StorageDetailWrapper";

const boxStyle = { display: "flex", flexDirection: "column", gap: "20px" };

export const StorageDetailPage = () => {
    const { reagents } = useLoaderData({
        from: "/_app/storageList/$id",
    });

    const handleAction = async (
        type: "submit" | "delete",
        data?: StorageLocationDetailContractType,
    ) => {
        if (type === "submit" && data) {
            await editStorage(data);
            toast.success("Storage Was Edited Successfully!");
        } else if (type === "delete" && data) {
            if (reagents?.length > 0) {
                toast.warning("Cannot delete storage with existing reagents!");
                return;
            }
            await deleteStorage(data.id);
            toast.success("Storage deleted successfully!");
        }
    };

    return (
        <Box sx={boxStyle}>
            <StorageDetailWrapper handleAction={handleAction} reagents={reagents} />
        </Box>
    );
};
