import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import propTypes from "prop-types";

class AddBankAccountModal extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      accountName: "",
      accountNumber: "",
      bankName: "",
      branch: "",
      address: "",
      phoneNumber: "",
      note: ""
    }
  }

  static propTypes = {
    isOpenAddBankAccountModal: propTypes.bool.isRequired,
    handleOpenAddBankAccountModal: propTypes.func.isRequired
  };

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  handleFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleCreateBankAccount = () => {

    const { id: supplier_id } = this.props.match.params;

    const BankAccount = {
      id: this.state.id,
      accountName: this.state.accountName,
      accountNumber: this.state.accountNumber,
      bankName: this.state.bankName,
      branch: this.state.branch,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      note: this.state.note
    };

    this.props.addBankAccount(BankAccount, supplier_id)

  };

  render() {

    return (
        <div className="add-bank-account">
          <Modal isOpen={this.props.isOpenAddBankAccountModal} toggle={this.props.handleOpenAddBankAccountModal} >
            <ModalHeader toggle={this.props.handleOpenAddBankAccountModal} charCode="X">Tambah Rekening Bank</ModalHeader>
            <ModalBody>
              <form action="">
                <div className="form-group">
                  <label htmlFor="accountName">Nama Rekening</label>
                  <input type="text"
                         className="form-control"
                         name="accountName"
                         placeholder={"PT TRI ASIH"}
                         value={this.state.accountName || ''}
                         onChange={this.handleFormChange}/>
                  {this.state.errors.accountName && <div className="text-danger"><small>{this.state.errors.accountName}</small></div>}
                </div>
                <div className="form-group">
                  <label htmlFor="accountNumber">Nomor Rekening</label>
                  <input type="text"
                         className="form-control"
                         name="accountNumber"
                         value={this.state.accountNumber || '' }
                         onChange={this.handleFormChange} />
                  {this.state.errors.accountNumber && <div className="text-danger"><small>{this.state.errors.accountNumber}</small></div>}
                </div>
                <div className="form-group">
                  <label htmlFor="bankName">Nama Bank</label>
                  <input type="text"
                         className="form-control"
                         name="bankName"
                         value={this.state.bankName || ''}
                         onChange={this.handleFormChange} />
                  {this.state.errors.bankName && <div className="text-danger"><small>{this.state.errors.bankName}</small></div>}
                </div>
                <div className="form-group">
                  <label htmlFor="branch">Cabang</label>
                  <input type="text"
                         className="form-control"
                         name="branch"
                         value={this.state.branch || ''}
                         onChange={this.handleFormChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Alamat</label>
                  <input type="text"
                         className="form-control"
                         name="address"
                         value={this.state.address || ''}
                         onChange={this.handleFormChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Nomor Telepon</label>
                  <input type="text"
                         className="form-control"
                         name="phoneNumber"
                         value={this.state.phoneNumber || ''}
                         onChange={this.handleFormChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="note">Catatan</label>
                  <textarea name="note"
                            id="note"
                            className="form-control"
                            placeholder="Catatan"
                            value={this.state.note || ''}
                            onChange={this.handleFormChange}/>
                </div>
              </form>
              <Button className="ml-2" color="success" onClick={this.handleCreateBankAccount}>Simpan</Button>
            </ModalBody>
          </Modal>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(AddBankAccountModal);