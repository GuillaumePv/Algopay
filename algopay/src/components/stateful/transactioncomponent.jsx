import * as React from "react";
import { useState, useEffect } from "react";
import algosdk from "algosdk";
import $ from "jquery";
import AlgorandClient from "../../services/algorandsdk";
import copy from "clipboard-copy";
import SuggestedFeeComponent from "./suggestedfeecomponent";
import Header from "../stateless/headercomponent";
import {app} from "../../services/firebase";
import TableScrollbar from 'react-table-scrollbar';
import './table.css'


export default class TransactionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressTo: {
        value: this.props.adressSender,
        // value: this.props.public_key,
        isValid: true,
        message: "Please choose an address."
      },
      adresSend: "test",
      amount: "",
      note: "",
      txnId: "",
      errorMessage: ""
    };
  }

  
  copyToClipboard = () => {
    copy(this.state.txnId);
  };

  // load address to send payment
  loadAddressTo = event => {
    this.setState({
      addressTo: {
        value: event.target.value,
        isValid: true,
        message: "Please choose an address."
      }
    });
  };

  // load amount to send
  loadAmount = event => {
    this.setState({
      amount: event.target.value
    });
  };

  // load note to send
  loadNote = event => {
    this.setState({
      note: event.target.value
    });
  };

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  componentDidUpdate() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  // check balance in the account
  checkBalance = async account => {
    let balance = (await AlgorandClient.accountInformation(account)).amount;
    console.log(balance + " " + account);
    return balance === 0;
  };

  // validating the sender account and also sending the transaction
  sendTransaction = async () => {
    let mnemonic = this.props.mnemonic;
    let recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);
    let hasBalance = await this.checkBalance(recoveredAccount.addr);

    if (this.state.addressTo.value === "") {
      this.setState({
        addressTo: {
          value: "",
          isValid: false,
          message: "Please choose an address."
        }
      });
    } else if (!algosdk.isValidAddress(this.state.addressTo.value)) {
      this.setState({
        addressTo: {
          value: "",
          isValid: false,
          message: "Please choose a valid address."
        }
      });
    } else if (hasBalance) {
      alert(recoveredAccount + " does not have sufficient balance...");
    } else {
      this.startTransaction(recoveredAccount).catch(e => {
        console.log(e);
      });
    }
  };

  // starting transaction here with the account from
  startTransaction = async recoveredAccount => {
    //Get the relevant params from the algod
    try {
      let params = await AlgorandClient.getTransactionParams();
      let endRound = params.lastRound + parseInt(1000);

      //create a transaction
      let txn = {
        from: recoveredAccount.addr,
        to: this.state.addressTo.value,
        fee: params.fee,
        amount: Number.parseInt(this.state.amount)*10e5,
        firstRound: params.lastRound,
        lastRound: endRound,
        genesisID: params.genesisID,
        genesisHash: params.genesishashb64,
        note: algosdk.encodeObj(this.state.note)
      };

      //sign the transaction
      let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);

      // sending the transaction
      AlgorandClient.sendRawTransaction(signedTxn.blob)
        .then(tx => {
          console.log(tx);
          this.setState({
            txnId: tx.txId,
            addressTo: {
              value: "",
              isValid: true,
              message: "Please choose an address."
            },
            amount: 0,
            note: ""
          });
        })
        .catch(err => {
          console.log(err);
          // setting the error text to state
          this.setState({ errorMessage: err.text });
        });
    } catch (e) {
      console.log(e);
    }
  };

  signTransactionOffline = async () => {
    if (this.state.addressTo.value === "") {
      this.setState({
        addressTo: {
          value: "",
          isValid: false,
          message: "Please choose an address."
        }
      });
    } else if (!algosdk.isValidAddress(this.state.addressTo.value)) {
      this.setState({
        addressTo: {
          value: "",
          isValid: false,
          message: "Please choose a valid address."
        }
      });
    } else {
      let mnemonic = this.props.mnemonic;
      let recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic);
      try {
        let params = await AlgorandClient.getTransactionParams();
        let endRound = params.lastRound + parseInt(1000);

        //create a transaction
        let txn = {
          from: recoveredAccount.addr,
          to: this.state.addressTo.value,
          fee: params.fee,
          amount: Number.parseInt(this.state.amount)*10e6,
          firstRound: params.lastRound,
          lastRound: endRound,
          genesisID: params.genesisID,
          genesisHash: params.genesishashb64,
          note: algosdk.encodeObj(this.state.note)
        };
        this.downloadTxnFile(txn);
      } catch (e) {
        console.log(e);
      }
    }
  };

  downloadTxnFile = txn => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(txn)], {
      type: "application/json"
    });
    element.href = URL.createObjectURL(file);
    element.download = "txn.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  render() {
    return (
      <div>
        <div
          style={{ padding: "4em" }}
          className="rounded-lg shadow border bg-light p-4"
        >
          <div className="form-group text-center">
            <h3>Send Transaction</h3>
          </div>
          <div className="form-group">
            <label>Address To</label>
            <input
              type="text"
              className={
                "form-control " +
                (this.state.addressTo.isValid ? null : "is-invalid")
              }
              id="addressTo"
              aria-describedby="adressToHelp"
              placeholder="Enter adress"
              value={this.props.adressSender}
              //value={this.state.addressTo.value}
              onChange={this.loadAddressTo}
            />
            <div className="invalid-feedback">
              {this.state.addressTo.message}
            </div>
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              placeholder="0 (in algos)"
              value={this.state.amount}
              onChange={this.loadAmount}
            />
          </div>
          <div className="form-group">
            <label>Note</label>
            <textarea
              rows="3"
              className="form-control"
              id="note"
              placeholder="write note"
              value={this.state.note}
              onChange={this.loadNote}
            />
          </div>

          {/* essayer de faire fonctionner sinon tanpis
          <div className="form-group">
            <SuggestedFeeComponent />
          </div> */}
          <div className="d-flex justify-content-around">
            <button
              type="button"
              className="btn btn-dark px-4 mt-2"
              onClick={this.sendTransaction}
            >
              Send
            </button>
            {/* not necessary for us
            <button
              type="button"
              className="btn btn-dark px-4 mt-2"
              onClick={this.signTransactionOffline}
            >
              Sign Offline
            </button> */}
          </div>
          
        </div>
        {this.state.txnId !== "" ? (
          <div className="rounded-lg shadow border bg-light p-4 mt-3">
            <div className="text-success font-weight-bold">
              Transaction Sent
            </div>
            <div className="text-secondary">
              <span className="font-weight-bold">txnId: </span>
              <span
                data-toggle="tooltip"
                data-placement="bottom"
                data-html="true"
                title={
                  "<div>Copy to clipboard</div><div>" +
                  this.state.txnId +
                  "</div>"
                }
                onClick={this.copyToClipboard}
              >
                {this.state.txnId.substr(0, 10)}...
                {this.state.txnId.substr(-4, 4)}
              </span>
            </div>
          </div>
        ) : null}
        {this.state.errorMessage !== "" ? (
          <div className="rounded-lg shadow border bg-light p-4 my-3">
            <div className="text-danger font-weight-bold">Error</div>
            <div className="text-secondary">
              <span className="font-weight-bold">message: </span>
              {/* <span>{this.state.errorMessage}</span> */}
              <span>You do not have enough money in your account !!!</span>
              {console.log(this.state.errorMessage)}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
