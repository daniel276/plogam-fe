import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {Table, Button, Modal, ModalBody, ModalHeader} from "reactstrap";
import { getWarehouses, getWarehouse, addWarehouse, updateWarehouse } from "../../actions/stockActions";

import "./styles.scss";

class Warehouse extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      isOpenEditModal: false,
      isReadOnlyMode: true,
      id: 0,
      name: "",
      address: "",
      selectedId: 0,
      selectedName: "",
      selectedAddress: ""
    }
  }

  componentDidMount() {
    this.props.getWarehouses();
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    const { errors } = nextProps;

    const { id: selectedId, name: selectedName, address: selectedAddress } = nextProps.warehouse;

    this.setState({
      errors,
      id: selectedId,
      selectedName,
      selectedAddress
    })
  }

  onChangeForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleOpenEditModal = id => e => {
    this.setState(prevState => ({
      isOpenEditModal: !prevState.isOpenEditModal,
      selectedId: id
    }));

    this.props.getWarehouse(id);
  };

  handleReadOnlyMode = () => {
    this.setState(prevState => ({
      isReadOnlyMode: !prevState.isReadOnlyMode
    }))
  };

  handleSubmit = e => {
    e.preventDefault();

    const Warehouse = {
      name: this.state.name
    };
    this.props.addWarehouse(Warehouse)
  };

  handleUpdate = e => {
    e.preventDefault();

    const UpdatedWarehouse = {
      id: this.state.selectedId,
      name: this.state.selectedName,
      address: this.state.selectedAddress
    };

    this.props.updateWarehouse(UpdatedWarehouse)
  };

  renderWarehousesTable = () => {
    return this.props.warehouses.map(value => (
        <tr key={value.id}>
          <td>{value.id}</td>
          <td>{value.name}</td>
          <td><Button onClick={this.handleOpenEditModal(value.id)}>Edit</Button></td>
        </tr>
    ))
  };

  render() {
    return (
        <div className="container warehouse">
          <div className="jumbotron">
            <h3 className="display-4">Tambah Lokasi</h3>
          </div>
          <div className="row">
            <div className="add-warehouse col-md-6">
              <h3 className="mb-3">Tambah Lokasi Gudang</h3>
              <div className="add-form">
                <form action="">
                  <div className="form-group">
                    <label htmlFor="warehouseName" className="col-form-label">Nama Lokasi: </label>
                    <input type="text"
                           className="form-control"
                           placeholder="Tj. Beringin"
                           name="name"
                           value={this.state.name}
                           onChange={this.onChangeForm}
                    />
                    {this.state.errors && <div className="text-danger"><small>{this.state.errors.name}</small></div>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="warehouseAddress">Alamat: </label>
                    <textarea name="address" id="warehouseAddress" className="form-control" value={this.state.address} onChange={this.onChangeForm}>Alamat:</textarea>
                  </div>
                  <Button color="success" onClick={this.handleSubmit}>Simpan</Button>
                </form>
              </div>
            </div>
            <div className="warehouse-list col-md-6">
              <h3 className="ml-auto mr-auto mb-3">Daftar Lokasi</h3>
              <Table>
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Lokasi</th>
                  <th>#</th>
                </tr>
                </thead>
                <tbody>
                {this.renderWarehousesTable()}
                </tbody>
              </Table>
            </div>
          </div>

          <Modal isOpen={this.state.isOpenEditModal} toggle={this.handleOpenEditModal()}>
            <ModalHeader>Ubah Lokasi</ModalHeader>
            <ModalBody>
              <form action="">
                <div className="form-group">
                  <label htmlFor="warehouseName">Nama Lokasi:</label>
                  <input type="text"
                         className="form-control"
                         placeholder="Tj. Beringin"
                         name="selectedName"
                         onChange={this.onChangeForm}
                         value={this.state.selectedName}
                         disabled={this.state.isReadOnlyMode}
                  />
                  {this.state.errors && <div className="text-danger"><small>{this.state.errors.name}</small></div>}
                </div>
                <div className="form-group">
                  <label htmlFor="warehouseAddress">Alamat:</label>
                  <textarea name="selectedAddress"
                            id="warehouseAddress"
                            className="form-control"
                            value={this.state.selectedAddress}
                            onChange={this.onChangeForm}
                            disabled={this.state.isReadOnlyMode}/>
                </div>
                <Button onClick={this.handleReadOnlyMode} disabled={!this.state.isReadOnlyMode}>Ubah</Button>
                <Button className="ml-3" color="success" onClick={this.handleUpdate}>Simpan</Button>
              </form>
            </ModalBody>
          </Modal>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  warehouses: state.stock.warehouses,
  warehouse: state.stock.warehouse,
  errors: state.errors
});

export default connect(mapStateToProps, { getWarehouses, getWarehouse, addWarehouse, updateWarehouse })(Warehouse);