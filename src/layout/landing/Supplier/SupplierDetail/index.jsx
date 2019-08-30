import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Table, Modal, ModalHeader, ModalBody } from "reactstrap";
import {
  getSupplier,
  getSupplierContact,
  updateSupplier,
  updateSupplierContact,
  deleteSupplier
} from "../../../../actions/supplierActions";
import { getProductsBySupplierId } from "../../../../actions/productActions";
import ContactPerson from "../../../../components/Supplier/ContactPerson";

import "./styles.scss";

class SupplierDetail extends PureComponent{

  constructor(){
    super();

    this.state = {
      isReadOnlyMode: true,
      isOpenAddContactModal: false,
      id: 0,
      objectID: "",
      supplierName: "",
      city: "",
      address: "",
      note: "",
      supplier: {},
      products: [],
      contact: {},
      productCode: "",
      productName: "",
      name: "",
      phone: "",
      emailOrPhone: "",
      selectedContactId: 0
    }

  }

  handleUpdateMode = () => {
    this.setState(prevState => ({
      isReadOnlyMode: !prevState.isReadOnlyMode
    }))
  };

  handleAddContact = id => e => {
    const { id: supplier_id } = this.props.match.params;

    this.setState(prevState => ({
      isOpenAddContactModal: !prevState.isOpenAddContactModal,
      selectedContactId: id
    }));

    this.props.getSupplierContact(supplier_id, id);
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

  componentWillReceiveProps(nextProps){
    const { id, objectID, supplierName, city, address, note } = nextProps.supplier.supplier;

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
          <td><Button onClick={this.handleAddContact(value.id)}>Ubah</Button></td>
        </tr>
    ))
  }

  render() {
    return (
        <div className="container supplier-detail">
            <div className="row header">
              <h3 className="display-4">Supplier</h3>
            </div>
          <div className="row">
            <div className="col-md-6 left">
              <div className="detail-form">
                <form action="">
                  <div className="form-group">
                    <label htmlFor="supplierName" className="col-form-label-sm">Nama Supplier: </label>
                      <input type="text"
                             id="supplierName"
                             name="supplierName"
                             className="form-control"
                             value={this.state.supplierName}
                             onChange={this.handleInputChange}
                             disabled={this.state.isReadOnlyMode}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="supplierCity" className="col-form-label-sm">Kota</label>
                    <input type="text"
                           id="supplierCity"
                           name="city"
                           className="form-control"
                           value={this.state.city}
                           onChange={this.handleInputChange}
                           readOnly={this.state.isReadOnlyMode}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="supplierAddress" className="col-form-label-sm">Alamat: </label>
                    <textarea id="supplierAddress"
                              className="form-control"
                              name="address"
                              value={this.state.address}
                              onChange={this.handleInputChange}
                              readOnly={this.state.isReadOnlyMode}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="note" className="col-form-label-sm">Catatan:</label>
                    <textarea id="note"
                              className="form-control"
                              name="note"
                              value={this.state.note}
                              onChange={this.handleInputChange}
                              readOnly={this.state.isReadOnlyMode}/>
                  </div>
                  <div className="form-group">
                    <Button onClick={this.handleUpdateMode} disabled={!this.state.isReadOnlyMode}>Mode Edit</Button>
                    <Button onClick={this.handleSubmitUpdate} disabled={this.state.isReadOnlyMode}>Simpan Perubahan</Button>
                    <Button color="danger" onClick={this.handleDeleteSupplier}>Hapus Supplier</Button>
                  </div>
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
              <div className="contact-table">
                <h3 className="mb-2">Kontak Supplier <Button className="ml-2" size="sm" onClick={this.handleAddContact()}>Tambah</Button></h3>
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

            </div>
          </div>
          <ContactPerson
              {...this.props}
              isOpenAddContactModal={this.state.isOpenAddContactModal}
              getSupplierContact={this.props.getSupplierContact}
              handleOpenAddContactModal={this.handleAddContact}
          />
        </div>
    );
  }

}

const mapStateToProps = state => ({
  supplier: state.supplier,
  products: state.product.products,
  contact: state.supplier.contact
});

export default connect(mapStateToProps, {
  getSupplier,
  getSupplierContact,
  getProductsBySupplierId,
  updateSupplier,
  updateSupplierContact,
  deleteSupplier
})(SupplierDetail);