import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import {
  addBankAccount,
  addContactPerson,
  getSupplier,
  getSupplierContact,
  getBankAccount,
  updateSupplier,
  updateSupplierContact,
  updateBankAccount,
  deleteSupplier,
  deleteBankAccount
} from "../../../../actions/supplierActions";
import { getProductsBySupplierId } from "../../../../actions/productActions";
import ContactPerson from "../../../../components/Supplier/ContactPerson";
import AddBankAccountModal from "../../../../components/Supplier/BankAccount/AddBankAccountModal";
import EditBankAccountModal from "../../../../components/Supplier/BankAccount/EditBankAccountModal";

import "./styles.scss";

class SupplierDetail extends PureComponent{

  constructor(){
    super();

    this.state = {
      isReadOnlyMode: true,
      isOpenEditContactModal: false,
      isOpenAddContactModal: false,
      isOpenAddBankAccountModal: false,
      isOpenEditBankAccountModal: false,
      id: 0,
      objectID: "",
      supplierName: "",
      city: "",
      address: "",
      note: "",
      supplier: {},
      products: [],
      contact: {},
      bankAccount: {},
      productCode: "",
      productName: "",
      name: "",
      phone: "",
      emailOrPhone: "",
      selectedContactId: 0,
      selectedBankAccountId: 0
    }
  }

  getContactInitialState = () => {
    this.setState({
      id: 0,
      name: "",
      phone: "",
      emailOrPhone: ""
    })
  };

  handleUpdateMode = () => {
    this.setState(prevState => ({
      isReadOnlyMode: !prevState.isReadOnlyMode
    }))
  };

  handleOpenEditContactModal = id => e => {
    const { id: supplier_id } = this.props.match.params;

    this.setState(prevState => ({
      isOpenEditContactModal: !prevState.isOpenEditContactModal,
      selectedContactId: id
    }));

    this.props.getSupplierContact(supplier_id, id);

  };

  handleOpenAddContactModal = e => {
    this.setState(prevState => ({
      isOpenAddContactModal: !prevState.isOpenAddContactModal,
      id: 0,
      name: "",
      phone: "",
      emailOrPhone: ""
    }))
  };

  handleOpenAddBankAccountModal = e => {
    this.setState(prevState => ({
      isOpenAddBankAccountModal: !prevState.isOpenAddBankAccountModal
    }))
  };

