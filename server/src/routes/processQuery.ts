/**
 * ./routes/processQuery.js
 *
 * This router handles submitting and receving messages between the user and the LLM in
 * this MCP ecosystem. This router processes the user's message, prompts the
 * LLM, and returns the LLM's response as JSON.
 */

import express from "express";
import { Request, Response } from "express";
import { mcpClient } from "../server.js";

//MCP Client instance
const client = mcpClient || null;

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    //Validate that MCP Client exists
    if (!client) {
      res.status(400).json({
        error: "Failed passing MCP Client instance to processQuery router",
      });
      return;
    }

    //Retrieve the message from the request body
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Missing or invalid message " });
      return;
    }

    //Send message to LLM and return LLM response
    const reply = await client.processQuery(message);

    res.json({ role: "model", reply });
  } catch (error) {
    console.error("❌ Failed to send user query: \n", error);
    res.status(500).json({ error: "Error in /processQuery router" });
  }
});

export default router;
