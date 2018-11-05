import React, { Component, ReactElement } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class BinarySearchQuestion extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provider, snapshot): any => (
            <div ref={provider.innerRef}>
              <Draggable key="1" draggableId="1" index={1}>
                {(provider, snapshot): any => (
                  <div
                    ref={provider.innerRef}
                    {...provider.draggableProps}
                    {...provider.dragHandleProps}
                  >
                    Hello world
                  </div>
                )}
              </Draggable>

              <Draggable key="2" draggableId="2" index={2}>
                {(provider, snapshot): any => (
                  <div
                    ref={provider.innerRef}
                    {...provider.draggableProps}
                    {...provider.dragHandleProps}
                  >
                    Hello world
                  </div>
                )}
              </Draggable>

              {provider.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default BinarySearchQuestion;
