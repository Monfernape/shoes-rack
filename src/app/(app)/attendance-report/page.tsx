import React from "react";
import { PageLayout } from "../../layout/PageLayout";
import PdfViewer from "./components/PdfViewer";

const Page = async () => {
  return (
    <PageLayout>
      <PdfViewer fileUrl={"https://pdfobject.com/pdf/sample.pdf"} />
    </PageLayout>
  );
};

export default Page;
