import '@testing-library/jest-dom';
import { handleClearCartItems } from './cart-items-by-account';
import fetch from 'jest-fetch-mock';
import type { CartItem } from 'context/types';

describe('test clearCartItems  method', () => {
  const mockSuccessResponse = { cart: { cartItems: [] } };

  const setCartItems = jest.fn((x: CartItem[]) => x);
  const setIsLoading = jest.fn((x: boolean) => x);

  it(`remove all cartItems and return empty array`, async () => {
    fetch.mockResponseOnce(JSON.stringify(mockSuccessResponse), { status: 200 });

    setIsLoading(true);

    const withEmptyCart: CartItem[] = await handleClearCartItems();

    if (!withEmptyCart) {
      setIsLoading(false);
      return;
    }

    setCartItems(withEmptyCart);
    setIsLoading(false);

    expect(withEmptyCart).toEqual([]);
    expect(fetch).toHaveBeenCalledTimes(1);

    expect(setCartItems.mock.calls[0][0]).toStrictEqual([]);
    expect(setIsLoading.mock.calls[0][0]).toBe(true);
    expect(setIsLoading.mock.calls[1][0]).toBe(false);
  });
});
