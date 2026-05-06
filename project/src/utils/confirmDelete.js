import Swal from "sweetalert2";

export const confirmDelete = ({ item, data, setData, key = "name", entity = "Item" }) => {
  Swal.fire({
    title: "Are you sure?",
    text: `You want to delete "${item[key]}"? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "No, Keep it",
  }).then((result) => {
    if (result.isConfirmed) {

      const updatedData = data.filter((d) => d.id !== item.id);
      setData(updatedData);

      Swal.fire({
        title: "Deleted!",
        text: `${entity} has been removed successfully.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
};