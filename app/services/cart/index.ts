const handleAddItemToCart = async (productOptionId: string, quantity: number) =>
    await fetch("/api/cart/add-to-cart-item", {
        method: "POST",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            productOptionId,
            quantity,
        }),
    });

const updateCartItem = async (itemId: string, updatedQuantity: number) =>
    await fetch("/api/cart/update-cart-item", {
        method: "POST",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            itemId,
            updatedQuantity,
        }),
    });

const handleRemoveItemFromCart = async (itemId: string, quantity: number) =>
    await fetch("/api/cart/remove-cart-item", {
        method: "POST",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            itemId,
            quantity,
        }),
    });

const handleClearCartItems = async () =>
    await fetch("/api/cart/clear-cart", {
        method: "GET",
        headers: { "Content-Type": "application/json;" },
    });

export { handleAddItemToCart, updateCartItem, handleRemoveItemFromCart, handleClearCartItems };
