import InputIcon from "@mui/icons-material/Input";
import { GridActionsCellItem } from "@mui/x-data-grid";

import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";
import { ChooseStorage } from "components/pages/storage/ChooseStorage";
import { setStoreId } from "stores/storage";

export const MoveReagent = ({ storeId }: { storeId: string }) => {
    const handleAddFormOpen = async () => {
        try {
            await createModal({
                name: "storage_modal",
                title: "Choose Storage",
                message: <ChooseStorage />,
            });
            setStoreId(storeId);
            removeModal();
        } catch (_) {
            removeModal();
        }
    };

    return (
        <>
            <GridActionsCellItem
                icon={<InputIcon />}
                label="Move"
                color="inherit"
                onClick={handleAddFormOpen}
            />
        </>
    );
};
