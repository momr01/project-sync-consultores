import { createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { URL } from "../helpers/url";

/**
 * initialState
 * estados iniciales.
 * employeesState = estado general de empleados
 * employeesItems = listado de todos los empleados registrados en la DB
 * employeeItem = se usará sólo cuando se desee separar un empleado de la lista anterior
 * changesSaved = true si los cambios al editar un empleado se guardan correctamente / false si no se ha procedido con la edicion
 */
const initialState = {
  employeesItems: [],
  employeeItem: [],
  employeeToEdit: [],
  changesSaved: false,
  searchItems: [],
  modalIsOpen: false,
};

/**
 * constantes para volver al estado inicial
 * revertAll para que todos los estados vuelvan a valor inicial
 * reverChangesSaved para volver a su valor inicial, ÚNICAMENTE al estado changesSaved
 */
export const revertAll = createAction("REVERT_ALL");
export const revertChangesSaved = createAction("REVERT_CHANGESSAVED");
export const revertModalState = createAction("REVERT_MODAL");
export const revertSearch = createAction("REVERT_SEARCH");

const EmployeesSlice = createSlice({
  initialState,
  name: "employees",
  extraReducers: (builder) => {
    builder.addCase(revertChangesSaved, (state, action) => {
      state.changesSaved = false;
    });
    builder.addCase(revertAll, () => initialState);
    builder.addCase(revertSearch, (state, action) => {
      state.searchItems = [];
    });
    builder.addCase(revertModalState, (state, action) => {
      state.modalIsOpen = false;
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
      axios
        .post(`${URL}`, action.payload)
        .then((response) => {
          if (response.statusText === "OK") {
            toast.success(`Empleado agregado`, {
              style: {
                borderRadius: "10px",
                fontSize: "1.3rem",
                background: "#CCF6B6",
                color: "#000",
              },
            });
          }
        })
        .catch((err) => console.log(err));
    },
    /**
     *
     * @param {*} state
     * @param {*} action
     * reducer para editar un empleado desde el perfil del admin o personal de RRHH
     * implica la posibilidad de modificar todos los campos disponibles
     */
    setEditEmployee: (state, action) => {
      const itemIndex = state.employeesItems.findIndex(
        (emp) => emp._id === action.payload.id
      );

      if (itemIndex !== -1) {
        if (
          action.payload.data.name === state.employeesItems[itemIndex].name &&
          action.payload.data.surname ===
            state.employeesItems[itemIndex].surname &&
          action.payload.data.phone === state.employeesItems[itemIndex].phone &&
          action.payload.data.email === state.employeesItems[itemIndex].email &&
          action.payload.data.password ===
            state.employeesItems[itemIndex].password &&
          action.payload.data.division ===
            state.employeesItems[itemIndex].division &&
          action.payload.data.subdivision ===
            state.employeesItems[itemIndex].subdivision &&
          action.payload.data.biography ===
            state.employeesItems[itemIndex].biography &&
          action.payload.data.url_photo ===
            state.employeesItems[itemIndex].url_photo
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
          axios
            .put(`${URL}/${action.payload.id}`, action.payload.data)
            .then((response) => {
              toast.success(`Se actualizaron los datos del consultor`, {
                style: {
                  borderRadius: "10px",
                  fontSize: "1.3rem",
                  background: "#CCF6B6",
                  color: "#000",
                },
              });
              //}
            })
            .catch((err) => console.log(err));
          state.changesSaved = true;
        }
      }
    },
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
        (emp) => emp._id === action.payload.id
      );

      if (itemIndex !== -1) {
        state.employeeItem = state.employeesItems[itemIndex];
      }
    },
    /**
     *
     * @param {*} state
     * @param {*} action
     * reducer para separar del total de consultores, aquel que va a ser editado
     */
    setOneEmployeeToEdit: (state, action) => {
      state.employeeToEdit = action.payload;
    },
    /**
     *
     * @param {*} state
     * @param {*} action
     * reducer para separar del total de consultores, uno que será buscado
     * mediante id
     */
    setOneEmployeeById: (state, action) => {
      state.employeeItem = action.payload;
    },
    /**
     *
     * @param {*} state
     * @param {*} action
     * reducer para filtrar del total de consultores, aquellos que
     * el usuario desea buscar por nombre y/o apellido
     */
    setSearchItems: (state, action) => {
      state.searchItems = action.payload.data;
    },
    setModalState: (state, action) => {
      state.modalIsOpen = !state.modalIsOpen;
    },
  },
});

