export const LIMIT = 10;
export const HOST =
  import.meta.env.VITE_APP_HOST_API != null
    ? import.meta.env.VITE_APP_HOST_API
    : "http://localhost:8081";

export const exito = {
  title: "Exito",
  message: "Se ha eliminado el usuario exitosamente",
  type: "info",
  insert: "top",
  container: "center",
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"],
  dismiss: {
    duration: 4000,
    onScreen: true,
  },
};

export const error = {
  title: "Error",
  message: "Hubo un problema al cargar los usuarios",
  type: "danger",
  insert: "top",
  container: "center",
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"],
  dismiss: {
    duration: 4000,
    onScreen: true,
  },
};

export const errorDelete = {
  title: "Error",
  message: "Hubo un problema al eliminar el usuario",
  type: "danger",
  insert: "top",
  container: "center",
  animationIn: ["animated", "fadeIn"],
  animationOut: ["animated", "fadeOut"],
  dismiss: {
    duration: 4000,
    onScreen: true,
  },
};
