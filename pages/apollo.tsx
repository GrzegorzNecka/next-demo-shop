import { Main } from 'components/main';
import { useGetCounterQuery } from 'graphQL/generated/graphql';
import { useState } from 'react';

const Apollo = () => {
  const [nextCount, setNextCount] = useState<number>(0);
  const { data, loading, error, refetch } = useGetCounterQuery({
    variables: {},
    // fetchPolicy: "no-cache",
    // nextFetchPolicy: "cache-and-network",
  });

  // const [updateCounterMutation, { data: dataMutation, loading: loadingMutation }] = useUpdateCounterMutation({});
  if (loading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const handleOnClick = async () => {
    // updateCounterMutation({ variables: { counter: nextCount } });

    const result = await fetch('/api/cache-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;' },
      body: JSON.stringify({
        counter: nextCount,
      }),
    });

    if (result.status === 200) {
      const data = await result.json();

      // refetch(data.counter.data.updateTestCache.counter);

      // const nextCount = data.counter.data.updateTestCache.counter;
      // const query = GetCounterDocument;

      // const {
      //     testCache: { id, __typename },
      // } = apolloClient.readQuery({
      //     query: query,
      // });

      // apolloClient.cache.writeQuery({
      //     query: query,
      //     data: {
      //         testCache: {
      //             id: `-${id}`,
      //             counter: nextCount,
      //             __typename,
      //         },
      //     },
      // });

      // refetch();
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    // apolloClient.refetchQueries({});

    setNextCount(Number(newValue));
  };

  return (
    <Main>
      APOLLO
      <p>number: {data?.testCache?.counter}</p>
      <input value={nextCount} onChange={handleOnChange} type="number" />
      <button onClick={handleOnClick}>set number</button>
    </Main>
  );
};

export default Apollo;
