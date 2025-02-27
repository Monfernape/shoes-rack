"use client";

import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { DataSpinner } from "@/common/Loader/Loader";
import { NoDataFound } from "@/common/NoDataFound";

// This sets up the workerSrc for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfViewerProps {
  fileUrl: string;
}

const PdfViewer = ({ fileUrl }: PdfViewerProps) => {
  const [loadError, setLoadError] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoadError(false);
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < (numPages || 1)) {
      setPageNumber(pageNumber + 1);
    }
  };

  return loadError ? (
    <NoDataFound/>
  ) : (
    <div>
      <Document
        file={fileUrl}
        onLoadSuccess={onLoadSuccess}
        onLoadError={() => setLoadError(true)}
        loading={<DataSpinner />}
      >
        <Page pageNumber={pageNumber} className="w-full mx-auto" />
      </Document>
      {pageNumber > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            className="px-4 py-1 bg-blue-600 text-white text-xs rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Prev
          </button>
          <span className="text-xs">
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={pageNumber >= (numPages || 1)}
            className="px-4 py-1 bg-blue-600 text-white text-xs rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
export default PdfViewer;
