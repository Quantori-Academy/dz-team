import { ReactNode } from "react";
import { Button } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";

import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";

type AddRecordProps = {
    title: string;
    content: ReactNode;
    labels?: { ok?: string; cancel?: string };
    buttonLabel?: string;
};

export const AddRecord = ({
    title,
    content,
    labels = { ok: "Confirm", cancel: "Close" },
    buttonLabel = "Add New Record",
}: AddRecordProps) => {
    const handleAddRecord = async () => {
        try {
            await createModal({
                name: "add_record_modal",
                title,
                message: content,
                labels: [{ ok: labels.ok ?? "Confirm" }, { cancel: labels.cancel ?? "Close" }],
            });
            removeModal();
        } catch (_) {
            removeModal();
        }
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" onClick={handleAddRecord}>
                {buttonLabel}
            </Button>
        </GridToolbarContainer>
    );
};
