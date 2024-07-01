// this is a stripe provider wrap your whole app in this provider like in main.tsx

import { Elements } from '@stripe/react-stripe-js'; // install form npm
import { loadStripe } from '@stripe/stripe-js'; // install form npm
const stripePromise = loadStripe('your stripe publishable key'); // stripe publishable key

const StripeProvider = ({ children }: any) => {

    // optional ui changes accourdin to your ui
    const appearance: any = {
        theme: 'stripe',
        variables: {
            colorPrimary: '#0a101d',
            colorBackground: '#fff',
            colorText: '#353535',
            colorDanger: '#df1b41',
        },
        rules: {
            '.Input': {
                borderColor: '#353535',
                color: '#0a101d',
                borderRadius: '4px',
                fontSize: '32px',
            },
            '.Label': {
                color: '#0a101d',
                fontSize: '32px',
            },
        },
    };

    return <Elements stripe={stripePromise} options={{ appearance: appearance }}>{children}</Elements>;
};
export default StripeProvider;