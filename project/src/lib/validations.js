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
  contact: yup.string().required("Contact number is required").matches(/^[0-9-]+$/, "Invalid phone number"),
  status: yup.string().required("Status is required"),
});

export const transferSchema = yup.object().shape({
  transferDate: yup.date().required("Transfer date is required"),
  fromWarehouse: yup.string().required("Source warehouse is required"),
  toWarehouse: yup.string()
    .required("Destination warehouse is required")
    .notOneOf([yup.ref('fromWarehouse')], "Source and Destination cannot be the same"),
  itemDetails: yup.string().required("Item details are required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .min(1, "Quantity must be at least 1"),
  remarks: yup.string().nullable(),
});

export const adjustmentSchema = yup.object().shape({
  warehouse: yup.string().required("Warehouse is required"),
  product: yup.string().required("Product name is required"),
  type: yup.string().oneOf(["Addition", "Subtraction"], "Invalid type").required("Adjustment type is required"),
  quantity: yup.number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be greater than 0")
    .required("Quantity is required"),
  reason: yup.string().required("Please provide a reason for adjustment"),
  status: yup.string().required("Status is required"),
});

export const grnSchema = yup.object().shape({
  supplier: yup.string().required("Supplier name is required"),
  warehouse: yup.string().required("Warehouse is required"),
  itemsCount: yup.number()
    .typeError("Items count must be a number")
    .min(1, "At least 1 item must be received")
    .required("Number of items is required"),
  status: yup.string().required("Status is required"),
  date: yup.date().typeError("Valid date is required").required("Date is required"),
});

export const tenantSchema = yup.object().shape({
  code: yup.string().required("Tenant code is required"),
  name: yup.string().required("Tenant name is required"),
  contact: yup.string().required("Contact number is required"),
  location: yup.string().required("Physical location is required"),
  url: yup.string().url("Invalid URL format").required("Tenant URL is required"),
  status: yup.number().oneOf([0, 1]).default(1),
  isTaxApplicable: yup.boolean().default(false),
  taxNumber: yup.string().when("isTaxApplicable", {
    is: true,
    then: (schema) => schema.required("Tax Number is required when tax is applicable"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
export const branchSchema = yup.object().shape({
  code: yup.string().required("Branch code is required"),
  name: yup.string().required("Branch name is required"),
  contact: yup.string().required("Contact number is required"),
  location: yup.string().required("Location is required"),
  url: yup.string().url("Must be a valid URL").required("URL is required"),
  status: yup.number().oneOf([0, 1]).default(1),
});