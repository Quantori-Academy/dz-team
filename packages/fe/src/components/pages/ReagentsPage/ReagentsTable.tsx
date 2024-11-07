import { CreateReagentType } from "api/reagents";

import { Table } from "../Table/Table";

type ReagentTableProps = {
    reagents: CreateReagentType[];
    onRowClick: (row: { id: string }) => void;
};
export const ReagentsTable = ({ reagents, onRowClick }: ReagentTableProps) => {
    const header = [
        { key: "name", label: "Name" },
        { key: "structure", label: "Structure" },
        { key: "description", label: "Description" },
        { key: "quantity", label: "Quantity" },
        { key: "unit", label: "Unit" },
        { key: "size", label: "Size" },
        { key: "expirationDate", label: "Expiration Date" },
        { key: "storageLocation", label: "Storage Location" },
        { key: "cas", label: "CAS" },
        { key: "producer", label: "Producer" },
        { key: "catalogId", label: "Catalog ID" },
        { key: "catalogLink", label: "Catalog Link" },
        { key: "pricePerUnit", label: "Price Per Unit" },
    ];

    return <Table data={reagents} headers={header} onRowClick={onRowClick} />;
};
