import { useEffect, useState } from "react";
import axios from "axios"; // install from npm
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"; // install from npm

const Payment = () => {

    const baseUrl = "https://api.example.com" // backend api url

    const stripe: any = useStripe(); // initializatoin
    const elements = useElements(); // initializatoin
    const [error, setError] = useState(null); // error handling state
    const [isLoading, setIsLoading] = useState<boolean>(false); // loading state
    const [clientSecret, setClientSecret] = useState<any>(null); // stripe secret handling state

    console.error(error)

    useEffect(() => {
        // this functoin will get the payment secret from backend
        getSecretFromBackend()
    }, [])

    const getSecretFromBackend = async () => {

        // dummy data with amount
        const passengers = [
            { price: 100 },
            { price: 200 },
            { price: 300 },
            { price: 400 },
        ]

        if (!passengers?.length) return

        // api call to get payment secret
        const resp = await axios
            .post(`${baseUrl}/api/v1/create-payment-intent`,
                { passengers: passengers },
                { withCredentials: true }
            )

        setClientSecret(resp?.data?.clientSecret) // here is the payment secret

    }

    const handleClick = async (e: any) => {

        e?.preventDefault();

        setIsLoading(true);

        // got this from stripe official docs
        const cardElement = elements?.getElement(CardElement);
        const { paymentIntent, error }: any = await stripe?.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            // if there is any error
            console.log(error)
            setError(error.message);
            setIsLoading(false);
        } else if (paymentIntent.status === 'succeeded') {
            // on successfull payment
            setIsLoading(false);
            alert("payment successfull")
        }
    };

    return (
        <>
            {/* this card element is provided by stripe itself */}
            <div><CardElement /></div>
            {/* payment button */}
            <button onClick={handleClick} >{isLoading ? "In Progress" : "Pay"}</button>
        </>
    );
};

export default Payment;