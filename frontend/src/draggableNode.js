// draggableNode.js
// Draggable node component for the toolbar with icons and styling

import './draggableNode.css';

export const DraggableNode = ({ type, label, icon }) => {
    const onDragStart = (event, nodeType) => {
        const appData = { nodeType };
        event.target.style.cursor = 'grabbing';
        event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            className="draggable-node"
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={(event) => (event.target.style.cursor = 'grab')}
            draggable
        >
            {icon && <span className="draggable-node-icon">{icon}</span>}
            <span className="draggable-node-label">{label}</span>
        </div>
    );
};