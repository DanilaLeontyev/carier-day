import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Algorithm.css';

interface dragItem {
  id: string;
  content: string;
}

interface IAlgorithmState {
  items: dragItem[];
}

function shuffle(array: dragItem[]) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const data = [
  {
    id: '1',
    content: 'function binarySearch(value, array[])'
  },
  {
    id: '2',
    content: `start <- 0; stop <- list.len - 1; `
  },
  {
    id: '3',
    content: 'while (start <= stop)'
  },
  {
    id: '4',
    content: 'if (value = list[middle]'
  },
  {
    id: '5',
    content: 'return middle'
  },
  {
    id: '6',
    content: 'else if(value < list[middle]'
  },
  {
    id: '7',
    content: 'stop <- middle - 1'
  },
  {
    id: '8',
    content: 'middle <- (start + stop) / 2'
  },
  {
    id: '9',
    content: 'else return start <- middle + 1'
  },
  {
    id: '10',
    content: 'return -1'
  }
];

class Algorithm extends Component<any, IAlgorithmState> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: shuffle(data)
    };
  }

  onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  };

  reorder = (
    list: dragItem[],
    startIndex: number,
    endIndex: number
  ): dragItem[] => {
    const result: dragItem[] = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  render() {
    return (
      <div className="Algorithm">
        <p className="Algorithm--text">
          Расположите строки так, чтобы из этого получился алгоритм бинарного
          поиска
        </p>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} className="Algorithm--dropZone">
                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="Algorithm--dragItem"
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default Algorithm;
