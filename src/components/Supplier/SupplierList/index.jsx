import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";
import { Button } from "reactstrap";

class SupplierList extends PureComponent {

  render() {

    console.log('inside supplier list', this.props);

    const { hit } = this.props;

    return (
        <div className="supplier-list">
          <div className="supplier-card">
            <div className="title">
              <p className="font-weight-bold">{hit.supplierName} - {hit.city}</p>
            </div>
            <div className="right-side">
              <Button>
                <Link className="text-decoration-none" style={{color: '#ffff'}} to={`supplier/${hit.id}`}>
                  Lihat Detail
                </Link>
              </Button>
            </div>
          </div>
        </div>
    );
  }
}

export default SupplierList;