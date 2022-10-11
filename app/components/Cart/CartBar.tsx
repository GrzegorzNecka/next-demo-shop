import Link from "next/link";
import { useCartState } from "./Context/CartContext";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function CartBar() {
    const cartState = useCartState();

    return (
        <div>
            <Link href="/cart">
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
