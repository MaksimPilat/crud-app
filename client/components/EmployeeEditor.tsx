import React, { useState, useRef } from "react";
import { IEmployee } from "../api/employees";

export interface IEmployeeEditor extends Partial<IEmployee> {
  onApply?: (data: IEmployee | Omit<IEmployee, "id">) => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
}

const EmployeeEditor: React.FC<IEmployeeEditor> = ({ id, name, position, onApply, onCancel }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const positionInputRef = useRef<HTMLInputElement>(null);

  const handleApply = () => {
    const nameValue: string | undefined = nameInputRef.current?.value.trim();
    const positionValue: string | undefined = positionInputRef.current?.value.trim();
    if (!nameValue || !positionValue) return showError();
    const employee: Omit<IEmployee, "id"> = {
      name: nameValue,
      position: positionValue,
    };

    if (onApply) {
      if (id) onApply({ ...employee, id });
      else onApply(employee);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (onCancel) onCancel();
  };

  const showError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  return (
    <>
      <input type="checkbox" id="my_modal_6" className={`modal-toggle ${isOpen ? "modal-open" : ""}`} />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Employee Editor</h3>

          <div className="form-control w-full max-w-xs mt-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              ref={nameInputRef}
              type="text"
              placeholder="Employee Name"
              defaultValue={name}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs mt-4">
            <label className="label">
              <span className="label-text">Position</span>
            </label>
            <input
              ref={positionInputRef}
              type="text"
              placeholder="Employee Position"
              defaultValue={position}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          {error && <div className="text-error mt-4">Invalid data.</div>}

          <div className="modal-action">
            <label onClick={handleCancel} htmlFor="my_modal_6" className="btn">
              Cancel
            </label>
            <label onClick={handleApply} className="btn btn-neutral">
              Apply
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeEditor;
