import { useRouter } from 'next/router';
import { getAuthHeaders } from './helper';

export interface IEquipment {
  id: number;
  name: string;
  areaId: number;
  areaName: string;
  isWorking: boolean;
}

const URL = 'http://localhost:3001/api/data/equipments/';

export const addEquipment = async (
  reqData: Omit<IEquipment, 'id'>
): Promise<IEquipment> => {
  try {
    const res: Response = await fetch(URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reqData),
    });
    const newEquipment: IEquipment = await res.json();
    return newEquipment;
  } catch (err) {
    throw err;
  }
};

export const getAllEquipment = async (
  isWorking?: boolean
): Promise<IEquipment[]> => {
  try {
    const query =
      isWorking === undefined ? '' : `?isWorking=${String(isWorking)}`;
    const res: Response = await fetch(URL + query, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(((await res.json()) as Error).message);
    const data: IEquipment[] = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const getEquipment = async (id: number): Promise<IEquipment> => {
  try {
    const res: Response = await fetch(URL + id, {
      headers: getAuthHeaders(),
    });
    const data: IEquipment = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateEquipment = async ({
  id,
  name,
  areaId,
  areaName,
  isWorking,
}: IEquipment): Promise<void> => {
  try {
    const res: Response = await fetch(URL + id, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ name, areaId, areaName, isWorking } as Omit<
        IEquipment,
        'id'
      >),
    });
  } catch (err) {
    throw err;
  }
};

export const deleteEquipment = async (id: number): Promise<void> => {
  try {
    const res: Response = await fetch(URL + id, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  } catch (err) {
    throw err;
  }
};
