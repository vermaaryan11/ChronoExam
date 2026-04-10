import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

const ExportButton = ({ data, targetId, fileName }) => {
  const exportPDF = () => {
    const input = document.getElementById(targetId);
    html2canvas(input, { backgroundColor: '#0f172a', scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${fileName}.pdf`);
    });
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Schedule");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <div className="flex gap-2">
      <button 
        onClick={exportPDF}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-danger/10 text-danger border border-danger/20 text-xs font-semibold hover:bg-danger/20 transition-all"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        PDF
      </button>
      <button 
        onClick={exportExcel}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 text-success border border-success/20 text-xs font-semibold hover:bg-success/20 transition-all"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Excel
      </button>
    </div>
  );
};

export default ExportButton;
