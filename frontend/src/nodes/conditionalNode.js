// conditionalNode.js
// Conditional node - routes data based on conditions (if/else branching)

import { useState } from 'react';
import { BaseNode } from './Basenode';
import styles from './NodeStyles.module.css';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');

  return (
    <BaseNode
      id={id}
      title="Conditional"
      icon="⚡"
      category="utility"
      inputs={[
        { id: 'value', label: 'Value' }
      ]}
      outputs={[
        { id: 'true', label: 'True' },
        { id: 'false', label: 'False' }
      ]}
    >
      <div className={styles.field}>
        <label className={styles.label}>Condition</label>
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className={styles.input}
          placeholder="e.g., value > 10"
        />
      </div>
      <p className={styles.description}>
        Routes data to True or False output based on the condition result.
      </p>
    </BaseNode>
  );
};