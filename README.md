<p align="center">
  <img src="https://img.shields.io/badge/NERV-CODE-cc1418?style=for-the-badge&labelColor=0A0A0C" alt="NERV CODE" />
  <img src="https://img.shields.io/badge/MAGI_SYSTEM-ONLINE-2D8B46?style=for-the-badge&labelColor=0A0A0C" alt="MAGI SYSTEM ONLINE" />
  <img src="https://img.shields.io/badge/version-序:1.0.0-D4494F?style=for-the-badge&labelColor=0A0A0C" alt="Version" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-green?style=flat-square" alt="Node" />
  <img src="https://img.shields.io/badge/bun-%3E%3D1.0-orange?style=flat-square" alt="Bun" />
  <img src="https://img.shields.io/badge/base-Claude_Code_v2.1.88-8C1C22?style=flat-square" alt="Base Version" />
</p>

```
 ███╗   ██╗███████╗██████╗ ██╗   ██╗     ██████╗ ██████╗ ██████╗ ███████╗
 ████╗  ██║██╔════╝██╔══██╗██║   ██║    ██╔════╝██╔═══██╗██╔══██╗██╔════╝
 ██╔██╗ ██║█████╗  ██████╔╝██║   ██║    ██║     ██║   ██║██║  ██║█████╗
 ██║╚██╗██║██╔══╝  ██╔══██╗╚██╗ ██╔╝    ██║     ██║   ██║██║  ██║██╔══╝
 ██║ ╚████║███████╗██║  ██║ ╚████╔╝     ╚██████╗╚██████╔╝██████╔╝███████╗
 ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝  ╚═══╝      ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
```

<p align="center">
  <b>God's in his heaven. All's right with the world.</b>
</p>

<p align="center">
  <a href="./README.zh-CN.md">中文文档</a>
</p>

---

## MAGI System Online

**NERV-CODE** is a NERV/MAGI-themed restoration of the Claude Code CLI (v2.1.88), reconstructed from the public npm package's sourcemap. The full TypeScript source has been extracted, themed with Neon Genesis Evangelion aesthetics, and can be compiled and run as a fully functional AI coding assistant.

This is a **research & fan project** — all functionality comes from the original Claude Code; we only added the NERV paint job.

---

## REFERENCE

> In the spirit of open source community etiquette, we gratefully acknowledge:

### Source Projects

This project stands on the shoulders of giants:

