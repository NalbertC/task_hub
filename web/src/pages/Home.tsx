import { Header } from "../components/Header";
import { Heading } from "../components/Heading";
import { MainContent } from "../components/MainContent.tsx";
import { Modal } from "../components/Modal";
import { Page } from "../components/Page";
import ScrollAreaDemo from "../components/ScrollBar";
import { Section } from "../components/Section";
import { Sidbar } from "../components/Sidbar";
import { SummaryTable } from "../components/SummaryTable";
import { Text } from "../components/Text";

export function Home() {
  return (
    <Page>
      <Sidbar />
      <MainContent>
        <Header />
        <Section>
          <div className="bg-blue-200 p-3 rounded-[16px]">
            <Heading>Teste</Heading>
            <Text>One step every day</Text>
            <SummaryTable />
          </div>
          <div className="">
            <Heading>2ª parte</Heading>
            <Modal />
          </div>
          <div className="relative flex flex-col items-center justify-center w-full p-4 pb-12 mx-auto overflow-hidden duration-300 bg-gray-200 rounded-lg shadow-2xl opacity-95 hover:opacity-95 focus-within:bg-gray-50 focus-within:opacity-100  ">
            <ScrollAreaDemo />
          </div>
        </Section>
      </MainContent>
    </Page>
  );
}
