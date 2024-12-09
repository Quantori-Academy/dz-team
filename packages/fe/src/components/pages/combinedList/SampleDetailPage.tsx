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
    { label: "Updated At", name: "updadetAt", required: true },
];

export const SampleDetailPage = () => {
    return (
        <>
            <DetailsEditPage
                baseUrl="/combinedList"
                url="/_app/_researcherLayout/combinedList/$id"
                fields={fields}
                // onAction={handleAction}
                editableFields={["name", "structure", "description"]}
            />
        </>
    );
};
