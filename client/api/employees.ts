export interface IEmployee {
  id: number;
  name: string;
  position: string;
}

export const addEmployee = async (reqData: Omit<IEmployee, "id">): Promise<IEmployee> => {
  try {
    const res: Response = await fetch(`http://localhost:3001/api/employees/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    const res: Response = await fetch(`http://localhost:3001/api/employees`);
    const data: IEmployee[] = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateEmployee = async ({ id, name }: IEmployee): Promise<void> => {
  try {
    const res: Response = await fetch(`http://localhost:3001/api/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name } as Omit<IEmployee, "id">),
    });
  } catch (err) {
    throw err;
  }
};

export const deleteEmployee = async (id: number): Promise<void> => {
  try {
    const res: Response = await fetch(`http://localhost:3001/api/employees/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    throw err;
  }
};
