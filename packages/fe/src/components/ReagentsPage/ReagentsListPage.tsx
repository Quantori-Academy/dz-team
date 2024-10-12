import { useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useUnit } from "effector-react";

import { headers } from "components/Table/mockData";

// import { selectMaterial } from "stores/example";
import { $materialsList, fetchMaterialsFx, page, setPage } from "../../stores/materials";
import { Table } from "../Table/Table";

export const ReagentsListPage = () => {
    const theme = useTheme();
    const handleActionClick = () => {
        alert(`click!`);
    };

    useEffect(() => {
        fetchMaterialsFx();
    }, []);

    const materials = useUnit($materialsList);
    const currentPage = useUnit(page);

    const handleNext = () => setPage(currentPage + 1);
    const handlePrev = () => setPage(currentPage - 1);
    return (
        <Box
            style={{
                backgroundColor: theme.palette.background.default,
                width: "100%",
                padding: "20px",
            }}
        >
            <Link to="/">
                {" "}
                <Button
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.text.primary,
                        cursor: "pointer",
                    }}
                >
                    {" "}
                    Back
                </Button>
            </Link>
            <Typography variant="h3" style={{ color: theme.palette.text.primary }}>
                Reagents List
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "100%",
                    marginBottom: "20px",
                }}
            >
                {" "}
                <Button
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        color:
                            currentPage === 1
                                ? theme.palette.text.disabled
                                : theme.palette.text.primary,
                        cursor: "pointer",
                    }}
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Typography style={{ color: theme.palette.text.primary }} variant="body1">
                    Page: {currentPage}
                </Typography>
                <Button
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.text.primary,
                        cursor: "pointer",
                    }}
                    onClick={handleNext}
                >
                    Next
                </Button>
            </Box>

            <Table
                materials={materials}
                headers={headers}
                actionLabel="Edit"
                onActionClick={handleActionClick}
            />
        </Box>
    );
};
