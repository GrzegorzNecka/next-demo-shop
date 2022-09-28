import { ActiveLink } from "components/ActiveLink";
import CartBar from "components/Cart/CartBar";
import React from "react";
import { navigationList } from "utils/navigationList";
import LoginButton from "./LoginButton";

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
