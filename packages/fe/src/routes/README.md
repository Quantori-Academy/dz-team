# TanStack Router

[TanStack Router](https://tanstack.com/router/latest) library provides two ways to add routing to a project: **File-based** routing and **Code-based** routing.
Due to better performance on the user side and developer convenience, File-based routing has been chosen for the project.

# Creating new route

### File-route

-   Add new file into [routes](../routes) or its any children directory - filename will be the route path name.

### Folder-route

-   Create folder and insert `index.tsx` into it - in this case, the folder name will be the route path name.

### Dot-based nesting route

-   Add new file with dots like `reagents.selected.tsx` - it will handled as `/reagents/selected` during the navigation.

### Ending flow

After adding files into the `route` directory, TanStack will automatically generate the shape of the function for each file.
You just need to add the component (which will be displayed as a page) next to the "component" key, either by importing it or writing it inline.

```ts
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/filename")({
    component: TheComponent,
});
```

_As dynamic routes, search params or creating query is needed, the simpler guide about them will be provided._
