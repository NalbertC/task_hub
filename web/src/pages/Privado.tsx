import { useContext } from "react";
import { Button } from "../components/Button";
import { Page } from "../components/Page";
import { ScrollAreaHorizontal } from "../components/ScrollBar";
import { SummaryTable } from "../components/SummaryTable";
import { AuthContext } from "../contexts/auth";

export function Privado() {
  const { logout } = useContext(AuthContext);
  return (
    <Page>
      <div className="bg-blue-200 p-3 rounded-[16px] flex justify-center items-center w-full">
        <ScrollAreaHorizontal>
          <SummaryTable />
        </ScrollAreaHorizontal>
      </div>
      <Button className="mt-4" onClick={() => logout()}>
        SAIR
      </Button>
    </Page>
  );
}