export const {
  setEmployeesList,
  setAddEmployee,
  setOneEmployee,
  setEditEmployee,
  setSearchItems,
  setOneEmployeeById,
  setOneEmployeeToEdit,
  setModalState,
} = EmployeesSlice.actions;

//exporto estados
export const selectOneEmpToEdit = (state) => state.employees.employeeToEdit;
export const selectEmpItems = (state) => state.employees.employeesItems;
export const selectOneEmp = (state) => state.employees.employeeItem;
export const selectChangesSaved = (state) => state.employees.changesSaved;
export const selectSearchItems = (state) => state.employees.searchItems;
export const selectModalState = (state) => state.employees.modalIsOpen;

export default EmployeesSlice.reducer;

/**
 *
 * @returns
 * se hace llamada a api para obtener el total de empleados (consultores
 * y administradores o personal de RRHH
 */
export const fetchAllEmployees = () => (dispatch) => {
  axios
    .get(`${URL}`)
    .then((response) => {
      dispatch(setEmployeesList(response.data));
    })
    .catch((err) => console.log(err));
};

/**
 *
 * @param {*} param0
 * @returns
 * se hace llamada a api para obtener un único empleado según id
 * y se destina a reducer setOneEmployeeById
 */
export const fetchOneEmployee =
  ({ id }) =>
  (dispatch) => {
    axios
      .get(`${URL}/${id}`)
      .then((response) => {
        dispatch(setOneEmployeeById(response.data));
      })
      .catch((err) => console.log(err));
  };

/**
 *
 * @param {*} param0
 * @returns
 * se hace llamada a api para obtener un único empleado según id y
 * se destina a setOneEmployeeToEdit
 */
export const fetchOneEmployeeToEdit =
  ({ id }) =>
  (dispatch) => {
    axios
      .get(`${URL}/${id}`)
      .then((response) => {
        dispatch(setOneEmployeeToEdit(response.data));
      })
      .catch((err) => console.log(err));
  };

/**
 *
 * @param {*} param0
 * @returns
 * se hace llamada a api para eliminar un empleado, a partir de un id
 * luego se hace llamada nuevamente al total
 * para así traer todos los que quedan sin el reciente eliminado
 */
export const deleteOneEmployee =
  ({ id }) =>
  (dispatch) => {
    axios
      .delete(`${URL}/${id}`)
      .then((response) => {
        dispatch(fetchAllEmployees());
      })
      .catch((err) => console.log(err));
  };

export const updateOneEmployee =
  ({ id, data }) =>
  (dispatch) => {
    const dataFromDB = [];
    axios
      .get(`${URL}/${id}`)
      .then((response) => {
        dataFromDB.push(response.data);

        if (
          dataFromDB[0].phone === data.phone &&
          dataFromDB[0].email === data.email &&
          dataFromDB[0].password === data.password &&
          dataFromDB[0].url_photo === data.url_photo &&
          dataFromDB[0].biography === data.biography
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
          axios
            .put(`${URL}/${id}`, data)
            .then((response) => {
              dispatch(setOneEmployeeToEdit({ id }));
              dispatch(setModalState());
              toast.success(`Se actualizaron los datos del consultor`, {
                style: {
                  borderRadius: "10px",
                  fontSize: "1.3rem",
                  background: "#CCF6B6",
                  color: "#000",
                },
              });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };
