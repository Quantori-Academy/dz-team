export const config = {
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,

    useMockData: import.meta.env.USE_MOCK_DATA ?? true,

    apiUrl: `${import.meta.env.VITE_API_URL ?? "http://localhost"}`,
    apiPort: `${import.meta.env.VITE_API_PORT ?? "5000"}`,
    apiRoute: `${import.meta.env.VITE_API_ROUTE ?? "/api/v1"}`,
};
