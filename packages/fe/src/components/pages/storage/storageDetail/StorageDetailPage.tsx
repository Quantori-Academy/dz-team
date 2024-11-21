import { useState } from "react";
import { Alert, Box, Snackbar } from "@mui/material";
import { useLoaderData } from "@tanstack/react-router";

import { StorageLocationDetailContractType } from "api/storage/contract";
import { deleteStorage } from "api/storage/deleteStorage";
import { editStorage } from "api/storage/editStorage";

import { StorageDetailTable } from "./Storagedetailtable";

const boxStyle = { display: "flex", flexDirection: "column", gap: "20px" };
const alertStyle = {
    width: "90%",
    maxWidth: "300px",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
};

export const StorageDetailPage = () => {
    const { reagents } = useLoaderData({
        from: "/_app/storageList/$id",
    });

    const [notification, setNotification] = useState<{
        type: "success" | "error" | "warning";
        message: string;
    } | null>(null);

    const handleAction = async (
        type: "submit" | "delete",
        data?: StorageLocationDetailContractType,
    ) => {
        if (type === "submit" && data) {
            try {
                await editStorage(data);
                setNotification({
                    type: "success",
                    message: "Storage updated successfully.",
                });
            } catch (_error) {
                setNotification({
                    type: "error",
                    message: "Failed to update storage.",
                });
            }
        } else if (type === "delete" && data) {
            if (reagents.length > 0) {
                setNotification({
                    type: "warning",
                    message: "Cannot delete storage with existing reagents.",
                });
                return;
            }
            try {
                await deleteStorage(data.id);
                setNotification({
                    type: "success",
                    message: "Storage deleted successfully.",
                });
            } catch (_error) {
                setNotification({
                    type: "error",
                    message: "Failed to delete storage.",
                });
            }
        }
    };

    return (
        <Box sx={boxStyle}>
            <StorageDetailTable handleAction={handleAction} reagents={reagents} />
            {notification && (
                <Snackbar
                    open={!!notification}
                    autoHideDuration={3000}
                    onClose={() => setNotification(null)}
                >
                    <Alert
                        onClose={() => setNotification(null)}
                        severity={notification.type}
                        sx={alertStyle}
                    >
                        {notification.message}
                    </Alert>
                </Snackbar>
            )}
        </Box>
    );
};
