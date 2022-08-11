import React, {createContext, useContext, useState} from "react";

 const ShopContext = createContext();

export const StateContext = ( {children} ) =>{
    //Add our data for the state
    const [qty, setQty] = useState(1);
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    /*Functions*/

    //Increase product quantity
    const increaseQty = () => {
        setQty((prevQty) => prevQty + 1); 
    }

    //Decrease product quantity
    const decreaseQty = () => {
        setQty((prevQty) => {
            if(prevQty -1 < 1) return 1;
            return prevQty -1;  
            
            }
        )

    }
 
    //Add product to cart
    const onAdd = (product, quantity) => {

        //Total Price
        setTotalPrice(prevTotal => prevTotal + product.price * quantity);

        //Increse total quantity
        setTotalQuantities(prevTotal => prevTotal + quantity); //set the total qty to whatever the previous total was. (i can call it the way I prefer)

        //Check if the product is already in the cart
        const exist = cartItems.find((item) => item.slug === product.slug);

        if (exist) {
            setCartItems(
                cartItems.map((item) => 
                    item.slug === product.slug //if is in there
                    ? {...exist, quantity: exist.quantity + quantity} //update the qty existing adding the new one and leave the rest untouched
                     : item
                )
            ); 
        }
        else { 
            setCartItems([...cartItems, {...product, quantity: quantity}]); //add the new product with the quantity
        }
    
    }



    //Remove Products
    const onRemove = (product) => {

        //Total Price
        setTotalPrice(prevTotal => prevTotal - product.price);
        
        //Decrese total quantity
        setTotalQuantities(prevTotal => prevTotal - 1); 

        //Check if the product is already in the cart
        const exist = cartItems.find((item) => item.slug === product.slug);

        if(exist.quantity === 1){
            setCartItems(cartItems.filter((item) => item.slug !== product.slug));
        }
        else{
            setCartItems(cartItems.map((item) => item.slug === product.slug ? {...exist, quantity: exist.quantity - 1} : item ));
        }
    }

    return(
        <ShopContext.Provider 
            value ={ { 
                qty, 
                increaseQty, 
                decreaseQty, 
                showCart, 
                setShowCart, 
                cartItems, 
                onAdd, 
                onRemove, 
                totalQuantities, 
                totalPrice, 
                setQty,
                } }>

            {children}

        </ShopContext.Provider>
    )
}



export const useStateContext = () => useContext(ShopContext);   