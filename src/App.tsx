import Products from "./components/Products";
import Cart from "./components/Cart";
import "./reset.css"
import './App.css'

function App() {

  return (
    <div className='app'>
      <header></header>
      <main className='app-wrapper'>
        <Products/>
        <Cart/>
      </main>
    </div>
  )
}

export default App
