import React from "react";
import { IEquipment } from "../api/equipments";
import Link from "next/link";
import Indicator from "./Indicator";

export interface IEquipmentRow extends IEquipment {
  index: number;
  onDelete: (id: number) => Promise<void>;
  onEdit: (data: IEquipment) => void;
}

const EquipmentRow: React.FC<IEquipmentRow> = ({
  id,
  index,
  name,
  areaId,
  areaName,
  isWorking,
  onDelete,
  onEdit,
}: IEquipmentRow) => {
  const handleDelete = async () => {
    await onDelete(id);
  };

  const handleEdit = () => {
    onEdit({ id, name, areaId, areaName, isWorking });
  };

  return (
    <tr>
      <th>{String(index + 1)}</th>
      <td>{name}</td>
      <td>{areaName}</td>
      <td>{<Indicator flag={isWorking} />}</td>
      <td>
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="btn btn-ghost hover:bg-transparent text-lg px-3 pb-2">
            ...
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-md bg-base-200 rounded-box w-52">
            <li>
              <Link href={`/inspections/${id}`}>Inspections</Link>
            </li>
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

export default EquipmentRow;
