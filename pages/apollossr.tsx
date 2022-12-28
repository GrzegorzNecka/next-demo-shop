import { Main } from "components/main";
import { GetCounterDocument } from "graphQL/generated/graphql";

import { useEffect, useState } from "react";

const ApolloSSR = () => {
    const [nextCount, setNextCount] = useState<number>(0);
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const result = await fetch("/api/cache-test-1", {
                method: "GET",
                headers: { "Content-Type": "application/json;" },
            });

            if (result.status === 200) {
                const number = await result.json();
                console.log("🚀 ~ data-1", number.counter.data.testCache.counter);
                setData(number.counter.data.testCache.counter);
            }

            return;
        };

        getData();
    }, []);

    const handleOnClick = async () => {
        // updateCounterMutation({ variables: { counter: nextCount } });

        const result = await fetch("/api/cache-test-1", {
            method: "POST",
            headers: { "Content-Type": "application/json;" },
            body: JSON.stringify({
                counter: nextCount,
            }),
        });

        if (result.status === 200) {
            const data = await result.json();

            // setData(data.counter.data.updateTestCache.counter);

            const getData = async () => {
                const result = await fetch("/api/cache-test-1", {
                    method: "GET",
                    headers: { "Content-Type": "application/json;" },
                });

                if (result.status === 200) {
                    const number = await result.json();
                    console.log("🚀data-2", number.counter.data.testCache.counter);
                    setData(number.counter.data.testCache.counter);
                }
            };
            getData();
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value);
        // apolloClient.refetchQueries({});

        setNextCount(Number(newValue));
    };

    return (
        <Main>
            apollo ssr
            <input value={nextCount} onChange={handleOnChange} type="number" />
            <button onClick={handleOnClick}>set number</button>
            <p>{data && data}</p>
        </Main>
    );
};

export default ApolloSSR;
