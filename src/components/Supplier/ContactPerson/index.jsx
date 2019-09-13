import React, {PureComponent} from 'react';
import propTypes from "prop-types";
import AddContactPersonModal from "./AddContactPersonModal";
import EditContactPersonModal from "./EditContactPersonModal";

class ContactPerson extends PureComponent {

  static propTypes = {
      addContact: propTypes.bool,
      editContact: propTypes.bool
  };

  render() {
    return (
    <React.Fragment>
      {this.props.addContact && <AddContactPersonModal {...this.props}/> }
      {this.props.editContact && <EditContactPersonModal {...this.props}/> }
    </React.Fragment>)
  }
}

export default ContactPerson;