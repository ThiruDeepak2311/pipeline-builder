// filterNode.js
// Filter node - filters data based on conditions

import { useState } from 'react';
import { BaseNode } from './Basenode';
import styles from './NodeStyles.module.css';

export const FilterNode = ({ id, data }) => {
  const [field, setField] = useState(data?.field || '');
  const [operator, setOperator] = useState(data?.operator || 'equals');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      category="processing"
      inputs={[
        { id: 'data', label: 'Data In' }
      ]}
      outputs={[
        { id: 'filtered', label: 'Filtered' }
      ]}
    >
      <div className={styles.field}>
        <label className={styles.label}>Field</label>
        <input
          type="text"
          value={field}
          onChange={(e) => setField(e.target.value)}
          className={styles.input}
          placeholder="e.g., name, age, status"
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Operator</label>
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          className={styles.select}
        >
          <option value="equals">Equals</option>
          <option value="not_equals">Not Equals</option>
          <option value="contains">Contains</option>
          <option value="greater_than">Greater Than</option>
          <option value="less_than">Less Than</option>
          <option value="is_empty">Is Empty</option>
        </select>
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Value</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={styles.input}
          placeholder="Compare value"
        />
      </div>
    </BaseNode>
  );
};