import React from "react";
import { IEmployee } from "../api/employees";

export interface IEmployeeRow extends IEmployee {
  index: number;
  onDelete: (id: number) => Promise<void>;
  onEdit: (data: IEmployee) => void;
}

const EmployeeRow: React.FC<IEmployeeRow> = ({ id, index, name, position, onDelete, onEdit }) => {
  const handleDelete = async () => {
    await onDelete(id);
  };

  const handleEdit = () => {
    onEdit({ id, name, position });
  };

  return (
    <tr>
      <th>{String(index + 1)}</th>
      <td>{name}</td>
      <td>{position}</td>
      <td>
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn btn-ghost hover:bg-transparent text-lg px-3 pb-2">
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

export default EmployeeRow;
