import React from 'react';
import { ListGroup } from 'react-bootstrap';

function Sidebar({ selectedTool, setSelectedTool }) {
  const tools = ['Crop', 'Resize', 'Compress'];

  return (
    <ListGroup variant="flush">
      {tools.map((tool) => (
        <ListGroup.Item
          key={tool}
          action
          active={selectedTool === tool}
          onClick={() => setSelectedTool(tool)}
          className="bg-dark text-light border-0"
        >
          {tool}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Sidebar;