export interface IArea {
  id: number;
  name: string;
}

export interface IEquipment {
  id: number;
  name: string;
  areaId: number;
  isWorking: boolean;
}

export interface IFetchedEquipment extends IEquipment {
  areaName: string;
}

export interface IEmployee {
  id: number;
  name: string;
  position: string;
}

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

export interface IUser {
  id: number;
  username: string;
  password: string;
}
