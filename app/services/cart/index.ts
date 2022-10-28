const addToCartItem = async (productId: string) =>
    await fetch("/api/cart/addToCartItem", {
        method: "POST",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            productId,
        }),
    });

const updateCartItem = async (itemId: string, updatedQuantity: number) =>
    await fetch("/api/cart/updateCartItem", {
        method: "POST",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            itemId,
            updatedQuantity,
        }),
    });

const removeCartItem = async (itemId: string, quantity: number) =>
    await fetch("/api/cart/removeCartItem", {
        method: "POST",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            itemId,
            quantity,
        }),
    });

const clearCart = async () =>
    await fetch("/api/cart/clearCart", {
        method: "GET",
        headers: { "Content-Type": "application/json;" },
    });

export { addToCartItem, updateCartItem, removeCartItem, clearCart };
