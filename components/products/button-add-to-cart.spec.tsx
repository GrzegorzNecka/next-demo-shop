import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ButtonAddToCartView } from './button-add-to-cart';
import type { ProductDetails } from './types';
import type { CartItem } from 'context/types';

describe('click add to cart', () => {
  // - PRODUCT OBJECT FROM SERVER

  const data = {
    id: 'ckdu44mn40gxh010405uwgbtw',
    title: 'Unisex Long Sleeve Tee',
    description: '...',
    thumbnailUrl: 'https://media.graphassets.com/TSPnQGujTFC8nwtYMXmz',
    thumbnailAlt: 'Unisex Long Sleeve Tee',
    slug: 'unisex-long-sleeve-tee',
    option: [
      {
        __typename: 'Option',
        total: 11,
        id: 'cl9lewa6nggtc09ueqfsjarb9',
        color: 'BLACK',
        size: 'LARGE',
      },
      {
        __typename: 'Option',
        total: 20,
        id: 'cl9lex90xg1s00auss1yhx1lz',
        color: 'PINK',
        size: 'MEDIUM',
      },
      {
        __typename: 'Option',
        total: 4,
        id: 'cl9ley8g2g26f0ausiuilrshf',
        color: 'PURPLE',
        size: 'MEDIUM',
      },
    ],
    longDescription: {
      compiledSource: '...',
      frontmatter: {},
      scope: {},
    },
    price: 1999,
    priceWithCurrency: '19,99 zł',
  } as ProductDetails;

  const activeOptionId = 'cl9lewa6nggtc09ueqfsjarb9';

  // - CART STATE

  const cartItems: CartItem[] = [];

  const addItemToCart = jest.fn((product: CartItem) => {
    const { productOptionId, quantity } = product;

    const existingProduct = cartItems.find((item) => {
      return item.productOptionId === productOptionId;
    });

    if (!existingProduct) {
      cartItems.push({
        itemId: '-1clcoxa8g5971d0btfz5gz9s1w',
        quantity,
        price: product.price,
        title: product.title,
        imgUrl: product.imgUrl,
        slug: product.slug,
        productOptionId: product.productOptionId,
      });
    }

    if (existingProduct) {
      existingProduct.quantity = existingProduct.quantity + quantity;
    }
    // change produc.total on server
    const productOnServer = data.option.find((p) => p.id === productOptionId);

    if (!productOnServer) {
      return;
    }

    // productOnServer.total = productOnServer.total - quantity;

    console.log('data', data);
  });

  const cartState = {
    items: cartItems,
    addItemToCart,
    removeItemFromCart: jest.fn(),
    clearCartItems: jest.fn(),
    total: 0,
    isLoading: false,
  };

  it('add one product to empty cartState ', async () => {
    render(
      <ButtonAddToCartView cartState={cartState} product={data} activeOptionId={activeOptionId} />,
    );

    const addToCartBtn = screen.getByRole('button', { name: /dodaj do koszyka/i });

    if (addToCartBtn) {
      //first
      fireEvent.click(addToCartBtn);
      await waitFor(() => {
        expect(cartItems.length).toBe(1);
        expect(cartItems?.at(0)?.quantity).toBe(1);
      });
    }
    // const { getByText } = within(screen.getByTestId('available-total'));
    // expect(getByText('10')).toBeInTheDocument();
    // screen.debug();
  });

  it('add second time, the same product to cartState ', async () => {
    render(
      <ButtonAddToCartView cartState={cartState} product={data} activeOptionId={activeOptionId} />,
    );

    const addToCartBtn = screen.getByRole('button', { name: /dodaj do koszyka/i });

    if (addToCartBtn) {
      //second
      fireEvent.click(addToCartBtn);
      await waitFor(() => {
        expect(cartItems.length).toBe(1);
        expect(cartItems?.at(0)?.quantity).toBe(2);
      });
    }

    // const { getByText } = within(screen.getByTestId('available-total'));
    // expect(getByText('9')).toBeInTheDocument();

    // screen.debug();
  });
});
