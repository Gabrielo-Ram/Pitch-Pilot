const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
if (!BACKEND_URL)
  throw new Error("VITE_BACKEND_URL could not be read from .env");

/**
 * Accepts a PDF file and sends it to the MCP Ecosystem via an API endpoint.
 *
 * @param {React.ChangeEvent<HTMLInputElement>} e File input change event
 * @returns {Promise<boolean>} Whether the upload succeeded
 */
export async function uploadFile(
  e: React.ChangeEvent<HTMLInputElement>
): Promise<boolean> {
  //Retrieve the selected file
  const file = e.target?.files?.[0];
  if (!file) {
    console.error("❌ No file selected");
    return false;
  }

  //Validate file type
  if (file.type !== "application/pdf") {
    console.error("❌ Unsupported file type. Please upload a PDF.");
    return false;
  }

  try {
    const pdfArrayBuffer = await file.arrayBuffer();

    //Send the PDF file to the API endpoint
    const res = await fetch(`${BACKEND_URL}/processPDF`, {
      method: "POST",
      body: pdfArrayBuffer,
      headers: {
        "Content-Type": "application/pdf",
      },
    });

    if (!res.ok) {
      console.error(`❌ Upload failed with status ${res.status}`);
      return false;
    }

    console.log("✓ Successfully uploaded PDF file.");
    return true;
  } catch (error) {
    console.error("❌ File upload failed:\n", error);
    return false;
  }
}
