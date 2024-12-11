
import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";

import { deleteSample } from "api/combinedList/deleteSample";
import { editSample } from "api/combinedList/editSample";
import { EditSampleData } from "api/types";

import { DetailsEditPage } from "components/DetailsEditPage/DetailsEditPage";

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

];

export const SampleDetailPage = () => {
    const navigate = useNavigate();
    const handleAction = async (type: "submit" | "delete", data?: EditSampleData) => {
        if (type === "submit" && data) {
            await editSample(data);
            toast.success("Sample Updated Successfully");
        }

        if (type === "delete" && data) {
            await deleteSample(data.id);
            toast.success("Sample Deleted Successfully");
            navigate({ to: "/combinedList" });
        }
    };

    return (
        <DetailsEditPage
            baseUrl="/combinedList"
            url="/_app/_researcherLayout/combinedList/$id"
            fields={fields}
            onAction={handleAction}
            editableFields={["storageLocation", "quantity"]}
        />

    );
};
