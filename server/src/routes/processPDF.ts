/**
 * 'processPDF.ts'
 *
 * This is an Express router that is mounted to the '/processPDF' endpoint.
 * This router parses the PDF file it receives from the frontend, extracts
 * the text, and submits that parsed text to the LLM in a processQuery().
 */

import express from "express";
import { mcpClient } from "../server.js";
//@ts-ignore
import pdf from "pdf-parse";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

const BACKEND_URL = process.env.BACKEND_URL;
if (!BACKEND_URL)
  throw new Error(`Could not read .env file in 'processPDF.ts'`);

//MCP Client instance
const client = mcpClient || null;

const router = express.Router();

router.post("/", async (req: any, res: any) => {
  try {
    //Validate MCP Client
    if (!client) {
      console.error("Failed passing MCP Client to PDF router");
      return res.status(400).json({
        error: "Failed passing MCP Client instance to processPDF router.",
      });
    }

    //Check that request has a buffer
    const pdfBuffer = req.body;
    if (!pdfBuffer || !Buffer.isBuffer(pdfBuffer)) {
      console.error("Missing or invalid PDF buffer");
      return res.status(400).json({
        error: "Missing or invalid PDF buffer",
      });
    }

    //Extract text from PDF
    const data = await pdf(pdfBuffer);
    const extractedText = data.text;

    //Send PDF as starting context to the LLM
    const sendToMCP = await fetch(`${BACKEND_URL}/mcp/sendContext`, {
      method: "POST",
      headers: { "Content-Type": "application/pdf" },
      body: extractedText,
    });

    if (!sendToMCP.ok) {
      console.error("❌ Failed to send parsed PDF to MCP");
      return res
        .status(400)
        .json({ error: "❌ Failed to send parsed PDF to MCP " });
    }

    return res.json({
      message: "Successfully parsed and sent PDF file to MCP",
    });
  } catch (error) {
    console.error("Error processing PDF to LLM: ", error);
    res.status(500).json({
      error: "Failed to process PDF to LLM",
    });
  }
});

export default router;
