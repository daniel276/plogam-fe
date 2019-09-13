import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

import "./styles.scss";
import { Button } from "reactstrap";

class SupplierList extends PureComponent {

  handleClickSupplier = id => e => {
    this.props.history.push(`/supplier/${id}`)
  };

  render() {
    const { hit } = this.props;

    return (
        <div className="supplier-list">
          <div className="supplier-card">
            <div className="title">
              <p className="font-weight-bold">{hit.supplierName} - {hit.city}</p>
            </div>
            <div className="right-side">
              <Button onClick={this.handleClickSupplier(hit.id)}>
                Lihat Detail
              </Button>
            </div>
          </div>
        </div>
    );
  }
}

export default withRouter(SupplierList);