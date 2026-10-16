import { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import OrderPizza from './components/OrderPizza'
import Success from './components/Success'

function App() {
  const [siparis, setSiparis] = useState(null)

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/siparis">
        <OrderPizza onSiparisAlindi={setSiparis} />
      </Route>
      <Route path="/onay">
        <Success siparis={siparis} />
      </Route>
    </Switch>
  )
}

export default App
