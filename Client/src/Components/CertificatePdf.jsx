import React, { useRef } from 'react';
import logo from "../assets/logof.png";
import { MdFileDownload } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from "react-router-dom";

const CertificatePdf = ({ visible, onClose, user, mark, date, course }) => {
    const componentRef = useRef();

    const handleDownloadPDF = () => {
        html2canvas(componentRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imageWidth = canvas.width;
            const imageHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
            const imageX = (pdfWidth - imageWidth * ratio) / 2;
            const imageY = 30;
            pdf.addImage(imgData, 'PNG', imageX, imageY, imageWidth * ratio, imageHeight * ratio);
            pdf.save(`${course?._id}.pdf`);
        });
    };

    const navigate = useNavigate();

    if (!visible) return null;

    const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
    };

    return (
        <div
            id="container"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-10"
        >
            <div className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
                <div className="absolute top-4 right-4 flex space-x-4">
                    <button onClick={handleDownloadPDF} className="text-green-600 hover:text-green-800">
                        <MdFileDownload size={32} />
                    </button>
                    <button onClick={onClose} className="text-red-600 hover:text-red-800">
                        <IoMdCloseCircle size={32} />
                    </button>
                </div>
                <div ref={componentRef} className="p-10">
                    <div className="text-center border-b-2 border-gray-300 pb-4">
                        <p className="text-sm text-gray-500">Certificate ID: {course?._id}</p>
                        <h1 className="text-3xl font-semibold text-gray-700 mb-2">Certificate Of Completion</h1>
                        <p className="text-sm text-gray-500">Issued on: {date}</p>
                    </div>
                    <div className="text-center my-8">
                        <p className="text-lg font-medium">Proudly Awarded To</p>
                        <h2 className="text-2xl font-semibold text-gray-800 mt-2">{user?.name}</h2>
                    </div>
                    <div className="text-center mb-8">
                        <p className="text-md text-gray-600">For Successfully Completing The</p>
                        <p className="text-lg font-medium text-gray-700">{course?.name}</p>
                        <p className="text-sm text-gray-500">in {date} at hyscalar.co.in</p>
                    </div>
                    <div className="text-center mb-4">
                        <p className="text-lg font-medium border-b border-gray-300 inline-block">Monalisha Panda</p>
                    </div>
                    <div className="text-center mb-8">
                        <p className="text-sm text-gray-500">HR at Hyscalar</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <img className="w-16 md:w-24" src={logo} alt="Logo" />
                        <img
                            className="w-10 md:w-16"
                            src="https://imgs.search.brave.com/RYaGue90DrpQ0eOhloooYRKGxmS2U3MeGUA5_tEEGbU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9kL2QwL1FS/X2NvZGVfZm9yX21v/YmlsZV9FbmdsaXNo/X1dpa2lwZWRpYS5z/dmcvNjQwcHgtUVJf/Y29kZV9mb3JfbW9i/aWxlX0VuZ2xpc2hf/V2lraXBlZGlhLnN2/Zy5wbmc"
                            alt="QR Code"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificatePdf;
