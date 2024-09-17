import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        addCar: (state, action) => {
            state.push(action.payload);
        },
        eraseCar: (state, action) => {
            return state.filter(car => car.id !== action.payload);
        },
        toggleSeen: (state, action) => {
            const car = state.find(car => car.id === action.payload);
            if (car) {
                car.seen = !car.seen;
            }
        },
    },
});

export const { addCar, eraseCar, toggleSeen } = carsSlice.actions;

export const selectCars = state => state.cars;

export default carsSlice.reducer;
