import { PropsWithChildren, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Drawer, IconButton, TextField, Typography } from "@mui/material";
import { AnyRoute, RouteIds, useLoaderData, useNavigate } from "@tanstack/react-router";

import { useIsDesktop } from "utils/useIsDesktop";

type FieldConfig = {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    disabled?: boolean;
};
type Permissions = {
    canEdit: boolean;
    canDelete: boolean;
};
export type DetailsEditPageProps<T extends AnyRoute, TData> = PropsWithChildren<{
    baseUrl: string;
    url: RouteIds<T>;
    fields: FieldConfig[];
    onAction?: (type: "submit" | "delete", data?: TData) => Promise<void>;
    editableFields?: string[];
    permissions?: Permissions;
}>;

export function DetailsEditPage<T extends AnyRoute, TData>({
    baseUrl,
    url,
    fields,
    onAction,
    editableFields = [],
    children,
    permissions = { canEdit: true, canDelete: true },
}: DetailsEditPageProps<T, TData>) {
    const [isEditing, setIsEditing] = useState(false);
    const data = useLoaderData<T>({ from: url }) as TData;
    const navigate = useNavigate();
    const isSmallScreen = useIsDesktop();
    const [modifiedFields, setModifiedFields] = useState<TData>(data);
    const handleCloseDetails = () => {
        navigate({ to: baseUrl, replace: false });
    };
    const handleFieldChange =
        (field: FieldConfig) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, type } = field;
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

    const handleUpdate = async () => {
        if (onAction) {
            await onAction("submit", modifiedFields);
        }
        setIsEditing(false);
        setModifiedFields(data);
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
                height: "90vh",
                overflowY: "auto",
                transform: isSmallScreen ? "translateY(85px)" : "translateY(55px)",
                borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            }}
        >
            <Box sx={{ width: 600, p: 2 }}>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseDetails}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Details
                </Typography>
                {fields.map((field, index) => (
                    <TextField
                        key={index}
                        label={field.label}
                        type={field.type || "text"}
                        defaultValue={(data as Partial<T>)[field.name as keyof T]}
                        required={field.required}
                        disabled={
                            !isEditing || field.disabled || !editableFields.includes(field.name)
                        }
                        sx={{ mb: 2 }}
                        onChange={handleFieldChange(field)}
                    />
                ))}
                <Box display="flex" justifyContent="flex-start" sx={{ mt: 2 }}>
                    {permissions.canEdit && (
                        <>
                            {isEditing ? (
                                <>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleUpdate}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        sx={{ ml: 2 }}
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit
                                </Button>
                            )}
                        </>
                    )}
                    {permissions.canDelete && (
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{ ml: 2 }}
                            onClick={() => onAction && onAction("delete", modifiedFields)}
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
