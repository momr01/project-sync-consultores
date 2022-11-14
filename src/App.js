import { Layout } from "./components";
import AppRouter from "./routers/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth/authProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <AppRouter />
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
