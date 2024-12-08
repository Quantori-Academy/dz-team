/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as LoginImport } from "./routes/login";
import { Route as AppImport } from "./routes/_app";
import { Route as AppStorageListImport } from "./routes/_app/storageList";
import { Route as AppReagentRequestsImport } from "./routes/_app/reagentRequests";
import { Route as AppResearcherLayoutImport } from "./routes/_app/_researcherLayout";
import { Route as AppPOfficerLayoutImport } from "./routes/_app/_pOfficerLayout";
import { Route as AppAdminLayoutImport } from "./routes/_app/_adminLayout";
import { Route as AppResearcherLayoutIndexImport } from "./routes/_app/_researcherLayout/index";
import { Route as AppStorageListIdImport } from "./routes/_app/storageList/$id";
import { Route as AppReagentRequestsIdImport } from "./routes/_app/reagentRequests/$id";
import { Route as AppResearcherLayoutSamplesImport } from "./routes/_app/_researcherLayout/samples";
import { Route as AppResearcherLayoutReagentsImport } from "./routes/_app/_researcherLayout/reagents";
import { Route as AppPOfficerLayoutPOfficerImport } from "./routes/_app/_pOfficerLayout/pOfficer";
import { Route as AppPOfficerLayoutOrdersImport } from "./routes/_app/_pOfficerLayout/orders";
import { Route as AppPOfficerLayoutCreateOrderImport } from "./routes/_app/_pOfficerLayout/createOrder";
import { Route as AppAdminLayoutUsersImport } from "./routes/_app/_adminLayout/users";
import { Route as AppResearcherLayoutReagentsIdImport } from "./routes/_app/_researcherLayout/reagents/$id";
import { Route as AppPOfficerLayoutOrdersIdImport } from "./routes/_app/_pOfficerLayout/orders/$id";

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

const AppStorageListRoute = AppStorageListImport.update({
    id: "/storageList",
    path: "/storageList",
    getParentRoute: () => AppRoute,
} as any);

