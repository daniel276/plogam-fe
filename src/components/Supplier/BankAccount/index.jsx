import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import propTypes from "prop-types";

class BankAccount extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isReadOnlyMode: true,
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
    isBankAccountModalOpen: propTypes.bool.isRequired,
    handleOpenBankAccountModal: propTypes.func.isRequired
  };

  componentDidMount() {
    const { selectedBankAccountId } = this.state;

    this.props.getBankAccount(selectedBankAccountId)
  }

  UNSAFE_componentWillReceiveProps(nextProps){

    console.log('nex', nextProps);

    const {
      id,
      accountName,
      accountNumber,
      bankName,
      branch,
      address,
      phoneNumber,
      note
    } = nextProps.supplier.bankAccount;

    this.setState({
      id,
      accountName,
      accountNumber,
      bankName,
      branch,
      address,
      phoneNumber,
      note
    })
  }

  handleReadOnly = () => {
    this.setState(prevState => ({
      isReadOnlyMode: !prevState.isReadOnlyMode
    }))
  };

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

  }

  render() {

    const { bankAccount = {} } = this.props.supplier;

    console.log('bank acc', this.state);

    console.log('k', this.props.selectedId);

    return (
        <div className="add-bank-account">
          <Modal isOpen={this.props.isBankAccountModalOpen} toggle={this.props.handleOpenBankAccountModal()} >
            <ModalHeader toggle={this.props.handleOpenBankAccountModal()} charCode="X">Informasi Rekening Bank</ModalHeader>
            <ModalBody>
              <form action="">
                <div className="form-group">
                  <label htmlFor="accountName">Nama Rekening</label>
                  <input type="text"
                         className="form-control"
                         name="accountName"
                         disabled={this.state.isReadOnlyMode}
                         placeholder={"PT TRI ASIH"}
                         value={this.state.accountName || ''}
                         onChange={this.handleFormChange}/>
                </div>
                <div className="form-group">
                  <label htmlFor="accountNumber">Nomor Rekening</label>
                  <input type="text"
                         className="form-control"
                         name="accountNumber"
                         disabled={this.state.isReadOnlyMode}
                         value={this.state.accountNumber || '' }
                         onChange={this.handleFormChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="bankName">Nama Bank</label>
                  <input type="text"
                         className="form-control"
                         name="bankName"
                         disabled={this.state.isReadOnlyMode}
                         value={this.state.bankName || ''}
                         onChange={this.handleFormChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="branch">Cabang</label>
                  <input type="text"
                         className="form-control"
                         name="branch"
                         disabled={this.state.isReadOnlyMode}
                         value={this.state.branch || ''}
                         onChange={this.handleFormChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Alamat</label>
                  <input type="text"
                         className="form-control"
                         name="address"
                         disabled={this.state.isReadOnlyMode}
                         value={this.state.address || ''}
                         onChange={this.handleFormChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Nomor Telepon</label>
                  <input type="text"
                         className="form-control"
                         name="phoneNumber"
                         disabled={this.state.isReadOnlyMode}
                         value={this.state.phoneNumber || ''}
                         onChange={this.handleFormChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="note">Catatan</label>
                  <textarea name="note"
                            id="note"
                            className="form-control"
                            disabled={this.state.isReadOnlyMode}
                            placeholder="Catatan"
                            value={this.state.note || ''}
                            onChange={this.handleFormChange}/>
                </div>
              </form>
              <Button onClick={this.handleReadOnly}>Edit</Button>
              <Button className="ml-2" disabled={this.state.isReadOnlyMode} color="success" onClick={this.handleCreateBankAccount}>Simpan</Button>
            </ModalBody>
          </Modal>
        </div>
    );
  }
}

export default BankAccount;