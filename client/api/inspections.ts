import { getAuthHeaders } from './helper';

export interface IInspection {
  id: number;
  date: Date;
  equipmentId: number;
  employeeId: number;
  result: boolean;
  causeOfFailure?: string;
}

export interface IFetchedInspection extends Omit<IInspection, 'date'> {
  date: string;
  employeeName: string;
}

const URL = 'http://localhost:3001/api/data/inspections/';

export const addInspection = async (
  reqData: Omit<IInspection, 'id'>
): Promise<IInspection> => {
  try {
    const res: Response = await fetch(URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reqData),
    });
    const newEquipment: IInspection = await res.json();
    return newEquipment;
  } catch (err) {
    throw err;
  }
};

export const getAllInspections = async (
  equipmentId: number
): Promise<IFetchedInspection[]> => {
  try {
    const res: Response = await fetch(URL + equipmentId, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(((await res.json()) as Error).message);
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
    const res: Response = await fetch(URL + id, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        date,
        equipmentId,
        employeeId,
        result,
        causeOfFailure,
      } as Omit<IInspection, 'id'>),
    });
  } catch (err) {
    throw err;
  }
};

export const deleteInspection = async (id: number): Promise<void> => {
  try {
    const res: Response = await fetch(URL + id, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  } catch (err) {
    throw err;
  }
};
