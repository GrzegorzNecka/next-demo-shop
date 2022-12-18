import { Main } from "components/main";
import Link from "next/link";
import { changeToCurrency, moveTheComa } from "utils/currency";
// import { loadStripe } from "@stripe/stripe-js";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useCartState } from "context/cart-context";
import { CartItem } from "context/types";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { CartOptions } from "components/cart/cart-product-options";
import { useSession } from "next-auth/react";
// import Stripe from "stripe";

interface CartContentProps {
    targetButton: string | null;
    setTargetButton: Dispatch<SetStateAction<string | null>>;
}

const CartContent = ({ targetButton, setTargetButton }: CartContentProps) => {
    const cartState = useCartState();

    const handleOnClick = (existItem: CartItem) => {
        if (!existItem?.itemId) {
            return;
        }

        setTargetButton(existItem.title);
        cartState.removeItemFromCart(existItem.itemId);
    };

    //! if prev cartState.items, current cartState.items use React.memo

    return (
        <div className="col-span-2">
            <ul className="divide-y divide-gray-200">
                {cartState.items.map((item, index) => {
                    return (
                        <li className="py-3" key={index}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Link legacyBehavior href={`/product/${item.slug}`}>
                                        <a className="hover:underline">
                                            {item.title} {`x  ${item.quantity} `}{" "}
                                            <CartOptions id={item.productOptionId} />
                                        </a>
                                    </Link>
                                </div>
                                <div className="flex items-center">
                                    {changeToCurrency(moveTheComa(item.price))}

                                    <div>
                                        {cartState.isLoading ? (
                                            <button disabled className="ml-4 text-red-300">
                                                <TrashIcon
                                                    stroke="currentColor"
                                                    aria-label="usuń element"
                                                    strokeWidth={2}
                                                    className="h-6 w-6"
                                                />
                                            </button>
                                        ) : (
                                            <button onClick={() => handleOnClick(item)} className="ml-4 text-red-500">
                                                <TrashIcon
                                                    stroke="currentColor"
                                                    aria-label="usuń element"
                                                    strokeWidth={2}
                                                    className="h-6 w-6"
                                                />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

// const stripeSecret = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const CartSummary = () => {
    const cartState = useCartState();
    const { data: session, status } = useSession();

    // if (!stripeSecret) {
    //     return <div></div>;
    // }

    // const stripePromise = loadStripe(stripeSecret);

    // const pay = async () => {
    //     const stripe = await stripePromise;

    //     if (!stripe) {
    //         throw new Error("something went wrong");
    //     }

    //     const res = await fetch("/api/checkout/stripe/create", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json;" },
    //         body: JSON.stringify(
    //             cartState.items.map((cartItem) => {
    //                 return {
    //                     slug: cartItem.slug,
    //                     count: cartItem.count,
    //                 };
    //             })
    //         ),
    //     });

    //     const { session }: { session: Stripe.Response<Stripe.Checkout.Session> } = await res.json();

    //     await stripe.redirectToCheckout({ sessionId: session.id });
    // };

    return (
        <div>
            <h2 className="pb-2 font-bold text-lg  divide-gray-200">Podsumowanie koszyka</h2>
            <div>Liczba elementów: {cartState.items.length}</div>
            {/* <div>Łączna Liczba wszystkich elementów: {cartState.totalCount}</div>
            <div className="pt-2">Suma: {changeToCurrency(moveTheComa(cartState.totalPrice))}</div> */}
            <div className="mt-4">
                <button
                    onClick={() => {
                        cartState.clearCartItems();
                    }}
                    type="button"
                    className="w-full btn-custom-primary"
                >
                    wyczyść koszyk
                </button>
            </div>
            <div className="mt-4">
                {status === "authenticated" ? (
                    <button
                        // onClick={pay}
                        type="button"
                        className="w-full btn-custom-primary"
                    >
                        złóż zmówienie
                    </button>
                ) : (
                    <Link className="block w-full btn-custom-primary" href="/api/auth/signin">
                        zaloguj się aby złożyć zamówienie
                    </Link>
                )}
            </div>
        </div>
    );
};

const CartPage = () => {
    const [targetButton, setTargetButton] = useState<string | null>(null);

    return (
        <Main>
            <div className="grid grid-cols-3 gap-20">
                <CartContent targetButton={targetButton} setTargetButton={setTargetButton} />
                <CartSummary />
            </div>
        </Main>
    );
};

export default CartPage;
