export const selectUser = state => state.auth.user;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectIsError = state => state.auth.isError;
export const selectIsLoading = state => state.auth.isLoading;
export const selectDailyNorm = state => state.auth.user.dailyNorm;