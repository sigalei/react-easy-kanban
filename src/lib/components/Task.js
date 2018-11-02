import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import Input from './Input'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 20px;
  background-color: ${props =>
    props.isDragDisabled
      ? 'lightgrey'
      : props.isDragging
        ? '#f9c8d9'
        : 'lightblue'};
  box-shadow: ${props =>
    props.isDragging
      ? '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);'
      : '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'};
`

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...this.props }
  }

  handleChange = value => {
    const newState = {
      ...this.state
    }
  
    newState.task.content = value
    this.setState({ ...newState })
  }

  render() {
    const isDragDisabled = this.props.task.disabled

    return (
      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Input
              value={this.props.task.content}
              onChange={this.handleChange}
              color='black' 
              />
          </Container>
        )}
      </Draggable>
    )
  }
}
