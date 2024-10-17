import { Reagent } from "./index";

export function request(id: number): Promise<Reagent> {
    const mockData: Record<number, Reagent> = {
        1: {
            id: 1,
            name: "Reagent A",
            category: "Category 1",
            description: "A description of Reagent A",
            casNumber: "1234-56-7",
            producer: "Producer A",
            catalogId: "CAT123",
            catalogLink: "http://example.com",
            pricePerUnit: 100,
            quantity: 5,
            units: "500ml",
        },
        2: {
            id: 2,
            name: "Reagent B",
            category: "Category 2",
            description: "A description of Reagent B",
            casNumber: "2345-67-8",
            producer: "Producer B",
            catalogId: "CAT456",
            catalogLink: "http://example.org",
            pricePerUnit: 200,
            quantity: 10,
            units: "1L",
        },
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockData[id]);
        }, 1000);
    });
}
