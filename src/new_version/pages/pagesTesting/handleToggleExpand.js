import React, { useState } from 'react';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import { Box, IconButton, List, ListItem, ListItemText, Collapse, Typography } from '@mui/material';
import { DragIndicator, ExpandMore, ExpandLess } from '@mui/icons-material';

const DraggableList = ({ items = [] }) => {
  const [currentItems, setCurrentItems] = useState(items);
  const [expandedItems, setExpandedItems] = useState([]);

  const handleToggleExpand = (index) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(currentItems);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setCurrentItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <List {...provided.droppableProps} ref={provided.innerRef}>
            {currentItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{ borderBottom: '1px solid #ccc', mb: 1 }}
                  >
                    <ListItem
                      secondaryAction={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            {item.status}
                          </Typography>
                          <IconButton onClick={() => handleToggleExpand(index)}>
                            {expandedItems.includes(index) ? <ExpandLess /> : <ExpandMore />}
                          </IconButton>
                        </Box>
                      }
                    >
                      <IconButton {...provided.dragHandleProps}>
                        <DragIndicator />
                      </IconButton>
                      <ListItemText primary={item.name} />
                    </ListItem>
                    <Collapse in={expandedItems.includes(index)} timeout="auto" unmountOnExit>
                      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                        {item.description}
                      </Box>
                    </Collapse>
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
