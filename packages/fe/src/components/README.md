# MUI Components Used

Several Material-UI components are integral to the project:

-   **Box**: Serves as the primary layout component, used for arranging other components and applying consistent spacing and alignment. ( as a div)
-   **Button**: Used for user interactions, styled with the MUI theme to maintain consistency across different UI elements.
-   **Typography**: Manages all text outputs to ensure consistent typography, leveraging MUI's extensive theming capabilities for fonts and text styling. ( by default its p also h1-h6 hust adding variant as u see in example )

## Usage Examples

-   **Examples**:

    ```jsx
    import { Typography, Box, Button } from "@mui/material";

    function ExampleComponent() {
        return (
            <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h1">Welcome to the App</Typography>
                <Button variant="contained">Click Here</Button>
            </Box>
        );
    }
    ```

### Styling Conventions

The project follows these styling conventions:

-   **General Rules**:
    -   Use the `sx` prop for straightforward style adjustments like margins, paddings, and color.
    -   do not use classNames
    -   For complex styles, use MUI's `styled` API to extend MUI components with additional styles.
    -   Always utilize the MUI theme provided via the `ThemeProvider` to ensure consistency in spacing, color schemes, and typography across the application.
    -   If an identical override is used three or more times, create a reusable component in this folder

### Example for using color pallete from theme

useTheme hook is a way to access the theme object inside functional components.

     ```jsx

import { useTheme } from '@mui/material';

function MyButton() {
    const theme = useTheme();
    return (
        <Button style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.background.default }}>
            Click Me
        </Button>
    );
}

```

```
