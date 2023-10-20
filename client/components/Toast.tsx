import React from "react";

export enum ToastType {
  Info = "alert-info",
  Success = "alert-success",
  Warning = "alert-warning",
  Error = "alert-error",
}

export interface IToast {
  type?: ToastType;
  message: string;
}

const Toast = ({ type, message }: IToast) => {
  return (
    <div className="toast">
      <div className={`alert ${type || ""}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
