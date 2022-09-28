import { ActiveLink } from "components/ActiveLink";
import React from "react";
import LoginButton from "./LoginButton";

const Navigation = () => {
    return (
        <div>
            <ActiveLink
                href="/"
                customClassName={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer`}
                activeClassName="btn-primary--active"
            >
                <a> strona główna</a>
            </ActiveLink>

            <LoginButton />
        </div>
    );
};

export default Navigation;
