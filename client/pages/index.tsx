import { useState, useEffect } from "react";
import TabsLayout from "../components/TabsLayout";
import Table from "../components/Table";
import EquipmentRow from "../components/EquipmentRow";
import Toast, { IToast, ToastType } from "../components/Toast";
import Loader from "../components/Loader";
import EquipmentEditor from "../components/EquipmentEditor";
import { addEquipment, updateEquipment, deleteEquipment, IEquipment, getAllEquipment } from "../api/equipments";

const Home: React.FC = () => {
  const [data, setData] = useState<IEquipment[]>([]);
  const [filter, setFilter] = useState<boolean | undefined>();
  const [loader, setLoader] = useState<boolean>(true);
  const [toast, setToast] = useState<IToast>({ message: "" });
  const [editor, setEditor] = useState<{ data?: IEquipment; isOpen: boolean }>({ isOpen: false });

  useEffect(() => {
    fetchData().then(() => setLoader(false));
  }, []);

  useEffect(() => {
    setLoader(true);
    fetchData(filter).then(() => setLoader(false));
  }, [filter]);

  const fetchData = async (isWorking?: boolean): Promise<void> => {
    try {
      const data: IEquipment[] = await getAllEquipment(isWorking);
      setData(data);
    } catch (err) {
      showToast({ type: ToastType.Error, message: "Error while fetching data." });
      console.error(err);
    }
  };

  const addData = async (newEquipment: Omit<IEquipment, "id">): Promise<void> => {
    try {
      setLoader(true);
      const { id }: IEquipment = await addEquipment(newEquipment);
      setData((prevData) => [...prevData, { ...newEquipment, id }]);
      showToast({
        type: ToastType.Success,
        message: "Equipment has been added successfully.",
      });
    } catch (err) {
      showToast({ type: ToastType.Error, message: "Error while adding data." });
      console.error(err);
    } finally {
      setLoader(false);
      setEditor({ isOpen: false });
    }
  };

  const editData = async (newEquipment: IEquipment): Promise<void> => {
    try {
      setLoader(true);
      await updateEquipment(newEquipment);
      setData((prevData) => prevData.map((item) => (item.id === newEquipment.id ? newEquipment : item)));
      showToast({
        type: ToastType.Success,
        message: "Equipment has been updated successfully.",
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
      await deleteEquipment(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      showToast({
        type: ToastType.Success,
        message: "Equipment has been removed successfully.",
      });
    } catch (err) {
      showToast({ type: ToastType.Error, message: "Error while deleting data." });
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  const openEditor = (data?: IEquipment) => {
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
            <div className="join">
              <button
                onClick={() => setFilter(undefined)}
                className={`btn btn-sm join-item ${filter === undefined && "btn-active"}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter(true)}
                className={`btn btn-sm join-item ${filter === true && "btn-active"}`}
              >
                Work
              </button>
              <button
                onClick={() => setFilter(false)}
                className={`btn btn-sm join-item ${filter === false && "btn-active"}`}
              >
                Not Work
              </button>
            </div>
            <label onClick={() => openEditor()} className="btn btn-sm btn-neutral px-12 w-10" htmlFor="my_modal_6">
              Add
            </label>
          </div>
          {loader ? (
            <Loader />
          ) : (
            <Table columnNames={["", "Name", "Area Name", "Is Working", "Actions"]}>
              {data.map((item: IEquipment, index: number) => (
                <EquipmentRow
                  key={item.id}
                  id={item.id}
                  index={index}
                  name={item.name}
                  areaId={item.areaId}
                  areaName={item.areaName}
                  isWorking={item.isWorking}
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
        <EquipmentEditor
          {...editor.data}
          onCancel={closeEditorWithDelay}
          onApply={(data) => (editor.data ? editData(data as IEquipment) : addData(data as Omit<IEquipment, "id">))}
        />
      )}
    </TabsLayout>
  );
};

export default Home;