const AppReagentRequestsRoute = AppReagentRequestsImport.update({
    id: "/reagentRequests",
    path: "/reagentRequests",
    getParentRoute: () => AppRoute,
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

const AppStorageListIdRoute = AppStorageListIdImport.update({
    id: "/$id",
    path: "/$id",
    getParentRoute: () => AppStorageListRoute,
} as any);

const AppReagentRequestsIdRoute = AppReagentRequestsIdImport.update({
    id: "/$id",
    path: "/$id",
    getParentRoute: () => AppReagentRequestsRoute,
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

const AppPOfficerLayoutCreateOrderRoute = AppPOfficerLayoutCreateOrderImport.update({
    id: "/createOrder",
    path: "/createOrder",
    getParentRoute: () => AppPOfficerLayoutRoute,
} as any);

const AppAdminLayoutUsersRoute = AppAdminLayoutUsersImport.update({
    id: "/users",
    path: "/users",
    getParentRoute: () => AppAdminLayoutRoute,
} as any);

const AppResearcherLayoutReagentsIdRoute = AppResearcherLayoutReagentsIdImport.update({
    id: "/$id",
    path: "/$id",
    getParentRoute: () => AppResearcherLayoutReagentsRoute,
} as any);

const AppPOfficerLayoutOrdersIdRoute = AppPOfficerLayoutOrdersIdImport.update({
    id: "/$id",
    path: "/$id",
    getParentRoute: () => AppPOfficerLayoutOrdersRoute,
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
        "/_app/reagentRequests": {
            id: "/_app/reagentRequests";
            path: "/reagentRequests";
            fullPath: "/reagentRequests";
            preLoaderRoute: typeof AppReagentRequestsImport;
            parentRoute: typeof AppImport;
        };
        "/_app/storageList": {
            id: "/_app/storageList";
            path: "/storageList";
            fullPath: "/storageList";
            preLoaderRoute: typeof AppStorageListImport;
            parentRoute: typeof AppImport;
        };
        "/_app/_adminLayout/users": {
            id: "/_app/_adminLayout/users";
            path: "/users";
            fullPath: "/users";
            preLoaderRoute: typeof AppAdminLayoutUsersImport;
            parentRoute: typeof AppAdminLayoutImport;
        };
        "/_app/_pOfficerLayout/createOrder": {
            id: "/_app/_pOfficerLayout/createOrder";
            path: "/createOrder";
            fullPath: "/createOrder";
            preLoaderRoute: typeof AppPOfficerLayoutCreateOrderImport;
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
        "/_app/reagentRequests/$id": {
            id: "/_app/reagentRequests/$id";
            path: "/$id";
            fullPath: "/reagentRequests/$id";
            preLoaderRoute: typeof AppReagentRequestsIdImport;
            parentRoute: typeof AppReagentRequestsImport;
        };
        "/_app/storageList/$id": {
            id: "/_app/storageList/$id";
            path: "/$id";
            fullPath: "/storageList/$id";
            preLoaderRoute: typeof AppStorageListIdImport;
            parentRoute: typeof AppStorageListImport;
        };
        "/_app/_researcherLayout/": {
            id: "/_app/_researcherLayout/";
            path: "/";
            fullPath: "/";
            preLoaderRoute: typeof AppResearcherLayoutIndexImport;
            parentRoute: typeof AppResearcherLayoutImport;
        };
        "/_app/_pOfficerLayout/orders/$id": {
            id: "/_app/_pOfficerLayout/orders/$id";
            path: "/$id";
            fullPath: "/orders/$id";
            preLoaderRoute: typeof AppPOfficerLayoutOrdersIdImport;
            parentRoute: typeof AppPOfficerLayoutOrdersImport;
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
    AppAdminLayoutUsersRoute: typeof AppAdminLayoutUsersRoute;
}

const AppAdminLayoutRouteChildren: AppAdminLayoutRouteChildren = {
    AppAdminLayoutUsersRoute: AppAdminLayoutUsersRoute,
};

const AppAdminLayoutRouteWithChildren = AppAdminLayoutRoute._addFileChildren(
    AppAdminLayoutRouteChildren,
);

interface AppPOfficerLayoutOrdersRouteChildren {
    AppPOfficerLayoutOrdersIdRoute: typeof AppPOfficerLayoutOrdersIdRoute;
}

const AppPOfficerLayoutOrdersRouteChildren: AppPOfficerLayoutOrdersRouteChildren = {
    AppPOfficerLayoutOrdersIdRoute: AppPOfficerLayoutOrdersIdRoute,
};

const AppPOfficerLayoutOrdersRouteWithChildren = AppPOfficerLayoutOrdersRoute._addFileChildren(
    AppPOfficerLayoutOrdersRouteChildren,
);

interface AppPOfficerLayoutRouteChildren {
    AppPOfficerLayoutCreateOrderRoute: typeof AppPOfficerLayoutCreateOrderRoute;
    AppPOfficerLayoutOrdersRoute: typeof AppPOfficerLayoutOrdersRouteWithChildren;
    AppPOfficerLayoutPOfficerRoute: typeof AppPOfficerLayoutPOfficerRoute;
}

const AppPOfficerLayoutRouteChildren: AppPOfficerLayoutRouteChildren = {
    AppPOfficerLayoutCreateOrderRoute: AppPOfficerLayoutCreateOrderRoute,
    AppPOfficerLayoutOrdersRoute: AppPOfficerLayoutOrdersRouteWithChildren,
    AppPOfficerLayoutPOfficerRoute: AppPOfficerLayoutPOfficerRoute,
};

const AppPOfficerLayoutRouteWithChildren = AppPOfficerLayoutRoute._addFileChildren(
    AppPOfficerLayoutRouteChildren,
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
    AppResearcherLayoutReagentsRoute: typeof AppResearcherLayoutReagentsRouteWithChildren;
    AppResearcherLayoutSamplesRoute: typeof AppResearcherLayoutSamplesRoute;
    AppResearcherLayoutIndexRoute: typeof AppResearcherLayoutIndexRoute;
}

const AppResearcherLayoutRouteChildren: AppResearcherLayoutRouteChildren = {
    AppResearcherLayoutReagentsRoute: AppResearcherLayoutReagentsRouteWithChildren,
    AppResearcherLayoutSamplesRoute: AppResearcherLayoutSamplesRoute,
    AppResearcherLayoutIndexRoute: AppResearcherLayoutIndexRoute,
};

const AppResearcherLayoutRouteWithChildren = AppResearcherLayoutRoute._addFileChildren(
    AppResearcherLayoutRouteChildren,
);

interface AppReagentRequestsRouteChildren {
    AppReagentRequestsIdRoute: typeof AppReagentRequestsIdRoute;
}

const AppReagentRequestsRouteChildren: AppReagentRequestsRouteChildren = {
    AppReagentRequestsIdRoute: AppReagentRequestsIdRoute,
};

const AppReagentRequestsRouteWithChildren = AppReagentRequestsRoute._addFileChildren(
    AppReagentRequestsRouteChildren,
);

interface AppStorageListRouteChildren {
    AppStorageListIdRoute: typeof AppStorageListIdRoute;
}

const AppStorageListRouteChildren: AppStorageListRouteChildren = {
    AppStorageListIdRoute: AppStorageListIdRoute,
};

const AppStorageListRouteWithChildren = AppStorageListRoute._addFileChildren(
    AppStorageListRouteChildren,
);

interface AppRouteChildren {
    AppAdminLayoutRoute: typeof AppAdminLayoutRouteWithChildren;
    AppPOfficerLayoutRoute: typeof AppPOfficerLayoutRouteWithChildren;
    AppResearcherLayoutRoute: typeof AppResearcherLayoutRouteWithChildren;
    AppReagentRequestsRoute: typeof AppReagentRequestsRouteWithChildren;
    AppStorageListRoute: typeof AppStorageListRouteWithChildren;
}

const AppRouteChildren: AppRouteChildren = {
    AppAdminLayoutRoute: AppAdminLayoutRouteWithChildren,
    AppPOfficerLayoutRoute: AppPOfficerLayoutRouteWithChildren,
    AppResearcherLayoutRoute: AppResearcherLayoutRouteWithChildren,
    AppReagentRequestsRoute: AppReagentRequestsRouteWithChildren,
    AppStorageListRoute: AppStorageListRouteWithChildren,
};

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);

export interface FileRoutesByFullPath {
    "": typeof AppResearcherLayoutRouteWithChildren;
    "/login": typeof LoginRoute;
    "/reagentRequests": typeof AppReagentRequestsRouteWithChildren;
    "/storageList": typeof AppStorageListRouteWithChildren;
    "/users": typeof AppAdminLayoutUsersRoute;
    "/createOrder": typeof AppPOfficerLayoutCreateOrderRoute;
    "/orders": typeof AppPOfficerLayoutOrdersRouteWithChildren;
    "/pOfficer": typeof AppPOfficerLayoutPOfficerRoute;
    "/reagents": typeof AppResearcherLayoutReagentsRouteWithChildren;
    "/samples": typeof AppResearcherLayoutSamplesRoute;
    "/reagentRequests/$id": typeof AppReagentRequestsIdRoute;
    "/storageList/$id": typeof AppStorageListIdRoute;
    "/": typeof AppResearcherLayoutIndexRoute;
    "/orders/$id": typeof AppPOfficerLayoutOrdersIdRoute;
    "/reagents/$id": typeof AppResearcherLayoutReagentsIdRoute;
}

export interface FileRoutesByTo {
    "": typeof AppPOfficerLayoutRouteWithChildren;
    "/login": typeof LoginRoute;
    "/reagentRequests": typeof AppReagentRequestsRouteWithChildren;
    "/storageList": typeof AppStorageListRouteWithChildren;
    "/users": typeof AppAdminLayoutUsersRoute;
    "/createOrder": typeof AppPOfficerLayoutCreateOrderRoute;
    "/orders": typeof AppPOfficerLayoutOrdersRouteWithChildren;
    "/pOfficer": typeof AppPOfficerLayoutPOfficerRoute;
    "/reagents": typeof AppResearcherLayoutReagentsRouteWithChildren;
    "/samples": typeof AppResearcherLayoutSamplesRoute;
    "/reagentRequests/$id": typeof AppReagentRequestsIdRoute;
    "/storageList/$id": typeof AppStorageListIdRoute;
    "/": typeof AppResearcherLayoutIndexRoute;
    "/orders/$id": typeof AppPOfficerLayoutOrdersIdRoute;
    "/reagents/$id": typeof AppResearcherLayoutReagentsIdRoute;
}

export interface FileRoutesById {
    __root__: typeof rootRoute;
    "/_app": typeof AppRouteWithChildren;
    "/login": typeof LoginRoute;
    "/_app/_adminLayout": typeof AppAdminLayoutRouteWithChildren;
    "/_app/_pOfficerLayout": typeof AppPOfficerLayoutRouteWithChildren;
    "/_app/_researcherLayout": typeof AppResearcherLayoutRouteWithChildren;
    "/_app/reagentRequests": typeof AppReagentRequestsRouteWithChildren;
    "/_app/storageList": typeof AppStorageListRouteWithChildren;
    "/_app/_adminLayout/users": typeof AppAdminLayoutUsersRoute;
    "/_app/_pOfficerLayout/createOrder": typeof AppPOfficerLayoutCreateOrderRoute;
    "/_app/_pOfficerLayout/orders": typeof AppPOfficerLayoutOrdersRouteWithChildren;
    "/_app/_pOfficerLayout/pOfficer": typeof AppPOfficerLayoutPOfficerRoute;
    "/_app/_researcherLayout/reagents": typeof AppResearcherLayoutReagentsRouteWithChildren;
    "/_app/_researcherLayout/samples": typeof AppResearcherLayoutSamplesRoute;
    "/_app/reagentRequests/$id": typeof AppReagentRequestsIdRoute;
    "/_app/storageList/$id": typeof AppStorageListIdRoute;
    "/_app/_researcherLayout/": typeof AppResearcherLayoutIndexRoute;
    "/_app/_pOfficerLayout/orders/$id": typeof AppPOfficerLayoutOrdersIdRoute;
    "/_app/_researcherLayout/reagents/$id": typeof AppResearcherLayoutReagentsIdRoute;
}

export interface FileRouteTypes {
    fileRoutesByFullPath: FileRoutesByFullPath;
    fullPaths:
        | ""
        | "/login"
        | "/reagentRequests"
        | "/storageList"
        | "/users"
        | "/createOrder"
        | "/orders"
        | "/pOfficer"
        | "/reagents"
        | "/samples"
        | "/reagentRequests/$id"
        | "/storageList/$id"
        | "/"
        | "/orders/$id"
        | "/reagents/$id";
    fileRoutesByTo: FileRoutesByTo;
    to:
        | ""
        | "/login"
        | "/reagentRequests"
        | "/storageList"
        | "/users"
        | "/createOrder"
        | "/orders"
        | "/pOfficer"
        | "/reagents"
        | "/samples"
        | "/reagentRequests/$id"
        | "/storageList/$id"
        | "/"
        | "/orders/$id"
        | "/reagents/$id";
    id:
        | "__root__"
        | "/_app"
        | "/login"
        | "/_app/_adminLayout"
        | "/_app/_pOfficerLayout"
        | "/_app/_researcherLayout"
        | "/_app/reagentRequests"
        | "/_app/storageList"
        | "/_app/_adminLayout/users"
        | "/_app/_pOfficerLayout/createOrder"
        | "/_app/_pOfficerLayout/orders"
        | "/_app/_pOfficerLayout/pOfficer"
        | "/_app/_researcherLayout/reagents"
        | "/_app/_researcherLayout/samples"
        | "/_app/reagentRequests/$id"
        | "/_app/storageList/$id"
        | "/_app/_researcherLayout/"
        | "/_app/_pOfficerLayout/orders/$id"
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
        "/_app/_researcherLayout",
        "/_app/reagentRequests",
        "/_app/storageList"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_app/_adminLayout": {
      "filePath": "_app/_adminLayout.tsx",
      "parent": "/_app",
      "children": [
        "/_app/_adminLayout/users"
      ]
    },
    "/_app/_pOfficerLayout": {
      "filePath": "_app/_pOfficerLayout.tsx",
      "parent": "/_app",
      "children": [
        "/_app/_pOfficerLayout/createOrder",
        "/_app/_pOfficerLayout/orders",
        "/_app/_pOfficerLayout/pOfficer"
      ]
    },
    "/_app/_researcherLayout": {
      "filePath": "_app/_researcherLayout.tsx",
      "parent": "/_app",
      "children": [
        "/_app/_researcherLayout/reagents",
        "/_app/_researcherLayout/samples",
        "/_app/_researcherLayout/"
      ]
    },
    "/_app/reagentRequests": {
      "filePath": "_app/reagentRequests.tsx",
      "parent": "/_app",
      "children": [
        "/_app/reagentRequests/$id"
      ]
    },
    "/_app/storageList": {
      "filePath": "_app/storageList.tsx",
      "parent": "/_app",
      "children": [
        "/_app/storageList/$id"
      ]
    },
    "/_app/_adminLayout/users": {
      "filePath": "_app/_adminLayout/users.tsx",
      "parent": "/_app/_adminLayout"
    },
    "/_app/_pOfficerLayout/createOrder": {
      "filePath": "_app/_pOfficerLayout/createOrder.tsx",
      "parent": "/_app/_pOfficerLayout"
    },
    "/_app/_pOfficerLayout/orders": {
      "filePath": "_app/_pOfficerLayout/orders.tsx",
      "parent": "/_app/_pOfficerLayout",
      "children": [
        "/_app/_pOfficerLayout/orders/$id"
      ]
    },
    "/_app/_pOfficerLayout/pOfficer": {
      "filePath": "_app/_pOfficerLayout/pOfficer.tsx",
      "parent": "/_app/_pOfficerLayout"
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
    "/_app/reagentRequests/$id": {
      "filePath": "_app/reagentRequests/$id.tsx",
      "parent": "/_app/reagentRequests"
    },
    "/_app/storageList/$id": {
      "filePath": "_app/storageList/$id.tsx",
      "parent": "/_app/storageList"
    },
    "/_app/_researcherLayout/": {
      "filePath": "_app/_researcherLayout/index.tsx",
      "parent": "/_app/_researcherLayout"
    },
    "/_app/_pOfficerLayout/orders/$id": {
      "filePath": "_app/_pOfficerLayout/orders/$id.tsx",
      "parent": "/_app/_pOfficerLayout/orders"
    },
    "/_app/_researcherLayout/reagents/$id": {
      "filePath": "_app/_researcherLayout/reagents/$id.tsx",
      "parent": "/_app/_researcherLayout/reagents"
    }
  }
}
ROUTE_MANIFEST_END */
