import React, { useState } from 'react';

import { useDrag, useDrop } from 'react-dnd';

const DraggableBox = ({ id, text }) => {
    const [{ isDragging }, dragRef] = useDrag({
      type: 'BOX',
      item: { id, text },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    });
  
    return (
      <div
        ref={dragRef}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
          padding: '8px',
          border: '1px solid #ccc',
          backgroundColor: 'white',
        }}
      >
        {text}
      </div>
    );
  };

  const DroppableTarget = ({ droppedItems, onDrop }) => {
    const [{ isOver }, dropRef] = useDrop({
      accept: 'BOX',
      drop: (item) => onDrop(item),
      collect: monitor => ({
        isOver: monitor.isOver(),
      }),
    });
  
    return (
      <div
        ref={dropRef}
        style={{
          width: '300px',
          height: '300px',
          border: '2px dashed #ccc',
          backgroundColor: isOver ? '#f0f0f0' : 'white',
          padding: '10px',
        }}
      >
        <p>{isOver ? 'Release to drop' : 'Drag a box here'}</p>
        {droppedItems.map((item, index) => (
          <div key={index} style={{ marginTop: '5px' }}>
            {item.text}
          </div>
        ))}
      </div>
    );
  };

  
const Dnd = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDrop = (item) => {
    setDroppedItems(prevItems => [...prevItems, item]);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
    <div>
      <DroppableTarget droppedItems={droppedItems} onDrop={handleDrop} />
    </div>
    <div>
      <DraggableBox id={1} text="Item 1" />
      <DraggableBox id={2} text="Item 2" />
      <DraggableBox id={3} text="Item 3" />
    </div>
  </div>
  );
};

export default Dnd;
