// submit.js
// Submit button that sends pipeline to backend and displays results

import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import './submit.css';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://pipeline-builder-production.up.railway.app/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }

            const data = await response.json();
            
            // Display results in a user-friendly alert
            alert(
                `Pipeline Analysis\n` +
                `━━━━━━━━━━━━━━━━━━━━━\n` +
                `📊 Number of Nodes: ${data.num_nodes}\n` +
                `🔗 Number of Edges: ${data.num_edges}\n` +
                `✅ Is Valid DAG: ${data.is_dag ? 'Yes' : 'No'}\n` +
                `━━━━━━━━━━━━━━━━━━━━━\n` +
                `${data.is_dag 
                    ? '✨ Your pipeline has no cycles!' 
                    : '⚠️ Warning: Your pipeline contains a cycle!'}`
            );

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert('Error: Could not connect to backend. Make sure the server is running on port 8000.');
        }
    };

    return (
        <div className="submit-container">
            <button type="button" className="submit-button" onClick={handleSubmit}>
                <span className="submit-icon">🚀</span>
                <span className="submit-text">Submit Pipeline</span>
            </button>
        </div>
    );
};