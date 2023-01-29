import { authApolloClient } from 'graphQL/apolloClient';
import type {
    UpdateOrderPaymentStatusMutation,
    UpdateOrderPaymentStatusMutationVariables,
} from 'graphQL/generated/graphql';
import { UpdateOrderPaymentStatusDocument } from 'graphQL/generated/graphql';

type UpdateOrderPaymentStatus = {
    orderId: string;
    stripePaymentIntentStatus: string;
};

export const updateOrderPaymentStatus = async ({
    orderId,
    stripePaymentIntentStatus,
}: UpdateOrderPaymentStatus) => {
    //--
    const updatePaymentStatus = await authApolloClient.mutate<
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
};
