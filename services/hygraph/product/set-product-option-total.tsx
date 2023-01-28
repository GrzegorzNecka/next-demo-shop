import type { ApolloQueryResult } from '@apollo/client';
import { authApolloClient } from 'graphQL/apolloClient';
import type {
    CartContentQueryWithOptionFragment,
    CartItem,
    GetCartItemsByCartIdQuery,
    SetProductOptionTotalMutation,
    SetProductOptionTotalMutationVariables,
} from 'graphQL/generated/graphql';

import { SetProductOptionTotalDocument } from 'graphQL/generated/graphql';

export const setProductOptionTotal = async (cart: GetCartItemsByCartIdQuery['cart']) => {
    //
    if (!cart?.cartItems) {
        return;
    }

    cart.cartItems.map(async (item) => {
        //
        if (!item?.option?.total || !item.option?.id) {
            throw new Error('required data missing');
        }

        const quantity = item.quantity;
        const total = item.option.total;
        const optionId = item.option.id;

        let nextTotal = total - quantity;

        if (total < quantity) {
            nextTotal = 0;
        }

        if (total < 1) {
            nextTotal = 0;
        }

        if (nextTotal < 0) {
            throw new Error('to much quantity products! Out of stock');
        }

        await authApolloClient.mutate<
            SetProductOptionTotalMutation,
            SetProductOptionTotalMutationVariables
        >({
            mutation: SetProductOptionTotalDocument,
            variables: { id: optionId, total: nextTotal },
            fetchPolicy: 'no-cache',
        });
    });
};
