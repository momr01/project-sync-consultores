export const colAdminPage = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Apellido",
    dataIndex: "lastname",
    key: "lastname",
  },
  {
    title: "Teléfono",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "División",
    dataIndex: "section",
    key: "section",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  { title: "Action", dataIndex: "action", key: "action" },
];

export const colConsultorPage = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Apellido",
    dataIndex: "lastname",
    key: "lastname",
  },
  {
    title: "Teléfono",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "División",
    dataIndex: "section",
    key: "section",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

export const formData = [
  {
    key: 1,
    label: "Nombre:",
    type: "text",
    placeholder: "Nombre del consultor",
    regist: "name",
  },
  {
    key: 2,
    label: "Apellido:",
    type: "text",
    placeholder: "Apellido del consultor",
    regist: "surname",
  },
  {
    key: 3,
    label: "Teléfono:",
    type: "tel",
    placeholder: "Teléfono del consultor",
    regist: "phone",
  },
  {
    key: 4,
    label: "Email:",
    type: "text",
    placeholder: "Email del consultor",
    regist: "email",
  },
  {
    key: 5,
    label: "Contraseña:",
    type: "password",
    placeholder: "Contraseña del consultor",
    regist: "password",
  },
];

export const formLoginData = [
  {
    key: 1,
    label: "Correo electrónico:",
    type: "text",
    regist: "email",
    isRequired: true,
    isPattern: /^([a-z0-9]+)[._-]?([a-z0-9]?)+[@][a-z]+[.][a-z]+[.]?[a-z]+$/,
    isMaxLength: null,
    isMinLength: null,
  },
  {
    key: 2,
    label: "Contraseña",
    type: "password",
    regist: "password",
    isRequired: true,
    isPattern: null,
    isMaxLength: 8,
    isMinLength: 8,
  },
];
