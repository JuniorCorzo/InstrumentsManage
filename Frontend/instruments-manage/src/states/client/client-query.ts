import { QueryClient } from "@tanstack/react-query";

export const clientQuery = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 1000,
      refetchOnWindowFocus: false,
    },
  },
});
