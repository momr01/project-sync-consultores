import { configureStore } from "@reduxjs/toolkit";
import EmployeesSlice from "./EmployeesSlice";

const Store = configureStore({
  reducer: {
    employees: EmployeesSlice,
  },
});

export default Store;
