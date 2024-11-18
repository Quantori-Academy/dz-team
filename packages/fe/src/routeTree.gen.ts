/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as LoginImport } from "./routes/login";
import { Route as AppImport } from "./routes/_app";
import { Route as AppResearcherLayoutImport } from "./routes/_app/_researcherLayout";
import { Route as AppPOfficerLayoutImport } from "./routes/_app/_pOfficerLayout";
import { Route as AppAdminLayoutImport } from "./routes/_app/_adminLayout";
import { Route as AppResearcherLayoutIndexImport } from "./routes/_app/_researcherLayout/index";
import { Route as AppResearcherLayoutSamplesImport } from "./routes/_app/_researcherLayout/samples";
import { Route as AppResearcherLayoutReagentsImport } from "./routes/_app/_researcherLayout/reagents";
import { Route as AppResearcherLayoutReagentRequestsImport } from "./routes/_app/_researcherLayout/reagentRequests";
import { Route as AppPOfficerLayoutPOfficerImport } from "./routes/_app/_pOfficerLayout/pOfficer";
import { Route as AppPOfficerLayoutOrdersImport } from "./routes/_app/_pOfficerLayout/orders";
import { Route as AppPOfficerLayoutAllReagentRequestsImport } from "./routes/_app/_pOfficerLayout/allReagentRequests";
import { Route as AppAdminLayoutUsersImport } from "./routes/_app/_adminLayout/users";
import { Route as AppAdminLayoutAdminImport } from "./routes/_app/_adminLayout/admin";
import { Route as AppResearcherLayoutReagentsIdImport } from "./routes/_app/_researcherLayout/reagents/$id";
import { Route as AppResearcherLayoutReagentRequestsIdImport } from "./routes/_app/_researcherLayout/reagentRequests/$id";
import { Route as AppPOfficerLayoutAllReagentRequestsIdImport } from "./routes/_app/_pOfficerLayout/allReagentRequests/$id";

// Create/Update Routes

const LoginRoute = LoginImport.update({
    id: "/login",
    path: "/login",
    getParentRoute: () => rootRoute,
} as any);

const AppRoute = AppImport.update({
    id: "/_app",
    getParentRoute: () => rootRoute,
} as any);

const AppResearcherLayoutRoute = AppResearcherLayoutImport.update({
    id: "/_researcherLayout",
    getParentRoute: () => AppRoute,
} as any);

const AppPOfficerLayoutRoute = AppPOfficerLayoutImport.update({
    id: "/_pOfficerLayout",
    getParentRoute: () => AppRoute,
} as any);

const AppAdminLayoutRoute = AppAdminLayoutImport.update({
    id: "/_adminLayout",
    getParentRoute: () => AppRoute,
} as any);

const AppResearcherLayoutIndexRoute = AppResearcherLayoutIndexImport.update({
    id: "/",
    path: "/",
    getParentRoute: () => AppResearcherLayoutRoute,
} as any);

const AppResearcherLayoutSamplesRoute = AppResearcherLayoutSamplesImport.update({
    id: "/samples",
    path: "/samples",
    getParentRoute: () => AppResearcherLayoutRoute,
} as any);

const AppResearcherLayoutReagentsRoute = AppResearcherLayoutReagentsImport.update({
    id: "/reagents",
    path: "/reagents",
    getParentRoute: () => AppResearcherLayoutRoute,
} as any);

const AppResearcherLayoutReagentRequestsRoute = AppResearcherLayoutReagentRequestsImport.update({
    id: "/reagentRequests",
    path: "/reagentRequests",
    getParentRoute: () => AppResearcherLayoutRoute,
} as any);

const AppPOfficerLayoutPOfficerRoute = AppPOfficerLayoutPOfficerImport.update({
    id: "/pOfficer",
    path: "/pOfficer",
    getParentRoute: () => AppPOfficerLayoutRoute,
} as any);

const AppPOfficerLayoutOrdersRoute = AppPOfficerLayoutOrdersImport.update({
    id: "/orders",
    path: "/orders",
    getParentRoute: () => AppPOfficerLayoutRoute,
} as any);

const AppPOfficerLayoutAllReagentRequestsRoute = AppPOfficerLayoutAllReagentRequestsImport.update({
    id: "/allReagentRequests",
    path: "/allReagentRequests",
    getParentRoute: () => AppPOfficerLayoutRoute,
} as any);

