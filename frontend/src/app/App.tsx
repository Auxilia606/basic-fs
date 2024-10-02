import QueryClientProvider from "./QueryClientProvider";
import { RouterProvider } from "./RouterProvider";

const App = () => {
  return (
    <QueryClientProvider>
      <RouterProvider />
    </QueryClientProvider>
  );
};

export default App;
