import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Minimum 3 characters required"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  rememberMe: yup.boolean()

});

export const forgotPasswordSchema = yup.object().shape({
  username: yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: yup.string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"), // Validation for matching
});

// ==========================  ******* ==========================  

// Here we have the validation schemas for the modals in UI:

export const productSchema = yup.object().shape({
  name: yup
    .string()
    .required("Product name is required")
    .min(3, "Name must be at least 3 characters"),
  
  barcode: yup
    .string()
    .required("Barcode is required")
    .matches(/^[0-9]+$/, "Barcode must be only numbers"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be greater than zero"),

  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .min(0, "Quantity cannot be negative"),

  isTaxApplicable: yup
    .string()
    .required("Please select tax status"),
});

export const customerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Full name is required")
    .min(3, "Name must be at least 3 characters"),
  
  contact: yup
    .string()
    .required("Contact number is required")
    .matches(/^[0-9+]+$/, "Invalid contact number"),

  email: yup
    .string()
    .email("Invalid email address")
    .nullable()
    .notRequired(),

  status: yup
    .string()
    .required("Status is required"),
});

export const warehouseSchema = yup.object().shape({
  name: yup.string().required("Warehouse name is required").min(3, "Min 3 characters"),
  location: yup.string().required("Location is required"),
  manager: yup.string().required("Manager name is required"),
  phone: yup
    .string()
    .required("Contact number is required")
    .matches(/^[0-9-]+$/, "Invalid phone number"),
  status: yup.string().required("Status is required"),
});