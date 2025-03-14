export const selectAqua = state => state.water?.items || [];
export const selectIsError = state => state.water?.isError || null;
export const selectIsLoading = state => state.water?.isLoading || false;

export const selectActiveDate = state => state.water?.activeDate || null;
