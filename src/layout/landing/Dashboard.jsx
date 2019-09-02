import React, { PureComponent } from "react";
import Product from "../../components/Product/Product";
import Button from "reactstrap/es/Button";
import algoliasearch from "algoliasearch";
import {InstantSearch, SearchBox, Hits, connectHits, connectSearchBox, Pagination} from "react-instantsearch-dom";
import CreateUpdateProduct from "../../components/Product/CreateUpdateProduct";
import HitsPerPage from "react-instantsearch-dom/dist/es/components/HitsPerPage";

const searchClient = algoliasearch('783TRW2722', '403b14b247221aa3b00343ec4d32a42a');

class Dashboard extends PureComponent{

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
          <InstantSearch searchClient={searchClient} indexName="dev_plogam">
          <div className="row product-content">
            <div className="col-sm-4">
              <div className="left-box">
                <Button block size="lg" onClick={this.add}>Tambah Barang</Button>
                <Button className="mt-3" size="lg" block onClick={this.addWarehouse}>Tambah Lokasi</Button>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="right-box">
                <h3>Cari Barang...</h3>
                  <CustomSearchBox/>
                  {/*<ProductItemHits {...hits}/>*/}
                  <Hits hitComponent={Product} />
                  {/*<Pagination padding="12" defaultRefinement={2} />*/}
              </div>
            </div>
          </div>
          </InstantSearch>
        </div>
    );
  }

}

export default Dashboard;