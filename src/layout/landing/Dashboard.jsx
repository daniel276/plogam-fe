import React, { PureComponent } from "react";
import Product from "../../components/Product/Product";
import Button from "reactstrap/es/Button";
import CreateUpdateProduct from "../../components/CreateUpdateProduct";

class Dashboard extends PureComponent{

  add = () => {
    this.props.history.push("/add-product")
  };

  render() {
    return (
        <div className="container ">
          <div className="jumbotron">
            <h1 className="display-4">Menu utama</h1>
          </div>
            <div className="form-group">
              <label htmlFor="inputPassword2" className="sr-only">Cari Produk...</label>
              <input type="text" className="form-control" id="inputPassword2" placeholder="Cari Produk"/>
            </div>
          <div className="row product-content">
            <div className="col-sm-4">
              <div className="left-box">
                  <Button className="add-button" onClick={this.add}>Tambah Produk</Button>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="right-box">
                <Product/>
                <Product/>
                <Product/>
                <Product/>
              </div>
            </div>
          </div>
        </div>
    );
  }

}

export default Dashboard;