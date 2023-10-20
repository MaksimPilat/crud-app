import React, { useState, useRef } from "react";
import { IArea } from "../api/areas";

export interface IAreaEditor extends Partial<IArea> {
  onApply?: (data: IArea | Omit<IArea, "id">) => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
}

const AreaEditor: React.FC<IAreaEditor> = ({ id, name, onApply, onCancel }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleApply = () => {
    const nameValue: string | undefined = nameInputRef.current?.value.trim();
    if (!nameValue) return showError();
    const equipment: Omit<IArea, "id"> = {
      name: nameValue,
    };

    if (onApply) {
      if (id) onApply({ ...equipment, id });
      else onApply(equipment);
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
          <h3 className="font-bold text-lg">Area Editor</h3>

          <div className="form-control w-full max-w-xs mt-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              ref={nameInputRef}
              type="text"
              placeholder="Area Name"
              defaultValue={name}
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

export default AreaEditor;
