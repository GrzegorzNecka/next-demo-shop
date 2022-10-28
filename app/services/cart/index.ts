const add = async (productId: string) =>
    await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            productId,
        }),
    });

const update = async (itemId: string, updatedQuantity: number) =>
    await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            itemId,
            updatedQuantity,
        }),
    });

const removeItem = async (itemId: string, quantity: number) =>
    await fetch("/api/cart/removeItem", {
        method: "POST",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            itemId,
            quantity,
        }),
    });

const clearCart = async () =>
    await fetch("/api/cart/clearCartItems", {
        method: "GET",
        headers: { "Content-Type": "application/json;" },
    });

export { add, update, removeItem, clearCart };
