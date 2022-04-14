import { cartReducer } from "features/cart/cartSlice";
import { productsCatalogReducer } from "features/productsCatalog/productsCatalogSlice";
import React, { ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

export default function WithReduxProvider(Component: React.ComponentType): React.ComponentType {
  return function WithReduxProviderComponent(props: any) {
    const [store, setStore] = useState(createStore(cartReducer));

    const rootReducer = combineReducers({ cart: cartReducer, products: productsCatalogReducer });

    useEffect(() => {
      const composeEnhancers =
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

      setStore(createStore(rootReducer, composeEnhancers));
    }, []);

    return (
      <Provider store={store}>
        <Component {...props}></Component>
      </Provider>
    );
  };
}
// type HOC = (Component: React.ComponentType) => React.ComponentType;
// Or, if you want to be more specific:
// type HOC = <T extends OwnProps>(Component: React.ComponentType<T>) => React.ComponentType<T>

// export const WithReduxProvider: HOC = <T extends OwnProps>(
//   Component: React.ComponentType<T>,
// ): React.ComponentType<T> => (props) => (
//   <Provider store={store}>
//    <Component {...props} />
//   </ <Provider>
// );
