# ⚡ Pipeline Builder

A visual, drag-and-drop pipeline builder for creating AI workflows. Built with React and ReactFlow, this application allows users to design complex data pipelines by connecting modular nodes — similar to tools like VectorShift, n8n, and Zapier.

---

## 🎯 Purpose

Modern AI applications often require complex workflows that chain multiple operations together — data inputs, LLM calls, transformations, conditional logic, and outputs. **Pipeline Builder** provides an intuitive visual interface for designing these workflows without writing code.

### Why I Built This

- **Visual Programming**: Enable non-technical users to build AI pipelines through drag-and-drop
- **Modular Architecture**: Demonstrate clean component abstraction in React
- **Real-time Validation**: Ensure pipeline integrity with DAG (Directed Acyclic Graph) validation
- **Developer Experience**: Showcase modern frontend practices with clean, maintainable code

---

## ✨ Features

### 🧩 Node Abstraction System
- **Single `BaseNode` component** powers all 9 node types
- Adding new nodes requires only a config object — no code duplication
- Automatic handle positioning and label rendering

### 📝 Dynamic Text Node
- **Auto-resize**: Textarea expands as you type
- **Variable Detection**: Type `{{variableName}}` to create dynamic input handles
- **Real-time Parsing**: Uses regex to extract valid JavaScript variable names

### 🎨 Modern UI/UX
- Professional dark theme with gradient accents
- Color-coded node categories (Input, Output, AI, Processing, Logic)
- Smooth hover animations and visual feedback
- Responsive toolbar with grouped nodes

### 🔄 Backend Integration
- FastAPI backend for pipeline validation
- **DAG Detection**: Uses Kahn's algorithm to detect cycles
- Real-time feedback on pipeline structure

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks |
| **ReactFlow** | Node-based graph editor |
| **Zustand** | Lightweight state management |
| **CSS Modules** | Scoped, maintainable styling |

### Backend
| Technology | Purpose |
|------------|---------|
| **Python 3** | Backend runtime |
| **FastAPI** | High-performance API framework |
| **Pydantic** | Data validation |
| **Uvicorn** | ASGI server |

---

## 📁 Project Structure

```
pipeline-builder/
├── frontend/
│   ├── src/
│   │   ├── nodes/
│   │   │   ├── BaseNode.js        # Core abstraction component
│   │   │   ├── NodeStyles.module.css
│   │   │   ├── inputNode.js
│   │   │   ├── outputNode.js
│   │   │   ├── llmNode.js
│   │   │   ├── textNode.js        # Dynamic variable handles
│   │   │   ├── apiNode.js
│   │   │   ├── filterNode.js
│   │   │   ├── mergeNode.js
│   │   │   ├── conditionalNode.js
│   │   │   └── noteNode.js
│   │   ├── App.js
│   │   ├── store.js               # Zustand state management
│   │   ├── ui.js                  # ReactFlow canvas
│   │   ├── toolbar.js             # Draggable node palette
│   │   ├── submit.js              # Backend integration
│   │   └── index.css              # Global styles
│   └── package.json
│
├── backend/
│   └── main.py                    # FastAPI + DAG validation
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Python 3.8+
- npm or yarn

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/pipeline-builder.git
cd pipeline-builder
```

**2. Setup Frontend**
```bash
cd frontend
npm install
npm start
```
Frontend runs at `http://localhost:3000`

**3. Setup Backend**
```bash
cd backend
pip install fastapi uvicorn pydantic
uvicorn main:app --reload --port 8000
```
Backend runs at `http://localhost:8000`

---

## 🎮 Usage

### Building a Pipeline

1. **Drag nodes** from the toolbar onto the canvas
2. **Connect nodes** by dragging from output handles (right) to input handles (left)
3. **Configure nodes** using the input fields
4. **Submit** to validate your pipeline

### Text Node Variables

Type `{{variableName}}` in the Text node to create dynamic input handles:

```
Hello {{userName}}, welcome to {{companyName}}!
```
This creates two input handles: `userName` and `companyName`

### Pipeline Validation

Click **Submit Pipeline** to:
- Count total nodes and edges
- Verify the pipeline is a valid DAG (no cycles)
- Get instant feedback via alert

---

## 🧪 Node Types

| Node | Category | Inputs | Outputs | Description |
|------|----------|--------|---------|-------------|
| **Input** | I/O | 0 | 1 | Entry point for data |
| **Output** | I/O | 1 | 0 | Exit point for results |
| **LLM** | AI | 2 | 1 | Large Language Model processor |
| **Text** | Processing | Dynamic | 1 | Text with variable interpolation |
| **API** | Processing | 2 | 1 | HTTP request node |
| **Filter** | Processing | 1 | 1 | Data filtering |
| **Merge** | Processing | 3 | 1 | Combine multiple inputs |
| **Conditional** | Logic | 1 | 2 | If/else branching |
| **Note** | Utility | 0 | 0 | Documentation/comments |

---

## 🔍 Key Implementation Details

### BaseNode Abstraction

```jsx
// Creating a new node is this simple:
<BaseNode
  id={id}
  title="My Node"
  icon="⚡"
  category="processing"
  inputs={[{ id: 'in1', label: 'Data In' }]}
  outputs={[{ id: 'out1', label: 'Data Out' }]}
>
  {/* Custom content */}
</BaseNode>
```

### Variable Extraction Regex

```javascript
// Matches valid JS variable names inside {{ }}
const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
```

### DAG Validation (Kahn's Algorithm)

```python
# Topological sort to detect cycles
# If visited_count != total_nodes, there's a cycle
```

---

## 🚧 Future Enhancements

- [ ] Execute pipelines with actual data flow
- [ ] Save/load pipelines to localStorage or database
- [ ] Export pipeline as JSON
- [ ] More node types (Database, Email, Webhook)
- [ ] Undo/redo functionality
- [ ] Keyboard shortcuts
- [ ] Dark/Light theme toggle

---

## 📄 License

MIT License — feel free to use this project for learning or as a starting point for your own applications.

---

## 🙏 Acknowledgments

- [ReactFlow](https://reactflow.dev/) — Excellent node-based UI library
- [VectorShift](https://vectorshift.ai/) — Inspiration for the UI/UX
- [Zustand](https://zustand-demo.pmnd.rs/) — Simple yet powerful state management

---

## 👤 Author

**Deepak Thirukkumaran**

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)

---