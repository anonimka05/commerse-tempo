// import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
// import { ProductContext } from "../contexts/ProductContext";
import { useFetch } from "../utils/hooks/useFetch";
import { RefreshCcw } from "lucide-react";

const ProductDetails = () => {
  // get the product id from url
  const { id } = useParams();
  // const { addToCart } = useContext(CartContext);
  const { cart, addToCart } = useCart();
  // const { products } = useContext(ProductContext);

  //get the single product based on id
  // const product = products.find((item) => {
  //   return item.id === parseInt(id);
  // });

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useFetch(`https://fakestoreapi.com/products/${id}`);

  const disabled = cart.some((product) => product.id == id);

  // if product is not found
  if (isLoading) {
    return (
      <section className='h-screen flex justify-center items-center'>
        Loading...
      </section>
    );
  }

  if (error) {
    return (
      <section className='h-screen flex justify-center items-center'>
        {error && (
          <div>
            <p className='text-red-500 mb-2'>{error.message}</p>
            <button
              onClick={refetch}
              className='border rounded-md py-2 px-3 bg-slate-100'
            >
              Try again
              <span>
                <RefreshCcw className='ml-2 inline-block w-5' />
              </span>
            </button>
          </div>
        )}
      </section>
    );
  }

  // destructure product
  const { title, price, description, image } = product;
  return (
    <section className='pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center'>
      <div className='container mx-auto'>
        {/* image and text wrapper */}
        <div className='flex flex-col lg:flex-row items-center'>
          {/* image */}
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img className='max-w-[200px] lg:max-w-xs' src={image} alt='' />
          </div>
          {/* text */}
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>
              {title}
            </h1>
            <div className='text-2xl text-red-500 font-medium mb-6'>
              $ {price}
            </div>
            <p className='mb-8'>{description}</p>
            <button
              disabled={disabled}
              onClick={() => addToCart(product)}
              className='disabled:bg-gray-200 bg-primary py-4 px-8 disabled:text-gray-600 text-white'
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
