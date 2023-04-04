import { useContext } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { AuthContext, AuthProvider } from "../contexts/auth";

import { AutoCadastro } from "../pages/AutoCadastro";
import { Home } from "../pages/Home";
import { Inicio } from "../pages/Inicio";
import { Login } from "../pages/Login";
import { Profile } from "../pages/MyProfile";
import { NotFound } from "../pages/NotFound";
import { SearchProfile } from "../pages/SearchProfile";

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
            path="/"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
          <Route
            path="/meuperfil"
            element={
              <Private>
                <Profile />
              </Private>
            }
          />
          <Route path="/usuario/:idUsuario" element={<SearchProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/cadastro" element={<AutoCadastro />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
