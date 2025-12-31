// noteNode.js
// Note node - a simple comment/documentation node with no connections

import { useState } from 'react';
import { BaseNode } from './Basenode';
import styles from './NodeStyles.module.css';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');

  return (
    <BaseNode
      id={id}
      title="Note"
      icon="📌"
      category="utility"
      inputs={[]}
      outputs={[]}
    >
      <div className={styles.field}>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className={styles.textarea}
          placeholder="Add notes or comments about your pipeline..."
          rows={4}
        />
      </div>
    </BaseNode>
  );
};