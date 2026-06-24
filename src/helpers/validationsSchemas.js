
import * as yup from "yup";

export const FORM_SCHEMA = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  email: yup.string().email("Email inválido").required("El email es obligatorio"),
  message: yup.string().min(10, "El mensaje debe tener al menos 10 caracteres").required("El mensaje es obligatorio"),
});
