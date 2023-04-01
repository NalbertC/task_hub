import { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { AuthContext, AuthProvider } from "../contexts/auth";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { Privado } from "../pages/Privado";
import { ViewUser } from "../pages/ViewUser";

type User = {
  id: number;
  email: string;
};

export function WebRoutes() {
  const Private = (props: any) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div>Carregando ...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return props.children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/private"
            element={
              <Private>
                <Privado />
              </Private>
            }
          />
          <Route path="/usuario/:idUsuario" element={<ViewUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
