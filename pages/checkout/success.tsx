import { Main } from 'components/main';
import { useGetOrderItemsByOrderIdQuery } from 'graphQL/generated/graphql';
// import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { changeToCurrency, moveTheComa } from 'utils/currency';

/**
 *
 * docs: https://stripe.com/docs/payments/checkout/custom-success-page
 *
 */

const CheckoutSuccessPage = () => {
    const router = useRouter();
    // const { status } = useSession();

    const checkoutSessionId = router.query.session_id;

    let orderId = null;

    if (typeof router.query.order_id === 'string') {
        orderId = router.query.order_id;
    }

    const { data, loading, error } = useGetOrderItemsByOrderIdQuery({
        skip: !orderId,
        variables: {
            orderId: orderId as string,
        },
    });

    if (loading) {
        return <Main>loading</Main>;
    }

    if (data) {
        return (
            <Main>
                <h2>{`zmówienie nr: ${checkoutSessionId} `}</h2>
                <hr />
                <div>
                    <h3>dane zamówienia:</h3>
                    <p>
                        e-mail: <span>{data.order?.email}</span>
                    </p>
                    <p>
                        status: <span>{data.order?.stripePaymentIntentStatus}</span>
                    </p>
                </div>
                <hr />
                <div>
                    <h3>produkty:</h3>
                    <ul>
                        {data.order?.orderItems &&
                            data.order.orderItems.map((item) => {
                                return (
                                    <li key={item.productName}>
                                        <p>
                                            {item.productName} x {item.quantity} ={' '}
                                            {item?.price &&
                                                changeToCurrency(moveTheComa(item.price))}
                                        </p>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </Main>
        );
    }
    return <div></div>;
};

export default CheckoutSuccessPage;
