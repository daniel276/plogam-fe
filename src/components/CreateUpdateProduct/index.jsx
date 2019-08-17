import React, { PureComponent } from "react";

import "./styles.scss";
import {Button} from "reactstrap";

class CreateUpdateProduct extends PureComponent{

  constructor(props) {
    super(props);

    this.state = {
      productCode: "",
      productName: "",
      category: {},
      note: "",
      stockOnHand: 0,
      stockOnHold: 0,
      costPrice: 0,
      capitalPrice: 0,
      bulkPrice: 0,
      productStatus: ""
    }
  }


  render() {
    return (
        <div className="add-product">
          <div>
            <div className="add-form">
              <form>
              <div className="form-group">
                <label htmlFor="productCode">Kode Barang</label>
                <input type="text" className="form-control" id="productCode" placeholder="HLO401"/>
              </div>

              <div className="form-row">
                <div className="form-group col-md-8">
                  <label htmlFor="selectSupllier">Supplier</label>
                  <select id="selectSupplier" className="form-control">
                    <option selected>Pilih...</option>
                    <option>Oke</option>
                    <option>...</option>
                  </select>
                </div>

                <div className="form-group col-md-4 right">
                  <Button>Tambah Supplier</Button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="productName">Nama Produk</label>
                <input type="text" className="form-control" id="productName" placeholder="Baterai Alkaline"/>
              </div>

              <div className="form-row">
                <div className="form-group col-md-8">
                  <label htmlFor="selectCategory">Pilih Kategori</label>
                  <select id="selectCategory" className="form-control">
                    <option selected>Pilih...</option>
                    <option>Oke</option>
                    <option>...</option>
                  </select>
                </div>

                <div className="form-group col-md-4 right">
                  <Button>Tambah kategori</Button>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="costPrice">Harga Beli</label>
                  <input type="text" className="form-control" id="costPrice" placeholder="Rp.100.000"/>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="bulkPrice">Harga Grosir</label>
                  <input type="text" className="form-control" id="bulkPrice" placeholder="Rp.110.000"/>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="costPrice">Harga Jual</label>
                  <input type="text" className="form-control" id="costPrice" placeholder="Rp.120.000"/>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="stockOnHand">Stock Ada</label>
                  <input type="text" className="form-control" id="stockOnHand" placeholder="25"/>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="stockOnHand">Stock Tertahan</label>
                  <input type="text" className="form-control" id="stockOnHold" placeholder="40"/>
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="note">Catatan</label>
                <textarea className="form-control" id="note" placeholder="Warna Hitam..."/>
              </div>

              <div className="form-row">
                <label htmlFor="status">Status</label>
                <select id="selectCategory" className="form-control">
                  <option selected>Tersedia</option>
                  <option>Oke</option>
                </select>
              </div>

                <div className="add-button">
                  <Button>Submit</Button>
                </div>
              </form>
            </div>


          </div>
        </div>
    );
  }

}

export default CreateUpdateProduct;