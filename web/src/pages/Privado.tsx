import { useContext } from "react";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Page } from "../components/Page";
import { ViewScrollArea } from "../components/ScrollBar";
import { SummaryTable } from "../components/SummaryTable";
import { AuthContext } from "../contexts/auth";

export function Privado() {
  const { logout, user } = useContext(AuthContext);
  return (
    <Page>
      <Header />

      <div className=" p-3 rounded-[16px] flex justify-center items-center w-full">
        <ViewScrollArea dimentions="w-full">
          <SummaryTable userId={user.id} />
        </ViewScrollArea>
      </div>
      <Button className="mt-4" onClick={() => logout()}>
        SAIR
      </Button>
    </Page>
  );
}
