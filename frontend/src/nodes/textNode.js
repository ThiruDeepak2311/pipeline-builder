import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import styles from './NodeStyles.module.css';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Regex to match valid JS variable names inside {{ }}
  // Valid: {{name}}, {{user_name}}, {{$var}}, {{_private}}
  // Invalid: {{123}}, {{my-var}}, {{my var}}
  const extractVariables = (text) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      // Only add unique variable names
      if (!matches.includes(match[1])) {
        matches.push(match[1]);
      }
    }
    
    return matches;
  };

  // Update variables whenever text changes
  useEffect(() => {
    const vars = extractVariables(currText);
    setVariables(vars);
  }, [currText]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Set height to scrollHeight (minimum 60px)
      textarea.style.height = `${Math.max(60, textarea.scrollHeight)}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Calculate handle positions for dynamic variables
  const getHandleTopPosition = (index, total) => {
    if (total === 1) return '50%';
    const spacing = 100 / (total + 1);
    return `${spacing * (index + 1)}%`;
  };

  return (
    <div className={`${styles.baseNode} ${styles.processing}`} style={{ minWidth: '280px' }}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.icon}>📝</span>
        <span className={styles.title}>Text</span>
      </div>

      {/* Dynamic Input Handles for Variables */}
      {variables.map((variable, index) => (
        <Handle
          key={`var-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          className={styles.handle}
          style={{ top: getHandleTopPosition(index, variables.length) }}
        />
      ))}

      {/* Variable Labels */}
      {variables.length > 0 && (
        <div className={styles.inputLabels}>
          {variables.map((variable, index) => (
            <span
              key={`label-${variable}`}
              className={styles.handleLabel}
              style={{ top: getHandleTopPosition(index, variables.length) }}
            >
              {variable}
            </span>
          ))}
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className={styles.handle}
        style={{ top: '50%' }}
      />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.field}>
          <label className={styles.label}>Text</label>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            className={styles.textarea}
            placeholder="Enter text or use {{variable}} syntax"
            style={{ 
              minHeight: '60px',
              resize: 'none',
              overflow: 'hidden'
            }}
          />
        </div>
        
        {/* Variable hint */}
        {variables.length > 0 && (
          <div className={styles.description}>
            Variables: {variables.map(v => `{{${v}}}`).join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};