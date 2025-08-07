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
import pdfParse from "pdf-parse/lib/pdf-parse.js";
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
    const data = await pdfParse(pdfBuffer);
    const extractedText = data.text as string;

    //Send PDF as starting context to the LLM
    const sendToMCP = await fetch(`${BACKEND_URL}/mcp/processQuery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: extractedText }),
    });

    if (!sendToMCP.ok) {
      const errorMessage = await sendToMCP.json();
      console.error(
        `❌ Failed to send parsed PDF to MCP\n ${errorMessage.error}`
      );
      return res
        .status(400)
        .json({ error: "❌ Failed to send parsed PDF to MCP " });
    }

    const response = await sendToMCP.json();

    return res.json({
      role: "model",
      reply: response.reply,
    });
  } catch (error) {
    console.error("❌ Error processing PDF to LLM: ", error);
    res.status(500).json({
      error: "Failed to process PDF",
    });
  }
});

export default router;
