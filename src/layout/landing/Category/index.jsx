import React, {Component} from 'react';
import { connect } from "react-redux";
import { getCategories, createCategory } from "../../../actions/categoryActions";
import {Button, Table } from "reactstrap";

class Category extends Component {

  constructor(props){
    super(props);

    this.state ={
      categories: [],
      errors: {},
      name: "",
    }
  }

  componentDidMount(){
    this.props.getCategories();
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    const { name } = nextProps.category;

    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      })
    }

    this.setState({
      name
    })
  }

  onChangeForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleOpenCategory = e => {
    console.log('ok oce')
  }

  handleSubmit = e => {
    e.preventDefault();

    const Category = {
      name: this.state.name
    };

    this.props.createCategory(Category)
  };

  renderCategoriesTable = () => {
    return this.props.categories.map(value => (
        <tr key={value.id}>
          <td>{value.name}</td>
          <td><Button onClick={this.handleOpenCategory}>Ubah</Button></td>
        </tr>
    ))
  };

  render() {
    return (
        <div className="category container">
          <div className="jumbotron">
            <h3 className="display-4">Tambah Kategori Barang</h3>
          </div>
          <div className="row">
            <div className="add-category col-md-6">
              <h3 className="mb-3">Tambah Kategori</h3>
              <div className="add-form">
                <form action="">
                  <div className="form-group">
                    <label htmlFor="category" className="col-form-label">Nama Kategori: </label>
                    <input type="text"
                           id="category"
                           className="form-control"
                           name="name"
                           value={this.state.name || ''}
                           onChange={this.onChangeForm}
                    />
                    {this.state.errors && <div className="text-danger"><small>{this.state.errors.name}</small></div>}
                  </div>
                  <Button color="success" onClick={this.handleSubmit}>Simpan</Button>
                </form>
              </div>
            </div>
            <div className="warehouse-list col-md-6">
              <h3 className="ml-auto mr-auto mb-3">Daftar Kategori</h3>
              <Table >
                <thead>
                  <tr>
                    <th>Kategori</th>
                    <th>#</th>
                  </tr>
                </thead>
                  <tbody>
                  {this.renderCategoriesTable()}
                  </tbody>
              </Table>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  category: state.category.category,
  categories: state.category.categories,
  errors: state.errors
});

export default connect(mapStateToProps, { getCategories, createCategory })(Category);