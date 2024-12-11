import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Autocomplete, Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useRouter } from "@tanstack/react-router";

import { fulfillOrder } from "api/order/fulfill";
import { StorageLocation } from "api/storage/contract";
import { getStorage } from "api/storage/getStorage";
import { TableContext } from "components/commonTable/TableContext";
import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";
import { errorToast } from "utils/errorToast";
import { SupportedValue } from "utils/formatters";

type CompleteOrderProps = {
    orderId: string;
    reagents: Record<string, SupportedValue>[];
};

export function CompleteOrder(props: CompleteOrderProps) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [storages, setStorages] = useState<StorageLocation[]>([]);
    const [resultStorageIds, setResultStorageIds] = useState<string[]>([]);
    const [showErrors, setShowErrors] = useState(false);
    const tableRef = useContext(TableContext);
    const router = useRouter();

    const handleCompleteOrder = async () => {
        setShowErrors(true);

        const reagentsAndStorages = props.reagents.map((reagent, index) => {
            return {
                id: reagent.id as string,
                storageId: resultStorageIds[index],
            };
        });

        const hasEmptyStorages = reagentsAndStorages.some(
            (reagentAndStorage) => !reagentAndStorage.storageId,
        );

        if (hasEmptyStorages) {
            errorToast("Please, select the storages!");
            return;
        }

        const isSubmit = await createModal({
            name: "order-completion",
            title: "Order completion",
            message: "Are you sure you want to complete the order?",
            labels: { ok: "Submit", cancel: "Cancel" },
        });

        removeModal();

        if (isSubmit) {
            await fulfillOrder(props.orderId, reagentsAndStorages);

            toast.success("The order is successfully fulfilled!");

            tableRef.ref.current?.refresh();

            setModalOpen(false);

            router.invalidate();
        }
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
                Mark Order as Complete
            </Button>

            <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
                <Box
                    sx={{
                        padding: 4,
                        width: { xs: "100%", sm: 500, md: 550 },
                        display: "flex",
                        flexDirection: "column",
                    }}
                    gap={2}
                >
                    <Typography variant="h5">Enter storage location for reagents</Typography>

                    {props.reagents.map((e, name) => {
                        return (
                            <Box
                                key={name}
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                }}
                                gap={2}
                            >
                                <Box sx={{ width: 0.4 }}>
                                    <Typography variant="body1">{e.name as string}</Typography>
                                </Box>
                                <Autocomplete
                                    options={storages}
                                    getOptionLabel={(option) => option.name + ", " + option.room}
                                    fullWidth
                                    onOpen={() => {
                                        if (!storages.length)
                                            getStorage().then((storages) =>
                                                setStorages(storages.data),
                                            );
                                    }}
                                    onChange={(_, newValue) => {
                                        const newResultStorageIds = [...resultStorageIds];
                                        newResultStorageIds[name] = newValue?.id ?? "";
                                        setResultStorageIds(newResultStorageIds);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Storage Location"
                                            error={showErrors && !resultStorageIds[name]}
                                            helperText={
                                                showErrors && !resultStorageIds[name]
                                                    ? "Please select a storage location"
                                                    : ""
                                            }
                                        />
                                    )}
                                />
                            </Box>
                        );
                    })}

                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button variant="contained" onClick={handleCompleteOrder}>
                            Submit
                        </Button>
                        <Button variant="outlined" onClick={() => setModalOpen(false)}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
}
