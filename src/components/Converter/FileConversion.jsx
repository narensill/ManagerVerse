import React, { useState } from 'react';
import { Document, Packer, Paragraph } from 'docx';
import { PDFDocument } from 'pdf-lib';

const FileConversion = ({ darkMode, setDarkMode }) => {
  const [file, setFile] = useState(null);
  const [conversionType, setConversionType] = useState(null);

  const handlePDFToWord = () => {
    setConversionType('pdfToWord');
  };

  const handleWordToPDF = () => {
    setConversionType('wordToPdf');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConvert = async () => {
    if (!file) return;

    if (conversionType === 'pdfToWord') {
      // PDF to Word Conversion
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const arrayBuffer = fileReader.result;
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const text = pdfDoc.getPages().map((page) => page.getTextContent()).join('\n');

        // Create Word document with extracted text
        const doc = new Document({
          sections: [
            {
              children: [new Paragraph(text)],
            },
          ],
        });

        const blob = await Packer.toBlob(doc);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'converted.docx';
        document.body.appendChild(link);
        link.click();
      };

      fileReader.readAsArrayBuffer(file);
    } else if (conversionType === 'wordToPdf') {
      // Word to PDF Conversion
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const arrayBuffer = fileReader.result;

        // Basic PDF creation (this won't preserve complex formatting)
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        const text = new TextDecoder().decode(arrayBuffer);
        page.drawText(text);

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'converted.pdf';
        document.body.appendChild(link);
        link.click();
      };

      fileReader.readAsArrayBuffer(file);
    }

    // Reset the state after conversion
    setFile(null);
    setConversionType(null);
  };

  return (
    <div>
      <div
        className={`fixed inset-0 -z-10 h-full w-full transition-all duration-300 ease-in-out ${
          darkMode
            ? 'bg-slate-950'
            : 'bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:100vh]'
        }`}
        style={{ height: '100vh', backgroundAttachment: 'fixed' }}
      >
        <div
          className={`fixed inset-0 transition-all duration-300 ease-in-out ${
            darkMode
              ? 'bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'
              : 'bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]'
          }`}
          style={{ backgroundAttachment: 'fixed' }}
        ></div>
      </div>
      <h1
        className={`text-4xl font-bold text-center mt-10 animate-fadeInDown ${
          darkMode ? 'text-gray-300' : 'text-sky-900'
        }`}
      >
        PDF
        <span className={`${darkMode ? 'text-sky-300' : 'text-blue-700'}`}>to</span>
        <span className={`${darkMode ? 'text-green-400' : 'text-green-600'}`}>WORD</span>
      </h1>
      <p
        className={`text-center text-lg mt-3 mb-40 animate-fadeIn ${
          darkMode ? 'text-gray-400' : 'text-blue-700'
        }`}
        style={{ animationDelay: '0.3s' }}
      >
        From Ideas to Actions, Manage Everything Effortlessly
      </p>
      <div className="content">
        <h2 className="text-xl font-bold" style={{ textAlign: "center", color: darkMode ? "#9CA3AF" : "#4F46E5" }}>
          File Conversion
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button
            onClick={handlePDFToWord}
            style={{
              padding: '12px 25px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Convert PDF to Word
          </button>
          <button
            onClick={handleWordToPDF}
            style={{
              padding: '12px 25px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Convert Word to PDF
          </button>
        </div>

        {/* Input and Convert button after clicking either of the conversion buttons */}
        {conversionType && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <input
              type="file"
              accept={conversionType === 'pdfToWord' ? '.pdf' : '.docx'}
              onChange={handleFileChange}
              style={{
                padding: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                cursor: 'pointer',
                marginRight: '10px',
              }}
            />
            <button
              onClick={handleConvert}
              disabled={!file}
              style={{
                padding: '12px 25px',
                fontSize: '16px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: file ? 'pointer' : 'not-allowed',
                opacity: file ? 1 : 0.5,
              }}
            >
              Convert
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileConversion;
