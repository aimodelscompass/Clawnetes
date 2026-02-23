# Clawnetes 🦞

**The Native Installer for OpenClaw.**

Forget the terminal. Clawnetes is a friendly wizard that installs, configures, and launches your AI agent in 2 minutes.

## 🚀 Supported Platforms

### macOS
1. Download the latest **`Clawnetes.dmg`** from the [Releases Page](../../releases).
2. Open the file and drag Clawnetes to your Applications folder.
3. Follow the wizard to name your agent, enter your API key, and configure your settings.
4. Click **"Open Web Dashboard"** when finished.

### Windows
1. Download the latest **`.msi`** installer from the [Releases Page](../../releases).
2. Run the installer to setup Clawnetes on your system.
3. Open Clawnetes and follow the wizard instructions.

### Linux (Remote Installation)
*Note: We do not currently provide a native local Linux installer (e.g., AppImage or .deb).*

However, you can easily install OpenClaw onto a remote Linux server! Simply run the **Clawnetes** app on your macOS or Windows machine, choose the **Remote/Cloud** environment option, and provide your Linux server's SSH details. Clawnetes will handle the complete installation and configuration remotely.

## ✨ Features
- **Auto-Dependency Check:** Verifies Node.js and required dependencies are ready.
- **Identity Wizard:** Sets your agent's personality and tools via a clean GUI.
- **Config Gen:** Automatically creates the correct configuration for Anthropic, OpenAI, and other providers.
- **Remote Deployment:** Provision remote cloud instances securely over SSH directly from the UI.
- **One-Click Launch:** Starts the agent and opens the web dashboard.

## 🛠️ Developer Setup (Building from Source)

**Prerequisites:**
- Node.js (v20+)
- Rust (Cargo)

```bash
# 1. Clone the repo
git clone https://github.com/aimodelscompass/Clawnetes.git
cd Clawnetes

# 2. Install dependencies
npm install

# 3. Run in Development Mode (Launches the GUI)
npm run tauri dev

# 4. Build Production Binary
npm run tauri build
```

## 🏗️ Architecture
- **Frontend:** React + TypeScript (The Wizard UI).
- **Backend:** Rust (System calls, file writing, shell execution, SSH tunneling).
- **Framework:** Tauri v1.

---
*Built by [AI Models Compass](https://x.com/aimodelscompass).*