import { ReactNode } from "react";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

const List = <T extends unknown>(props: ListProps<T>) => {
  const { items, renderItem } = props;
  return <>{items?.map(renderItem)}</>;
};

export default List;
