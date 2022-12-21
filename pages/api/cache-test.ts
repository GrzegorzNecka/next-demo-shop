// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { apolloClient, authApolloClient } from "graphQL/apolloClient";
import {
    GetCounterDocument,
    UpdateCounterDocument,
    UpdateCounterMutation,
    UpdateCounterMutationVariables,
} from "graphQL/generated/graphql";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handle: NextApiHandler = async (req, res) => {
    if (req.method !== "POST") {
        res.status(400).json({ message: "bad request method" });
        return;
    }

    const { counter } = await JSON.parse(req.body);

    const mutationTest = await authApolloClient.mutate<UpdateCounterMutation, UpdateCounterMutationVariables>({
        mutation: UpdateCounterDocument,
        variables: {
            counter,
        },
        // update(cache, {})
        // fetchPolicy: "no-cache",
        // awaitRefetchQueries: true,
        // refetchQueries: [
        //     {
        //         query: GetCounterDocument,
        //         variables: {},
        //     },
        // ],
    });

    const nextCount = mutationTest.data?.updateTestCache?.counter;
    const query = GetCounterDocument;

    const {
        testCache: { id, __typename },
    } = apolloClient.readQuery({
        query: query,
    });

    apolloClient.cache.writeQuery({
        query: query,
        data: {
            testCache: {
                id: `-${id}`,
                counter: nextCount,
                __typename,
            },
        },
    });

    console.log("🚀 ~ file: cache-test.ts:32 ~ consthandle:NextApiHandler= ~  mutationTest", mutationTest);
    console.log("🚀 ~ file: cache-test.ts:11 ~ consthandle:NextApiHandler= ~ counter", counter);

    // updateCounterMutation

    res.status(200).json({ counter: mutationTest });
};

export default handle;
