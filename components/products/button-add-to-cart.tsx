import { useCartState } from 'context/cart-context';
import { useEffect, useMemo, useState } from 'react';
import React from 'react';
import type { ButtonAddToCartProps, ButtonAddToCartViewProps } from '../../types/components/types';
import { useGetProductOptionTotalQuery } from 'graphQL/generated/graphql';
import { useQuery } from '@tanstack/react-query';

// -- CONTAINER

export const ButtonAddToCart = ({ data, activeOptionId }: ButtonAddToCartProps) => {
    const cartState = useCartState();

    const { data: test, isFetched } = useQuery({
        queryKey: ['total', activeOptionId],
        queryFn: async () => {
            const res = await fetch(`/api/products/totals/${activeOptionId}`, {
                method: 'GET',
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json;' },
            });

            return res.json();
        },
        // Refetch the data every second
        refetchInterval: 10000,
    });
    console.log('🚀 ~ file: ButtonAddToCart ~ test', test?.total);

    const refetchTotal = test?.total;

    const [quantity, setQuantity] = useState<number>(1);
    const [availableQuantity, setAvailableQuantity] = useState<number>(0);

    const [activeOption] = useMemo(() => {
        return data.option.filter((option) => option.id === activeOptionId);
    }, [data.option, activeOptionId]);

    const cartItemOption = useMemo(() => {
        return cartState.items.find((item) => item.productOptionId === activeOptionId);
    }, [cartState.items, activeOptionId]);

    useEffect(() => {
        if (cartItemOption) {
            setAvailableQuantity(activeOption.total - cartItemOption.quantity);

            if (isFetched) {
                setAvailableQuantity(refetchTotal - cartItemOption.quantity);
            }

            return;
        }

        setAvailableQuantity(activeOption.total);

        if (isFetched) {
            setAvailableQuantity(refetchTotal);
        }

        return;
    }, [cartItemOption, refetchTotal, isFetched, activeOption]);

    return (
        <ButtonAddToCartView
            cartState={cartState}
            product={data}
            activeOptionId={activeOptionId}
            quantity={quantity}
            setQuantity={setQuantity}
            availableQuantity={availableQuantity}
            refetchTotal={refetchTotal}
        />
    );
};

// -- PREZENTATION

export const ButtonAddToCartView = ({
    cartState,
    product,
    activeOptionId,
    quantity,
    setQuantity,
    availableQuantity,
    refetchTotal,
}: ButtonAddToCartViewProps) => {
    //

    const handleOnClick = () => {
        const newCartItem = {
            productOptionId: activeOptionId,
            price: product.price,
            title: product.title,
            quantity,
            imgUrl: product.thumbnailUrl,
            slug: product.slug,
        };

        cartState.addItemToCart(newCartItem);

        setQuantity(1);
    };

    return (
        <>
            <p>test total : {refetchTotal}</p>
            <div>
                {availableQuantity ? (
                    <p>
                        avalaible: <span data-testid="available-total">{availableQuantity}</span>
                    </p>
                ) : (
                    <p>brak w magazynie</p>
                )}
            </div>
            {cartState.isLoading ? (
                <div className="flex mb-8">
                    {availableQuantity ? (
                        <input
                            title="quantity"
                            disabled
                            value={quantity}
                            type="number"
                            className="mb-0 w-1/4 mr-4 bg-transparent py-2 px-4 border-2 border-black rounded"
                        />
                    ) : null}

                    <button
                        disabled
                        className={`mb-0 w-3/4 text-blackfont-semibold btn-custom-primary`}>
                        dodawanie
                    </button>
                </div>
            ) : (
                <div className="flex mb-8">
                    {availableQuantity ? (
                        <input
                            title="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            type="number"
                            className="mb-0 w-1/4 mr-4 bg-transparent py-2 px-4 border-2 border-black rounded"
                            max={availableQuantity}
                            min={1}
                        />
                    ) : null}

                    {availableQuantity ? (
                        <button
                            className={`mb-0 w-3/4 text-blackfont-semibold btn-custom-primary`}
                            onClick={handleOnClick}>
                            dodaj do koszyka
                        </button>
                    ) : null}
                </div>
            )}
        </>
    );
};
