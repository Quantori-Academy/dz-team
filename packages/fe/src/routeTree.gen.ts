/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as LoginImport } from "./routes/login";
import { Route as AppImport } from "./routes/_app";
import { Route as AppIndexImport } from "./routes/_app/index";
import { Route as AppUsersImport } from "./routes/_app/users";
import { Route as AppSamplesImport } from "./routes/_app/samples";
import { Route as AppReagentsImport } from "./routes/_app/reagents";
import { Route as AppOrdersImport } from "./routes/_app/orders";
import { Route as AppNewUserImport } from "./routes/_app/newUser";
import { Route as AppDevImport } from "./routes/_app/dev";
import { Route as AppReagentsIdImport } from "./routes/_app/reagents/$id";
import { Route as AppOrderCreateImport } from "./routes/_app/order/create";

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

const AppIndexRoute = AppIndexImport.update({
    id: "/",
    path: "/",
    getParentRoute: () => AppRoute,
} as any);

const AppUsersRoute = AppUsersImport.update({
    id: "/users",
    path: "/users",
    getParentRoute: () => AppRoute,
} as any);

const AppSamplesRoute = AppSamplesImport.update({
    id: "/samples",
    path: "/samples",
    getParentRoute: () => AppRoute,
} as any);

const AppReagentsRoute = AppReagentsImport.update({
    id: "/reagents",
    path: "/reagents",
    getParentRoute: () => AppRoute,
} as any);

const AppOrdersRoute = AppOrdersImport.update({
    id: "/orders",
    path: "/orders",
    getParentRoute: () => AppRoute,
} as any);

const AppNewUserRoute = AppNewUserImport.update({
    id: "/newUser",
    path: "/newUser",
    getParentRoute: () => AppRoute,
} as any);

const AppDevRoute = AppDevImport.update({
    id: "/dev",
    path: "/dev",
    getParentRoute: () => AppRoute,
} as any);

const AppReagentsIdRoute = AppReagentsIdImport.update({
    id: "/$id",
    path: "/$id",
    getParentRoute: () => AppReagentsRoute,
} as any);

const AppOrderCreateRoute = AppOrderCreateImport.update({
    id: "/order/create",
    path: "/order/create",
    getParentRoute: () => AppRoute,
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
        "/_app/dev": {
            id: "/_app/dev";
            path: "/dev";
            fullPath: "/dev";
            preLoaderRoute: typeof AppDevImport;
            parentRoute: typeof AppImport;
        };
        "/_app/newUser": {
            id: "/_app/newUser";
            path: "/newUser";
            fullPath: "/newUser";
            preLoaderRoute: typeof AppNewUserImport;
            parentRoute: typeof AppImport;
        };
        "/_app/orders": {
            id: "/_app/orders";
            path: "/orders";
            fullPath: "/orders";
            preLoaderRoute: typeof AppOrdersImport;
            parentRoute: typeof AppImport;
        };
        "/_app/reagents": {
            id: "/_app/reagents";
            path: "/reagents";
            fullPath: "/reagents";
            preLoaderRoute: typeof AppReagentsImport;
            parentRoute: typeof AppImport;
        };
        "/_app/samples": {
            id: "/_app/samples";
            path: "/samples";
            fullPath: "/samples";
            preLoaderRoute: typeof AppSamplesImport;
            parentRoute: typeof AppImport;
        };
        "/_app/users": {
            id: "/_app/users";
            path: "/users";
            fullPath: "/users";
            preLoaderRoute: typeof AppUsersImport;
            parentRoute: typeof AppImport;
        };
        "/_app/": {
            id: "/_app/";
            path: "/";
            fullPath: "/";
            preLoaderRoute: typeof AppIndexImport;
            parentRoute: typeof AppImport;
        };
        "/_app/order/create": {
            id: "/_app/order/create";
            path: "/order/create";
            fullPath: "/order/create";
            preLoaderRoute: typeof AppOrderCreateImport;
            parentRoute: typeof AppImport;
        };
        "/_app/reagents/$id": {
            id: "/_app/reagents/$id";
            path: "/$id";
            fullPath: "/reagents/$id";
            preLoaderRoute: typeof AppReagentsIdImport;
            parentRoute: typeof AppReagentsImport;
        };
    }
}

// Create and export the route tree

interface AppReagentsRouteChildren {
    AppReagentsIdRoute: typeof AppReagentsIdRoute;
}

const AppReagentsRouteChildren: AppReagentsRouteChildren = {
    AppReagentsIdRoute: AppReagentsIdRoute,
};

const AppReagentsRouteWithChildren = AppReagentsRoute._addFileChildren(AppReagentsRouteChildren);