const AppAdminLayoutUsersRoute = AppAdminLayoutUsersImport.update({
    id: "/users",
    path: "/users",
    getParentRoute: () => AppAdminLayoutRoute,
} as any);

const AppAdminLayoutAdminRoute = AppAdminLayoutAdminImport.update({
    id: "/admin",
    path: "/admin",
    getParentRoute: () => AppAdminLayoutRoute,
} as any);

const AppResearcherLayoutReagentsIdRoute = AppResearcherLayoutReagentsIdImport.update({
    id: "/$id",
    path: "/$id",
    getParentRoute: () => AppResearcherLayoutReagentsRoute,
} as any);

const AppResearcherLayoutReagentRequestsIdRoute = AppResearcherLayoutReagentRequestsIdImport.update(
    {
        id: "/$id",
        path: "/$id",
        getParentRoute: () => AppResearcherLayoutReagentRequestsRoute,
    } as any,
);

const AppPOfficerLayoutAllReagentRequestsIdRoute =
    AppPOfficerLayoutAllReagentRequestsIdImport.update({
        id: "/$id",
        path: "/$id",
        getParentRoute: () => AppPOfficerLayoutAllReagentRequestsRoute,
    } as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
    interface FileRoutesByPath {
        "/_app": {
            id: "/_app";
            path: "";
            fullPath: "";
            preLoaderRoute: typeof AppImport;
            parentRoute: typeof rootRoute;
        };
        "/login": {
            id: "/login";
            path: "/login";
            fullPath: "/login";
            preLoaderRoute: typeof LoginImport;
            parentRoute: typeof rootRoute;
        };
        "/_app/_adminLayout": {
            id: "/_app/_adminLayout";
            path: "";
            fullPath: "";
            preLoaderRoute: typeof AppAdminLayoutImport;
            parentRoute: typeof AppImport;
        };
        "/_app/_pOfficerLayout": {
            id: "/_app/_pOfficerLayout";
            path: "";
            fullPath: "";
            preLoaderRoute: typeof AppPOfficerLayoutImport;
            parentRoute: typeof AppImport;
        };
        "/_app/_researcherLayout": {
            id: "/_app/_researcherLayout";
            path: "";
            fullPath: "";
            preLoaderRoute: typeof AppResearcherLayoutImport;
            parentRoute: typeof AppImport;
        };
        "/_app/_adminLayout/admin": {
            id: "/_app/_adminLayout/admin";
            path: "/admin";
            fullPath: "/admin";
            preLoaderRoute: typeof AppAdminLayoutAdminImport;
            parentRoute: typeof AppAdminLayoutImport;
        };
        "/_app/_adminLayout/users": {
            id: "/_app/_adminLayout/users";
            path: "/users";
            fullPath: "/users";
            preLoaderRoute: typeof AppAdminLayoutUsersImport;
            parentRoute: typeof AppAdminLayoutImport;
        };
        "/_app/_pOfficerLayout/allReagentRequests": {
            id: "/_app/_pOfficerLayout/allReagentRequests";
            path: "/allReagentRequests";
            fullPath: "/allReagentRequests";
            preLoaderRoute: typeof AppPOfficerLayoutAllReagentRequestsImport;
            parentRoute: typeof AppPOfficerLayoutImport;
        };
        "/_app/_pOfficerLayout/orders": {
            id: "/_app/_pOfficerLayout/orders";
            path: "/orders";
            fullPath: "/orders";
            preLoaderRoute: typeof AppPOfficerLayoutOrdersImport;
            parentRoute: typeof AppPOfficerLayoutImport;
        };
        "/_app/_pOfficerLayout/pOfficer": {
            id: "/_app/_pOfficerLayout/pOfficer";
            path: "/pOfficer";
            fullPath: "/pOfficer";
            preLoaderRoute: typeof AppPOfficerLayoutPOfficerImport;
            parentRoute: typeof AppPOfficerLayoutImport;
        };
        "/_app/_researcherLayout/reagentRequests": {
            id: "/_app/_researcherLayout/reagentRequests";
            path: "/reagentRequests";
            fullPath: "/reagentRequests";
            preLoaderRoute: typeof AppResearcherLayoutReagentRequestsImport;
            parentRoute: typeof AppResearcherLayoutImport;
        };
        "/_app/_researcherLayout/reagents": {
            id: "/_app/_researcherLayout/reagents";
            path: "/reagents";
            fullPath: "/reagents";
            preLoaderRoute: typeof AppResearcherLayoutReagentsImport;
            parentRoute: typeof AppResearcherLayoutImport;
        };
        "/_app/_researcherLayout/samples": {
            id: "/_app/_researcherLayout/samples";
            path: "/samples";
            fullPath: "/samples";
            preLoaderRoute: typeof AppResearcherLayoutSamplesImport;
            parentRoute: typeof AppResearcherLayoutImport;
        };
        "/_app/_researcherLayout/": {
            id: "/_app/_researcherLayout/";
            path: "/";
            fullPath: "/";
            preLoaderRoute: typeof AppResearcherLayoutIndexImport;
            parentRoute: typeof AppResearcherLayoutImport;
        };
        "/_app/_pOfficerLayout/allReagentRequests/$id": {
            id: "/_app/_pOfficerLayout/allReagentRequests/$id";
            path: "/$id";
            fullPath: "/allReagentRequests/$id";
            preLoaderRoute: typeof AppPOfficerLayoutAllReagentRequestsIdImport;
            parentRoute: typeof AppPOfficerLayoutAllReagentRequestsImport;
        };
        "/_app/_researcherLayout/reagentRequests/$id": {
            id: "/_app/_researcherLayout/reagentRequests/$id";
            path: "/$id";
            fullPath: "/reagentRequests/$id";
            preLoaderRoute: typeof AppResearcherLayoutReagentRequestsIdImport;
            parentRoute: typeof AppResearcherLayoutReagentRequestsImport;
        };
        "/_app/_researcherLayout/reagents/$id": {
            id: "/_app/_researcherLayout/reagents/$id";
            path: "/$id";
            fullPath: "/reagents/$id";
            preLoaderRoute: typeof AppResearcherLayoutReagentsIdImport;
            parentRoute: typeof AppResearcherLayoutReagentsImport;
        };
    }
}

