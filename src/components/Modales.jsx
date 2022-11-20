import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { setModalState } from "../app/EmployeesSlice";
import { ManageConsForm } from "./index";

const Modales = ({ isOpen, setIsOpen, add }) => {
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(setModalState())
    setIsOpen(false)
  }

  return (
  <Modal
    centered
    open={isOpen}
    //onCancel={() => setIsOpen(false)}
    onCancel={closeModal}
    footer={null}
    width={1000}
  >
    <ManageConsForm add={add} setIsOpen={setIsOpen} />
  </Modal>
)}

export default Modales;
