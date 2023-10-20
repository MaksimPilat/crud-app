import React from "react";
import { IFetchedInspection } from "../api/inspections";
import Indicator from "./Indicator";

export interface IInspectionRow extends IFetchedInspection {
  index: number;
  onDelete: (id: number) => Promise<void>;
  onEdit: (data: IFetchedInspection) => void;
}

const InspectionRow: React.FC<IInspectionRow> = ({
  id,
  index,
  date,
  equipmentId,
  employeeId,
  employeeName,
  result,
  causeOfFailure,
  onDelete,
  onEdit,
}: IInspectionRow) => {
  const handleDelete = async () => {
    await onDelete(id);
  };

  const handleEdit = () => {
    onEdit({
      id,
      date,
      equipmentId,
      employeeId,
      employeeName,
      result,
      causeOfFailure,
    });
  };

  return (
    <tr>
      <th>{String(index + 1)}</th>
      <td>{date}</td>
      <td>{employeeName}</td>
      <td>{<Indicator flag={result} />}</td>
      <td>{causeOfFailure}</td>
      <td>
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn btn-ghost hover:bg-transparent text-lg px-3">
            ...
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-md bg-base-200 rounded-box w-52">
            <li>
              <label onClick={handleEdit} htmlFor="my_modal_6">
                Edit
              </label>
            </li>
            <li>
              <a onClick={handleDelete} className="text-red-500 hover:text-red-500">
                Delete
              </a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default InspectionRow;
