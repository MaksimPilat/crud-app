import React, { useEffect, useState } from "react";
import TabsLayout from "../components/TabsLayout";
import Toast, { IToast, ToastType } from "../components/Toast";
import Loader from "../components/Loader";
import Table from "../components/Table";
import EmployeeRow from "../components/EmployeeRow";
import EmployeeEditor from "../components/EmployeeEditor";
import { IEmployee, addEmployee, deleteEmployee, getAllEmployees, updateEmployee } from "../api/employees";

const Employees: React.FC = () => {
  const [data, setData] = useState<IEmployee[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [toast, setToast] = useState<IToast>({ message: "" });
  const [editor, setEditor] = useState<{ data?: IEmployee; isOpen: boolean }>({ isOpen: false });

  useEffect(() => {
    fetchData().then(() => setLoader(false));
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const data: IEmployee[] = await getAllEmployees();
      setData(data);
    } catch (err) {
      showToast({ type: ToastType.Error, message: "Error while fetching data." });
      console.error(err);
    }
  };

  const addData = async (newArea: Omit<IEmployee, "id">): Promise<void> => {
    try {
      setLoader(true);
      const { id }: IEmployee = await addEmployee(newArea);
      setData((prevData) => [...prevData, { ...newArea, id }]);
      showToast({
        type: ToastType.Success,
        message: "Employee has been added successfully.",
      });
    } catch (err) {
      showToast({ type: ToastType.Error, message: "Error while adding data." });
      console.error(err);
    } finally {
      setLoader(false);
      setEditor({ isOpen: false });
    }
  };

  const editData = async (newArea: IEmployee): Promise<void> => {
    try {
      setLoader(true);
      await updateEmployee(newArea);
      setData((prevData) => prevData.map((item) => (item.id === newArea.id ? newArea : item)));
      showToast({
        type: ToastType.Success,
        message: "Employee has been updated successfully.",
      });
    } catch (err) {
      showToast({ type: ToastType.Error, message: "Error while updating data." });
      console.error(err);
    } finally {
      setLoader(false);
      setEditor({ isOpen: false });
    }
  };

  const deleteData = async (id: number): Promise<void> => {
    try {
      setLoader(true);
      await deleteEmployee(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      showToast({
        type: ToastType.Success,
        message: "Employee has been removed successfully.",
      });
    } catch (err) {
      showToast({ type: ToastType.Error, message: "Error while deleting data." });
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  const openEditor = (data?: IEmployee) => {
    setEditor({ data, isOpen: true });
  };

  const closeEditorWithDelay = () => {
    setTimeout(() => {
      setEditor({ isOpen: false });
    }, 200);
  };

  const showToast = ({ type, message }: IToast) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast({ message: "" });
    }, 3000);
  };

  return (
    <TabsLayout>
      <div className="mt-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <label onClick={() => openEditor()} className="btn btn-sm btn-neutral px-12 w-10" htmlFor="my_modal_6">
              Add
            </label>
          </div>
          {loader ? (
            <Loader />
          ) : (
            <Table columnNames={["", "Name", "Position", "Actions"]}>
              {data.map((item: IEmployee, index: number) => (
                <EmployeeRow
                  key={item.id}
                  id={item.id}
                  index={index}
                  name={item.name}
                  position={item.position}
                  onEdit={openEditor}
                  onDelete={deleteData}
                />
              ))}
            </Table>
          )}
        </div>
      </div>
      {toast.message && <Toast type={toast.type} message={toast.message} />}
      {editor.isOpen && (
        <EmployeeEditor
          {...editor.data}
          onCancel={closeEditorWithDelay}
          onApply={(data) => (editor.data ? editData(data as IEmployee) : addData(data as Omit<IEmployee, "id">))}
        />
      )}
    </TabsLayout>
  );
};

export default Employees;
