import Layout from "./components/layouts/Layout";
import AppRouter from "./routers/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
   <Router>
    <Layout>
      <AppRouter />
    </Layout>
   </Router>
  );
}

export default App;
