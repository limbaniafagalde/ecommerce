import { useStateContext } from "../lib/context";
import { Quantity } from "../styles/ProductDetails";
import { CartWrapper, CartStyle, Card, CardInfo, EmptyStyle, CheckOut, Cards } from "../styles/CartStyle";
import {FaShoppingCart} from "react-icons/fa";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import getStripe from "../lib/getStripe";

//Animation Variants

//parent
const cards = {
    hidden: {opacity: 1},
    show : {
        opacity: 1,
        transition: {
            delayChildren: 0.4,
            staggerChildren: 0.1,
        }
    }
}

//child
const card = {
    hidden : { opacity: 0, scale: 0.8 },  
    show : { opacity: 1, scale: 1, }        
}


export default function Cart () {

    const { cartItems, setShowCart, onAdd, onRemove, totalPrice } = useStateContext();

    //Payment
    const handleCheckout = async () => {
        const stripePromise = await getStripe();
        const response = await fetch("/api/stripe", {
            method: "POST",
            headers: {
             'Content-Type' : "application/json",
            },
            body: JSON.stringify(cartItems),
        }); //object

        const data = await response.json();

        await stripePromise.redirectToCheckout({ sessionId: data.id });
    };

    return(
        <CartWrapper 
            initial = {{ opacity: 0 }}        
            animate = {{ opacity: 1 }}
            exit = {{ opacity: 0 }}
            onClick={()=> setShowCart(false)}
        >
            <CartStyle 
            initial = {{ x: "50%" }}
            animate = {{ x: "0%" }}            
            exit = {{ x: "50%" }}
            transition = {{type: "tween"}}
            onClick = {(e)=> e.stopPropagation()}
            >
                {cartItems.length < 1 && (
                    <EmptyStyle
                        animate = {{ opacity: 1, scale: 1 }}
                        initial = {{ opacity: 0, scale: 0.8 }}   
                        transition = {{ delay: 0.2 }}   
                    >                   
                        <h1>You have more shopping to do</h1>
                        <FaShoppingCart/>
                    </EmptyStyle>
                )}

                <Cards layout variants= {cards} animate= "show" initial = "hidden" >
                    {cartItems.length >= 1 && 
                        cartItems.map((item) => {
                            return(
                                <Card layout variants = {card} key={item.slug}>
                                    <img src={item.image.data.attributes.formats.thumbnail.url} alt={item.title} />
                                    <CardInfo>
                                        <h3>{item.title}</h3>
                                        <h3>{item.price}$</h3>
                                        <Quantity>
                                            <span>Quantity</span>
                                            <button onClick = {() => onRemove(item)}>
                                                <AiFillMinusCircle/>
                                            </button>
                                            <p>{item.quantity}</p>
                                            <button onClick = {() => onAdd(item, 1)}>
                                                <AiFillPlusCircle/>
                                            </button>
                                        </Quantity>
                                    </CardInfo>
                                </Card>
                            );
                        }

                    )}
                </Cards>

                {cartItems.length >= 1 && (
                    <CheckOut layout>
                        <h3>Subtotal: {totalPrice}$</h3>
                        <button onClick={handleCheckout}>Purchase</button>
                    </CheckOut>
                )}
            </CartStyle>
        </CartWrapper>
    )
}