import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { cartItemsByAccount } from './cart-items-by-account';
import type { CartItem } from 'context/types';
// import { NewsletterFormView } from './newsletter-form';

describe('clear cart', () => {
    //   it(`should append if element doesn't exit`, async () => {
    //     const cartItems: CartItem[] = [];
    //     const setCartItems = jest.fn();
    //     const setIsLoading = jest.fn();
    //     const byAccount = cartItemsByAccount({
    //       setCartItems,
    //       setIsLoading,
    //       cartItems,
    //     });
    //     const product = {
    //       productOptionId: 'cl9lewa6nggtc09ueqfsjarb9',
    //       price: 1999,
    //       title: 'Unisex Long Sleeve Tee',
    //       quantity: 1,
    //       imgUrl: 'https://media.graphassets.com/TSPnQGujTFC8nwtYMXmz',
    //       slug: 'unisex-long-sleeve-tee',
    //     };
    //     const result = await byAccount.addItemToCart(product);
    //     if (!result) {
    //       return;
    //     }
    //     expect(result.length).toEqual(result.length + 1);
    //   });
  });
  
  
  //   it('submit form when inputs are filled and button is clicked ', async () => {
  //     const mutate = jest.fn();
  //     const isLoading = false;
  //     const isSuccess = false;
  //     render(<NewsletterFormView mutate={mutate} isLoading={isLoading} isSuccess={isSuccess} />);
  //     const inputName = screen.getByPlaceholderText('Name');
  //     const inputEmail = screen.getByPlaceholderText('Email');
  //     fireEvent.change(inputName, { target: { value: 'Marek' } });
  //     fireEvent.change(inputEmail, { target: { value: 'marek@nowak.gmail.com' } });
  //     fireEvent.click(screen.getByText('subscribe !'));
  //     await waitFor(() => expect(mutate).toHaveBeenCalled());
  //   });
});
