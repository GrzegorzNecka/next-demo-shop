import '@testing-library/jest-dom';
import { handleClearCartItems } from './cart-items-by-account';
import fetch from 'jest-fetch-mock';
import type { CartItem } from 'context/types';

describe('test "handleClearCartItems"  method', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    const mockSuccessResponse = { cart: { cartItems: [] } };

    it(`if remove all cartItems, return empty array`, async () => {
        fetch.mockResponseOnce(JSON.stringify(mockSuccessResponse), { status: 200 });
        const withEmptyCart = await handleClearCartItems();

        expect(withEmptyCart).toEqual([]);
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it(`if network is disconnect, return null `, async () => {
        fetch.mockResponseOnce(JSON.stringify(mockSuccessResponse), { status: 500 });
        const withEmptyCart: CartItem[] = await handleClearCartItems();

        expect(withEmptyCart).toEqual(null);
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});

//

describe('test "clearCartItems"  method', () => {
    const setCartItems = jest.fn((x: CartItem[]) => x);
    const setIsLoading = jest.fn((x: boolean) => x);

    beforeEach(() => {
        fetch.resetMocks();
        setCartItems.mockReset();
        setIsLoading.mockReset();
    });

    const mockSuccessResponse = { cart: { cartItems: [] } };

    it(`if remove all cartItems, return empty array`, async () => {
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
        expect(setCartItems).toHaveBeenCalledTimes(1);
        expect(setIsLoading.mock.calls[0][0]).toBe(true);
        expect(setIsLoading.mock.calls[1][0]).toBe(false);
        expect(setIsLoading).toHaveBeenCalledTimes(2);
    });

    it(`if status === 500, return null`, async () => {
        fetch.mockResponseOnce(JSON.stringify(mockSuccessResponse), { status: 500 });

        setIsLoading(true);

        const withEmptyCart: CartItem[] = await handleClearCartItems();

        expect(withEmptyCart).toEqual(null);
        if (!withEmptyCart) {
            expect(fetch).toHaveBeenCalledTimes(1);

            setIsLoading(false);

            expect(setIsLoading.mock.calls[0][0]).toBe(true);
            expect(setIsLoading.mock.calls[1][0]).toBe(false);
            expect(setIsLoading).toHaveBeenCalledTimes(2);
            return;
        }

        setCartItems(withEmptyCart);
        setIsLoading(false);
    });
});
