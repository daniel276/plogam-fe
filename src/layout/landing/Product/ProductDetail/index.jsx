import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getProduct, updateProduct, deleteProduct } from "../../../../actions/productActions";
import { getCategories } from "../../../../actions/categoryActions";
import { getWarehouses, addStock, getStock, updateStockQuantity } from "../../../../actions/stockActions";
import { Link } from "react-router-dom";
import { Button, Table, Modal, ModalHeader, ModalBody } from "reactstrap";
import Select from "react-select";

//styles
import "./styles.scss";
import CreatableSelect from "react-select/creatable/dist/react-select.esm";

class ProductDetail extends PureComponent {

  constructor(){
    super();

    this.state = {
      isReadOnlyMode: true,
      isOpenWarehouseModal: false,
      isOpenSelectedWarehouseModal: false,
      selectedStock: {},
      addQuantity: 0,
      quantityChange: 0,
      selectedUpdateType: "",
      id: null,
      productCode: "",
      productName: "",
      costPrice: 0,
      retailPrice: 0,
      bulkPrice: 0,
      stockOnHand: 0,
      note: "",
      productStatus: "",
      createdAt: "",
      updatedAt: "",
      product: {},
      supplier: {},
      category: {},
      categories: [],
      warehouses: [],
      warehouse: {},
      errors: {},
      selectedWarehouse: {}
    }
  }

  componentDidMount(){
    const { id } = this.props.match.params;

    this.props.getProduct(id);
    this.props.getCategories();
    this.props.getWarehouses();

    console.log('id', id);
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    console.log('nex', nextProps);

    const { stock: selectedStock, product, errors } = nextProps;

    const{
      id,
      productCode,
      productName,
      category,
      supplier,
      costPrice,
      retailPrice,
      bulkPrice,
      stockOnHand,
      note,
      productStatus,
      createdAt,
      updatedAt
    } = nextProps.product;

    this.setState({
      errors,
      product,
      selectedStock,
      id,
      productCode,
      productName,
      category,
      supplier,
      costPrice,
      retailPrice,
      bulkPrice,
      stockOnHand,
      note,
      productStatus,
      createdAt,
      updatedAt,
    })
  }

  handleDeleteProduct = e => {
    const { id } = this.props.match.params;

    this.props.deleteProduct(id);

    this.props.history.push("/menu");
    window.location.reload();
  };

  handleUpdateMode = () => {
    this.setState(prevState => ({
      isReadOnlyMode: !prevState.isReadOnlyMode
    }))
  };

  handleUpdateQuantity = e => {
    e.preventDefault();

    const { id } = this.props.match.params;

    const updatedStock = {
      id: this.state.selectedStock.id,
      product: { id: this.state.id },
      warehouse: this.state.selectedStock.warehouse,
      quantity: this.state.selectedStock.quantity,
      quantityChange: this.state.quantityChange,
    };

    this.props.updateStockQuantity(updatedStock, this.state.selectedUpdateType);

  };

  onChangeUpdateType = updateType => {
    const { label, value } = updateType;
    this.setState({
      selectedUpdateType: value
    });

  };

  handleOpenWarehouseModal = () => {
    this.setState(prevState => ({
      isOpenWarehouseModal: !prevState.isOpenWarehouseModal
    }))
  };

  handleEditWarehouseModal = id => e => {
    this.setState(prevState => ({
      isOpenSelectedWarehouseModal: !prevState.isOpenSelectedWarehouseModal,
      stockId: id
    }));

    this.props.getStock(id);

    console.log('k', this.props);
  };

  handleChangeSelectedCategory = selected => {
    this.setState({
      category: selected
    });
    console.log(`Option selected:`, selected);
  };

  handleChangeForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleChangeSelectedWarehouse = selected => {
    this.setState({
      selectedWarehouse: selected
    });
    console.log('selected Supplier', selected)
  };

  handleSubmitUpdate = e => {
    e.preventDefault();

    const product = {
      id: this.state.id,
      productCode: this.state.productCode,
      productName: this.state.productName,
      category: this.state.category,
      supplier: this.state.supplier,
      costPrice: this.state.costPrice,
      retailPrice: this.state.retailPrice,
      bulkPrice: this.state.bulkPrice,
      stockOnHand: this.state.stockOnHand,
      note: this.state.note,
      productStatus: this.state.productStatus,
    };

    this.props.updateProduct(product)
  };

  handleSubmitAddStock = e => {
    e.preventDefault();

    const Stock = {
      warehouse: this.state.selectedWarehouse,
      quantity: this.state.quantityWarehouse,
    };

    this.props.addStock(Stock, this.state.id);
  };

