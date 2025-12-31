// BaseNode.js
// A reusable abstraction for all pipeline nodes
// This component handles the common structure: container, header, handles, and content area

import { Handle, Position } from 'reactflow';
import styles from './NodeStyles.module.css';

/**
 * BaseNode - The foundation component for all nodes
 * 
 * @param {string} id - Unique node ID (passed by ReactFlow)
 * @param {string} title - Display title in the header
 * @param {string} icon - Emoji or icon to show in header
 * @param {Array} inputs - Array of input handle configs: [{ id: string, label?: string, style?: object }]
 * @param {Array} outputs - Array of output handle configs: [{ id: string, label?: string, style?: object }]
 * @param {React.ReactNode} children - The custom content to render inside the node
 * @param {string} category - Category for color coding: 'input', 'output', 'processing', 'ai', 'utility'
 */
export const BaseNode = ({ 
  id, 
  title, 
  icon,
  inputs = [], 
  outputs = [], 
  children,
  category = 'utility'
}) => {
  
  // Calculate handle positions to distribute them evenly
  const getHandleTopPosition = (index, total) => {
    if (total === 1) return '50%';
    const spacing = 100 / (total + 1);
    return `${spacing * (index + 1)}%`;
  };

  return (
    <div className={`${styles.baseNode} ${styles[category]}`}>
      {/* Header Section */}
      <div className={styles.header}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.title}>{title}</span>
      </div>

      {/* Input Handles (Left Side) */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${input.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          className={styles.handle}
          style={{ 
            top: getHandleTopPosition(index, inputs.length),
            ...input.style 
          }}
        />
      ))}

      {/* Output Handles (Right Side) */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${output.id}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          className={styles.handle}
          style={{ 
            top: getHandleTopPosition(index, outputs.length),
            ...output.style 
          }}
        />
      ))}

      {/* Handle Labels - Input Side */}
      {inputs.length > 0 && inputs.some(input => input.label) && (
        <div className={styles.inputLabels}>
          {inputs.map((input, index) => (
            input.label && (
              <span 
                key={`label-${input.id}`}
                className={styles.handleLabel}
                style={{ top: getHandleTopPosition(index, inputs.length) }}
              >
                {input.label}
              </span>
            )
          ))}
        </div>
      )}

      {/* Handle Labels - Output Side */}
      {outputs.length > 0 && outputs.some(output => output.label) && (
        <div className={styles.outputLabels}>
          {outputs.map((output, index) => (
            output.label && (
              <span 
                key={`label-${output.id}`}
                className={styles.handleLabel}
                style={{ top: getHandleTopPosition(index, outputs.length) }}
              >
                {output.label}
              </span>
            )
          ))}
        </div>
      )}

      {/* Content Section */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default BaseNode;