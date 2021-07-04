import { format } from "date-fns";

export const formatDate = (date) => {
  return format(new Date(date), "dd MMM yyyy");
};

export const formatDateByYear = (date) => {
  return format(new Date(date), "yyyy");
};
