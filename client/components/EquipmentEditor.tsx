import React, { useState, useEffect, useRef } from "react";
import { IEquipment } from "../api/equipments";
import { getAllAreas, IArea } from "../api/areas";

export interface IEquipmentEditor extends Partial<IEquipment> {
  onApply?: (data: IEquipment | Omit<IEquipment, "id">) => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
}

interface IEquipmentEditorData {
  areas: IArea[];
}

const EquipmentEditor: React.FC<IEquipmentEditor> = ({ id, name, areaId, isWorking, onApply, onCancel }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [data, setData] = useState<IEquipmentEditorData>();
  const [error, setError] = useState<boolean>(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const areaSelectRef = useRef<HTMLSelectElement>(null);
  const isWorkingInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const areas: IArea[] = await getAllAreas();
      setData((prevData) => ({ ...prevData, areas: areas }));
      return areas;
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleApply = () => {
    const nameValue: string | undefined = nameInputRef.current?.value.trim();
    const selectedArea: HTMLOptionElement | undefined = areaSelectRef?.current?.selectedOptions[0];

    if (!nameValue || !selectedArea) return showError();

    const areaIdValue: number = Number(selectedArea.dataset.id);
    const areaNameValue: string = selectedArea.value;
    const isWorkingValue: boolean = isWorkingInputRef.current?.checked || false;

    const equipment: Omit<IEquipment, "id"> = {
      name: nameValue,
      areaId: areaIdValue,
      areaName: areaNameValue,
      isWorking: isWorkingValue,
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
          <h3 className="font-bold text-lg">Equipment Editor</h3>

          <div className="form-control w-full max-w-xs mt-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              ref={nameInputRef}
              type="text"
              placeholder="Equipment Name"
              defaultValue={name}
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs mt-4">
            <label className="label">
              <span className="label-text">Area</span>
            </label>
            <select ref={areaSelectRef} className="select select-bordered w-full max-w-xs">
              {data?.areas.map((area) => (
                <option key={area.id} data-id={area.id} selected={area.id === areaId}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control w-36 mt-4">
            <label className="label cursor-pointer">
              <span className="label-text">Is Working:</span>
              <input
                ref={isWorkingInputRef}
                type="checkbox"
                className="toggle toggle-success"
                defaultChecked={isWorking}
              />
            </label>
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

export default EquipmentEditor;
