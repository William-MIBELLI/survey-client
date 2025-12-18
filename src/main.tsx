import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "./contexts/auth.context.tsx";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./lib/apollo.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ApolloProvider>
  </StrictMode>
);
