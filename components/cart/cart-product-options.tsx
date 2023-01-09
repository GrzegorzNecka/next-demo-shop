import type { Option } from 'graphQL/generated/graphql';
import { useGetProductOptionsQuery } from 'graphQL/generated/graphql';
import React from 'react';

type ProductOption = Pick<Option, 'color' | 'size' | '__typename' | 'id'>;

export const CartOptions = ({ id }: { id: string }) => {
  const { data } = useGetProductOptionsQuery({
    skip: !id,
    variables: {
      id: id,
    },
  });

  if (!data || !data.option) {
    return null;
  }

  return (
    <>
      {Object.keys(data.option).map((option) => {
        if (option === '__typename' || option === 'id') {
          return;
        }

        const key = option as keyof ProductOption;

        return (
          <div key={`${id}_${option}`}>
            <span>{data?.option?.[key] && `${option} : ${data.option[key]}`}</span>
          </div>
        );
      })}
    </>
  );
};

// use memoizazja
