import React, { Component } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import './initial-data'
import Column from './Column'
import initialData from './initial-data'

const Container = styled.div`
  display: flex;
`

class InnerList extends React.PureComponent {
  render() {
    const { column, taskMap, index } = this.props
    const tasks = column.taskIds.map(taskId => taskMap[taskId])
    return <Column column={column} tasks={tasks} index={index} />
  }
}

class Kanban extends Component {
  state = initialData

  onDragEnd = result => {
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
      const newColumnOrder = Array.from(this.state.columnOrder)
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder
      }

      this.setState(newState)
      return
    }

    const home = this.state.columns[source.droppableId]
    const foreign = this.state.columns[destination.droppableId]

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
          ...this.state.columns,
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
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    this.setState(newState)
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId]
                return (
                  <InnerList
                    key={column.id}
                    column={column}
                    taskMap={this.state.tasks}
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

export default Kanban
