import { ProductOption } from "components/Products/types";
import { useGetProductOptionsQuery } from "graphQL/generated/graphql";
import React from "react";

export const CartOptions = ({ id }: { id: string }) => {
    const { data } = useGetProductOptionsQuery({
        skip: !Boolean(id),
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
                if (option === "__typename") {
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
