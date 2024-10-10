import React, { useState } from "react";
import { Box, MenuItem, Select, useTheme } from "@mui/material";

type Language = "en" | "de" | "es" | "fr" | "";

const languages = [
    { value: "en", img: "en.png", name: "English" },
    { value: "de", img: "de.png", name: "Deutsch" },
    { value: "es", img: "es.png", name: "Español" },
    { value: "fr", img: "fr.png", name: "Français" },
];

export function LanguageSelect() {
    const [language, setLanguage] = useState<Language>("en");
    const theme = useTheme();

    return (
        <Select
            value={language}
            onChange={(event) => {
                setLanguage(event.target.value as Language);
            }}
            displayEmpty
            sx={{
                color: theme.palette.text.primary,
                width: "180px",
                height: "40px",
                padding: "20px 0",
            }}
            variant="outlined"
            size="small"
        >
            {languages.map((language) => (
                <MenuItem value={language.value} key={language.value}>
                    <Box display="flex" alignItems="center">
                        <Box
                            component="span"
                            sx={{
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                border: "1px solid #e1e2e3",
                                backgroundColor: "transparent",
                                display: "inline-block",
                                mr: 1,
                                backgroundImage: `url(/flags/${language.img})`,
                                backgroundSize: "cover",
                            }}
                        />
                        {language.name}
                    </Box>
                </MenuItem>
            ))}
        </Select>
    );
}
