import { ActiveLink } from "components/active-link";
import CartBar from "components/cart/cart-bar";
import React from "react";
import { navigationList } from "utils/navigation-list";
import LoginButton from "./login-button";

const Navigation = () => {
    if (!navigationList) {
        return <div></div>;
    }

    return (
        <div className="flex">
            <ul className="flex">
                {navigationList.map((page) => {
                    return (
                        <li key={page.name}>
                            <ActiveLink
                                href={page.href}
                                customClassName={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer`}
                                activeClassName="btn-primary--active"
                            >
                                <a>{page.name}</a>
                            </ActiveLink>
                        </li>
                    );
                })}
            </ul>

            <LoginButton />
            <CartBar />
        </div>
    );
};

export default Navigation;