- **[zxdxjtu/claude-code-sourcemap](https://github.com/zxdxjtu/claude-code-sourcemap/tree/main)** — Original sourcemap extraction and source restoration methodology
- **[ChinaSiro/claude-code-sourcemap](https://github.com/ChinaSiro/claude-code-sourcemap)** — Build system, documentation, and community contributions

### Disclaimer

- **Claude Code** source code is copyright [Anthropic, PBC](https://www.anthropic.com). This project is reconstructed from publicly available npm packages for **research and educational purposes only**. Not for commercial use.
- **Neon Genesis Evangelion** (新世紀エヴァンゲリオン) is created by Hideaki Anno / Studio Gainax / khara, Inc. All NERV/MAGI/EVA references in this project are a **fan tribute for entertainment purposes only** (新世纪福音战士致敬仅供娱乐). No affiliation with or endorsement by the rights holders.

---

## 第壱話: Quick Start — Angel Attack

### Prerequisites

- **Node.js** >= 18
- **Bun** >= 1.0 (build only)
- An **Anthropic API key** (for actual Claude conversations)

### One-Click Install

```bash
bash install.sh
```

The script will install dependencies, restore internal SDKs, build the project, and create a `nerv` command in `~/.local/bin/`.

### Manual Build

```bash
# 1. Install dependencies (推荐 bun，项目构建脚本依赖 bun)
bun install
# 如果使用 npm，必须加 --legacy-peer-deps：
#   npm install --legacy-peer-deps
# 原因：项目使用 react@19.3.0-canary，npm 的 semver 严格模式
# 认为 canary 预发布版本不满足 react-compiler-runtime 的
# peerDependency "^19"，会报依赖冲突。bun 无此问题。

# 2. Restore Anthropic internal SDKs (from sourcemap)
cp -r node_modules_sourcemap/@anthropic-ai/bedrock-sdk node_modules/@anthropic-ai/
cp -r node_modules_sourcemap/@anthropic-ai/vertex-sdk node_modules/@anthropic-ai/
cp -r node_modules_sourcemap/@anthropic-ai/foundry-sdk node_modules/@anthropic-ai/

# 3. Build
bun run build.ts
```

### Run

```bash
# Version check
node dist/cli.js --version    # → 2.1.88 (NERV CODE)

# Help
node dist/cli.js --help

# Interactive mode (must be in a real terminal — TTY required)
node dist/cli.js

# Pipe mode (requires API key)
ANTHROPIC_API_KEY=sk-ant-xxx node dist/cli.js -p 'hello'
```

> **Note**: Interactive mode requires a real terminal (Terminal.app, iTerm2, etc.). IDE integrated terminals may not work due to TTY detection. Set `CLAUDE_CODE_FORCE_INTERACTIVE=1` to force interactive mode.

---

## 第弐話: Architecture — MAGI System Configuration

```
┌─────────────────────────────────────────────────────────┐
│                    NERV CODE CLI                         │
│              src/entrypoints/cli.tsx                     │
├─────────────────────────────────────────────────────────┤
│  MELCHIOR-1          BALTHASAR-2         CASPER-3       │
│  ┌─────────────┐    ┌──────────────┐   ┌────────────┐  │
│  │ Conversation │    │    Tools     │   │  Services  │  │
│  │   Engine     │    │  (45 tools)  │   │            │  │
│  │             │    │              │   │  API       │  │
│  │ query.ts    │◄──►│ BashTool     │   │  MCP       │  │
│  │ QueryEngine │    │ FileEdit     │   │  Compact   │  │
│  │             │    │ AgentTool    │   │  Hooks     │  │
│  │             │    │ MCPTool      │   │  Auth      │  │
│  │             │    │ ...          │   │  ...       │  │
│  └─────────────┘    └──────────────┘   └────────────┘  │
├─────────────────────────────────────────────────────────┤
│                   Terminal Dogma                         │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │ REPL UI     │  │ Permissions  │  │ Settings      │  │
│  │ (React/Ink) │  │ (6 modes)    │  │ (5 levels)    │  │
│  └─────────────┘  └──────────────┘  └───────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Core Modules

| Module | Path | Role |
|--------|------|------|
| Bootstrap | `src/main.tsx` | CLI init, command routing |
| Conversation Engine | `src/query.ts` + `src/QueryEngine.ts` | Stateful async generator, streaming SSE |
| Tools | `src/tools/` (45 tools) | BashTool, FileEdit, AgentTool, MCPTool, etc. |
| Commands | `src/commands/` (80+ commands) | CLI commands (commit, review, config, etc.) |
| Components | `src/components/` | React (Ink) TUI components |
| Services | `src/services/` | API client, MCP, context compression |
| Constants | `src/constants/` | NERV-themed prompts, spinner verbs, figures |

### Multi-Agent System

Three agent types with EVA-inspired isolation levels:

| Type | Isolation | EVA Analogy |
|------|-----------|-------------|
| **SubAgent** | Full context isolation | Separate Entry Plug |
| **Fork** | Shared prompt cache | Dummy Plug System |
| **Teammate** | Independent process, file mailbox | Multi-EVA Sortie |

---

## 第参話: NERV Theming — The Test

All modifications are **cosmetic only** — no behavioral changes to Claude.

### Color System (`nerv-dark` theme)

| Token | Hex | Usage |
|-------|-----|-------|
| `nerv-red` | `#B7282E` | Primary brand, logo, accents |
| `nerv-red-light` | `#D4494F` | Hover states, shimmer |
| `terminal-black` | `#0A0A0C` | Primary background |
| `text-primary` | `#E8E6E3` | Main body text |
| `eva-purple` | `#6B3FA0` | Agent accent (Unit-01) |
| `eva-orange` | `#E87D2A` | Agent accent (Unit-00) |

### Hexagonal Motif

All diamond icons (`◇`/`◆`) replaced with hexagons (`⬡`/`⬢`), referencing AT Field geometry and MAGI's hexagonal display panels.

### MAGI Spinner Verbs (60+)

```
MAGI Analyzing...        Pattern Blue Scanning...     AT Field Calculating...
CASPER Processing...      BALTHASAR Evaluating...      MELCHIOR Reasoning...
Terminal Dogma Accessing... Entry Plug Connecting...   S2 Engine Initializing...
Dead Sea Scrolls Parsing... SEELE Protocol Decrypting... Eva Cage Preparing...
```

### Welcome Screen

Custom NERV emblem with fig leaf silhouette, rendered in NERV red. Greeting:

> *God's in his heaven. All's right with the world.*

---

## 作戦計画: Roadmap — Rebuild of NERV-CODE

| Phase | Version | Codename | Status | Description |
|-------|---------|----------|--------|-------------|
| **序** | 1.0.0 | You Are (Not) Alone | **CURRENT** | Initial open-source release. Source restoration + NERV theming. |
| **破** | 2.0.0 | You Can (Not) Advance | Planned | Extended theming (error screens, permission prompts, lifecycle messages). Plugin system. |
| **Q** | 3.0.0 | You Can (Not) Redo | Planned | Major refactoring. Custom MAGI consensus mode for multi-agent. |
| **終** | 3.0+1.0 | Thrice Upon a Time | Planned | Feature-complete. Stable release. Full NERV integration. |

---

## Project Structure

```
NERV-CODE/
├── src/                        # TypeScript source (1,884 files)
│   ├── entrypoints/cli.tsx     # CLI entry point
│   ├── main.tsx                # Bootstrap & command routing
│   ├── tools/                  # 45 tool implementations
│   ├── commands/               # 80+ CLI commands
│   ├── services/               # API, MCP, compression, etc.
│   ├── components/             # React (Ink) TUI components
│   ├── constants/              # NERV-themed prompts & verbs
│   └── utils/                  # Git, model, auth, settings
├── shims/                      # Build-time module shims
├── docs/                       # Documentation
├── .github/                    # Issue & PR templates
├── build.ts                    # Bun bundler configuration
├── install.sh                  # One-click install script
├── package.json                # Dependencies (84+)
└── tsconfig.json               # TypeScript configuration
```

---

## Build System

Uses **Bun Bundler** to compile TypeScript into a single ESM bundle via 4 custom plugins:

| Plugin | Purpose |
|--------|---------|
| `bun-bundle-shim` | Converts compile-time `feature()` to runtime `Set.has()` (78 feature flags) |
| `react-compiler-runtime` | Redirects `react/compiler-runtime` to npm package |
| `native-stubs` | Stubs 8 internal/native packages to empty modules |
| `text-loader` | Imports `.md`/`.txt` files as string exports |

See [docs/BUILD.md](docs/BUILD.md) for detailed build documentation.

---

## License

[MIT License](LICENSE)

**Important**: The original Claude Code source is copyright Anthropic, PBC. EVA/NERV references are a fan tribute — see [LICENSE](LICENSE) for full notices.

---

<p align="center">
  <b>NERV — God's in his heaven. All's right with the world.</b><br/>
  <sub>⬡ MELCHIOR-1: APPROVE ⬡ BALTHASAR-2: APPROVE ⬡ CASPER-3: APPROVE ⬡</sub>
</p>
