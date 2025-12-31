// toolbar.js
// Styled toolbar with grouped nodes and icons

import { DraggableNode } from './draggableNode';
import './toolbar.css';

export const PipelineToolbar = () => {
    return (
        <div className="toolbar">
            <div className="toolbar-header">
                <div className="toolbar-logo">
                    <span className="logo-icon">⚡</span>
                    <span className="logo-text">Pipeline Builder</span>
                </div>
                <div className="toolbar-subtitle">Drag nodes to canvas to build your pipeline</div>
            </div>
            
            <div className="toolbar-nodes">
                {/* Input/Output Group */}
                <div className="node-group">
                    <div className="group-label">I/O</div>
                    <div className="group-nodes">
                        <DraggableNode type='customInput' label='Input' icon='📥' />
                        <DraggableNode type='customOutput' label='Output' icon='📤' />
                    </div>
                </div>

                {/* AI Group */}
                <div className="node-group">
                    <div className="group-label">AI</div>
                    <div className="group-nodes">
                        <DraggableNode type='llm' label='LLM' icon='🤖' />
                    </div>
                </div>

                {/* Processing Group */}
                <div className="node-group">
                    <div className="group-label">Processing</div>
                    <div className="group-nodes">
                        <DraggableNode type='text' label='Text' icon='📝' />
                        <DraggableNode type='api' label='API' icon='🌐' />
                        <DraggableNode type='filter' label='Filter' icon='🔍' />
                        <DraggableNode type='merge' label='Merge' icon='🔀' />
                    </div>
                </div>

                {/* Logic Group */}
                <div className="node-group">
                    <div className="group-label">Logic</div>
                    <div className="group-nodes">
                        <DraggableNode type='conditional' label='Conditional' icon='⚡' />
                        <DraggableNode type='note' label='Note' icon='📌' />
                    </div>
                </div>
            </div>
        </div>
    );
};