
import { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    useEffect(() => {
        let existingCartProduct = localStorage.getItem("cart")
        existingCartProduct = JSON.parse(existingCartProduct)
        if (existingCartProduct) {
            setCart(existingCartProduct);
        }
        // eslint-disable-next-line
    }, [])
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}
//custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider }