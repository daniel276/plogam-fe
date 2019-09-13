import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { addSupplier } from "../../../actions/supplierActions";

import "./styles.scss";
import { Button } from "reactstrap";

class CreateUpdateSupplier extends PureComponent {

  constructor(){
    super();

    this.state = {
      supplierName: "",
      city: "",
      address: "",
      note: "",
      errors: {}
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    const { errors } = nextProps;

    if(nextProps.errors){
      this.setState({
        errors
      })
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  onSubmit = e => {
    e.preventDefault();

    const submitData = {
      supplierName: this.state.supplierName,
      city: this.state.city,
      address: this.state.address,
      note: this.state.note
    };

    this.props.addSupplier(submitData, this.props.history);
  };

  render() {
    return (
        <div className="add-supplier">
          <div className="col-md-6 offset-md-3">
            <div className="add-form">
              <form>
                <div className="form-group">
                  <label htmlFor="supplierName">Nama Supplier</label>
                  <input type="text" className="form-control" id="supplierName" placeholder="PT TRI ASIH..." name="supplierName" onChange={this.handleChange}/>
                  {this.state.errors.supplierName && <div className="text-danger"><small>{this.state.errors.supplierName}</small></div>}
                </div>
                <div className="form-group">
                  <label htmlFor="city">Kota</label>
                  <input type="text" className="form-control" id="city" name="city" placeholder="Palembang..." onChange={this.handleChange}/>
                  {this.state.errors.city && <div className="text-danger"><small>{this.state.errors.city}</small></div>}
                </div>
                <div className="form-group">
                  <label htmlFor="address">Alamat</label>
                  <textarea name="address" id="address" className="form-control" placeholder="Jl. Tendean..." onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                  <label htmlFor="note">Catatan</label>
                  <textarea name="note" id="note" className="form-control" placeholder="catatan..." onChange={this.handleChange}/>
                </div>
                <div className="save-button">
                  <Button onClick={this.onSubmit}>Simpan</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addSupplier })(CreateUpdateSupplier);