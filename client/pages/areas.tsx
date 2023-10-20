import React, { useEffect, useState } from "react";
import TabsLayout from "../components/TabsLayout";
import Toast, { IToast, ToastType } from "../components/Toast";
import Loader from "../components/Loader";
import Table from "../components/Table";
import AreaRow from "../components/AreaRow";
import AreaEditor from "../components/AreaEditor";
import { IArea, addArea, deleteArea, getAllAreas, updateArea } from "../api/areas";

const Areas: React.FC = () => {
  const [data, setData] = useState<IArea[]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [toast, setToast] = useState<IToast>({ message: "" });
  const [editor, setEditor] = useState<{ data?: IArea; isOpen: boolean }>({ isOpen: false });

  useEffect(() => {
    fetchData().then(() => setLoader(false));
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const data: IArea[] = await getAllAreas();
      setData(data);
    } catch (err) {
      showToast({ type: ToastType.Error, message: "Error while fetching data." });
      console.error(err);
    }
  };

  const addData = async (newArea: Omit<IArea, "id">): Promise<void> => {
    try {
      setLoader(true);
      const { id }: IArea = await addArea(newArea);
      setData((prevData) => [...prevData, { ...newArea, id }]);
      showToast({
        type: ToastType.Success,
        message: "Area has been added successfully.",
      });
    } catch (err) {
      showToast({ type: ToastType.Error, message: "Error while adding data." });
      console.error(err);
    } finally {
      setLoader(false);
      setEditor({ isOpen: false });
    }
  };

  const editData = async (newArea: IArea): Promise<void> => {
    try {
      setLoader(true);
      await updateArea(newArea);
      setData((prevData) => prevData.map((item) => (item.id === newArea.id ? newArea : item)));
      showToast({
        type: ToastType.Success,
        message: "Area has been updated successfully.",
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
      await deleteArea(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      showToast({
        type: ToastType.Success,
        message: "Area has been removed successfully.",
      });
    } catch (err) {
      showToast({ type: ToastType.Error, message: "Error while deleting data." });
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  const openEditor = (data?: IArea) => {
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
            <Table columnNames={["", "Name", "Actions"]}>
              {data.map((item: IArea, index: number) => (
                <AreaRow
                  key={item.id}
                  id={item.id}
                  index={index}
                  name={item.name}
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
        <AreaEditor
          {...editor.data}
          onCancel={closeEditorWithDelay}
          onApply={(data) => (editor.data ? editData(data as IArea) : addData(data as Omit<IArea, "id">))}
        />
      )}
    </TabsLayout>
  );
};

export default Areas;
