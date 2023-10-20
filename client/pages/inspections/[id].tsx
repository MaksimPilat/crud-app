import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Toast, { IToast, ToastType } from "../../components/Toast";
import Loader from "../../components/Loader";
import Table from "../../components/Table";
import InspectionRow from "../../components/InspectionRow";
import Layout from "../../components/Layout";
import InspectionEditor from "../../components/InspectionEditor";
import {
  IFetchedInspection,
  IInspection,
  addInspection,
  deleteInspection,
  getAllInspections,
  updateInspection,
} from "../../api/inspections";
import { IEquipment, getEquipment } from "../../api/equipments";

interface IInspectionsPageData {
  equipmentId: number;
  equipmentName: string;
  inspections: IFetchedInspection[];
}

const Inspections: React.FC = () => {
  const [data, setData] = useState<IInspectionsPageData>({ equipmentId: NaN, equipmentName: "", inspections: [] });
  const [loader, setLoader] = useState<boolean>(true);
  const [toast, setToast] = useState<IToast>({ message: "" });
  const [editor, setEditor] = useState<{ data?: Omit<IFetchedInspection, "equipmentId">; isOpen: boolean }>({
    isOpen: false,
  });

  const router = useRouter();

  useEffect(() => {
    fetchData().then(() => setLoader(false));
  }, []);

  const fetchData = async (): Promise<void> => {
    let equipmentId: number = Number(router.query.id);
    if (isNaN(equipmentId)) {
      const match: RegExpMatchArray | null = window.location.pathname.match(/\/inspections\/(\d+)/);
      equipmentId = match ? Number(match[1]) : NaN;
    }
    if (isNaN(equipmentId)) return;

    try {
      const { name: equipmentName }: IEquipment = await getEquipment(equipmentId);
      const inspections: IFetchedInspection[] = await getAllInspections(equipmentId);
      setData({ equipmentId: equipmentId, equipmentName, inspections });
    } catch (err) {
      showToast({ type: ToastType.Error, message: "Error while fetching data." });
      console.error(err);
    }
  };

  const addData = async (fetchedInspection: Omit<IFetchedInspection, "id">) => {
    const { employeeName, ...rest } = fetchedInspection;

    const formattedInspection: Omit<IInspection, "id"> = {
      ...rest,
      date: fetchedInspection.date ? new Date(fetchedInspection.date) : new Date(),
    };

    try {
      setLoader(true);
      const { id }: IInspection = await addInspection(formattedInspection);
      const inspectionForTable: IFetchedInspection = {
        ...fetchedInspection,
        id,
        date: formattedInspection.date.toISOString().split("T")[0],
      };
      setData(({ inspections, ...rest }) => ({
        ...rest,
        inspections: [...inspections, inspectionForTable],
      }));
      showToast({
        type: ToastType.Success,
        message: "Inspection has been added successfully.",
      });
    } catch (err) {
      showToast({ type: ToastType.Error, message: "Error while adding data." });
      console.error(err);
    } finally {
      setLoader(false);
      setEditor({ isOpen: false });
    }
  };

  const editData = async (fetchedInspection: IFetchedInspection) => {
    const { date, employeeName, ...rest } = fetchedInspection;
    const newInspection = { ...rest, date: new Date(date) };

    try {
      setLoader(true);
      await updateInspection(newInspection);
      setData(({ inspections, ...rest }) => ({
        ...rest,
        inspections: inspections.map((item) => (item.id === newInspection.id ? fetchedInspection : item)),
      }));
      showToast({
        type: ToastType.Success,
        message: "Inspection has been updated successfully.",
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
      await deleteInspection(id);
      setData(({ inspections, ...rest }) => ({ ...rest, inspections: inspections.filter((item) => item.id !== id) }));
      showToast({
        type: ToastType.Success,
        message: "Inspection has been removed successfully.",
      });
    } catch (err) {
      showToast({ type: ToastType.Error, message: "Error while deleting data." });
      console.error(err);
    } finally {
      setLoader(false);
    }
  };

  const showToast = ({ type, message }: IToast) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast({ message: "" });
    }, 3000);
  };

  const openEditor = (data?: IFetchedInspection) => {
    setEditor({ data, isOpen: true });
  };

  const closeEditorWithDelay = () => {
    setTimeout(() => {
      setEditor({ isOpen: false });
    }, 200);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-semibold">
          {data.equipmentName} (#{router.query.id})
        </h1>
        <div className="flex justify-between">
          <a onClick={router.back} className="text-lg link link-accent link-hover">
            Back
          </a>
          <label onClick={() => openEditor()} className="btn btn-sm btn-neutral px-12 w-10" htmlFor="my_modal_6">
            Add
          </label>
        </div>
        {loader ? (
          <Loader />
        ) : (
          <Table columnNames={["", "Date", "Employee Name", "Result", "Cause Of Failure", "Actions"]}>
            {data.inspections.map((item: IFetchedInspection, index: number) => (
              <InspectionRow
                key={item.id}
                id={item.id}
                index={index}
                date={item.date}
                equipmentId={item.equipmentId}
                employeeId={item.employeeId}
                employeeName={item.employeeName}
                result={item.result}
                causeOfFailure={item.causeOfFailure}
                onEdit={openEditor}
                onDelete={deleteData}
              />
            ))}
          </Table>
        )}
      </div>
      {toast.message && <Toast type={toast.type} message={toast.message} />}

      {editor.isOpen && (
        <InspectionEditor
          {...editor.data}
          equipmentId={data.equipmentId}
          onCancel={closeEditorWithDelay}
          onApply={(data) =>
            editor.data ? editData(data as IFetchedInspection) : addData(data as Omit<IFetchedInspection, "id">)
          }
        />
      )}
    </Layout>
  );
};

export default Inspections;
