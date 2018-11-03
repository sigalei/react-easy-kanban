import React, { Component } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import KanbanInnerList from './KanbanInnerList'

const Container = styled.div`
  display: flex;
`

class Kanban extends Component {
  constructor(props) {
    super(props)
    this.state = { ...this.props }
  }
  onDragEnd = result => {
    const { columnsOrder, columns } = this.state
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if (type === 'column') {
      const newColumnsOrder = Array.from(columnsOrder)
      newColumnsOrder.splice(source.index, 1)
      newColumnsOrder.splice(destination.index, 0, draggableId)
      const newState = {
        ...this.state,
        columnsOrder: newColumnsOrder
      }

      this.setState(newState)
      return
    }

    const home = columns[source.droppableId]
    const foreign = columns[destination.droppableId]

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...home,
        taskIds: newTaskIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...columns,
          [newColumn.id]: newColumn
        }
      }

      this.setState(newState)
      return
    }

    const startTaskIds = Array.from(home.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...home,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(foreign.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...foreign,
      taskIds: finishTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    this.setState(newState)
  }

  render() {
    const { columnsOrder, tasks, columns } = this.state

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {columnsOrder.map((columnId, index) => {
                const column = columns[columnId]
                return (
                  <KanbanInnerList
                    key={column.id}
                    column={column}
                    taskMap={tasks}
                    index={index}
                  />
                )
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

Kanban.propTypes = {
  tasks: PropTypes.object,
  columns: PropTypes.object.isRequired,
  columnsOrder: PropTypes.array.isRequired
}

Kanban.defaultProps = {
  tasks: {}
}

export default Kanban
