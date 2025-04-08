import toast from "react-hot-toast";

export const notify = ({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) => toast[type](message);