// Create and export the route tree

interface AppAdminLayoutRouteChildren {
    AppAdminLayoutAdminRoute: typeof AppAdminLayoutAdminRoute;
    AppAdminLayoutUsersRoute: typeof AppAdminLayoutUsersRoute;
}

const AppAdminLayoutRouteChildren: AppAdminLayoutRouteChildren = {
    AppAdminLayoutAdminRoute: AppAdminLayoutAdminRoute,
    AppAdminLayoutUsersRoute: AppAdminLayoutUsersRoute,
};

const AppAdminLayoutRouteWithChildren = AppAdminLayoutRoute._addFileChildren(
    AppAdminLayoutRouteChildren,
);

interface AppPOfficerLayoutAllReagentRequestsRouteChildren {
    AppPOfficerLayoutAllReagentRequestsIdRoute: typeof AppPOfficerLayoutAllReagentRequestsIdRoute;
}

const AppPOfficerLayoutAllReagentRequestsRouteChildren: AppPOfficerLayoutAllReagentRequestsRouteChildren =
    {
        AppPOfficerLayoutAllReagentRequestsIdRoute: AppPOfficerLayoutAllReagentRequestsIdRoute,
    };

const AppPOfficerLayoutAllReagentRequestsRouteWithChildren =
    AppPOfficerLayoutAllReagentRequestsRoute._addFileChildren(
        AppPOfficerLayoutAllReagentRequestsRouteChildren,
    );

interface AppPOfficerLayoutRouteChildren {
    AppPOfficerLayoutAllReagentRequestsRoute: typeof AppPOfficerLayoutAllReagentRequestsRouteWithChildren;
    AppPOfficerLayoutOrdersRoute: typeof AppPOfficerLayoutOrdersRoute;
    AppPOfficerLayoutPOfficerRoute: typeof AppPOfficerLayoutPOfficerRoute;
}

const AppPOfficerLayoutRouteChildren: AppPOfficerLayoutRouteChildren = {
    AppPOfficerLayoutAllReagentRequestsRoute: AppPOfficerLayoutAllReagentRequestsRouteWithChildren,
    AppPOfficerLayoutOrdersRoute: AppPOfficerLayoutOrdersRoute,
    AppPOfficerLayoutPOfficerRoute: AppPOfficerLayoutPOfficerRoute,
};

const AppPOfficerLayoutRouteWithChildren = AppPOfficerLayoutRoute._addFileChildren(
    AppPOfficerLayoutRouteChildren,
);

