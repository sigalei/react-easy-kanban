import React from 'react'
import data from './initial-data'
import Kanban from '../lib'

const App = () => (
  <div>
    <Kanban
      columns={data.columns}
      tasks={data.tasks}
      columnsOrder={data.columnsOrder}
      columnHeaderStyle={{ backgroundColor: '#2196f3', color: 'white' }}
      columnContentStyle={{ backgroundColor: '#EEEEEE' }}
      taskContentStyle={{ backgroundColor: 'white' }}
    />
  </div>
)

export default App
