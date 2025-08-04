# Pitch-Pilot

## 🧠 What Is This Project For?

PitchPilot is a web-based AI assistant that helps startup founders refine their pitch decks into investor-ready documents — fast. It solves the problem of:

- Pitch decks being too long, unclear, or poorly structured
- Founders lacking feedback on how to make their story more compelling to investors
- Founders not knowing how to condense their decks into a short-form 2-minute presentation

Instead of requiring a Google login or locking users into one platform, PitchPilot accepts a .pptx upload and returns improved, AI-enhanced versions of the deck as downloadable.pptx files. It preserves layout and images while updating slide content with LLM-generated copy.

## 🎯 What Can PitchPilot Do?

After uploading a `.pptx` file, users can ask the LLM to:

- **Give Feedback** on their pitch (plain text)
- **Rewrite Slide Content** using provided feedback while preserving design
- **Generate a Short-Form Deck** (condense into a 2-minute, 7-slide deck)
- **Create a One-Pager** that distills their company

All generated outputs are downloadable `.pptx` files created with layout + images preserved, using `pptx-compose`.

## 📦 Tech Stack Overview

### 🖥️ Frontend (`client/`)

- **React** (bundled with Vite)
- **TypeScript**

### 🔧 Backend (`server/`)

- **Express.js**
- **TypeScript**
- **`pptx-compose`** (to read/write .pptx files)
- **`modelcontextprotocol/sdk`** (MCP SDK to create an MCP Client/Server)
- **`@google/genai`** (the Gemini SDK that powers the MCP Ecosystem)

## Project Structure

```
pitch-pilot/
├── clientFrontend/               # Vite + React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── index.css
│   │   └── main.tsx
│   ├── index.html
│   └── vite.config.ts
│
├── server/                       # TypeScript backend
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   ├── src/
│   │   ├── server.ts             # Express server entrypoint
│   │   ├── routes/
│   │   ├── utils/
│   │   └── mcpEcosystem/
│   │       ├── mcpClient/        # Gemini client with tool calling logic
│   │       └── mcpServer/        # Tool registry + tool implementations
│
├── uploads/                      # Temp upload dir (deleted after parsing)
├── output/                       # Output dir for generated .pptx (deleted after download)
└── README.md

```

## 🔐 File Cleanup Policy

- Uploaded `.pptx` files go to `server/uploads` and are deleted after parsing
- Generated `.pptx` files to go `server/output` and are deleted after being served

Use `fs.unlink()` in route handlers to ensure clean deletion.

## 🌐 Deployment Plan

Both `client/` and `server/` live in the same GitHub repo, but they will deployed on as **seperate services** on Render.
