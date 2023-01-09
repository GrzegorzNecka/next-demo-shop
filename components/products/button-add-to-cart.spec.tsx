import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ButtonAddToCartView } from './button-add-to-cart';
import type { ProductDetails } from './types';
import type { CartItem } from 'context/types';

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

describe('click add to cart button', () => {
  let availableQuantity = data?.option?.at(0)?.total!;

  const addItemToCartMock = jest.fn((product: CartItem) => {
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

    availableQuantity = availableQuantity - quantity;
  });

  const cartItems: CartItem[] = [];

  const cartState = {
    items: cartItems,
    addItemToCart: addItemToCartMock,
    removeItemFromCart: jest.fn(),
    clearCartItems: jest.fn(),
    total: 0,
    isLoading: false,
  };

  it('if cartItems is empty and fire event to add new product, cartItems length will be increase and availableQuantity will decrease', async () => {
    render(
      <ButtonAddToCartView
        cartState={cartState}
        product={data}
        activeOptionId={data?.option?.at(0)?.id!}
        quantity={1}
        setQuantity={jest.fn()}
        availableQuantity={availableQuantity}
      />,
    );

    const addToCartBtn = screen.getByRole('button', { name: /dodaj do koszyka/i });

    const { getByText } = within(screen.getByTestId('available-total'));
    expect(getByText('11')).toBeInTheDocument();

    expect(cartItems.length).toBe(0);

    if (!addToCartBtn) {
      return;
    }

    fireEvent.click(addToCartBtn);

    await waitFor(() => {
      expect(cartItems.length).toBe(1);
    });

    // screen.debug();
  });

  it('if cartItems has one item and fire event to add the same product, cartItems length will be equal and availableQuantity will decrease ', async () => {
    render(
      <ButtonAddToCartView
        cartState={cartState}
        product={data}
        activeOptionId={data?.option?.at(0)?.id!}
        quantity={1}
        setQuantity={jest.fn()}
        availableQuantity={availableQuantity}
      />,
    );

    const addToCartBtn = screen.getByRole('button', { name: /dodaj do koszyka/i });

    const { getByText } = within(screen.getByTestId('available-total'));
    expect(getByText('10')).toBeInTheDocument();

    expect(cartItems.length).toBe(1);

    if (!addToCartBtn) {
      return;
    }

    fireEvent.click(addToCartBtn);

    await waitFor(() => {
      expect(cartItems.length).toBe(1);
    });
  });

  it('if cartItems has one item and fire event to add new product, cartItems length will be increase and availableQuantity will decrease', async () => {
    availableQuantity = data?.option?.at(1)?.total!;

    const { rerender } = render(
      <ButtonAddToCartView
        cartState={cartState}
        product={data}
        activeOptionId={data?.option?.at(1)?.id!}
        quantity={1}
        setQuantity={jest.fn()}
        availableQuantity={availableQuantity}
      />,
    );

    const addToCartBtn = screen.getByRole('button', { name: /dodaj do koszyka/i });

    const { getByText } = within(screen.getByTestId('available-total'));
    expect(getByText('20')).toBeInTheDocument();

    expect(cartItems.length).toBe(1);

    if (!addToCartBtn) {
      return;
    }

    fireEvent.click(addToCartBtn);

    await waitFor(() => {
      expect(cartItems.length).toBe(2);
    });

    rerender(
      <ButtonAddToCartView
        cartState={cartState}
        product={data}
        activeOptionId={data?.option?.at(1)?.id!}
        quantity={1}
        setQuantity={jest.fn()}
        availableQuantity={availableQuantity}
      />,
    );

    expect(getByText('19')).toBeInTheDocument();
  });
});
