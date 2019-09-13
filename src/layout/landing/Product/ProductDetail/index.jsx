import React, { PureComponent } from "react";
import { connect } from "react-redux";
import moment from "moment";
// import format from "";
import "moment/locale/id";
import { getProduct, updateProduct, deleteProduct } from "../../../../actions/productActions";
import { getCategories } from "../../../../actions/categoryActions";
import { getWarehouses, addStock, getStock, updateStockQuantity } from "../../../../actions/stockActions";
import { Button, Table, Modal, ModalHeader, ModalBody } from "reactstrap";
import Select from "react-select";

//styles
import "./styles.scss";

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
      quantityWarehouse: 0,
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
      role: "",
      security: {},
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
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    const { stock: selectedStock, product, security, errors } = nextProps;

    const { role } = security.user;

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
      security,
      role,
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

    const updatedStock = {
      id: this.state.selectedStock.id,
      product: { id: this.state.id },
      warehouse: this.state.selectedStock.warehouse,
      quantity: this.state.selectedStock.quantity,
      quantityChange: this.state.quantityChange,
    };

    if(this.state.selectedUpdateType === ""){
      window.alert("Silahkan pilih masuk atau keluar barang")
    }else if(this.state.quantityChange === 0){
      window.alert("Silahkan masukkan jumlah barang masuk/keluar")
    }else{
      this.props.updateStockQuantity(updatedStock, this.state.selectedUpdateType, this.state.quantityChange);
    }

  };

  onChangeUpdateType = updateType => {
    const { value } = updateType;
    this.setState({
      selectedUpdateType: value
    });
  };

  handlePlusQuantity = () => {
    this.setState(prevState => ({
      quantityChange: prevState.quantityChange + 1
    }))
  };

  handleMinusQuantity = () => {
    if(this.state.quantityChange === 0){
      this.setState({
        quantityChange: 0
      })
    }else{
      this.setState(prevState => ({
        quantityChange: prevState.quantityChange - 1
      }))
    }
  };

  handleClickDetailSupplier = id => e => {
    this.props.history.push(`/supplier/${id}`)
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

    if(id){
      this.props.getStock(id);
    }

  };

  handleChangeSelectedCategory = selected => {
    this.setState({
      category: selected
    });
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
      createdAt: this.state.createdAt
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
          <td>{value.updatedAt ? moment(value.updatedAt).locale("id").calendar(): '-'}</td>
          <td><Button onClick={this.handleEditWarehouseModal(value.id)} size="sm" color="info">Masuk/Keluar</Button></td>
        </tr>
    ))
  };

  render() {
    const { supplier = {}, selectedStock = {} } = this.state;

    const isAdmin = this.state.role === "ADMIN";

    const { warehouse = {} } = selectedStock;

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
                           value={this.state.productCode || ''}
                           readOnly={this.state.isReadOnlyMode} />
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
                         value={this.state.productName || ''}
                         onChange={this.handleChangeForm}
                         readOnly={this.state.isReadOnlyMode}/>
                  </div>
                  <div className="form-row">
                    {isAdmin &&
                    <div className="form-group col-md">
                      <label htmlFor="costPrice">Harga Modal: </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Rp.</span>
                        </div>
                      <input type="number"
                             id="costPrice"
                             name="costPrice"
                             className="form-control"
                             value={this.state.costPrice || 0}
                             onChange={this.handleChangeForm}
                             readOnly={this.state.isReadOnlyMode}/>
                      </div>
                    </div>}
                    <div className="form-group col-md">
                      <label htmlFor="bulkPrice">Harga Grosir: </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Rp.</span>
                        </div>
                      <input type="number"
                             id="bulkPrice"
                             name="bulkPrice"
                             className="form-control"
                             value={this.state.bulkPrice || 0}
                             onChange={this.handleChangeForm}
                             readOnly={this.state.isReadOnlyMode}/>
                      </div>
                    </div>
                    <div className="form-group col-md">
                      <label htmlFor="retailPrice">Harga Jual: </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">Rp.</span>
                        </div>
                      <input type="text"
                             id="retailPrice"
                             name="retailPrice"
                             className="form-control"
                             value={this.state.retailPrice || 0}
                             onChange={this.handleChangeForm}
                             readOnly={this.state.isReadOnlyMode}/>
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
                             value={supplier.supplierName || ''}
                             onChange={this.handleChangeForm}
                             readOnly/>
                    </div>
                    <div className="form-group col-md-4 mt-auto">
                      <Button id="supplier" className="form-control" onClick={this.handleClickDetailSupplier(supplier.id)}>
                        Detail Supplier
                      </Button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="note">Deskripsi / Catatan: </label>
                    <textarea
                           id="note"
                           name="note"
                           className="form-control"
                           value={this.state.note || ''}
                           onChange={this.handleChangeForm}
                           readOnly={this.state.isReadOnlyMode}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="productStatus">Status Barang: </label>
                    <select id="productStatus"
                            className="form-control"
                            onChange={this.handleChangeForm}
                            name="productStatus"
                            value={this.state.productStatus || ''}
                            disabled={this.state.isReadOnlyMode}>
                      <option  defaultValue="TERSEDIA">DIJUAL</option>
                      <option value="TIDAK_DIJUAL">TIDAK DIJUAL LAGI</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <small className="text-muted">Dibuat Pada: {this.state.createdAt ? moment(this.state.createdAt).locale("id").calendar() : '-'}</small>
                    <small className="text-muted float-right">Terakhir Diubah : {this.state.updatedAt ? moment(this.state.updatedAt).locale("id").calendar() : '-'}</small>
                  </div>
                </form>
               {isAdmin && <div className="detail-action">
                  <Button onClick={this.handleUpdateMode} disabled={!this.state.isReadOnlyMode}>Mode Edit</Button>
                  <Button color="success" disabled={this.state.isReadOnlyMode} onClick={this.handleSubmitUpdate}>Simpan Perubahan</Button>
                  <Button color="danger" onClick={this.handleDeleteProduct}>Hapus</Button>
                </div>}
              </div>
            </div>
            <div className="col-md-6 second">
              <h5>Inventori Barang
                {isAdmin && <Button
                  className="ml-1"
                  size="sm"
                  color="success"
                  onClick={this.handleOpenWarehouseModal}>Tambah Lokasi Barang
                </Button>}
              </h5>

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
          <Modal isOpen={this.state.isOpenWarehouseModal} toggle={this.handleOpenWarehouseModal} > {/* stock modal */}
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
                  <input type="text" id="warehouseName" className="form-control" name="name" value={warehouse.name || ''} disabled/>
                </div>
                <div className="form-group">
                  <p className="mb-2">Total Barang</p>
                  <input type="number" id="quantity" className="form-control" value={selectedStock.quantity || 0} disabled/>
                </div>
                <div className="form-group">
                  <label htmlFor="action">Masuk / Keluar</label>
                  <Select options={updateTypeOptions} placeholder="Masuk / Keluar" onChange={this.onChangeUpdateType} noOptionsMessage="Wajib diisi!"/>
                </div>
                  <label htmlFor="quantityChange1">Jumlah</label>
                  <div className="quantity d-flex justify-content-center align-items-baseline">
                    <span className="mr-2" style={{fontSize:'1.75rem'}} onClick={this.handleMinusQuantity}><i className="fa fa-minus-square"/></span>
                    <h3 style={{marginBottom:'0'}}>{this.state.quantityChange}</h3>
                    <span className="ml-2" style={{fontSize:'1.75rem'}} onClick={this.handlePlusQuantity}><i className="fa fa-plus-square"/></span>
                </div>
                {this.state.errors && <div className="text-danger"><small>{this.state.errors.invalidQuantityResponse}</small></div>}
              </form>
              <Button onClick={this.handleUpdateQuantity}>Simpan</Button>
            </ModalBody>
          </Modal>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  security: state.security,
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