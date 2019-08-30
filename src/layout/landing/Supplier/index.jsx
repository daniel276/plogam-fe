import React, { PureComponent } from "react";
import Button from "reactstrap/es/Button";
import {Hits, InstantSearch, Pagination} from "react-instantsearch-dom";
import Product from "../../../components/Product/Product";
import algoliasearch from "algoliasearch";
import { connectSearchBox } from "react-instantsearch-dom";
import SupplierList from "../../../components/Supplier/SupplierList";

//styles
import "./styles.scss";

const searchClient = algoliasearch('783TRW2722', '403b14b247221aa3b00343ec4d32a42a');

class Supplier extends PureComponent{

  add = () => {
    this.props.history.push("/add-supplier")
  }

  render() {

    const SearchBox = ({currentRefinement, refine}) => (
        <form noValidate action="" role="search">
          <input className="form-control search"
                 placeholder="Cari Supplier..."
                 type="search"
                 value={currentRefinement}
                 onChange={event => refine(event.currentTarget.value)}
          />

        </form>
    );

    const CustomSearchBox = connectSearchBox(SearchBox);

    return (
        <div className="container supplier-landing">
          <div className="jumbotron">
            <h1 className="display-4">
              Supplier
            </h1>
          </div>
          <InstantSearch searchClient={searchClient} indexName="dev_supplier">
            <div className="row product-content">
              <div className="col-sm-4">
                <div className="left-box">
                  <Button className="add-button" onClick={this.add}>Tambah Supplier</Button>
                </div>
              </div>
              <div className="col-sm-8">
                <div className="supplier-item">
                  <CustomSearchBox/>
                  {/*<ProductItemHits {...hits}/>*/}
                  <Hits {...this.props} hitComponent={SupplierList} />
                  <Pagination/>
                </div>
              </div>
            </div>
          </InstantSearch>

        </div>
    );
  }

}

export default Supplier;