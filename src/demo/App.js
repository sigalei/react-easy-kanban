import React from 'react'
import data from './initial-data'
import Kanban from '../lib'

const App = () => (
  <div>
    <Kanban
      columns={data.columns}
      tasks={data.tasks}
      columnsOrder={data.columnsOrder}
    />
  </div>
)

export default App
