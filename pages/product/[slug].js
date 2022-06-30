import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import { Details, ProductInfo, Quantity, Buy } from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "../../lib/context";

export default function ProductDetails(){

    //Use State
    const {qty, increaseQty, decreaseQty} = useStateContext();
 
    //Fetch Slug
    const { query } = useRouter(); 


    //Fetch Graphql data
     const [results] = useQuery({
        query: GET_PRODUCT_QUERY,
        variables: { slug: query.slug },
    });

     const {data, fetching, error} = results;

     
    if(fetching) return <p>Loading</p>
    if(error) return <p>{error.message}</p>

    //Extract our data
    const {title, description, image, price} = data.products.data[0].attributes; //its just 1 item in the array so we can say 0

    return(
        <Details>
            <img src={image.data.attributes.formats.medium.url} alt={title} />
            <ProductInfo>
                <h3>{title}</h3>
                <p>{description}</p>
            
                <Quantity>
                    <span>Quantity</span>
                    <button>
                        <AiFillMinusCircle onClick={decreaseQty }/>
                    </button>
                    <p>{qty}</p>
                    <button>
                        <AiFillPlusCircle onClick={increaseQty} />
                    </button>
                </Quantity>
                <Buy>Add to cart</Buy>
            </ProductInfo>    
        </Details>
    )
}