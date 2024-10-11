# Routing Guide

This project uses [TanStack Router](https://tanstack.com/router/latest/docs/framework/react/overview) for [client-side routing](https://stackoverflow.com/questions/10190215/what-is-client-side-routing-and-how-is-it-used). Below is a guide on how to **add** new routes and **navigate** through them.

## Adding a New Route

1. Create a new file in the page components [directory](../components/) (e.g., `ReagentsPage.tsx`):

```tsx
// src/components/pages/reagents/ReagentsPage.tsx
export const ReagentsPage = () => {
    return (
        <div>
            <h1>Content example</h1>
        </div>
    );
};
```

2. Add a file in the [routes](../routes/) directory and use the page component:

```tsx
// src/routes/reagents.tsx
import { createFileRoute } from "@tanstack/react-router";
import { ReagentsPage } from "src/components/pages/reagents/ReagentsPage.tsx";

export const Route = createFileRoute("/reagents")({
    component: <ReagentsPage />,
});
```

As a result, on the `"/reagents"` route path, the `<ReagentsPage>` component will be shown.

## Navigation

Use the `<Link to="" />` component anywhere in the application to perform client-side routing:

```tsx
import { Link } from "@tanstack/react-router";

export function ToReagents() {
    return (
        <div>
            <h1>Go to the Reagents page</h1>
            <Link to="/reagents">Click Here</Link>
        </div>
    );
}
```