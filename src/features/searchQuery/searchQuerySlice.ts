type PayloadAction = {
  type: "searchQuery/setSearchQuery";
  payload: string;
};

export function searchQueryReducer(state = "", action: PayloadAction) {
  switch (action.type) {
    case "searchQuery/setSearchQuery": {
      return action.payload;
    }
    default:
      return state;
  }
}