interface AppResearcherLayoutReagentRequestsRouteChildren {
    AppResearcherLayoutReagentRequestsIdRoute: typeof AppResearcherLayoutReagentRequestsIdRoute;
}

const AppResearcherLayoutReagentRequestsRouteChildren: AppResearcherLayoutReagentRequestsRouteChildren =
    {
        AppResearcherLayoutReagentRequestsIdRoute: AppResearcherLayoutReagentRequestsIdRoute,
    };

const AppResearcherLayoutReagentRequestsRouteWithChildren =
    AppResearcherLayoutReagentRequestsRoute._addFileChildren(
        AppResearcherLayoutReagentRequestsRouteChildren,
    );

interface AppResearcherLayoutReagentsRouteChildren {
    AppResearcherLayoutReagentsIdRoute: typeof AppResearcherLayoutReagentsIdRoute;
}

const AppResearcherLayoutReagentsRouteChildren: AppResearcherLayoutReagentsRouteChildren = {
    AppResearcherLayoutReagentsIdRoute: AppResearcherLayoutReagentsIdRoute,
};

const AppResearcherLayoutReagentsRouteWithChildren =
    AppResearcherLayoutReagentsRoute._addFileChildren(AppResearcherLayoutReagentsRouteChildren);

interface AppResearcherLayoutRouteChildren {
    AppResearcherLayoutReagentRequestsRoute: typeof AppResearcherLayoutReagentRequestsRouteWithChildren;
    AppResearcherLayoutReagentsRoute: typeof AppResearcherLayoutReagentsRouteWithChildren;
    AppResearcherLayoutSamplesRoute: typeof AppResearcherLayoutSamplesRoute;
    AppResearcherLayoutIndexRoute: typeof AppResearcherLayoutIndexRoute;
}

const AppResearcherLayoutRouteChildren: AppResearcherLayoutRouteChildren = {
    AppResearcherLayoutReagentRequestsRoute: AppResearcherLayoutReagentRequestsRouteWithChildren,
    AppResearcherLayoutReagentsRoute: AppResearcherLayoutReagentsRouteWithChildren,
    AppResearcherLayoutSamplesRoute: AppResearcherLayoutSamplesRoute,
    AppResearcherLayoutIndexRoute: AppResearcherLayoutIndexRoute,
};

const AppResearcherLayoutRouteWithChildren = AppResearcherLayoutRoute._addFileChildren(
    AppResearcherLayoutRouteChildren,
);

interface AppRouteChildren {
    AppAdminLayoutRoute: typeof AppAdminLayoutRouteWithChildren;
    AppPOfficerLayoutRoute: typeof AppPOfficerLayoutRouteWithChildren;
    AppResearcherLayoutRoute: typeof AppResearcherLayoutRouteWithChildren;
}

const AppRouteChildren: AppRouteChildren = {
    AppAdminLayoutRoute: AppAdminLayoutRouteWithChildren,
    AppPOfficerLayoutRoute: AppPOfficerLayoutRouteWithChildren,
    AppResearcherLayoutRoute: AppResearcherLayoutRouteWithChildren,
};

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);

export interface FileRoutesByFullPath {
    "": typeof AppResearcherLayoutRouteWithChildren;
    "/login": typeof LoginRoute;
    "/admin": typeof AppAdminLayoutAdminRoute;
    "/users": typeof AppAdminLayoutUsersRoute;
    "/allReagentRequests": typeof AppPOfficerLayoutAllReagentRequestsRouteWithChildren;
    "/orders": typeof AppPOfficerLayoutOrdersRoute;
    "/pOfficer": typeof AppPOfficerLayoutPOfficerRoute;
    "/reagentRequests": typeof AppResearcherLayoutReagentRequestsRouteWithChildren;
    "/reagents": typeof AppResearcherLayoutReagentsRouteWithChildren;
    "/samples": typeof AppResearcherLayoutSamplesRoute;
    "/": typeof AppResearcherLayoutIndexRoute;
    "/allReagentRequests/$id": typeof AppPOfficerLayoutAllReagentRequestsIdRoute;
    "/reagentRequests/$id": typeof AppResearcherLayoutReagentRequestsIdRoute;
    "/reagents/$id": typeof AppResearcherLayoutReagentsIdRoute;
}

