import { createAction, createSlice } from "@reduxjs/toolkit";
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
    email: "jb@jb.com",
    password: "12345678",
    url_photo: "./img/foto_perfil.jpg",
    biography: "",
  },
  {
    id: "2",
    name: "Jim",
    surname: "Green",
    role: "user",
    phone: 155677789,
    division: "Software Factory",
    subdivision: "Back-end",
    //tags: ["nice", "developer"],
    email: "jg@jg.com",
    password: "12345678",
    url_photo: "./img/foto_perfil.jpg",
    biography: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
    finibus aliquam eros, ac cursus ex iaculis quis. Curabitur
    tincidunt in arcu in pulvinar. Nullam ultrices congue mattis.
    Mauris molestie quis velit sed gravida. Ut ut nisl eget nunc
    rutrum maximus sodales in ipsum. Pellentesque sed ornare mauris.
    In mi risus, varius a finibus eget, interdum sed neque. Nunc ac
    elit id lectus mollis rutrum ac sit amet libero. Vestibulum
    efficitur justo vel pulvinar commodo. Donec sit amet orci vel dui
    volutpat aliquet a euismod nunc. Cras hendrerit, libero id tempus
    ultricies, orci eros ultricies nibh, id pellentesque diam ex ac
    orci. Suspendisse a lobortis nisl.`,
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
    email: "jb2@jb.com",
    password: "12345678",
    url_photo: "./img/foto_perfil.jpg",
    biography: "",
  },
  {
    id: "4",
    name: "Joe",
    surname: "Black",
    role: "user",
    phone: 155677789,
    division: "SAP",
    subdivision: "SAP2",
    //tags: ["nice", "developer"],
    email: "jb3@jb.com",
    password: "12345678",
    url_photo: "./img/foto_perfil.jpg",
    biography: "",
  },
];

/**
 * initialState
 * estados iniciales.
 * employeesState = estado general de empleados
 * employeesItems = listado de todos los empleados registrados en la DB
 * employeeItem = se usará sólo cuando se desee separar un empleado de la lista anterior
 * changesSaved = true si los cambios al editar un empleado se guardan correctamente / false si no se ha procedido con la edicion
 */
const initialState = {
  employeesState: false,
  employeesItems: data,
  employeeItem: [],
  changesSaved: false,
  searchItems: [],
};

/**
 * constantes para volver al estado inicial
 * revertAll para que todos los estados vuelvan a valor inicial
 * reverChangesSaved para volver a su valor inicial, ÚNICAMENTE al estado changesSaved
 */
export const revertAll = createAction("REVERT_ALL");
export const revertChangesSaved = createAction("REVERT_CHANGESSAVED");
export const revertSearch = createAction("REVERT_SEARCH");

const EmployeesSlice = createSlice({
  initialState,
  name: "employees",
  //extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  extraReducers: (builder) => {
    builder.addCase(revertChangesSaved, (state, action) => {
      state.changesSaved = false;
    });
    builder.addCase(revertAll, () => initialState);
    builder.addCase(revertSearch, (state, action) => {
      state.searchItems = [];
    });
  },
  reducers: {
    /**
     *
     * @param {*} state
     * @param {*} action
     * reducer que carga en employeesItems listado de todos los empleados traídos desde la DB
     */
    setEmployeesList: (state, action) => {
      state.employeesItems = action.payload;
    },
    /**
     *
     * @param {*} state
     * @param {*} action
     * reducer para agregar un nuevo empleado a la DB
     */
    setAddEmployee: (state, action) => {
      state.employeesItems.push(action.payload);
      toast.success(`Empleado agregado`, {
        style: {
          borderRadius: "10px",
          fontSize: "1.3rem",
          background: "#CCF6B6",
          color: "#000",
        },
      });
    },
    /**
     *
     * @param {*} state
     * @param {*} action
     * reducer para editar un empleado desde el perfil del admin o personal de RRHH
     * implica la posibilidad de modificar todos los campos disponibles
     */
    setEditEmployee: (state, action) => {
      let employeeEdited = [];
      let dataEmployed = {};

      const itemIndex = state.employeesItems.findIndex(
        (emp) => emp.id === action.payload.id
      );

      if (itemIndex !== -1) {
        if (
          action.payload.data.name === state.employeesItems[itemIndex].name &&
          action.payload.data.last_name ===
            state.employeesItems[itemIndex].last_name &&
          action.payload.data.phone == state.employeesItems[itemIndex].phone &&
          action.payload.data.email === state.employeesItems[itemIndex].email &&
          action.payload.data.password ===
            state.employeesItems[itemIndex].password &&
          action.payload.data.division ===
            state.employeesItems[itemIndex].division &&
          action.payload.data.subdivision ===
            state.employeesItems[itemIndex].subdivision
        ) {
          toast.error(`Sin cambios para actualizar`, {
            style: {
              borderRadius: "10px",
              background: "#FFB0B0",
              fontSize: "1.3rem",
              color: "#FF0000",
            },
          });
        } else {
          // dataEmployed = {
          //   id: itemIndex+1,
          //   name: action.payload.data.name
          // }

          // console.log(dataEmployed)
          //state.employeesItems = state.employeesItems.splice(itemIndex, 1);

          toast.success(`Se actualizaron los datos del consultor`, {
            style: {
              borderRadius: "10px",
              fontSize: "1.3rem",
              background: "#CCF6B6",
              color: "#000",
            },
          });
          state.changesSaved = true;
        }
      }
    },
    /**
     *
     * @param {*} state
     * @param {*} action
     * reducer para editar un empleado desde el perfil del mismo consultor o usuario
     * implica la posibilidad de modificar sólo algunos datos como
     * url_photo
     * biography
     * phone
     * email
     * password
     */
    setEditConsultor: (state, action) => {
      let employeeEdited = [];
      let dataEmployed = {};

      const itemIndex = state.employeesItems.findIndex(
        (emp) => emp.id === action.payload.id
      );

      if (itemIndex !== -1) {
        if (
          action.payload.data.url_photo ===
            state.employeesItems[itemIndex].url_photo &&
          action.payload.data.biography ===
            state.employeesItems[itemIndex].biography &&
          action.payload.data.phone == state.employeesItems[itemIndex].phone &&
          action.payload.data.email === state.employeesItems[itemIndex].email &&
          action.payload.data.password ===
            state.employeesItems[itemIndex].password
        ) {
          toast.error(`Sin cambios para actualizar`, {
            style: {
              borderRadius: "10px",
              background: "#FFB0B0",
              fontSize: "1.3rem",
              color: "#FF0000",
            },
          });
        } else {
          // dataEmployed = {
          //   id: itemIndex+1,
          //   name: action.payload.data.name
          // }

          // console.log(dataEmployed)
          //state.employeesItems = state.employeesItems.splice(itemIndex, 1);

          toast.success(`Se actualizaron los datos del consultor`, {
            style: {
              borderRadius: "10px",
              fontSize: "1.3rem",
              background: "#CCF6B6",
              color: "#000",
            },
          });
          state.changesSaved = true;
        }
      }
    },
    setDeleteEmployee: (state, action) => {},
    /**
     *
     * @param {*} state
     * @param {*} action
     * reducer para extraer de la lista de todos los empleados, uno solo
     * para así poder consumir sus datos
     */
    setOneEmployee: (state, action) => {
      state.employeeItem = [];
      const itemIndex = state.employeesItems.findIndex(
        (emp) => emp.id === action.payload.id
      );

      if (itemIndex !== -1) {
        state.employeeItem = state.employeesItems[itemIndex];
      }
    },
    setOneByEmailPass: (state, action) => {},
    setSearchItems: (state, action) => {
      state.searchItems = action.payload.data;
    },
  },
});

export const {
  setEmployeesList,
  setAddEmployee,
  setOneEmployee,
  setEditEmployee,
  setEditConsultor,
  setSearchItems,
} = EmployeesSlice.actions;

//exporto estados
export const selectEmpState = (state) => state.employees.employeesState;
export const selectEmpItems = (state) => state.employees.employeesItems;
export const selectOneEmp = (state) => state.employees.employeeItem;
export const selectChangesSaved = (state) => state.employees.changesSaved;
export const selectSearchItems = (state) => state.employees.searchItems;

export default EmployeesSlice.reducer;

export const fetchAllEmployees = () => (dispatch) => {
  axios
    .get("https://reqres.in/api/users?per_page=12")
    .then((response) => {
      dispatch(setEmployeesList(response.data.data));
    })
    .catch((err) => console.log(err));
};