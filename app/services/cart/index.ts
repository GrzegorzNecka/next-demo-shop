const add = async (productId: string) =>
    await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json;" },
        body: JSON.stringify({
            productId,
        }),
    });

export { add };
