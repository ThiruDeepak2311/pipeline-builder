// mergeNode.js
// Merge node - combines multiple inputs into a single output

import { useState } from 'react';
import { BaseNode } from './Basenode';
import styles from './NodeStyles.module.css';

export const MergeNode = ({ id, data }) => {
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon="🔀"
      category="processing"
      inputs={[
        { id: 'input1', label: 'Input 1' },
        { id: 'input2', label: 'Input 2' },
        { id: 'input3', label: 'Input 3' }
      ]}
      outputs={[
        { id: 'merged', label: 'Merged' }
      ]}
    >
      <div className={styles.field}>
        <label className={styles.label}>Strategy</label>
        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          className={styles.select}
        >
          <option value="concat">Concatenate</option>
          <option value="join">Join with Separator</option>
          <option value="array">Create Array</option>
          <option value="object">Create Object</option>
        </select>
      </div>
      <p className={styles.description}>
        Combines multiple inputs into a single output using the selected strategy.
      </p>
    </BaseNode>
  );
};