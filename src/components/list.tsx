import {ReactNode, useState} from "react";

interface Props<T> {
    items: T[];
    renderItem: (item: T) => ReactNode;
}

const List = <T extends unknown>(props: Props<T>) => {
    const {items, renderItem} = props;
    return (
        <>
            {items.map(renderItem)}
        </>
    );
};

export default List