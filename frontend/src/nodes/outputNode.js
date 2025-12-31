// outputNode.js
// Output node - exit point for data from the pipeline

import { useState } from 'react';
import { BaseNode } from './Basenode';
import styles from './NodeStyles.module.css';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      category="output"
      inputs={[{ id: 'value' }]}
      outputs={[]}
    >
      <div className={styles.field}>
        <label className={styles.label}>Name</label>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          className={styles.input}
          placeholder="Enter output name"
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Type</label>
        <select 
          value={outputType} 
          onChange={handleTypeChange}
          className={styles.select}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};