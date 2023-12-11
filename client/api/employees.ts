import { getAuthHeaders } from './helper';

export interface IEmployee {
  id: number;
  name: string;
  position: string;
}

const URL = 'http://localhost:3001/api/data/employees/';

export const addEmployee = async (
  reqData: Omit<IEmployee, 'id'>
): Promise<IEmployee> => {
  try {
    const res: Response = await fetch(URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reqData),
    });
    const newEmployee: IEmployee = await res.json();
    return newEmployee;
  } catch (err) {
    throw err;
  }
};

export const getAllEmployees = async (): Promise<IEmployee[]> => {
  try {
    const res: Response = await fetch(URL, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(((await res.json()) as Error).message);
    const data: IEmployee[] = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateEmployee = async ({
  id,
  name,
  position,
}: IEmployee): Promise<void> => {
  try {
    const res: Response = await fetch(URL + id, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ name, position } as Omit<IEmployee, 'id'>),
    });
  } catch (err) {
    throw err;
  }
};

export const deleteEmployee = async (id: number): Promise<void> => {
  try {
    const res: Response = await fetch(URL + id, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  } catch (err) {
    throw err;
  }
};
