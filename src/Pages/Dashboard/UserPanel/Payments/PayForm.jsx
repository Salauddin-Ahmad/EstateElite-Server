import {loadStripe} from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from './CheckOutForm';

// add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const PayForm = () => {
    return (
        <div>
                 <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                 </Elements>
        </div>
    );
};

export default PayForm;