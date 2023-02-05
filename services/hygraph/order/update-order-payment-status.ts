import type { PaymentIntent } from '@stripe/stripe-js/types/api';
import { authApolloClient } from 'graphQL/apolloClient';
import type {
    PublishOrderMutation,
    PublishOrderMutationVariables,
    UpdateOrderPaymentStatusMutation,
    UpdateOrderPaymentStatusMutationVariables,
} from 'graphQL/generated/graphql';
import { PublishOrderDocument } from 'graphQL/generated/graphql';
import { UpdateOrderPaymentStatusDocument } from 'graphQL/generated/graphql';

type UpdateOrderPaymentStatus = {
    orderId: string;
    stripePaymentIntentStatus: PaymentIntent.Status;
};

export const updateOrderPaymentStatus = async ({
    orderId,
    stripePaymentIntentStatus,
}: UpdateOrderPaymentStatus) => {
    //--
    const { data } = await authApolloClient.mutate<
        UpdateOrderPaymentStatusMutation,
        UpdateOrderPaymentStatusMutationVariables
    >({
        mutation: UpdateOrderPaymentStatusDocument,
        variables: {
            orderId,
            stripePaymentIntentStatus,
        },
        fetchPolicy: 'no-cache',
    });

    const publishCart = await authApolloClient.mutate<
        PublishOrderMutation,
        PublishOrderMutationVariables
    >({
        mutation: PublishOrderDocument,
        variables: { id: orderId },
        fetchPolicy: 'no-cache',
    });

    return data?.updateOrder?.id;
};
