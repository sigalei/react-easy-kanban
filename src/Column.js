import React from 'react'
import styled from 'styled-components'
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Input from './Input'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  background-color: #000;
  padding: 20px;
`

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2 ease;
  flex-grow: 1;
  min-height: 100px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : '#eeeeee')};
`

class InnerList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false
    }
    return true
  }
  render() {
    return this.props.tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ))
  }
}

export default class Column extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...this.props }
  }

  handleChange = value => {
    const newState = {
      ...this.state
    }

    newState.column.title = value
    this.setState({ ...newState })
  }

  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {provided => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Header {...provided.dragHandleProps}>
              <Input
                value={this.state.column.title}
                onChange={this.handleChange}
              />
            </Header>
            <Droppable droppableId={this.props.column.id} type="task">
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList tasks={this.props.tasks} />
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    )
  }
}
