import { createContext } from "react";

export type TableContextType = {
    ref: React.MutableRefObject<{ refresh: () => void } | null>;
};

export const TableContext = createContext<TableContextType>({
    ref: { current: null },
});
