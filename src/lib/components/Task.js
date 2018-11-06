import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import Input from './Input'

const Container = styled.div`
  color: ${props => props.taskContentStyle.margin || 'inherit'};
  margin: ${props => props.taskContentStyle.margin || '8px'};
  border: ${props => props.taskContentStyle.border || '1px solid lightgrey'};
  border-radius: ${props => props.taskContentStyle.borderRadius || '10px'};
  padding: ${props => props.taskContentStyle.padding || '20px'};
  width: auto;
  min-height: ${props => props.taskContentStyle.minHeight || '60px'};
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${props =>
    props.isDragging
      ? '#f9c8d9'
      : props.taskContentStyle.backgroundColor || 'lightblue'};
  box-shadow: ${props =>
    props.isDragging
      ? '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);'
      : props.taskContentStyle.boxShadow ||
        '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'};
`

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...this.props }
    this.input = React.createRef()
  }
  handleClick = event => {
    event.preventDefault()
    this.input.current.setState({
      status: true
    })
  }
  handleChange = value => {
    const newState = {
      ...this.state
    }

    newState.task.content = value
    this.setState({ ...newState })
  }

  render() {
    const { taskContentStyle } = this.props
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
            onClick={this.handleClick}
            isDragging={snapshot.isDragging}
            taskContentStyle={taskContentStyle}
          >
            <Input
              ref={this.input}
              value={this.props.task.content}
              onChange={this.handleChange}
            />
          </Container>
        )}
      </Draggable>
    )
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  taskContentStyle: PropTypes.object
}

Task.defaultProps = {
  taskContentStyle: {}
}