  handleOpenEditBankAccountModal = id => e => {

    this.setState(prevState => ({
      isOpenEditBankAccountModal: !prevState.isOpenEditBankAccountModal,
    }));

      this.props.getBankAccount(id);
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  componentDidMount(){
    const { id } = this.props.match.params;

    this.props.getSupplier(id);
    this.props.getProductsBySupplierId(id);
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    const { id, objectID, supplierName, city, address, note } = nextProps.supplier.supplier;

    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      })
    }

    this.setState({
      id,
      objectID,
      supplierName,
      city,
      address,
      note,
    })
  }

  handleSubmitUpdate = (e) => {
    e.preventDefault();

    const supplier = {
      id: this.state.id,
      objectID: this.state.objectID,
      supplierName: this.state.supplierName,
      city: this.state.city,
      address: this.state.address,
      note: this.state.note
    };

    this.props.updateSupplier(supplier);
  };

  handleDeleteSupplier = (e) => {
    e.preventDefault();

    const { id } = this.props.match.params;

    this.props.deleteSupplier(id);
    this.props.history.push("/supplier");
    window.location.reload();
  };

  renderProductTable(){
    return this.props.products.map(value => (
        <tr key={value.id}>
          <td>{value.productCode}</td>
          <td>{value.productName}</td>
          <td>{value.costPrice}</td>
          <td>{value.retailPrice}</td>
          <td><Button><Link style={{color: '#ffff'}} className="text-decoration-none" to={`/product/${value.id}`}>Detail</Link></Button></td>
        </tr>
    ))
  }

  renderContactTable(){
    const { contactPerson = [] } = this.props.supplier.supplier;

    return contactPerson.map(value => (
        <tr key={value.id}>
          <td>{value.name}</td>
          <td>{value.phoneNumber}</td>
          <td>{value.emailOrPhone ? value.emailOrPhone : '-'}</td>
          <td>{this.props.security.user.role === "ADMIN" ? (<Button onClick={this.handleOpenEditContactModal(value.id)}>Ubah</Button>) : "-"}</td>
        </tr>
    ))
  }

  renderBankAccountTable(){
    const { bankAccounts = [] } = this.props.supplier.supplier;

    return bankAccounts.map(value => (
        <tr key={value.id}>
          <td>{value.accountName}</td>
          <td>{value.accountNumber}</td>
          <td>{value.bankName}</td>
          <td>{this.props.security.user.role === "ADMIN" ? <Button size="sm" onClick={this.handleOpenEditBankAccountModal(value.id)}>Detail</Button> : "-"}</td>
        </tr>
    ))
  }

  render() {
    const isAdmin = this.props.security.user.role === "ADMIN";

    return (
        <div className="container supplier-detail">
            <div className="row header">
              <h3 className="display-4">{this.state.supplierName}</h3>
            </div>
          <div className="row">
            <div className="col-md-6 left">
              <div className="detail-form">
                <form action="">
                  <div className="form-group">
                    <label htmlFor="supplierName" className="col-form-label">Nama Supplier: </label>
                      <input type="text"
                             id="supplierName"
                             name="supplierName"
                             className="form-control"
                             value={this.state.supplierName}
                             onChange={this.handleInputChange}
                             disabled={this.state.isReadOnlyMode}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="supplierCity" className="col-form-label">Kota</label>
                    <input type="text"
                           id="supplierCity"
                           name="city"
                           className="form-control"
                           value={this.state.city}
                           onChange={this.handleInputChange}
                           readOnly={this.state.isReadOnlyMode}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="supplierAddress" className="col-form-label">Alamat: </label>
                    <textarea id="supplierAddress"
                              className="form-control"
                              name="address"
                              value={this.state.address}
                              onChange={this.handleInputChange}
                              readOnly={this.state.isReadOnlyMode}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="note" className="col-form-label">Catatan:</label>
                    <textarea id="note"
                              className="form-control"
                              name="note"
                              value={this.state.note}
                              onChange={this.handleInputChange}
                              readOnly={this.state.isReadOnlyMode}/>
                  </div>
                  {isAdmin &&
                  <div className="form-group">
                    <Button onClick={this.handleUpdateMode}>Mode Edit</Button>
                    <Button color="success" onClick={this.handleSubmitUpdate} disabled={this.state.isReadOnlyMode}>Simpan Perubahan</Button>
                    {/*<Button color="danger" onClick={this.handleDeleteSupplier}>Hapus</Button>*/}
                  </div>}
                </form>
              </div>
            </div>
            <div className="col-md-6">
              <h3 className="mb-2">Barang yang terkait...</h3>
              <div className="product-table">
                <Table hover>
                  <thead>
                  <tr>
                    <th>Kode Barang</th>
                    <th>Nama Barang</th>
                    <th>Harga Beli</th>
                    <th>Harga Jual</th>
                    <th>#</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderProductTable()}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="contact-table" style={{overflowY: 'scroll'}}>
                <h3 className="mb-2">Kontak Supplier <Button className="ml-2" size="sm" onClick={this.handleOpenAddContactModal}>Tambah</Button></h3>
                <Table hover>
                  <thead>
                  <tr>
                    <th>Nama</th>
                    <th>No. Telepon</th>
                    <th>Alamat Email</th>
                    <th>#</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderContactTable()}
                  </tbody>
                </Table>
              </div>
            </div>
            <div className="col-md-6">
              <div className="bank-account-detail">
                <h3 className="mb-2">Informasi Rekening Bank
                  {isAdmin &&
                  <Button className="ml-2"
                          color="success"
                          size="sm"
                          onClick={this.handleOpenAddBankAccountModal}>Tambah
                  </Button>}
                </h3>
                <Table>
                  <thead>
                    <tr>
                      <th>Nama Rekening</th>
                      <th>No. Rekening</th>
                      <th>Nama Bank</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderBankAccountTable()}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          <ContactPerson
              {...this.props}
              addContact
              selectedId={this.state.selectedContactId}
              isOpenAddContactModal={this.state.isOpenAddContactModal}
              handleOpenAddContactModal={this.handleOpenAddContactModal}
          />
          <ContactPerson
              {...this.props}
              editContact
              isOpenEditContactModal={this.state.isOpenEditContactModal}
              handleOpenEditContactModal={this.handleOpenEditContactModal}
          />
          <AddBankAccountModal
              {...this.props}
              isOpenAddBankAccountModal={this.state.isOpenAddBankAccountModal}
              handleOpenAddBankAccountModal={this.handleOpenAddBankAccountModal}
          />
          <EditBankAccountModal
              {...this.props}
              isOpenEditBankAccountModalOpen={this.state.isOpenEditBankAccountModal}
              handleOpenEditBankAccountModal={this.handleOpenEditBankAccountModal}
          />
        </div>
    );
  }
}

const mapStateToProps = state => ({
  security: state.security,
  supplier: state.supplier,
  products: state.product.products,
  contact: state.supplier.contact,
  bankAccount: state.supplier.bankAccount,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  addBankAccount,
  addContactPerson,
  getSupplier,
  getSupplierContact,
  getBankAccount,
  getProductsBySupplierId,
  updateSupplier,
  updateSupplierContact,
  updateBankAccount,
  deleteSupplier,
  deleteBankAccount
})(SupplierDetail);