export interface FileRoutesByTo {
    "": typeof AppPOfficerLayoutRouteWithChildren;
    "/login": typeof LoginRoute;
    "/admin": typeof AppAdminLayoutAdminRoute;
    "/users": typeof AppAdminLayoutUsersRoute;
    "/allReagentRequests": typeof AppPOfficerLayoutAllReagentRequestsRouteWithChildren;
    "/orders": typeof AppPOfficerLayoutOrdersRoute;
    "/pOfficer": typeof AppPOfficerLayoutPOfficerRoute;
    "/reagentRequests": typeof AppResearcherLayoutReagentRequestsRouteWithChildren;
    "/reagents": typeof AppResearcherLayoutReagentsRouteWithChildren;
    "/samples": typeof AppResearcherLayoutSamplesRoute;
    "/": typeof AppResearcherLayoutIndexRoute;
    "/allReagentRequests/$id": typeof AppPOfficerLayoutAllReagentRequestsIdRoute;
    "/reagentRequests/$id": typeof AppResearcherLayoutReagentRequestsIdRoute;
    "/reagents/$id": typeof AppResearcherLayoutReagentsIdRoute;
}

export interface FileRoutesById {
    __root__: typeof rootRoute;
    "/_app": typeof AppRouteWithChildren;
    "/login": typeof LoginRoute;
    "/_app/_adminLayout": typeof AppAdminLayoutRouteWithChildren;
    "/_app/_pOfficerLayout": typeof AppPOfficerLayoutRouteWithChildren;
    "/_app/_researcherLayout": typeof AppResearcherLayoutRouteWithChildren;
    "/_app/_adminLayout/admin": typeof AppAdminLayoutAdminRoute;
    "/_app/_adminLayout/users": typeof AppAdminLayoutUsersRoute;
    "/_app/_pOfficerLayout/allReagentRequests": typeof AppPOfficerLayoutAllReagentRequestsRouteWithChildren;
    "/_app/_pOfficerLayout/orders": typeof AppPOfficerLayoutOrdersRoute;
    "/_app/_pOfficerLayout/pOfficer": typeof AppPOfficerLayoutPOfficerRoute;
    "/_app/_researcherLayout/reagentRequests": typeof AppResearcherLayoutReagentRequestsRouteWithChildren;
    "/_app/_researcherLayout/reagents": typeof AppResearcherLayoutReagentsRouteWithChildren;
    "/_app/_researcherLayout/samples": typeof AppResearcherLayoutSamplesRoute;
    "/_app/_researcherLayout/": typeof AppResearcherLayoutIndexRoute;
    "/_app/_pOfficerLayout/allReagentRequests/$id": typeof AppPOfficerLayoutAllReagentRequestsIdRoute;
    "/_app/_researcherLayout/reagentRequests/$id": typeof AppResearcherLayoutReagentRequestsIdRoute;
    "/_app/_researcherLayout/reagents/$id": typeof AppResearcherLayoutReagentsIdRoute;
}

export interface FileRouteTypes {
    fileRoutesByFullPath: FileRoutesByFullPath;
    fullPaths:
        | ""
        | "/login"
        | "/admin"
        | "/users"
        | "/allReagentRequests"
        | "/orders"
        | "/pOfficer"
        | "/reagentRequests"
        | "/reagents"
        | "/samples"
        | "/"
        | "/allReagentRequests/$id"
        | "/reagentRequests/$id"
        | "/reagents/$id";
    fileRoutesByTo: FileRoutesByTo;
    to:
        | ""
        | "/login"
        | "/admin"
        | "/users"
        | "/allReagentRequests"
        | "/orders"
        | "/pOfficer"
        | "/reagentRequests"
        | "/reagents"
        | "/samples"
        | "/"
        | "/allReagentRequests/$id"
        | "/reagentRequests/$id"
        | "/reagents/$id";
    id:
        | "__root__"
        | "/_app"
        | "/login"
        | "/_app/_adminLayout"
        | "/_app/_pOfficerLayout"
        | "/_app/_researcherLayout"
        | "/_app/_adminLayout/admin"
        | "/_app/_adminLayout/users"
        | "/_app/_pOfficerLayout/allReagentRequests"
        | "/_app/_pOfficerLayout/orders"
        | "/_app/_pOfficerLayout/pOfficer"
        | "/_app/_researcherLayout/reagentRequests"
        | "/_app/_researcherLayout/reagents"
        | "/_app/_researcherLayout/samples"
        | "/_app/_researcherLayout/"
        | "/_app/_pOfficerLayout/allReagentRequests/$id"
        | "/_app/_researcherLayout/reagentRequests/$id"
        | "/_app/_researcherLayout/reagents/$id";
    fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
    AppRoute: typeof AppRouteWithChildren;
    LoginRoute: typeof LoginRoute;
}

