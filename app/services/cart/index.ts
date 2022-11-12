// -------------   -------------   -------------   -------------   -------------   ------------- //* logged-in state / use GraphQl

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

// -------------   -------------   -------------   -------------   -------------   ------------- //* logged-out state / use Local Storage

// -------------   -------------   -------------   -------------   -------------   -------------

export { handleAddItemToCart, handleUpdateCartItem as updateCartItem, handleRemoveItemFromCart, handleClearCartItems };
