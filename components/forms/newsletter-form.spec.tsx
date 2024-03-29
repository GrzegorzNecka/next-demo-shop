import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NewsletterFormView } from './newsletter-form';

describe('test NewsletterFormView component', () => {
  it('show sucess message when status === isSucess', () => {
    const mockMutate = jest.fn();
    const isLoading = false;
    const isSuccess = true;
    render(<NewsletterFormView mutate={mockMutate} isLoading={isLoading} isSuccess={isSuccess} />);

    const successMessage = screen.queryByText('subscribe was successed');

    expect(successMessage).toBeInTheDocument();
  });

  it('do not show sucess message when status === isSucess', () => {
    const mockMutate = jest.fn();
    const isLoading = false;
    const isSuccess = false;
    render(<NewsletterFormView mutate={mockMutate} isLoading={isLoading} isSuccess={isSuccess} />);

    const successMessage = screen.queryByText('subscribe was failed');

    expect(successMessage).not.toBeInTheDocument();
  });

  it('submit form when inputs are filled and button is clicked ', async () => {
    const mockMutate = jest.fn();
    const isLoading = false;
    const isSuccess = false;

    render(<NewsletterFormView mutate={mockMutate} isLoading={isLoading} isSuccess={isSuccess} />);

    const inputName = screen.getByPlaceholderText('Name');
    const inputEmail = screen.getByPlaceholderText('Email');

    fireEvent.change(inputName, { target: { value: 'Marek' } });
    fireEvent.change(inputEmail, { target: { value: 'marek@nowak.gmail.com' } });

    fireEvent.click(screen.getByText('subscribe !'));

    await waitFor(() => expect(mockMutate).toHaveBeenCalled());
  });
});
