import * as React from "react";
import TransactionComponent from "../stateful/transactioncomponent";

/**
 * This component contain transaction components.
 */
const TransactionPage = () => {
  return (
    <div className="container-fluid row">
      <div className="col-md-6 d-flex justify-content-center">
        <div style={{ marginTop: "5em" }} className="col-md-8">
          <TransactionComponent mnemonic={localStorage.getItem("mnemonic")} />
        </div>
      </div>
    </div>
  );
};
export default TransactionPage;
