import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "./styles.scss";
import {Button} from "reactstrap";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { Collapse } from "reactstrap";
import { createCategory , getCategories } from "../../../actions/categoryActions";
import { getSuppliers } from "../../../actions/supplierActions";
import { createProduct } from "../../../actions/productActions";

const createOption = (name) => ({
  name,
  value: name.toLowerCase().replace(/\W/g, ''),
});

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
      isLoading: false
    }
  }

  componentDidMount() {
    this.props.getSuppliers();
    this.props.getCategories();
    // this.setState({
    //   categories: this.props.categories
    // })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { selectedCategory: categoryThis} = this.state.selectedCategory;

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

    console.log('new data', newData);

  };

  handleChangeSelectedCategory = selected => {
    this.setState({
      selectedCategory: selected
    });
    console.log(`Option selected:`, selected);
  };

  handleChangeSelectedSupplier = selected => {
    this.setState({
      selectedSupplier: selected
    });
    console.log('selected Supplier', selected)
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
    this.setState(prevState => ({
      isOpenCategoryToggle: !prevState.isOpenCategoryToggle
    }))
  };

  handleAddCategory = () => {

    const newCategoryName = {
      name: this.state.newCategoryName
    };

    try{
      this.props.createCategory(newCategoryName);
      this.setState({
        isOpenCategoryToggle: false
      })

    }catch (e) {
      console.log('err')
    }

    console.log('add', newCategoryName);
  }


  render() {
    // this.props.getCategories();

    const { categories } = this.props;

    let categoryOptions = this.props.categories.map(function (category) {
        return { id: category.id, name: category.name}
    });

    let supplierOptions = this.props.suppliers.map(function (supplier){
      return { id: supplier.id, supplierName: supplier.supplierName}
    });

    console.log("all", this.props);

    return (
        <div className="add-product">
          <div className="col-md-6 offset-md-3">
            <div className="add-form">
              <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="productCode">Kode Barang</label>
                <input type="text" className="form-control" id="productCode" placeholder="HLO401" name="productCode" onChange={this.handleChangeForm}/>
              </div>

              <div className="form-row inner-box">
                <div className="form-group col-md-8">
                  <label htmlFor="selectSupllier">Supplier</label>
                  <Select onChange={this.handleChangeSelectedSupplier} // should be supplier
                          options={supplierOptions}
                          handleCreate={this.handleCreate}
                          getOptionLabel={(option) => option.supplierName} getOptionValue={(option) => option.id}/>
                </div>

                <div className="form-group col-md-4 right">
                  <Button onClick={this.handleToggleSupplier}>Tambah Supplier</Button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="productName">Nama Produk</label>
                <input type="text"
                       className="form-control"
                       id="productName"
                       placeholder="Baterai Alkaline"
                       name="productName"
                       onChange={this.handleChangeForm}
                       value={this.state.productName}/>
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
                <Collapse isOpen={this.state.isOpenCategoryToggle}>
                  <div className="form-row">
                    <div className="form-group col-md-8">
                      <label htmlFor="categoryName">Nama kategori baru</label>
                      <input type="text"
                             placeholder="Keramik"
                             className="form-control"
                             id="categoryName"
                             name="newCategoryName"
                             value={this.state.newCategoryName}
                             onChange={this.handleChangeForm}
                      />
                    </div>
                    <div className="form-group col-md-4 right">
                      <Button onClick={this.handleAddCategory}>Simpan</Button>
                    </div>
                  </div>
                </Collapse>
              </div>

              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="costPrice">Harga Beli</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Rp.</span>
                    </div>
                    <input type="text"
                           className="form-control"
                           id="costPrice"
                           placeholder={100000}
                           name="costPrice"
                           onChange={this.handleChangeForm}
                           value={this.state.costPrice}/>
                  </div>
                  </div>
                <div className="form-group col-md-4">
                  <label htmlFor="bulkPrice">Harga Grosir</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Rp.</span>
                    </div>
                    <input type="text"
                           className="form-control"
                           id="bulkPrice"
                           placeholder={1100000}
                           name="bulkPrice"
                           onChange={this.handleChangeForm}
                           value={this.state.bulkPrice}/>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="sellPrice">Harga Jual</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Rp.</span>
                    </div>
                    <input type="text"
                           className="form-control"
                           id="sellPrice"
                           placeholder="Rp.120.000"
                           name="retailPrice"
                           onChange={this.handleChangeForm}
                           value={this.state.retailPrice}/>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="stockOnHand">Stock Ada</label>
                  <input type="text"
                         className="form-control"
                         id="stockOnHand"
                         placeholder="25"
                         name="stockOnHand"
                         onChange={this.handleChangeForm}
                         value={this.state.stockOnHand}/>
                </div>
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
              </div>

              <div className="form-row">
                <label htmlFor="note">Catatan</label>
                <textarea className="form-control"
                          id="note"
                          placeholder="Warna Hitam..."
                          name="note"
                          onChange={this.handleChangeForm}
                          value={this.state.note}/>
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
  suppliers: state.supplier.suppliers
});

export default connect(mapStateToProps, { createProduct, createCategory, getCategories, getSuppliers })(CreateUpdateProduct);