  renderStockListTable = () => {
    const { stockList = [] } = this.props.product;

    return stockList.map(value => (
        <tr key={value.id}>
          <td>{value.warehouse.name}</td>
          <td>{value.quantity}</td>
          <td>{value.updatedAt ? value.updatedAt: '-'}</td>
          <td><Button onClick={this.handleEditWarehouseModal(value.id)} size="sm">Ubah</Button></td>
        </tr>
    ))
  };

  render() {
    const { stockList = [] } = this.props.product;

    const { supplier = {}, selectedStock = {} } = this.state;

    const { warehouse = {} } = selectedStock;

    console.log('o oce', selectedStock);

    const updateTypeOptions = [
      { value: "ADD", label: "Tambah Stok"},
      { value: "SUBTRACT", label: "Kurangi Stok"}
    ];

    let categoryOptions = this.props.categories.map(function (category) {
      return { id: category.id, name: category.name}
    });

    let warehouseOptions = this.props.warehouses.map(function (warehouse){
      return { id: warehouse.id, name: warehouse.name}
    });

    return (
        <div className="container product-detail">
          <div className="row mb-md-1 ml-1">
            <h3 className="display-3">{this.state.productName}</h3>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="product-form">
                <form>
                  <div className="form-group">
                    <label htmlFor="productCode">Kode Barang:</label>
                    <input type="text"
                           id="productCode"
                           name="productCode"
                           className="form-control"
                           value={this.state.productCode}
                           disabled={this.state.isReadOnlyMode} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Kategori: </label>
                    <Select options={categoryOptions} value={this.state.category} onChange={this.handleChangeSelectedCategory}
                                 getOptionLabel={(option) => option.name} getOptionValue={(option) => option.id} isDisabled={this.state.isReadOnlyMode}/>
                  </div>
                  <div className="form-group">
                  <label htmlFor="productName">Nama Barang: </label>
                  <input type="text"
                         id="productName"
                         name="productName"
                         className="form-control"
                         value={this.state.productName}
                         onChange={this.handleChangeForm}
                         disabled={this.state.isReadOnlyMode}/>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label htmlFor="costPrice">Harga Modal: </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Rp.</span>
                        </div>
                      <input type="text"
                             id="costPrice"
                             name="costPrice"
                             className="form-control"
                             value={this.state.costPrice}
                             onChange={this.handleChangeForm}
                             disabled={this.state.isReadOnlyMode}/>
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="bulkPrice">Harga Grosir: </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Rp.</span>
                        </div>
                      <input type="text"
                             id="bulkPrice"
                             name="bulkPrice"
                             className="form-control"
                             value={this.state.bulkPrice}
                             onChange={this.handleChangeForm}
                             disabled={this.state.isReadOnlyMode}/>
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="retailPrice">Harga Jual: </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Rp.</span>
                        </div>
                      <input type="text"
                             id="retailPrice"
                             name="retailPrice"
                             className="form-control"
                             value={this.state.retailPrice}
                             onChange={this.handleChangeForm}
                             disabled={this.state.isReadOnlyMode}/>
                      </div>
                    </div>
                  </div>
                  {/*<div className="form-group">*/}
                  {/*  <label htmlFor="stockOnHand">Stok Barang: </label>*/}
                  {/*  <input type="text"*/}
                  {/*         id="stockOnHand"*/}
                  {/*         name="stockOnHand"*/}
                  {/*         className="form-control"*/}
                  {/*         value={this.state.stockOnHand}*/}
                  {/*         onChange={this.handleChangeForm}*/}
                  {/*         disabled={this.state.isReadOnlyMode}/>*/}
                  {/*</div>*/}
                  <div className="form-row">
                    <div className="form-group col-md-8">
                      <label htmlFor="supplier">Supplier: </label>
                      <input type="text"
                             id="supplier"
                             name="supplier"
                             className="form-control"
                             value={supplier.supplierName}
                             onChange={this.handleChangeForm}
                             disabled/>
                    </div>
                    <div className="form-group col-md-4 mt-auto">
                      <Button id="supplier" className="form-control">
                        <Link
                            style={{textDecoration: 'none', color: '#ffff'}}
                            to={`/supplier/${supplier.id}`}>
                          Detail Supplier
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="note">Deskripsi / Catatan: </label>
                    <textarea
                           id="note"
                           name="note"
                           className="form-control"
                           value={this.state.note}
                           onChange={this.handleChangeForm}
                           disabled={this.state.isReadOnlyMode}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="productStatus">Status Barang: </label>
                    <select id="productStatus"
                            className="form-control"
                            onChange={this.handleChangeForm}
                            name="productStatus"
                            value={this.state.productStatus}
                            disabled={this.state.isReadOnlyMode}>
                      <option  defaultValue="TERSEDIA">TERSEDIA</option>
                      <option value="TIDAK_DIJUAL">TIDAK DIJUAL LAGI</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <small className="text-muted">Dibuat Pada: {this.state.createdAt ? this.state.createdAt : '-'}</small>
                    <small className="text-muted float-right">Terakhir Diubah : {this.state.updatedAt ? this.state.updatedAt : '-'}</small>
                  </div>
                </form>
                <div className="detail-action">
                  <Button onClick={this.handleUpdateMode} disabled={!this.state.isReadOnlyMode}>Mode Edit</Button>
                  <Button disabled={this.state.isReadOnlyMode} onClick={this.handleSubmitUpdate}>Simpan Perubahan</Button>
                  <Button color="danger" onClick={this.handleDeleteProduct}>Hapus</Button>
                </div>
              </div>
            </div>
            <div className="col-md-6 second">
              <h5>Inventori Barang</h5>
              <div className="row mb-2">
                <Button
                    className="ml-4"
                    size="sm"
                    color="success"
                    onClick={this.handleOpenWarehouseModal}>Tambah</Button>
                <Button className="ml-2" size="sm" color="info">Barang Masuk/Keluar</Button>
              </div>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Lokasi</th>
                    <th>Stok</th>
                    <th>Terakhir Diubah</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderStockListTable()}
                </tbody>
              </Table>
            </div>
          </div>
          <Modal isOpen={this.state.isOpenWarehouseModal} toggle={this.handleOpenWarehouseModal} >
            <ModalHeader>Tambah Lokasi</ModalHeader>
            <ModalBody>
              <form action="">
                <div className="form-group">
                  <label htmlFor="selectWarehouse">Pilih Lokasi</label>
                  <Select options={warehouseOptions} onChange={this.handleChangeSelectedWarehouse}
                               getOptionLabel={(option) => option.name}
                               getOptionValue={(option) => option.id}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Stok Awal</label>
                  <input type="number"
                         className="form-control"
                         name="quantityWarehouse"
                         onChange={this.handleChangeForm}
                         value={this.state.quantityWarehouse}
                  />
                </div>
              </form>
              <Button color="success" onClick={this.handleSubmitAddStock}>Simpan</Button>
              <Button className="ml-3" onClick={this.handleOpenWarehouseModal}>Batal</Button>
            </ModalBody>
          </Modal>
          <Modal isOpen={this.state.isOpenSelectedWarehouseModal} toggle={this.handleEditWarehouseModal()}>
            <ModalHeader>Edit Stok</ModalHeader>
            <ModalBody>
              <form action="">
                <div className="form-group">
                  <label htmlFor="warehouseName">Nama Lokasi: </label>
                  <input type="text" id="warehouseName" className="form-control" name="name" value={warehouse.name} disabled/>
                </div>
                <div className="form-group">
                  <p className="mb-2">Total Barang</p>
                  <input type="number" id="quantity" className="form-control" value={selectedStock.quantity} disabled/>
                </div>
                <div className="form-group">
                  <label htmlFor="action">Masuk / Keluar</label>
                  <Select options={updateTypeOptions} placeholder="Masuk / Keluar" onChange={this.onChangeUpdateType}/>
                </div>
                <label>Jumlah: </label>
                <div className="form-group">
                    <input type="number"
                           className="form-control"
                           placeholder="Jumlah"
                           name="quantityChange"
                           onChange={this.handleChangeForm}
                           value={this.state.quantityChange}
                    />
                  {this.state.errors && <div className="text-danger"><small>{this.state.errors.invalidQuantityResponse}</small></div>}
                </div>
              </form>
              <Button onClick={this.handleUpdateQuantity}>Simpan</Button>
            </ModalBody>
          </Modal>
        </div>
    );
  }
}

const onCLick = () => {
  window.alert("not Ok")
}

const mapStateToProps = state => ({
  product: state.product.product,
  categories: state.category.categories,
  warehouses: state.stock.warehouses,
  stock: state.stock.stock,
  errors: state.errors
});

export default connect(mapStateToProps, {
      getProduct,
      getCategories,
      getWarehouses,
      getStock,
      addStock,
      updateStockQuantity,
      updateProduct,
      deleteProduct
    })(ProductDetail);