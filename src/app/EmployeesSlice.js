import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const data = [
  {
    id: "1",
    name: "John",
    surname: "Brown",
    role: "admin",
    phone: 155677789,
    division: "Software Factory",
    subdivision: "Front-end",
    //tags: ["nice", "developer", "loser", "cool", "teacher"],
    email: "1@1.com",
    password: "12345",
    url_photo: "/",
    biography: "",
  },
  {
    id: "2",
    name: "Jim",
    surname: "Green",
    role: "consultor",
    phone: 155677789,
    division: "Software Factory",
    subdivision: "Back-end",
    //tags: ["nice", "developer"],
    email: "1@1.com",
    password: "12345",
    url_photo: "/",
    biography: "",
  },
  {
    id: "3",
    name: "John",
    surname: "Brown",
    role: "admin",
    phone: 155677789,
    division: "SAP",
    subdivision: "MM",
    //tags: ["nice", "developer"],
    email: "1@1.com",
    password: "12345",
    url_photo: "/",
    biography: "",
  },
  {
    id: "4",
    name: "Joe",
    surname: "Black",
    role: "consultor",
    phone: 155677789,
    division: "SAP",
    subdivision: "MM",
    //tags: ["nice", "developer"],
    email: "1@1.com",
    password: "12345",
    url_photo: "/",
    biography: "",
  },
];

const initialState = {
  employeesState: false,
  employeesItems: data,
  employeeItem: [],
};

const EmployeesSlice = createSlice({
  initialState,
  name: "employees",
  reducers: {
    setEmployeesList: (state, action) => {
      state.employeesItems = action.payload;
    },
    setAddEmployee: (state, action) => {
      state.employeesItems.push(action.payload);
      toast.success(`Empleado agregado`, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    },
    setEditEmployee: (state, action) => {},
    setDeleteEmployee: (state, action) => {},
    setOneEmployee: (state, action) => {
      state.employeeItem = [];
      const itemIndex = state.employeesItems.findIndex(
        (emp) => emp.id === action.payload.id
      );

      if (itemIndex !== -1) {
        state.employeeItem = state.employeesItems[itemIndex];
      }
    },
  },
});

export const { setEmployeesList, setAddEmployee, setOneEmployee } =
  EmployeesSlice.actions;

//exporto estados
export const selectEmpState = (state) => state.employees.employeesState;
export const selectEmpItems = (state) => state.employees.employeesItems;
export const selectOneEmp = (state) => state.employees.employeeItem;

export default EmployeesSlice.reducer;

export const fetchAllEmployees = () => (dispatch) => {
  axios
    .get("https://reqres.in/api/users?per_page=12")
    .then((response) => {
      dispatch(setEmployeesList(response.data.data));
    })
    .catch((err) => console.log(err));
};
