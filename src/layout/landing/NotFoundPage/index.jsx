import React, { PureComponent } from "react";
import { Link} from "react-router-dom";

class NotFoundPage extends PureComponent {
  render() {
    return (
        <div>
          <div className="jumbotron">
            <h1 className="display-1">
              Halaman Tidak Ditemukan!
            </h1>
            <h1 className="display-4">
              Silahkan kembali ke <span><Link to="/">Menu Utama</Link></span>
            </h1>
          </div>
        </div>
    );
  }
}

export default NotFoundPage;