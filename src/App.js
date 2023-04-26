import { useState } from "react";
import Cart from "./Componets/Cart/Cart";
import Header from "./Componets/Layout/Header";
import Meals from "./Componets/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {

  const [isShownCart, setShownCart] = useState(false);

  const showCartHandler = () => {
    setShownCart(true);
  }

  const hideCartHandler = () => {
    setShownCart(false);
  }
  return (
    <CartProvider>
    {isShownCart && <Cart onClose={hideCartHandler}/>}
     <Header  onCartShow={showCartHandler}/>
     <main>
      <Meals />
     </main>
    </CartProvider>
  );
}

export default App;
