import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import OrderForm from './pages/OrderForm'
import Success from './pages/Success'

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/siparis">
        <OrderForm />
      </Route>
      <Route path="/onay">
        <Success />
      </Route>
    </Switch>
  )
}

export default App
