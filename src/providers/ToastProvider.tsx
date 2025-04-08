import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        className: "",
        duration: 3000,
        style: {
          background: "#363636",
          color: "#fff",
        },
      }}
    />
  );
};
