import { Download, File, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useMeta } from "@/context/MetaContext";

function NIRF() {
  const { setTitle, setDescription } = useMeta();

  useEffect(() => {
    setTitle("IMM - NIRF Documents");
    setDescription(
      "Access the latest NIRF documents for Institute of Marketing & Management (IMM) Delhi. Explore IMM's rankings, accreditation details, and official reports for academic excellence and transparency."
    );
  }, [setTitle, setDescription]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    loading: false,
    error: false,
    type: null,
  });

  // Auto-close dialog after 5 seconds when error is shown
  useEffect(() => {
    let timer;
    if (dialogOpen && dialogContent.error) {
      timer = setTimeout(() => {
        setDialogOpen(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [dialogOpen, dialogContent.error]);

  const handleDocumentClick = (docType) => {
    // Open blank dialog first
    setDialogContent({
      loading: true,
      error: false,
      type: docType,
    });
    setDialogOpen(true);

    // After 3.5 seconds, show error
    setTimeout(() => {
      setDialogContent({
        loading: false,
        error: true,
        type: docType,
      });
    }, 3500);
  };

  const handleTryAgain = () => {
    const currentType = dialogContent.type;
    setDialogContent({
      loading: true,
      error: false,
      type: currentType,
    });

    // Simulate loading again then show error
    setTimeout(() => {
      setDialogContent({
        loading: false,
        error: true,
        type: currentType,
      });
    }, 3500);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

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
          <button
            onClick={() => handleDocumentClick("sdg")}
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
              </div>
            </div>
            <Download className="w-6 h-6" />
          </button>

          {/* NIRF Management Button */}
          <button
            onClick={() => handleDocumentClick("management")}
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
          </button>
        </div>
      </div>

      {/* Dialog/Modal */}
      {dialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            {/* Close button */}
            <button
              onClick={closeDialog}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center justify-center min-h-[200px]">
              {dialogContent.loading && (
                <div className="text-center flex flex-col items-center justify-center">
                  <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Loading document...</p>
                </div>
              )}

              {dialogContent.error && (
                <div className="text-center">
                  <div className="text-red-500 text-5xl mb-4">!</div>
                  <h3 className="text-xl font-semibold text-red-600 mb-2">
                    Document Error
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {dialogContent.type === "sdg"
                      ? "Unable to load NIRF SDG Institution document."
                      : "Unable to load NIRF Management document."}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    This dialog will close in 5 seconds
                  </p>
                  <button
                    onClick={handleTryAgain}
                    className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NIRF;
