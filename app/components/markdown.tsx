import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { MarkdownResult } from "types/types";

const Markdown = ({ children }: { children: MarkdownResult }) => {
    return (
        <MDXRemote
            {...children}
            components={{
                a: ({ href, ...props }) => {
                    if (typeof href === "undefined") {
                        return <a {...props}></a>;
                    }

                    if (process.env.NEXT_PUBLIC_HOST && href.startsWith(process.env.NEXT_PUBLIC_HOST)) {
                        return (
                            <Link legacyBehavior href={href}>
                                <a {...props}></a>
                            </Link>
                        );
                    }

                    return <a rel="noopener noreferrer" href={href} {...props}></a>;
                },
            }}
        />
    );
};

export default Markdown;
