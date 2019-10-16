import React, {Component} from 'react';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

class Paginator extends Component {

  static propTypes = {
    size: 5,
    first: true,
  };

  render() {

    const { paginatorSize, first, totalSize } = this.props;

    return (
        <div className="paginator">
          <Pagination size={paginatorSize} aria-label="Page navigation example">
            <PaginationItem>
              <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink previous href="#" />
            </PaginationItem>
            {/*<PaginationItem>*/}
            {/*  <PaginationLink href="#">*/}
            {/*    1*/}
            {/*  </PaginationLink>*/}
            {/*</PaginationItem>*/}
            {totalSize > 0 && totalSize}

            <PaginationItem>
              <PaginationLink next href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink last href="#" />
            </PaginationItem>
          </Pagination>
        </div>
    );
  }
}

export default Paginator;