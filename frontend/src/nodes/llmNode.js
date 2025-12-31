// llmNode.js
// LLM node - represents a Large Language Model processor

import { BaseNode } from './Basenode';
import styles from './NodeStyles.module.css';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      category="ai"
      inputs={[
        { id: 'system', label: 'System' },
        { id: 'prompt', label: 'Prompt' }
      ]}
      outputs={[
        { id: 'response', label: 'Response' }
      ]}
    >
      <p className={styles.description}>
        Processes input using a Large Language Model. Connect a system prompt and user prompt to generate a response.
      </p>
    </BaseNode>
  );
};