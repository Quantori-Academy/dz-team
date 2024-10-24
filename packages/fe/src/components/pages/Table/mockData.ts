export const mockData = [
    {
        id: 1,
        name: "Product A",
        available: true,
        tags: ["tag1", "tag2"],
        createdAt: new Date("2023-01-15"),
        details: { title: "Detail 1", department: "Sales" },
    },
    {
        id: 2,
        name: "Product B",
        available: false,
        tags: ["tag3"],
        createdAt: new Date("2024-04-20"),
        details: { title: "Detail 2", department: "Marketing" },
    },
];

export const headers = [
    { key: "name", label: "Product Name" },
    { key: "available", label: "Available" },
    { key: "tags", label: "Tags" },
    { key: "createdAt", label: "Creation Date" },
    { key: "details", label: "Details" },
];