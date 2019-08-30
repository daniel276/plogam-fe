import React, { PureComponent } from "react";
import classnames from "classnames";
import { Collapse, Button } from "reactstrap";
import { Link } from "react-router-dom";

import "./styles.scss";

class Product extends PureComponent {

  state = {
    isOpen: false
  };

  onClick = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  };

  render() {

    const { isOpen } = this.state;

    const { hit } = this.props;

    const { supplier } = hit;

    console.log('prodcut', this.props);

    return (
        <div className="product-list" onClick={this.onClick}>
          <div className={classnames("grid", {"space-down": isOpen})}>
            <div className="column">
              <p className="item-title">
                Kode Produk
              </p>
              <p className="item-value">
                {hit.productCode}
              </p>
            </div>

            <div className="column">
              <p className="item-title">
                Kategori
              </p>
              <p className="item-value">
                {hit.category.name}
              </p>
            </div>

            <div className="column">
              <p className="item-title">
                Nama Produk
              </p>
              <p className="item-value">
                {hit.productName}
              </p>
            </div>

            <div className="column">
              <p className="item-title">
                Stok Produk
              </p>
              <p className="item-value">
                {hit.stockOnHand}
              </p>
            </div>

            <div className="column">
              <p className="item-title">
                Harga Jual
              </p>
              <p className="item-value">
                {hit.retailPrice}
              </p>
            </div>

            <div className="column right">
              <Button><Link to={`product/${hit.id}`}>Detail</Link></Button>
            </div>
          </div>
          <Collapse className="product-collapse" isOpen={this.state.isOpen}>
            <div className="supplier-detail">
              <h5>Supplier : {supplier.supplierName}</h5>
              <Button className="detail-button"><Link to={`/supplier/${hit.supplier.id}`}>Lihat Supplier</Link></Button>
            </div>
            <div className="timestamp-detail">
              <small className="text-muted">Tanggal/Waktu Dibuat: {hit.createdAt ? hit.createdAt : "-"}</small>
              <small className="text-muted">Tanggal/Waktu Diubah: {hit.updatedAt ? hit.updatedAt : "-"}</small>
            </div>
          </Collapse>
        </div>
    );
  }
}

export default Product;