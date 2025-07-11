import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import "./stripe.css";
import Swal from "sweetalert2";
const StripeCheckout = ({ price }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const { data } = await axiosSecure.post("/create-payment-intent", {
          price,
        });
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Error getting client secret:", err);
      }
    };

    if (price > 0) {
      getClientSecret();
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);

      setCardError(null);
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });


        if (result?.error) {
      setCardError(result?.error?.message)
      return
    }
    if (result?.paymentIntent?.status === 'succeeded') {
      // save order data in db
   try{
     

    Swal.fire('payment succeeded')
      } catch (err) {
        console.log(err)
      } finally {
        setProcessing(false)
        setCardError(null)
      
      }
      // update product quantity in db from plant collection
    }



   
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      {cardError && <p className="text-red-500 pb-4">{cardError}</p>}
      <div className="flex  justify-between items-center">
        <button
          className="tom-btn"
          type="submit"
          disabled={!stripe || processing}
        >
          {processing ? (
            <HashLoader className="mt-1" size={24}></HashLoader>
          ) : (
            ` Pay $ ${price}`
          )}
        </button>

        <button className="rej-btn">Cancel</button>
      </div>
    </form>
  );
};

export default StripeCheckout;
