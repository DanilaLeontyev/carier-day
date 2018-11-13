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

interface IAlgorithmProps {
  items: dragItem[];
  onSubmitTask(result: boolean): void;
  onSaveItems(items: dragItem[]): void;
}

function shuffle(array: dragItem[]) {
  let newArray = [...array];
  let currentIndex = newArray.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
}

const data = [
  {
    id: '1',
    content: 'function binarySearch(value, list[])'
  },
  {
    id: '2',
    content: 'start <- 0; stop <- list.len - 1;'
  },
  {
    id: '3',
    content: 'while (start <= stop)'
  },
  {
    id: '4',
    content: 'middle <- (start + stop) / 2'
  },
  {
    id: '5',
    content: 'if (value = list[middle])'
  },
  {
    id: '6',
    content: 'return middle'
  },
  {
    id: '7',
    content: 'else if(value < list[middle])'
  },
  {
    id: '8',
    content: 'stop <- middle - 1;'
  },
  {
    id: '9',
    content: 'else start <- middle + 1'
  },
  {
    id: '10',
    content: 'return -1'
  }
];

class Algorithm extends Component<IAlgorithmProps, IAlgorithmState> {
  constructor(props: IAlgorithmProps) {
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

    this.props.onSaveItems(this.state.items);
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

  checkResult = () => {
    return JSON.stringify(this.state.items) === JSON.stringify(data);
  };

  render() {
    return (
      <div className="Algorithm">
        <p className="Algorithm--text">
          Перемести строки так, чтобы из этого получился алгоритм бинарного
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

  componentDidMount() {
    if (this.props.items.length > 0) {
      this.setState(state => ({
        ...state,
        items: this.props.items
      }));
    }
  }

  componentWillUnmount() {
    this.props.onSubmitTask(this.checkResult());
  }
}

export default Algorithm;
