import React, {Component} from 'react';
import { connect } from "react-redux";
import { getCategories, getCategory, createCategory, updateCategory } from "../../../actions/categoryActions";
import {Button, Table, Modal, ModalHeader, ModalBody } from "reactstrap";

class Category extends Component {

  constructor(props){
    super(props);

    this.state ={
      category: {},
      categories: [],
      errors: {},
      name: "",
      selectedName: "",
      isOpenCategoryModal: false
    }
  }

  componentDidMount(){
    this.props.getCategories();
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    const { id: selectedId, name: selectedName } = nextProps.category;

    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      })
    }

    this.setState({
      selectedId,
      selectedName
    })
  }

  onChangeForm = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleOpenCategoryModal = id => e => {
   this.setState(prevState => ({
     isOpenCategoryModal: !prevState.isOpenCategoryModal,
     selectedCategoryId: id
   }))

    if(id){
      this.props.getCategory(id)
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const Category = {
      name: this.state.name
    };

    this.props.createCategory(Category)
  };

  handleUpdate = e => {
    e.preventDefault();

    const UpdatedCategory = {
      id: this.state.selectedId,
      name: this.state.selectedName,
    };

    console.log('upda', UpdatedCategory);

    this.props.updateCategory(UpdatedCategory)
  };

  renderCategoriesTable = () => {
    return this.props.categories.map(value => (
        <tr key={value.id}>
          <td>{value.name}</td>
          <td><Button onClick={this.handleOpenCategoryModal(value.id)}>Ubah</Button></td>
        </tr>
    ))
  };

  render() {
    return (
        <div className="category container">
          <div className="jumbotron">
            <h3 className="display-4">Kategori Barang</h3>
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
                           placeholder="Masukkan nama kategori barang..."
                           value={this.state.name || ''}
                           onChange={this.onChangeForm}
                    />
                    {this.state.errors.categoryName && <div className="text-danger"><small>{this.state.errors.categoryName}</small></div>}
                  </div>
                  <Button className="mb-3" color="success" onClick={this.handleSubmit}>Simpan</Button>
                </form>
              </div>
            </div>
            <div className="category-list col-md-6">
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
          <Modal toggle={this.handleOpenCategoryModal()} isOpen={this.state.isOpenCategoryModal} >
            <ModalHeader>Ubah Kategori Barang</ModalHeader>
            <ModalBody>
              <form action="">
                <div className="form-group">
                  <label htmlFor="warehouseName">Nama Kategori:</label>
                  <input type="text"
                         className="form-control"
                         placeholder="Keramik"
                         name="selectedName"
                         onChange={this.onChangeForm}
                         value={this.state.selectedName || ''}
                         disabled={this.state.isReadOnlyMode}
                  />
                  {this.state.errors && <div className="text-danger"><small>{this.state.errors.name}</small></div>}
                </div>
                <Button color="success" onClick={this.handleUpdate}>Simpan Perubahan</Button>
              </form>
            </ModalBody>
          </Modal>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  category: state.category.category,
  categories: state.category.categories,
  errors: state.errors
});

export default connect(mapStateToProps, { getCategories, getCategory, createCategory, updateCategory })(Category);