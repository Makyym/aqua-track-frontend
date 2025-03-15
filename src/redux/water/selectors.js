import { createSelector } from "@reduxjs/toolkit";

export const selectCurrentWaterDayArray = state => state.water.waterCurrentDay;
export const selectWaterDayArray = state => state.water.waterActiveDay;
export const selectIsError = state => state.water?.isError || null;
export const selectIsLoading = state => state.water.isLoading;
export const selectWaterMonth = state => state.water.waterMonth;
export const selectCurrentDate = state => state.water.currentDate;
export const selectActiveDate = state => state.water?.activeDate || null;

export const selectAllWaterForDay = createSelector([selectCurrentWaterDayArray], (entrys) => {
    const sum = entrys.reduce((accumulator, entry) => {
        return accumulator + entry.value;
    }, 0);
    return sum;
});