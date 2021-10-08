import * as React from "react";
import ContactComponent from "../stateful/contactcomponent";
import MultisigTransactionComponent from "../stateful/multisigtransactioncomponent";


const Contactpage = () => {
  return (
    <div className="container-fluid row">
      <div className="col-md-12 d-flex justify-content-center">
        <div className="col-md-6 m-4">
            <ContactComponent/>
        </div>
      </div>
    </div>
  );
};
export default Contactpage;