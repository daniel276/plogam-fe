import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "./styles.scss";
import {Button} from "reactstrap";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { createCategory , getCategories } from "../../../actions/categoryActions";
import { getSuppliers } from "../../../actions/supplierActions";
import { createProduct } from "../../../actions/productActions";
import NumberFormat from "react-number-format";

class CreateUpdateProduct extends PureComponent{

  constructor(props) {
    super(props);

    this.state = {
      isOpenSupplierToggle: false,
      isOpenCategoryToggle: false,
      newCategoryName: "",
      productCode: "",
      productName: "",
      category: {},
      categories: [],
      suppliers: [],
      selectedCategory: {},
      selectedSupplier: {},
      note: "",
      stockOnHand: 0,
      stockOnHold: 0,
      costPrice: null,
      capitalPrice: null,
      bulkPrice: null,
      retailPrice: null,
      productStatus: "",
      isLoading: false,
      errors: {}
    }
  }

  componentDidMount() {
    this.props.getSuppliers();
    this.props.getCategories();
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    const { errors } = nextProps;

    if(nextProps.errors){
      this.setState({
        errors: errors
      })
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newData = {
      productCode: this.state.productCode,
      productName: this.state.productName,
      supplier: this.state.selectedSupplier,
      category: this.state.selectedCategory,
      costPrice: this.state.costPrice,
      bulkPrice: this.state.bulkPrice,
      retailPrice: this.state.retailPrice,
      stockOnHand: this.state.stockOnHand,
      stockOnHold: this.state.stockOnHold,
      note: this.state.note,
      productStatus: this.state.productStatus
    };

    this.props.createProduct(newData, this.props.history);
  };

  handleChangeSelectedCategory = selected => {
    this.setState({
      selectedCategory: selected
    });
  };

  handleChangeSelectedSupplier = selected => {
    this.setState({
      selectedSupplier: selected
    });
  };

  handleChangeForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleToggleSupplier = () => {
    if(window.confirm("Apakah anda ingin keluar dari halaman ini?")){
      this.props.history.push("/add-supplier")
    }
  };

  handleCategoryToggle = () => {
    // this.setState(prevState => ({
    //   isOpenCategoryToggle: !prevState.isOpenCategoryToggle
    // }))
    this.props.history.push("/kategori")
  };

  handleAddCategory = () => {

    const newCategoryName = {
      name: this.state.newCategoryName
    };

    try{
      this.props.createCategory(newCategoryName);

    }catch (e) {
      console.log('err')
    }

  };


  render() {

    let categoryOptions = this.props.categories.map(function (category) {
        return { id: category.id, name: category.name}
    });

    let supplierOptions = this.props.suppliers.map(function (supplier){
      return { id: supplier.id, supplierName: supplier.supplierName}
    });

    return (
        <div className="add-product">
          <div className="col-md-6 offset-md-3">
            <h3 className="display-4 text-center">Tambah Barang</h3>
            <div className="add-form">
              <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="productCode">Kode Barang</label>
                <input type="text" className="form-control" id="productCode" placeholder="HLO401" name="productCode" onChange={this.handleChangeForm} value={this.state.productCode || ''}/>
                {this.state.errors.productCode && <div className="text-danger"><small>{this.state.errors.productCode}</small></div>}
              </div>

              <div className="form-group">
                <label htmlFor="productName">Nama Produk</label>
                <input type="text"
                       className="form-control"
                       id="productName"
                       placeholder="Baterai Alkaline"
                       name="productName"
                       onChange={this.handleChangeForm}
                       value={this.state.productName || ''}/>
                {this.state.errors.productName && <div className="text-danger"><small>{this.state.errors.productName}</small></div>}
              </div>

              <div className="form-row inner-box">
                <div className="form-group col-md-8">
                  <label htmlFor="selectSupllier">Supplier</label>
                  <Select onChange={this.handleChangeSelectedSupplier} // should be supplier
                          options={supplierOptions}
                          getOptionLabel={(option) => option.supplierName} getOptionValue={(option) => option.id}/>
                </div>

                <div className="form-group col-md-4 right">
                  <Button onClick={this.handleToggleSupplier}>Tambah Supplier</Button>
                </div>
              </div>

              <div className="form-row inner-box">
                <div className="form-group col-md-8">
                  <label htmlFor="selectCategory">Pilih Kategori</label>
                  <CreatableSelect onChange={this.handleChangeSelectedCategory}
                          options={categoryOptions}
                          getOptionLabel={(option) => option.name} getOptionValue={(option) => option.id}/>
                </div>

                <div className="form-group col-md-4 right">
                  <Button onClick={this.handleCategoryToggle}>
                    Tambah kategori
                  </Button>
                </div>
                {/*<Collapse isOpen={this.state.isOpenCategoryToggle}>*/}
                {/*  <div className="form-row">*/}
                {/*    <div className="form-group col-md-8">*/}
                {/*      <label htmlFor="categoryName">Nama kategori baru</label>*/}
                {/*      <input type="text"*/}
                {/*             placeholder="Keramik"*/}
                {/*             className="form-control"*/}
                {/*             id="categoryName"*/}
                {/*             name="newCategoryName"*/}
                {/*             value={this.state.newCategoryName || ''}*/}
                {/*             onChange={this.handleChangeForm}*/}
                {/*      />*/}
                {/*      {this.state.errors && (<div className="text-danger"><small>{this.state.errors.categoryName}</small></div>)}*/}
                {/*    </div>*/}
                {/*    <div className="form-group col-md-4 right">*/}
                {/*      <Button onClick={this.handleAddCategory}>Simpan</Button>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</Collapse>*/}
              </div>

              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="costPrice">Harga Beli</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Rp.</span>
                    </div>
                    <NumberFormat
                        name="costPrice"
                        id="costPrice"
                        thousandSeparator={true}
                        value={this.state.costPrice}
                        className="form-control"
                        readOnly={this.state.isReadOnlyMode}
                        onValueChange={(values) => {
                          const { value } = values
                          this.setState({costPrice: value})
                        }} />
                  </div>
                  </div>
                <div className="form-group col-md-4">
                  <label htmlFor="bulkPrice">Harga Grosir</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Rp.</span>
                    </div>
                    <NumberFormat
                        name="bulkPrice"
                        id="bulkPrice"
                        thousandSeparator={true}
                        value={this.state.bulkPrice}
                        className="form-control"
                        readOnly={this.state.isReadOnlyMode}
                        onValueChange={(values) => {
                          const { value } = values
                          this.setState({bulkPrice: value})
                        }} />
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="sellPrice">Harga Jual</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Rp.</span>
                    </div>
                    <NumberFormat
                        name="retailPrice"
                        id="retailPrice"
                        thousandSeparator={true}
                        value={this.state.retailPrice}
                        className="form-control"
                        readOnly={this.state.isReadOnlyMode}
                        onValueChange={(values) => {
                          const { value } = values;
                          this.setState({retailPrice: value})
                        }} />
                  </div>
                </div>
              </div>

              {/*<div className="form-row">*/}
              {/*  <div className="form-group col-md-6">*/}
              {/*    <label htmlFor="stockOnHand">Stock Ada</label>*/}
              {/*    <input type="text"*/}
              {/*           className="form-control"*/}
              {/*           id="stockOnHand"*/}
              {/*           placeholder="25"*/}
              {/*           name="stockOnHand"*/}
              {/*           onChange={this.handleChangeForm}*/}
              {/*           value={this.state.stockOnHand}/>*/}
              {/*  </div>*/}
                {/*<div className="form-group col-md-6">*/}
                {/*  <label htmlFor="stockOnHand">Stock Tertahan</label>*/}
                {/*  <input type="text"*/}
                {/*         className="form-control"*/}
                {/*         id="stockOnHold"*/}
                {/*         placeholder="40"*/}
                {/*         name="stockOnHold"*/}
                {/*         onChange={this.handleChangeForm}*/}
                {/*         value={this.state.stockOnHold}/>*/}
                {/*</div>*/}
              {/*</div>*/}

              <div className="form-row">
                <label htmlFor="note">Catatan</label>
                <textarea className="form-control"
                          id="note"
                          placeholder="Warna Hitam..."
                          name="note"
                          onChange={this.handleChangeForm}
                          value={this.state.note || ''}/>
              </div>

              <div className="form-row">
                <label htmlFor="status">Status</label>
                <select id="selectCategory" className="form-control" onChange={this.handleChangeForm} name="productStatus">
                  <option  defaultValue="TERSEDIA" value="TERSEDIA">TERSEDIA</option>
                  <option value="TIDAK_DIJUAL">TIDAK DIJUAL LAGI</option>
                </select>
              </div>

                <div className="add-button">
                  <Button>Simpan</Button>
                </div>
              </form>
            </div>


          </div>
        </div>
    );
  }

}

const mapStateToProps = state => ({
  categories: state.category.categories,
  suppliers: state.supplier.suppliers,
  errors: state.errors
});

export default connect(mapStateToProps, { createProduct, createCategory, getCategories, getSuppliers })(CreateUpdateProduct);