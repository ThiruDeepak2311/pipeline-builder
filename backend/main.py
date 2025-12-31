# main.py
# Backend for Pipeline Builder - parses pipeline and checks for DAG

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Check if the graph is a DAG (Directed Acyclic Graph)
    is_dag = check_dag(nodes, edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }

def check_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Check if the graph is a DAG using Kahn's algorithm (topological sort).
    Returns True if it's a valid DAG (no cycles), False otherwise.
    """
    if not nodes:
        return True
    
    # Build adjacency list and in-degree count
    node_ids = {node['id'] for node in nodes}
    in_degree = {node_id: 0 for node_id in node_ids}
    adjacency = {node_id: [] for node_id in node_ids}
    
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        
        # Skip if source or target not in our nodes
        if source not in node_ids or target not in node_ids:
            continue
            
        adjacency[source].append(target)
        in_degree[target] += 1
    
    # Kahn's algorithm
    # Start with nodes that have no incoming edges
    queue = [node_id for node_id, degree in in_degree.items() if degree == 0]
    visited_count = 0
    
    while queue:
        current = queue.pop(0)
        visited_count += 1
        
        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we visited all nodes, it's a DAG (no cycles)
    return visited_count == len(node_ids)