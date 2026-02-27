import Swal from "sweetalert2";

export type TSuccessAlertProps = {
  message: string;
  timer?: number;
};

export type TResponseError = {
  data?: { message?: string };
  message?: string;
  error?: string;
};
export type TErrorAlertProps = {
  error: TResponseError;
};

export const successAlert = ({
  message,
  timer,
  title = true,
  confirmButton = false,
  icon = false,
}: {
  message: string;
  timer?: number;
  title?: boolean;
  confirmButton?: boolean;
  icon?: boolean;
}) => {
  Swal.fire({
    icon: icon ? "success" : undefined,
    title: title ? "Success" : undefined,
    text: message,
    showConfirmButton: confirmButton,
    confirmButtonText: "Okay",
    timer: timer,
  });
};


export const errorAlert = ({ error }: any): void => {
  Swal.fire({
    icon: "error",
    title: "Failed!!",
    confirmButtonText: "Okay",
    text:
      error?.data?.message ||
      error?.message ||
      error?.error?.slice(10) ||
      "Something went wrong. Please try again later.",
  });
};

// Swal.fire({
//     html: `
//         <div class="text-center pt-4 pb-2">
//           <p class="leading-7">
//             An invitation has sent to that persons E-mail. After accepting the invitation he/she will be on board.
//           </p>
//         </div>
//       `,
//     width: "600px",
//     showCancelButton: false,
//     confirmButtonText: "Okay",
//     showConfirmButton: true,
//     reverseButtons: true,
//     customClass: {
//       confirmButton: "text-white py-2 px-4 rounded-full w-40",
//       cancelButton: "py-2 px-4 rounded-full w-40",
//     },
//   }).then((res) => {
//     if (res.isConfirmed) {
//       console.log(values);
//     }
//   });
