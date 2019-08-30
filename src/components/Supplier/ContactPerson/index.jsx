import React, { PureComponent } from "react";
import {Modal, ModalBody, ModalHeader, Button} from "reactstrap";
import propTypes from "prop-types";

class ContactPerson extends PureComponent {

  constructor(){
    super();

    this.state = {
      name: "",
      phoneNumber: "",
      emailOrPhone: ""
    }
  }

  static propTypes = {
    isOpenAddContactModal: propTypes.bool.isRequired,
    getSupplierContact: propTypes.func.isRequired,
    handleOpenAddContactModal: propTypes.func.isRequired
  }

  componentDidMount() {
    const { id: supplierId } = this.props.match.params;
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
      emailorPhone: this.state.emailOrPhone
    }

    this.props.updateSupplierContact(ContactPerson, id);
  }

  render() {

    console.log('cp', this.props);

    const { id, name, phoneNumber, emailOrPhone } = this.state;

    return (
        <div className="add-contact">
          <Modal isOpen={this.props.isOpenAddContactModal} toggle={this.props.handleOpenAddContactModal()} >
            <ModalHeader>
              Tambah Kontak
            </ModalHeader>
            <ModalBody>
              <form action="">
                <div className="form-group">
                  <label htmlFor="name">Nama</label>
                  <input type="text" className="form-control" name="name" placeholder="Nama kontak" value={name} onChange={this.onChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Nomor telepon</label>
                  <input type="text" className="form-control" name="phoneNumber" placeholder="081289667419" value={phoneNumber} onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <label htmlFor="emailOrPhone">Email/Telepon</label>
                  <input type="text" className="form-control" name="emailOrPhone" placeholder="Danieljuanda276@gmail.com" value={emailOrPhone} onChange={this.onChange}/>
                </div>
              </form>
              <div className="action-button">
                <Button color="success" onClick={this.onSubmit}>Simpan</Button>
                <Button className="ml-3" color="secondary" onClick={this.props.handleOpenAddContactModal()}>Batal</Button>
              </div>
            </ModalBody>
          </Modal>
        </div>
    );
  }

}

export default ContactPerson;