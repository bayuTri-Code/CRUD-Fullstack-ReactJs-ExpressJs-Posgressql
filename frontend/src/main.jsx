import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ColorModeProvider } from "./components/ui/color-mode.jsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { queryClient } from "../utils/queryClients.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toast } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-center" />
          <App />
        </QueryClientProvider>
      </ColorModeProvider>
    </ChakraProvider>
  </StrictMode>
);
