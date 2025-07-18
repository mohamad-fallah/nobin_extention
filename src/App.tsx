import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const [queryClient] = React.useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}></QueryClientProvider>;
}

export default App;
