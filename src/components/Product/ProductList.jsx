import React, { PureComponent } from "react";
import classnames from "classnames";
import { Collapse, Button } from "reactstrap";
import {withRouter} from "react-router-dom";
import numberjs from "number-format.js";
import moment from "moment";
import "moment/locale/id";

import "./styles.scss";

class ProductList extends PureComponent {

  state = {
    isOpen: false
  };

  onClick = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  };

  detailClick = id => e => {
    this.props.history.push(`/product/${id}`)
  };

  supplierClick = id => e => {
    this.props.history.push(`/supplier/${id}`)
  };

  render() {

    const { isOpen } = this.state;

    const { hit } = this.props;

    const { supplier } = hit;

    return (
        <div className="product-list" onClick={this.onClick}>
          <div className={classnames("grid", {"space-down": isOpen})}>
            <div className="column">
              <p className="item-title">
                Kode Barang
              </p>
              <p className="item-value">
                {hit.productCode}
              </p>
            </div>

            {/*<div className="column">*/}
            {/*  <p className="item-title">*/}
            {/*    Kategori*/}
            {/*  </p>*/}
            {/*  <p className="item-value">*/}
            {/*    {hit.category.name}*/}
            {/*  </p>*/}
            {/*</div>*/}

            <div className="column">
              <p className="item-title">
                Nama Barang
              </p>
              <p className="item-value">
                {hit.productName}
              </p>
            </div>

            <div className="column">
              <p className="item-title">
                Harga Grosir
              </p>
              <p className="item-value">
                {numberjs("#,##0.####", hit.bulkPrice)}
              </p>
            </div>

            <div className="column">
              <p className="item-title">
                Harga Jual
              </p>
              <p className="item-value">
                {numberjs("#,##0.####", hit.retailPrice)}
              </p>
            </div>

            <div className="column right">
              <Button onClick={this.detailClick(hit.id)}>Detail</Button>
            </div>
          </div>
          <Collapse className="product-collapse" isOpen={this.state.isOpen}>
            <div className="supplier-detail">
              <h5>Supplier : {supplier.supplierName}</h5>
              <Button className="detail-button" size="sm" onClick={this.supplierClick(hit.supplier.id)}>Lihat Supplier</Button>
            </div>
            <div className="timestamp-detail">
              <small className="text-muted">Tanggal/Waktu Dibuat: {hit.createdAt ? moment(hit.createdAt).locale("id").calendar() : "-"}</small>
              <small className="text-muted">Terakhir diubah: {hit.updatedAt ? moment(hit.updatedAt).locale("id").calendar() : "-"}</small>
            </div>
          </Collapse>
        </div>
    );
  }
}

export default (withRouter)(ProductList);