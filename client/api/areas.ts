export interface IArea {
  id: number;
  name: string;
}

export const addArea = async (reqData: Omit<IArea, "id">): Promise<IArea> => {
  try {
    const res: Response = await fetch(`http://localhost:3001/api/areas/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    const res: Response = await fetch("http://localhost:3001/api/areas");
    const data: IArea[] = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateArea = async ({ id, name }: IArea): Promise<void> => {
  try {
    const res: Response = await fetch(`http://localhost:3001/api/areas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name } as Omit<IArea, "id">),
    });
  } catch (err) {
    throw err;
  }
};

export const deleteArea = async (id: number): Promise<void> => {
  try {
    const res: Response = await fetch(`http://localhost:3001/api/areas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    throw err;
  }
};
