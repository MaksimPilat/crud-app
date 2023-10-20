export interface IInspection {
  id: number;
  date: Date;
  equipmentId: number;
  employeeId: number;
  result: boolean;
  causeOfFailure?: string;
}

export interface IFetchedInspection extends Omit<IInspection, "date"> {
  date: string;
  employeeName: string;
}

export const addInspection = async (reqData: Omit<IInspection, "id">): Promise<IInspection> => {
  try {
    const res: Response = await fetch(`http://localhost:3001/api/inspections/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });
    const newEquipment: IInspection = await res.json();
    return newEquipment;
  } catch (err) {
    throw err;
  }
};

export const getAllInspections = async (equipmentId: number): Promise<IFetchedInspection[]> => {
  try {
    const res: Response = await fetch(`http://localhost:3001/api/inspections/${equipmentId}`);
    const data: IFetchedInspection[] = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateInspection = async ({
  id,
  date,
  equipmentId,
  employeeId,
  result,
  causeOfFailure,
}: IInspection): Promise<void> => {
  try {
    const res: Response = await fetch(`http://localhost:3001/api/inspections/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, equipmentId, employeeId, result, causeOfFailure } as Omit<IInspection, "id">),
    });
  } catch (err) {
    throw err;
  }
};

export const deleteInspection = async (id: number): Promise<void> => {
  try {
    const res: Response = await fetch(`http://localhost:3001/api/inspections/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    throw err;
  }
};