interface AppRouteChildren {
    AppDevRoute: typeof AppDevRoute;
    AppNewUserRoute: typeof AppNewUserRoute;
    AppOrdersRoute: typeof AppOrdersRoute;
    AppReagentsRoute: typeof AppReagentsRouteWithChildren;
    AppSamplesRoute: typeof AppSamplesRoute;
    AppUsersRoute: typeof AppUsersRoute;
    AppIndexRoute: typeof AppIndexRoute;
    AppOrderCreateRoute: typeof AppOrderCreateRoute;
}

const AppRouteChildren: AppRouteChildren = {
    AppDevRoute: AppDevRoute,
    AppNewUserRoute: AppNewUserRoute,
    AppOrdersRoute: AppOrdersRoute,
    AppReagentsRoute: AppReagentsRouteWithChildren,
    AppSamplesRoute: AppSamplesRoute,
    AppUsersRoute: AppUsersRoute,
    AppIndexRoute: AppIndexRoute,
    AppOrderCreateRoute: AppOrderCreateRoute,
};

const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);

export interface FileRoutesByFullPath {
    "": typeof AppRouteWithChildren;
    "/login": typeof LoginRoute;
    "/dev": typeof AppDevRoute;
    "/newUser": typeof AppNewUserRoute;
    "/orders": typeof AppOrdersRoute;
    "/reagents": typeof AppReagentsRouteWithChildren;
    "/samples": typeof AppSamplesRoute;
    "/users": typeof AppUsersRoute;
    "/": typeof AppIndexRoute;
    "/order/create": typeof AppOrderCreateRoute;
    "/reagents/$id": typeof AppReagentsIdRoute;
}

export interface FileRoutesByTo {
    "/login": typeof LoginRoute;
    "/dev": typeof AppDevRoute;
    "/newUser": typeof AppNewUserRoute;
    "/orders": typeof AppOrdersRoute;
    "/reagents": typeof AppReagentsRouteWithChildren;
    "/samples": typeof AppSamplesRoute;
    "/users": typeof AppUsersRoute;
    "/": typeof AppIndexRoute;
    "/order/create": typeof AppOrderCreateRoute;
    "/reagents/$id": typeof AppReagentsIdRoute;
}

export interface FileRoutesById {
    __root__: typeof rootRoute;
    "/_app": typeof AppRouteWithChildren;
    "/login": typeof LoginRoute;
    "/_app/dev": typeof AppDevRoute;
    "/_app/newUser": typeof AppNewUserRoute;
    "/_app/orders": typeof AppOrdersRoute;
    "/_app/reagents": typeof AppReagentsRouteWithChildren;
    "/_app/samples": typeof AppSamplesRoute;
    "/_app/users": typeof AppUsersRoute;
    "/_app/": typeof AppIndexRoute;
    "/_app/order/create": typeof AppOrderCreateRoute;
    "/_app/reagents/$id": typeof AppReagentsIdRoute;
}

export interface FileRouteTypes {
    fileRoutesByFullPath: FileRoutesByFullPath;
    fullPaths:
        | ""
        | "/login"
        | "/dev"
        | "/newUser"
        | "/orders"
        | "/reagents"
        | "/samples"
        | "/users"
        | "/"
        | "/order/create"
        | "/reagents/$id";
    fileRoutesByTo: FileRoutesByTo;
    to:
        | "/login"
        | "/dev"
        | "/newUser"
        | "/orders"
        | "/reagents"
        | "/samples"
        | "/users"
        | "/"
        | "/order/create"
        | "/reagents/$id";
    id:
        | "__root__"
        | "/_app"
        | "/login"
        | "/_app/dev"
        | "/_app/newUser"
        | "/_app/orders"
        | "/_app/reagents"
        | "/_app/samples"
        | "/_app/users"
        | "/_app/"
        | "/_app/order/create"
        | "/_app/reagents/$id";
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
        "/_app/dev",
        "/_app/newUser",
        "/_app/orders",
        "/_app/reagents",
        "/_app/samples",
        "/_app/users",
        "/_app/",
        "/_app/order/create"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_app/dev": {
      "filePath": "_app/dev.tsx",
      "parent": "/_app"
    },
    "/_app/newUser": {
      "filePath": "_app/newUser.tsx",
      "parent": "/_app"
    },
    "/_app/orders": {
      "filePath": "_app/orders.tsx",
      "parent": "/_app"
    },
    "/_app/reagents": {
      "filePath": "_app/reagents.tsx",
      "parent": "/_app",
      "children": [
        "/_app/reagents/$id"
      ]
    },
    "/_app/samples": {
      "filePath": "_app/samples.tsx",
      "parent": "/_app"
    },
    "/_app/users": {
      "filePath": "_app/users.tsx",
      "parent": "/_app"
    },
    "/_app/": {
      "filePath": "_app/index.tsx",
      "parent": "/_app"
    },
    "/_app/order/create": {
      "filePath": "_app/order/create.tsx",
      "parent": "/_app"
    },
    "/_app/reagents/$id": {
      "filePath": "_app/reagents/$id.tsx",
      "parent": "/_app/reagents"
    }
  }
}
ROUTE_MANIFEST_END */
