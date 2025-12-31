// inputNode.js
// Input node - entry point for data into the pipeline

import { useState } from 'react';
import { BaseNode } from './Basenode';
import styles from './NodeStyles.module.css';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="📥"
      category="input"
      inputs={[]}
      outputs={[{ id: 'value' }]}
    >
      <div className={styles.field}>
        <label className={styles.label}>Name</label>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          className={styles.input}
          placeholder="Enter input name"
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Type</label>
        <select 
          value={inputType} 
          onChange={handleTypeChange}
          className={styles.select}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};