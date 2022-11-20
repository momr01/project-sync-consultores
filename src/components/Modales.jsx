import { Modal } from "antd";
import { ManageConsForm } from "./index";

const Modales = ({ isOpen, setIsOpen, add }) => (
  <Modal
    centered
    open={isOpen}
    onCancel={() => setIsOpen(false)}
    footer={null}
    width={1000}
  >
    <ManageConsForm add={add} setIsOpen={setIsOpen} />
  </Modal>
);

export default Modales;
