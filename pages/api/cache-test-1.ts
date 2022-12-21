// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { apolloClient, authApolloClient } from "graphQL/apolloClient";
import {
    GetCounterDocument,
    GetCounterQuery,
    GetCounterQueryVariables,
    UpdateCounterDocument,
    UpdateCounterMutation,
    UpdateCounterMutationVariables,
} from "graphQL/generated/graphql";
import type { NextApiHandler } from "next";

const handle: NextApiHandler = async (req, res) => {
    console.log(req.method);

    if (req.method === "GET") {
        const getNumber = await authApolloClient.query<GetCounterQuery, GetCounterQueryVariables>({
            query: GetCounterDocument,
            fetchPolicy: "cache-first",
        });
        console.log("🚀 ~~ getNumber", getNumber);

        res.status(200).json({ counter: getNumber });

        return;
    }

    if (req.method === "POST") {
        const { counter } = await JSON.parse(req.body);

        const mutationTest = await authApolloClient.mutate<UpdateCounterMutation, UpdateCounterMutationVariables>({
            mutation: UpdateCounterDocument,
            variables: {
                counter,
            },

            // refetchQueries: [
            //     {
            //         query: GetCounterDocument,
            //     },
            // ],
        });

        const testCache = apolloClient.cache.readQuery({
            query: GetCounterDocument,
        });

        console.log(" apolloClient.cache", testCache);

        res.status(200).json({ counter: mutationTest });
    }
};

export default handle;
