import React, {PureComponent} from 'react';
import { promiseTrackerHoc } from "react-promise-tracker";
import Loader from "react-loader-spinner";

class LoadingIndicator extends PureComponent {

  render() {

    // const { promiseInProgress } = usePromiseTracker();

    return (
        this.props.promiseInProgress && (
          <div style={{width: '100%', height: "100%", display:'flex', justifyContent: "center", alignItems: "center"}}>
              <Loader type="TailSpin" height={80} width={80} color="blue"/>
          </div>
        )

    );
  }
}

export default promiseTrackerHoc((LoadingIndicator));