export type AlertModel = {
  isDisplay: boolean;
  type: AlertType;
  description: string;
};

export type AlertType = "error" | "warning" | "info" | "success";

export const initAlertModel: AlertModel = {
  isDisplay: false,
  type: "error",
  description: "",
};
