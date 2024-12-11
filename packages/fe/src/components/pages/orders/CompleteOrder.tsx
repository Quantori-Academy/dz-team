import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    Box,
    Button,
    Dialog,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
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

    useEffect(() => {
        getStorage().then((storages) => setStorages(storages.data));
    }, []);

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

            if (tableRef.ref?.current?.refresh) {
                tableRef.ref.current.refresh();
            }

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
                <Box sx={{ p: 4, width: 440 }}>
                    <Typography variant="h5" sx={{ mb: 4 }}>
                        Enter storage location for reagents
                    </Typography>

                    {props.reagents.map((e, name) => {
                        return (
                            <Box
                                key={name}
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                            >
                                <Box sx={{ mr: 4, width: 0.5 }}>{e.name as string}</Box>
                                <FormControl fullWidth sx={{ width: 1, mt: 2, mb: 1 }}>
                                    <InputLabel id="unit-label">Storage Location</InputLabel>
                                    <Select
                                        labelId="unit-label"
                                        label="Storage Location"
                                        error={showErrors && !resultStorageIds[name]}
                                        value={resultStorageIds[name]}
                                        onChange={(e) => {
                                            if (typeof e.target.value === "string") {
                                                const newResultStorageIds = [...resultStorageIds];

                                                newResultStorageIds[name] = e.target.value;

                                                setResultStorageIds(newResultStorageIds);
                                            }
                                        }}
                                        fullWidth
                                    >
                                        {storages?.map((storage, index) => (
                                            <MenuItem key={index} value={storage.id}>
                                                {storage.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        );
                    })}

                    <Box display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
                        <Button variant="contained" onClick={handleCompleteOrder} sx={{ mr: 2 }}>
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
