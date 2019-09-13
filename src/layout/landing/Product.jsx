import React, { PureComponent } from "react";
import ProductList from "../../components/Product/ProductList";
import algoliasearch from "algoliasearch";
import {InstantSearch, Hits,connectSearchBox, Pagination} from "react-instantsearch-dom";

const searchClient = algoliasearch('783TRW2722', '403b14b247221aa3b00343ec4d32a42a');

class Product extends PureComponent{

  add = () => {
    this.props.history.push("/add-product")
  };

  addWarehouse = () => {
    this.props.history.push("/add-warehouse")
  }

  render() {

    const SearchBox = ({currentRefinement, refine}) => (
        <form noValidate action="" role="search">
          <input className="form-control search"
                 placeholder="Cari Barang..."
                type="search"
                value={currentRefinement}
                onChange={event => refine(event.currentTarget.value)}
          />

        </form>
    );
    const CustomSearchBox = connectSearchBox(SearchBox);

    return (
        <div className="container ">
          <div className="jumbotron">
            <h1 className="display-4">Menu utama</h1>
          </div>

          <div className="row product-content">
            <div className="col-sm-12">
              <div className="right-box">
                <h3>Cari Barang...</h3>
                <InstantSearch searchClient={searchClient} indexName="dev_plogam">
                  <CustomSearchBox/>
                  <Hits hitComponent={ProductList} />
                  {/*<Highlight attribute="productName" hit={Hit} />*/}
                  <Pagination defaultRefinement={1} />
                </InstantSearch>
              </div>
            </div>
          </div>
        </div>
    );
  }

}

export default Product;