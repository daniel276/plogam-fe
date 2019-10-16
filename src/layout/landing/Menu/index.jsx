import React, {PureComponent} from 'react';
import { Button } from "reactstrap";

import "./styles.scss";

class Menu extends PureComponent {

  handleAddProduct = e => {
    this.props.history.push("/add-product")
  };

  handleAddSupplier = e => {
    this.props.history.push("/add-supplier")
  };

  handleAddWarehouse = e => {
    this.props.history.push("/add-warehouse")
  };

  handleProductList = e => {
    this.props.history.push("/product")
  };

  handleSupplierList = e => {
    this.props.history.push("/supplier")
  };

  handleCategories = e => {
    this.props.history.push("/kategori")
  };

  render() {
    return (
        <div className="menu container">
          <div className="col-md-6 ml-auto mr-auto">
            <div className="header-text">
              <h3 className="display-4 text-center">Menu</h3>
            </div>
            <div className="button-row">
              <div className="button-group">
                <Button outline color="primary" block size="lg" onClick={this.handleProductList}>Daftar Barang</Button>
                <Button outline color="primary" block size="lg" onClick={this.handleSupplierList}>Daftar Supplier</Button>
              </div>
            </div>
            <div className="button-row">
              <div className="button-group">
                <Button outline color="success" block size="lg" onClick={this.handleAddProduct}>Tambah Barang</Button>
                <Button outline color="success" block size="lg" onClick={this.handleAddSupplier}>Tambah Supplier</Button>
                <Button outline color="success" block size="lg" onClick={this.handleCategories}>Tambah Kategori Barang</Button>
                <Button outline color="success" block size="lg" onClick={this.handleAddWarehouse}>Tambah Gudang/Lokasi</Button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Menu;