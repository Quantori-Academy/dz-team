import { toast } from "react-toastify";

import { deleteSample } from "api/combinedList/deleteSample";
import { DetailsEditPage } from "components/DetailsEditPage/DetailsEditPage";
import { CombinedList } from "shared/generated/zod/modelSchema/CombinedListSchema";

const fields = [
    { label: "Name", name: "name", required: true },
    { label: "Category", name: "category", required: true },
    { label: "Structure", name: "structure", required: true },
    { label: "Description", name: "description", required: true },
    { label: "Quantity", name: "quantity", required: true },
    { label: "Storage Location", name: "storageLocation", required: true },
    { label: "Unit", name: "unit", required: true },
    { label: "Initial Quantity ", name: "quantityInit", required: true },
    { label: "Container", name: "container", required: true },
    { label: "Created At", name: "createdAt", required: true },
    { label: "Updated At", name: "updadetAt", required: true },
];

//TODO Add edit and delete functions
export const SampleDetailPage = () => {
    const handleAction = async (type: "submit" | "delete", data?: CombinedList) => {
        if (type === "submit" && data) {
            try {
                // await editStorage(data);
                toast.success("Sample Updated Successfully");
            } catch (_error) {
                toast.success("Sample Deleted Successfully");
            }
        }

        if (type === "delete" && data) {
            await deleteSample(data.id);
            toast.success("Sample Deleted Successfully");
        }
    };

    return (
        <DetailsEditPage
            baseUrl="/combinedList"
            url="/_app/_researcherLayout/combinedList/$id"
            fields={fields}
            onAction={handleAction}
            editableFields={["name", "structure", "description"]}
        />
    );
};
