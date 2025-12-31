// apiNode.js
// API Request node - makes HTTP requests to external APIs

import { useState } from 'react';
import { BaseNode } from './Basenode';
import styles from './NodeStyles.module.css';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      title="API Request"
      icon="🌐"
      category="processing"
      inputs={[
        { id: 'headers', label: 'Headers' },
        { id: 'body', label: 'Body' }
      ]}
      outputs={[
        { id: 'response', label: 'Response' }
      ]}
    >
      <div className={styles.field}>
        <label className={styles.label}>Method</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className={styles.select}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
      </div>
      <div className={styles.field}>
        <label className={styles.label}>URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.input}
          placeholder="https://api.example.com/endpoint"
        />
      </div>
    </BaseNode>
  );
};