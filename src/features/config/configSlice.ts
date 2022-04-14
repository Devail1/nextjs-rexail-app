type PayloadAction = {
  type: "searchQuery/setSearchQuery";
  payload: string;
};

const initialState = {
  currencySign: "₪",
};

export function configReducer(state = initialState, action: PayloadAction) {
  switch (action.type) {
    default:
      return state;
  }
}
