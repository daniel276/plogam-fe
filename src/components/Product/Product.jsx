import React, { PureComponent } from "react";
import classnames from "classnames";
import { Collapse } from "reactstrap";

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

    return (
        <div className="product-list" onClick={this.onClick}>
          <div className={classnames("grid", {"space-down": isOpen})}>
            <div className="column">
              <p className="item-title">
                Kode Produk
              </p>
              <div className="item-value">
                AK4BD
              </div>
            </div>

            <div className="column">
              <p className="item-title">
                Kategori
              </p>
              <div className="item-value">
                Semen
              </div>
            </div>

            <div className="column">
              <p className="item-title">
                Nama Produk
              </p>
              <div className="item-value">
                SEMEN BATURAJA
              </div>
            </div>

            <div className="column">
              <p className="item-title">
                Stok Produk
              </p>
              <div className="item-value">
                500
              </div>
            </div>

            <div className="column">
              <p className="item-title">
                Harga Grosir
              </p>
              <div className="item-value">
                Rp.110000
              </div>
            </div>

            <div className="column right">
              <p className="item-title">
                Harga Jual
              </p>
              <div className="item-value">
                Rp. 120000
              </div>
            </div>
          </div>
          <Collapse className="product-detail" isOpen={this.state.isOpen}>
            <p>Harga Modal : Rp.110000</p>
            <p>Harga Grosir : Rp.110000</p>
            <p>Supplier : PT SEMEN BATURAJA</p>
            <p></p>
          </Collapse>
        </div>
    );
  }
}

export default Product;