const rootRouteChildren: RootRouteChildren = {
    AppRoute: AppRouteWithChildren,
    LoginRoute: LoginRoute,
};

export const routeTree = rootRoute
    ._addFileChildren(rootRouteChildren)
    ._addFileTypes<FileRouteTypes>();

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_app",
        "/login"
      ]
    },
    "/_app": {
      "filePath": "_app.tsx",
      "children": [
        "/_app/_adminLayout",
        "/_app/_pOfficerLayout",
        "/_app/_researcherLayout"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_app/_adminLayout": {
      "filePath": "_app/_adminLayout.tsx",
      "parent": "/_app",
      "children": [
        "/_app/_adminLayout/admin",
        "/_app/_adminLayout/users"
      ]
    },
    "/_app/_pOfficerLayout": {
      "filePath": "_app/_pOfficerLayout.tsx",
      "parent": "/_app",
      "children": [
        "/_app/_pOfficerLayout/allReagentRequests",
        "/_app/_pOfficerLayout/orders",
        "/_app/_pOfficerLayout/pOfficer"
      ]
    },
    "/_app/_researcherLayout": {
      "filePath": "_app/_researcherLayout.tsx",
      "parent": "/_app",
      "children": [
        "/_app/_researcherLayout/reagentRequests",
        "/_app/_researcherLayout/reagents",
        "/_app/_researcherLayout/samples",
        "/_app/_researcherLayout/"
      ]
    },
    "/_app/_adminLayout/admin": {
      "filePath": "_app/_adminLayout/admin.tsx",
      "parent": "/_app/_adminLayout"
    },
    "/_app/_adminLayout/users": {
      "filePath": "_app/_adminLayout/users.tsx",
      "parent": "/_app/_adminLayout"
    },
    "/_app/_pOfficerLayout/allReagentRequests": {
      "filePath": "_app/_pOfficerLayout/allReagentRequests.tsx",
      "parent": "/_app/_pOfficerLayout",
      "children": [
        "/_app/_pOfficerLayout/allReagentRequests/$id"
      ]
    },
    "/_app/_pOfficerLayout/orders": {
      "filePath": "_app/_pOfficerLayout/orders.tsx",
      "parent": "/_app/_pOfficerLayout"
    },
    "/_app/_pOfficerLayout/pOfficer": {
      "filePath": "_app/_pOfficerLayout/pOfficer.tsx",
      "parent": "/_app/_pOfficerLayout"
    },
    "/_app/_researcherLayout/reagentRequests": {
      "filePath": "_app/_researcherLayout/reagentRequests.tsx",
      "parent": "/_app/_researcherLayout",
      "children": [
        "/_app/_researcherLayout/reagentRequests/$id"
      ]
    },
    "/_app/_researcherLayout/reagents": {
      "filePath": "_app/_researcherLayout/reagents.tsx",
      "parent": "/_app/_researcherLayout",
      "children": [
        "/_app/_researcherLayout/reagents/$id"
      ]
    },
    "/_app/_researcherLayout/samples": {
      "filePath": "_app/_researcherLayout/samples.tsx",
      "parent": "/_app/_researcherLayout"
    },
    "/_app/_researcherLayout/": {
      "filePath": "_app/_researcherLayout/index.tsx",
      "parent": "/_app/_researcherLayout"
    },
    "/_app/_pOfficerLayout/allReagentRequests/$id": {
      "filePath": "_app/_pOfficerLayout/allReagentRequests/$id.tsx",
      "parent": "/_app/_pOfficerLayout/allReagentRequests"
    },
    "/_app/_researcherLayout/reagentRequests/$id": {
      "filePath": "_app/_researcherLayout/reagentRequests/$id.tsx",
      "parent": "/_app/_researcherLayout/reagentRequests"
    },
    "/_app/_researcherLayout/reagents/$id": {
      "filePath": "_app/_researcherLayout/reagents/$id.tsx",
      "parent": "/_app/_researcherLayout/reagents"
    }
  }
}
ROUTE_MANIFEST_END */
