export interface IEquipment {
  id: number;
  name: string;
  areaId: number;
  areaName: string;
  isWorking: boolean;
}

export const addEquipment = async (reqData: Omit<IEquipment, "id">): Promise<IEquipment> => {
  try {
    const res: Response = await fetch(`http://localhost:3001/api/equipments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    });
    const newEquipment: IEquipment = await res.json();
    return newEquipment;
  } catch (err) {
    throw err;
  }
};

export const getAllEquipment = async (isWorking?: boolean): Promise<IEquipment[]> => {
  try {
    const query = isWorking === undefined ? "" : `?isWorking=${String(isWorking)}`;
    const res: Response = await fetch(`http://localhost:3001/api/equipments${query}`);
    const data: IEquipment[] = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const getEquipment = async (id: number): Promise<IEquipment> => {
  try {
    const res: Response = await fetch(`http://localhost:3001/api/equipments/${id}`);
    const data: IEquipment = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateEquipment = async ({ id, name, areaId, areaName, isWorking }: IEquipment): Promise<void> => {
  try {
    const res: Response = await fetch(`http://localhost:3001/api/equipments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, areaId, areaName, isWorking } as Omit<IEquipment, "id">),
    });
  } catch (err) {
    throw err;
  }
};

export const deleteEquipment = async (id: number): Promise<void> => {
  try {
    const res: Response = await fetch(`http://localhost:3001/api/equipments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    throw err;
  }
};
