import nirfSdg from "../../assets/pdfs/NIRF SDG INSTITUTION 2025.pdf";
import nirfManagement from "../../assets/pdfs/NIRF Management 2025.pdf";
import { Download, File } from "lucide-react";

function NIRF() {
  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden border border-pink-200">
        {/* Header */}
        <div className="p-6 text-center border-b border-pink-200 bg-pink-50">
          <h1 className="text-2xl font-bold text-pink-800 mb-2">
            NIRF Documents
          </h1>
          <p className="text-pink-600 text-sm">
            Download official NIRF documentation
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* NIRF SDG Button */}
          <a
            href={nirfSdg}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-15 bg-pink-800 hover:bg-pink-900 text-white rounded-md flex items-center justify-between gap-3 p-4 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <File className="w-6 h-6 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-base">
                  NIRF SDG Institution
                </div>
                <div className="text-xs opacity-90">
                  Sustainable Development Goals
                </div>
              </div>{" "}
            </div>
            <Download className="w-6 h-6" />
          </a>

          {/* NIRF Management Button */}
          <a
            href={nirfManagement}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-15 bg-pink-700 hover:bg-pink-800 text-white rounded-md flex items-center justify-between gap-3 p-4 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <File className="w-6 h-6 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-base">NIRF Management</div>
                <div className="text-xs opacity-90">Management Framework</div>
              </div>
            </div>
            <Download className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default NIRF;
