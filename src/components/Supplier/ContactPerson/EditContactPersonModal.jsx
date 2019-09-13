import React, { PureComponent } from "react";
import {Modal, ModalBody, ModalHeader, Button} from "reactstrap";

class EditContactPersonModal extends PureComponent {

  constructor(){
    super();

    this.state = {
      name: "",
      phoneNumber: "",
      emailOrPhone: ""
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    const { id, name, phoneNumber, emailOrPhone } = nextProps.supplier.contact;

    this.setState({
      id,
      name, phoneNumber,
      emailOrPhone
    })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = e => {
    e.preventDefault();

    const { id } = this.props.match.params;

    const ContactPerson = {
      id: this.state.id,
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
      emailOrPhone: this.state.emailOrPhone
    };

    this.props.updateSupplierContact(ContactPerson, id);
  };

  render() {

    return (
        <div className="add-contact">
          <Modal isOpen={this.props.isOpenEditContactModal} toggle={this.props.handleOpenEditContactModal()} >
            <ModalHeader>
              Tambah Kontak
            </ModalHeader>
            <ModalBody>
              <form action="">
                <div className="form-group">
                  <label htmlFor="name">Nama</label>
                  <input type="text" className="form-control" name="name" placeholder="Nama kontak" value={this.state.name || ''} onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Nomor telepon</label>
                  <input type="text" className="form-control" name="phoneNumber" placeholder="0812xxxxxxxx" value={this.state.phoneNumber || ''} onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label htmlFor="emailOrPhone">Email/Telepon</label>
                  <input type="text" className="form-control" name="emailOrPhone" placeholder="daniel@email.com" value={this.state.emailOrPhone || ''} onChange={this.onChange}/>
                </div>
              </form>
              <div className="action-button">
                <Button color="success" onClick={this.onSubmit}>Simpan</Button>
                <Button className="ml-3" color="secondary" onClick={this.props.handleOpenAddContactModal}>Batal</Button>
              </div>
            </ModalBody>
          </Modal>
        </div>
    );
  }
}

export default EditContactPersonModal;