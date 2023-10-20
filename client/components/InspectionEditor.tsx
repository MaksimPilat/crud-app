import React, { useState, useEffect, useRef } from "react";
import { IFetchedInspection } from "../api/inspections";
import { IEmployee, getAllEmployees } from "../api/employees";

export interface IInspectionEditor extends Partial<Omit<IFetchedInspection, "equipmentId">> {
  equipmentId: number;
  onApply?: (data: IFetchedInspection | Omit<IFetchedInspection, "id">) => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
}

interface IInspectionEditorData {
  employees: IEmployee[];
}

const InspectionEditor: React.FC<IInspectionEditor> = ({
  id,
  date,
  equipmentId,
  employeeId,
  result,
  causeOfFailure,
  onApply,
  onCancel,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [data, setData] = useState<IInspectionEditorData>();
  const [error, setError] = useState<boolean>(false);

  const dateInputRef = useRef<HTMLInputElement>(null);
  const resultInputRef = useRef<HTMLInputElement>(null);
  const employeeInputRef = useRef<HTMLSelectElement>(null);
  const causeInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const employees: IEmployee[] = await getAllEmployees();
      setData((prevData) => ({ ...prevData, employees: employees }));
      return employees;
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleApply = () => {
    const dateValue: string = dateInputRef.current?.value || "";
    const selectedEmployee: HTMLOptionElement | undefined = employeeInputRef.current?.selectedOptions[0];

    if (!selectedEmployee) return showError();

    const employeeIdValue: number = Number(selectedEmployee.dataset.id);
    const employeeNameValue: string = selectedEmployee.value;
    const resultValue: boolean = resultInputRef.current?.checked || false;
    const causeValue: string | undefined = causeInputRef.current?.value;

    const inspection: Omit<IFetchedInspection, "id"> = {
      date: dateValue,
      employeeId: employeeIdValue,
      employeeName: employeeNameValue,
      equipmentId: equipmentId,
      result: resultValue,
      causeOfFailure: causeValue,
    };
    if (onApply) {
      if (id) onApply({ ...inspection, id });
      else onApply(inspection);
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
          <h3 className="font-bold text-lg">Inspection Editor</h3>

          <input
            ref={dateInputRef}
            type="date"
            name="inspection-date"
            min="2023-01-01"
            max={new Date().toISOString().split("T")[0]}
            defaultValue={date || new Date().toISOString().split("T")[0]}
            className="outline-none mt-4"
          />

          <div className="form-control w-full max-w-xs mt-2">
            <label className="label">
              <span className="label-text">Employee:</span>
            </label>
            <select ref={employeeInputRef} className="select select-bordered w-full max-w-xs">
              {data?.employees.map((employee) => (
                <option key={employee.id} data-id={employee.id} selected={employee.id === employeeId}>
                  {employee.name} | {employee.position}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control w-28 mt-4">
            <label className="label cursor-pointer">
              <span className="label-text">Result:</span>
              <input ref={resultInputRef} type="checkbox" className="toggle toggle-success" defaultChecked={result} />
            </label>
          </div>

          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Cause Of Failure:</span>
            </label>
            <textarea
              ref={causeInputRef}
              defaultValue={causeOfFailure}
              placeholder="Type here"
              className="textarea textarea-bordered textarea-md w-full max-w-xs"
            ></textarea>
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

export default InspectionEditor;
