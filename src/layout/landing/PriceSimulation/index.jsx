import React, {Component} from 'react';
import { connect } from "react-redux";
import {Table, Modal, ModalHeader, ModalBody } from "reactstrap";
// import Select from "react-select";
import Button from "reactstrap/es/Button";
import { searchProducts, addToCart, resetCart, removeItem, addQuantity, subQuantity } from "../../../actions/cartActions";
import numberjs from "number-format.js";

import "./styles.scss";

class PriceSimulation extends Component {

  constructor(){
    super();

    this.state = {
      isOpenAddProductModal: false,
      product: {},
      productsCart: [],
      searchItems: [],
      cartItems: [],
      search: "",
      totalPrice: 0,
      isBulkPrice: false,
      quantity: []
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    const { searchItems, cartItems } = nextProps;

    this.setState({
      searchItems,
      cartItems
    });

  }

  handleFormChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handlePriceChanger = e => {
    this.setState(prevState => ({
      isBulkPrice: !prevState.isBulkPrice
    }))
  };

  handleCheckChange = e => {
    this.setState({
      [e.target.name]: e.target.checked
    })
  };

  handleOpenAddProductModal = () => {
    this.setState(prevState => ({
      isOpenAddProductModal: !prevState.isOpenAddProductModal
    }))
  };

  handleSearchButton = e => {
    e.preventDefault();
    this.props.searchProducts(this.state.search);
  };

  handleAddToCart = (productId) => e => {
    this.props.addToCart(productId);
  };

  handleDeleteItemCart = (productId) => e => {
    this.props.removeItem(productId)
  };

  resetCart = () => {
    this.props.resetCart();
  };

  handleAddQuantity = (id) => e => {
    this.props.addQuantity(id);
    this.forceUpdate(); // temporary
  };

  handleSubQuantity = id => e => {
    this.props.subQuantity(id);
    this.forceUpdate(); // temporary
  };

  renderProductSearchResult = () => {
    const { content = [] } = this.state.searchItems;

    return content.map(value => (
        <tr key={value.id}>
          <td>{value.productCode}</td>
          <td>{value.productName}</td>
          <td>{!this.state.isBulkPrice ? value.retailPrice : value.bulkPrice}</td>
          <td><Button color="success" onClick={this.handleAddToCart(value.id)}>+</Button></td>
        </tr>
    ))
  };

  renderProductCart = () => {
    const { cartItems = [] } = this.state;

    // let warehouseOptions = cartItems.map(function (stockList){
    //   return { id: stockList.id, name: stockList.name}
    // });

    return cartItems.map(value => (
        <tr key={value.id} style={{textAlign: 'center'}}>
          <td>{value.productCode}</td>
          <td>{value.productName}</td>
          <td>{!this.state.isBulkPrice ? numberjs("Rp.#,##0.####", value.retailPrice) : numberjs("Rp.#,##0.####", value.retailPrice)}</td>
          <td>
            <div className="d-flex justify-content-sm-between">
              <span onClick={this.handleAddQuantity(value.id)}><i className="fa fa-chevron-up" style={{fontSize: '16px'}}/></span>
              <span>{value.quantity}</span>
              <span onClick={this.handleSubQuantity(value.id)}><i className="fa fa-chevron-down" style={{fontSize: '16px'}}/></span>
            </div>
          </td>
          <td>{this.getSubTotal(!this.state.isBulkPrice ? value.retailPrice : value.bulkPrice, value.quantity)}</td>
          <td><Button color="danger" onClick={this.handleDeleteItemCart(value.id)}>Hapus</Button></td>
        </tr>
    ))
  };

  getSubTotal(price, quantity){
    return `Rp.${numberjs("#,##0.####", price * quantity)}`;
  }

  render() {

    const isBulkPrice = !this.state.isBulkPrice || false;

    const { cartItems = [] } = this.state;

    let totalPrices = 0;
    const totalPrice = cartItems.forEach(function(value) {
      let price = isBulkPrice ? value.retailPrice : value.bulkPrice;
      totalPrices += price * value.quantity
    });

    // const { promiseInProgress } = usePromiseTracker();

    return (
        <div className="container price-simulation">
          <div className="jumbotron">
            <h4 className="display-4">Hitung Harga</h4>
          </div>
          <div className="row col-md-12 align-self-center">
            <h4 className="display-4 w-100 text-center">Total: {numberjs("#,##0.####", totalPrices)}</h4>
          </div>
          <div className="row mt-2">
            <div className="col-md-12">
              <Button color="success mr-2" onClick={this.handleOpenAddProductModal}>Tambah Barang</Button>
              <Button className="ml-2" color="primary" active={this.state.isBulkPrice} onClick={this.handlePriceChanger}>HG</Button>
              <Button color="danger" className="float-md-right" onClick={this.resetCart}>Hapus Semua</Button>
            </div>
          </div>
          {/*<div className="form-row mt-2">*/}
          {/*  <div className="col-md-12">*/}
          {/*    <div className="form-group mb-0">*/}
          {/*      <div className="form-check">*/}
          {/*        <input className="form-check-input"*/}
          {/*               type="checkbox"*/}
          {/*               id="gridCheck"*/}
          {/*               checked={this.state.isBulkPrice}*/}
          {/*               name="isBulkPrice"*/}
          {/*               onChange={this.handleCheckChange}*/}
          {/*        />*/}
          {/*          <label className="form-check-label" htmlFor="gridCheck">*/}
          {/*            HG*/}
          {/*          </label>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="row mt-3">
            <div className="col-md-12">
              <Table responsive>
                <thead>
                  <tr style={{textAlign: 'center'}}>
                    <th>Kode Barang</th>
                    <th>Nama Barang</th>
                    <th>Harga Satuan </th>
                    <th>Quantity </th>
                    <th>Sub-total</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderProductCart()}
                </tbody>
              </Table>
            </div>
          </div>
          <Modal isOpen={this.state.isOpenAddProductModal} toggle={this.handleOpenAddProductModal}>
            <ModalHeader>Tambah Barang</ModalHeader>
            <ModalBody>
              <p className="mb-2">Cari Barang...</p>
              <form onSubmit={this.handleSearchButton}>
                <input type="text" className="form-control" placeholder="Cari Barang...." name="search" onChange={this.handleFormChange}/>
                <Button className="mt-2" block>Cari...</Button>
              </form>
              <div className="form-check mb-0 mt-2">
                <input className="form-check-input"
                       type="checkbox"
                       id="gridCheck"
                       checked={this.state.isBulkPrice}
                       onChange={this.handleCheckChange}
                       name="isBulkPrice"
                />
                <label className="form-check-label" htmlFor="gridCheck">
                  H-G
                </label>
              </div>
              <div className="product-search row mt-3">
                <div className="col">
                  <Table>
                    <thead>
                      <tr>
                        <th>Kode Barang</th>
                        <th>Nama Barang</th>
                        <th>Harga Satuan</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderProductSearchResult()}
                    </tbody>
                  </Table>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product.product,
  searchItems: state.carts.searchItems,
  cartItems: state.carts.cartItems
});

export default connect(mapStateToProps, { searchProducts, addToCart, removeItem, resetCart, addQuantity, subQuantity })(PriceSimulation);