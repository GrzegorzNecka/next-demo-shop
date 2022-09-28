import { useRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";
import type { AppProps } from "next/app";

interface ActiveLinkProps {
    children: React.ReactElement;
    href: string;
    activeClassName: string;
    customClassName: string;
    props?: AppProps;
}

const ActiveLink = ({ children, href, customClassName, activeClassName, ...props }: ActiveLinkProps) => {
    const router = useRouter();
    const currentRoute = router.pathname;
    const child = Children.only(children);
    const childClassName = child.props.className || "btn-primary--inactive";

    const isActiveLink = (href: string) => {
        let className = childClassName;

        if (href === currentRoute) {
            className = `btn-primary--active`;
        }

        return className;
    };

    const className = `${isActiveLink(href)} ${customClassName}`;

    return (
        <Link href={href} {...props}>
            {React.cloneElement(child, {
                className: className || null,
            })}
        </Link>
    );
};

//------- second approach

interface ActiveRouteLinkProps {
    children: React.ReactNode;
    href: string;
    style: string;
}

function ActiveRouteLink({ children, href, style }: ActiveRouteLinkProps) {
    const router = useRouter();
    const currentRoute = router.pathname;

    const isActiveLink = (href: string) => {
        let styleLink = `btn-primary--inactive`;

        if (href === currentRoute) {
            styleLink = `btn-primary--active`;
        }

        return styleLink;
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        router.push(href);
    };

    return (
        <a onClick={handleClick} className={`${isActiveLink(href)} ${style}`}>
            {children}
        </a>
    );
}

export { ActiveLink, ActiveRouteLink };
