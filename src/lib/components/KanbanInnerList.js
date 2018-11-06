import React from 'react'
import Proptypes from 'prop-types'
import Column from './Column'

export default class KanbanInnerList extends React.PureComponent {
  render() {
    const {
      column,
      taskMap,
      index,
      columnHeaderStyle,
      columnContentStyle,
      taskContentStyle
    } = this.props
    const tasks = column.taskIds.map(taskId => taskMap[taskId])
    return (
      <Column
        column={column}
        tasks={tasks}
        index={index}
        columnHeaderStyle={columnHeaderStyle}
        columnContentStyle={columnContentStyle}
        taskContentStyle={taskContentStyle}
      />
    )
  }
}

KanbanInnerList.propTypes = {
  column: Proptypes.object.isRequired,
  taskMap: Proptypes.object.isRequired,
  index: Proptypes.number.isRequired,
  columnHeaderStyle: Proptypes.object,
  columnContentStyle: Proptypes.object,
  taskContentStyle: Proptypes.object
}

KanbanInnerList.defaultProps = {
  columnHeaderStyle: {},
  columnContentStyle: {},
  taskContentStyle: {}
}
