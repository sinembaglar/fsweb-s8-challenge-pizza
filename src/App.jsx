import { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import OrderForm from './pages/OrderForm'
import Success from './pages/Success'

function App() {
  const [order, setOrder] = useState(null)

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/siparis">
        <OrderForm onOrderSuccess={setOrder} />
      </Route>
      <Route path="/onay">
        <Success order={order} />
      </Route>
    </Switch>
  )
}

export default App
