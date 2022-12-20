import Link from "next/link";
import { useCartState } from "context/cart-context";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { apolloClient } from "graphQL/apolloClient";

export default function CartBar() {
    const cartState = useCartState();

    const handleOnClick = async () => {
        await apolloClient.refetchQueries({
            include: "active",
        });
    };

    return (
        <div>
            <button onClick={handleOnClick}>refetch</button>
            <Link legacyBehavior href="/cart">
                <a>
                    <div className=" flex">
                        <span> {cartState.total}</span>
                        <ShoppingBagIcon className="h-6 w-6" />
                    </div>
                </a>
            </Link>
        </div>
    );
}
