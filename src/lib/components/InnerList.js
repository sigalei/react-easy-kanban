import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'

export default class InnerList extends React.Component {
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

InnerList.propTypes = {
  tasks: PropTypes.array.isRequired
}
