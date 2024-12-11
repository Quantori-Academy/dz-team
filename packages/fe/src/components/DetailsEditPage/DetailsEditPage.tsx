import { PropsWithChildren, useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Drawer, IconButton, TextField, Typography } from "@mui/material";
import { AnyRoute, RouteIds, useLoaderData, useNavigate } from "@tanstack/react-router";

import { TableContext, TableContextType } from "components/commonTable/TableContext";
import { useIsDesktop } from "utils/useIsDesktop";

type Actions = "submit" | "delete";

type FieldConfig = {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    disabled?: boolean;
};

type DetailsEditPageProps<T extends AnyRoute, TData> = PropsWithChildren<{
    baseUrl: string;
    url: RouteIds<T>;
    fields: FieldConfig[];
    onAction?: (type: Actions, data?: TData) => Promise<void>;
    editableFields?: string[];
    tableRef?: TableContextType["ref"];
    addEditButton?: boolean;
    addDeleteButton?: boolean;
}>;

export const DetailsEditPage = <T extends AnyRoute, TData>(
    props: DetailsEditPageProps<T, TData>,
) => {
    const { ref } = useContext(TableContext);
    return <DetailsEditPageInner {...props} tableRef={ref} />;
};

export function DetailsEditPageInner<T extends AnyRoute, TData>({
    baseUrl,
    url,
    fields,
    onAction,
    editableFields = [],
    children,
    tableRef,
    addEditButton = true,
    addDeleteButton = true,
}: DetailsEditPageProps<T, TData> & { tableRef: TableContextType["ref"] }) {
    const [isEditing, setIsEditing] = useState(false);
    const data = useLoaderData<T>({ from: url }) as TData;
    const navigate = useNavigate();
    const isSmallScreen = useIsDesktop();
    const [modifiedFields, setModifiedFields] = useState<TData>(data);

    const handleCloseDetails = () => {
        navigate({ to: baseUrl, replace: false });
    };

    const handleFieldChange =
        ({ name, type }: FieldConfig) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            let value: string | number | boolean | Date = event.target.value;

            if (type === "number") {
                value = parseInt(value);
            } else if (type === "boolean") {
                value = value === "true";
            } else if (type === "date") {
                value = new Date(event.target.value);
            }

            setModifiedFields((prev) => ({ ...prev, [name]: value }));
        };

    const handleAction = async (actionType: Actions) => {
        await onAction?.(actionType, modifiedFields);
        setIsEditing(false);
        setModifiedFields(data);
        tableRef?.current?.refresh();
    };

    const handleCancel = () => {
        setIsEditing(false);
        setModifiedFields(data);
    };

    return (
        <Drawer
            anchor="right"
            open={true}
            onClose={handleCloseDetails}
            variant="temporary"
            elevation={0}
            sx={{
                height: isSmallScreen ? "calc(100vh - 85px)" : "calc(100vh - 55px)",
                overflowY: "auto",
                transform: isSmallScreen ? "translateY(85px)" : "translateY(55px)",
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            }}
        >
            <Box
                sx={{
                    width: {
                        xs: 400,
                        sm: 400,
                        md: 650,
                    },
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                }}
                gap={1}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleCloseDetails}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6">Details</Typography>
                {fields.map((field, index) => (
                    <TextField
                        color="primary"
                        focused
                        key={index}
                        label={field.label}
                        type={field.type || "text"}
                        defaultValue={(data as Partial<T>)[field.name as keyof T]}
                        required={field.required}
                        disabled={
                            !isEditing || field.disabled || !editableFields.includes(field.name)
                        }
                        onChange={handleFieldChange(field)}
                        fullWidth
                        margin="normal"
                    />
                ))}
                <Box display="flex" justifyContent="flex-start" gap={2}>
                    {addEditButton && (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                    isEditing ? handleAction("submit") : setIsEditing(true)
                                }
                            >
                                {isEditing ? "Save" : "Edit"}
                            </Button>
                            {isEditing && (
                                <Button variant="outlined" color="error" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            )}
                        </>
                    )}
                    {addDeleteButton && !isEditing && (
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleAction("delete")}
                        >
                            Delete
                        </Button>
                    )}
                </Box>
                {children}
            </Box>
        </Drawer>
    );
}
