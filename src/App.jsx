import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import OrderPizza from './components/OrderPizza'
import Success from './components/Success'

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/siparis">
        <OrderPizza />
      </Route>
      <Route path="/onay">
        <Success />
      </Route>
    </Switch>
  )
}

export default App
