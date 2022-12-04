//* logged-in state / use GraphQl

//!to jest trochę bez sensu - w tym miejscu powinienm łączyć się z graphQl anie z własnym api
//! zamiast akcji pisz poprawne nagłówki !!!
const handleAddItemToCart = async (productOptionId: string, quantity: number) =>
    await fetch("/api/cart/logged-in/add-to-cart-item", {
        method: "POST",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            productOptionId,
            quantity,
        }),
    });

const handleUpdateCartItem = async (itemId: string, updatedQuantity: number) =>
    await fetch("/api/cart/logged-in/update-cart-item", {
        method: "POST",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            itemId,
            updatedQuantity,
        }),
    });

const handleRemoveItemFromCart = async (itemId: string, quantity: number) =>
    await fetch("/api/cart/logged-in/remove-cart-item", {
        method: "POST",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            itemId,
            quantity,
        }),
    });

const handleClearCartItems = async () =>
    await fetch("/api/cart/logged-in/clear-cart", {
        method: "GET",
        headers: { "Content-Type": "application/json;" },
    });

//* logged-out state / use Local Storage

export { handleAddItemToCart, handleUpdateCartItem as updateCartItem, handleRemoveItemFromCart, handleClearCartItems };
