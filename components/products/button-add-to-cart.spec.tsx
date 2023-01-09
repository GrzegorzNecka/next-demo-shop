import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ButtonAddToCartView } from './button-add-to-cart';
import type { ProductDetails } from './types';

describe('clikck add to cart', () => {
  const cartState = {
    items: [
      {
        itemId: 'clcoxa8g5971d0btfz5gz9s1w',
        quantity: 2,
        price: 1999,
        title: 'Unisex Long Sleeve Tee',
        imgUrl: 'https://media.graphassets.com/TSPnQGujTFC8nwtYMXmz',
        slug: 'unisex-long-sleeve-tee',
        productOptionId: 'cl9lewa6nggtc09ueqfsjarb9',
      },
    ],
    addItemToCart: jest.fn(),
    removeItemFromCart: jest.fn(),
    clearCartItems: jest.fn(),
    total: 10,
    isLoading: false,
  };
  const data = {
    id: 'ckdu44mn40gxh010405uwgbtw',
    title: 'Unisex Long Sleeve Tee',
    description: '',
    thumbnailUrl: 'https://media.graphassets.com/TSPnQGujTFC8nwtYMXmz',
    thumbnailAlt: '',
    slug: 'unisex-long-sleeve-tee',
    option: [
      {
        __typename: 'Option',
        total: 11,
        id: 'cl9lewa6nggtc09ueqfsjarb9',
        color: 'BLACK',
        size: 'LARGE',
      },
    ],
    longDescription: {
      compiledSource: '',
    },
    price: 1999,
    priceWithCurrency: '19,99 zł',
  } as ProductDetails;

  const activeOption = 'ckdu44mn40gxh010405uwgbtw';
  const quantity = 1;
  const setQuantity = jest.fn();
  const availableOptionQuantity = 1;

  it('show sucess message when status === isSucess', () => {
    render(
      <ButtonAddToCartView
        cartState={cartState}
        data={data}
        activeOptionId={activeOption}
        quantity={quantity}
        setQuantity={setQuantity}
        availableQuantity={availableOptionQuantity}
      />,
    );

    const addToCartBtn = screen.queryByText('dodaj do koszyka');

    // expect(successMessage).toBeInTheDocument();
  });
});
