/* eslint-disable @next/next/no-img-element */
import { useCartState } from "components/Cart/Context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { ProductListItems } from "../types";

export const ProductListItem = ({ data }: { data: ProductListItems }) => {
    const cartState = useCartState();

    const handleOnClick = () => {
        const newItem = {
            id: data.id,
            price: data.price,
            title: data.title,
            count: 1,
            imgUrl: data.thumbnailUrl,
            slug: data.slug,
        };

        cartState.addItemToCart(newItem);
    };

    return (
        <div className="p-8">
            <div className="w-full bg-white md:aspect-w-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <Image
                    src={data.thumbnailUrl}
                    alt={data.thumbnailAlt}
                    className="w-full h-full  lg:w-full lg:h-full mix-blend-multiply"
                    layout="responsive"
                    width={4}
                    height={3}
                    objectFit="contain"
                    objectPosition="center"
                />
            </div>

            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <Link href={`/product/${data.slug}`}>
                            <a className="hover:underline">
                                <span aria-hidden="true" className="">
                                    {data.title}
                                </span>
                            </a>
                        </Link>
                    </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">{data.priceWithCurrency}</p>
            </div>
            <div className="pt-4">
                <button className={` mb-0 w-3/4 text-blackfont-semibold btn-custom-primary`} onClick={handleOnClick}>
                    dodaj do koszyka
                </button>
            </div>
        </div>
    );
};
