import { getAuthHeaders } from './helper';

export interface IArea {
  id: number;
  name: string;
}

const URL = 'http://localhost:3001/api/data/areas/';

export const addArea = async (reqData: Omit<IArea, 'id'>): Promise<IArea> => {
  try {
    const res: Response = await fetch(URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reqData),
    });
    const newArea: IArea = await res.json();
    return newArea;
  } catch (err) {
    throw err;
  }
};

export const getAllAreas = async () => {
  try {
    const res: Response = await fetch(URL, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(((await res.json()) as Error).message);
    const data: IArea[] = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateArea = async ({ id, name }: IArea): Promise<void> => {
  try {
    const res: Response = await fetch(URL + id, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ name } as Omit<IArea, 'id'>),
    });
  } catch (err) {
    throw err;
  }
};

export const deleteArea = async (id: number): Promise<void> => {
  try {
    const res: Response = await fetch(URL + id, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  } catch (err) {
    throw err;
  }
};
