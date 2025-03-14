export const selectWaterDayArray = state => state.water.waterDay;
export const selectIsError = state => state.water?.isError || null;
export const selectIsLoading = state => state.water?.isLoading || false;
export const selectWaterMonth = state => state.water.waterMonth;
export const selectCurrentDate = state => state.water.currentDate;
export const selectActiveDate = state => state.water?.activeDate || null;
