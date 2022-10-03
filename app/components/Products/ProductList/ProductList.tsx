import React from "react";

const ProductList = ({ children }: { children: React.ReactNode }) => {
    return (
        <ul className="relative  bg-white w-full mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
            {children}
        </ul>
    );
};

export default ProductList;
