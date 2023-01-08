import { useCartState } from 'context/cart-context';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import React from 'react';
import type { ProductDetails } from './types';

type AddToCartBtnProps = {
  data: ProductDetails;
  activeProductOptionId: string;
};

export const AddToCartBtn = ({ data, activeProductOptionId }: AddToCartBtnProps) => {
  const cartState = useCartState();
  const [quantity, setQuantity] = useState<number>(1);
  const resetQuantity = () => setQuantity(1);
  const [numberOfAvailableProductOptions, setNumberOfAvailableProductOptions] = useState<number>(0);

  useEffect(() => {
    const [activeProductOption] = findActiveProductOption(data.option, activeProductOptionId);

    if (!activeProductOption.total) {
      return;
    }

    const cartItemOption = cartState.items.find((item) => {
      return item.productOptionId === activeProductOptionId;
    });

    if (cartItemOption) {
      setNumberOfAvailableProductOptions(activeProductOption.total - cartItemOption.quantity);
      return;
    }

    setNumberOfAvailableProductOptions(activeProductOption.total);
  }, [activeProductOptionId, cartState]);

  const handleOnClick = () => {
    const newCartItem = {
      productOptionId: activeProductOptionId,
      price: data.price,
      title: data.title,
      quantity,
      imgUrl: data.thumbnailUrl,
      slug: data.slug,
    };

    cartState.addItemToCart(newCartItem);

    resetQuantity();
  };

  return (
    <>
      <div>
        {numberOfAvailableProductOptions
          ? `total: ${numberOfAvailableProductOptions}`
          : 'brak w magazynie'}
      </div>
      {cartState.isLoading ? (
        <div className="flex mb-8">
          {numberOfAvailableProductOptions ? (
            <input
              disabled
              value={quantity}
              type="number"
              className="mb-0 w-1/4 mr-4 bg-transparent py-2 px-4 border-2 border-black rounded"
            />
          ) : null}

          <button disabled className={`mb-0 w-3/4 text-blackfont-semibold btn-custom-primary`}>
            dodawanie
          </button>
        </div>
      ) : (
        <div className="flex mb-8">
          {numberOfAvailableProductOptions ? (
            <input
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              type="number"
              className="mb-0 w-1/4 mr-4 bg-transparent py-2 px-4 border-2 border-black rounded"
              max={numberOfAvailableProductOptions}
              min={1}
            />
          ) : null}

          {numberOfAvailableProductOptions ? (
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

// -- HANDLERS

function findActiveProductOption(option: ProductDetails['option'], activeProductOptionId: string) {
  return option.filter((option) => {
    if (option.id !== activeProductOptionId) {
      return null;
    }

    return option;
  });
}
