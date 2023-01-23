import { useRouter } from 'next/router';
//https://stripe.com/docs/payments/checkout/custom-success-page
const CheckoutSuccessPage = () => {
    const router = useRouter();

    // dzięki temu możemy odpytać stripa o status i o elementy z zamówienia
    console.log(router.query.session_id);

    return <div>udało się</div>;
};

export default CheckoutSuccessPage;
