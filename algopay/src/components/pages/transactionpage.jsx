import * as React from "react";
import TransactionComponent from "../stateful/transactioncomponent";
import TransactionOfflineComponent from "../stateful/transactionofflinecomponent";
import PredictedRoundRangeComponent from "../stateful/predictedroundrangecomponent";
import { useParams } from 'react-router';
import ContactComponent from "../stateful/contactcomponent";
import Header from "../stateless/headercomponent";
/**
 * This component contain transaction components.
 *
 * @author [Mitrasish Mukherjee](https://github.com/mmitrasish)
 */


 class TransactionPage extends React.Component {
  constructor(props) {
    super(props);
    let public_key = this.props.match.params.id;
    console.log(public_key)
    this.state = {
      public_key: this.props.match.params.id,
      
      // address: localStorage.getItem("address"),
      // mnemonic: localStorage.getItem("mnemonic"),
      // accountList: localStorage.getItem("accountList")
    };
    
  }
  render() {
    return (
      <div>
        <Header/>
        <div className="container-fluid row">
      <div className="col-md-6 d-flex justify-content-center">
        <div style={{ marginTop: "2em" }} className="col-md-8">
          <TransactionComponent mnemonic={localStorage.getItem("mnemonic")} />
        </div>
      </div>
      <div className="col-md-6 d-flex justify-content-center">
        <div className="col-md-12">
          {/* <div style={{ marginTop: "5em" }} className="col-md-8">
            <TransactionOfflineComponent />
          </div> */}
          <div className="col-md-8 mt-4">
            <ContactComponent/>
            {/* <PredictedRoundRangeComponent /> */}
          </div>
        </div>
      </div>
    </div>
      </div>
      
    );
  }
}
export default TransactionPage;

// const TransactionPage = () => {

//   // let params = useParams();d
//   const rp = require('request-promise');
//   const cheerio = require("cheerio");
//   const priceScrapper = () => {

//     const requestOptions = {
//       method: 'GET',
//       uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
//       qs: {
//         'start': '1',
//         'limit': '5000',
//         'convert': 'USD'
//       },
//       headers: {
//         'Content-Type': 'application/json',
//         'X-CMC_PRO_API_KEY': 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Headers': "*"
//       },
//       json: true,
//       gzip: true
//     };

//     rp(requestOptions).then(response => {
//       console.log('API call response:', response);
//     }).catch((err) => {
//       console.log('API call error:', err.message);
//     });

//   }

//   //scrapper to convert USD and Algorand
//   //priceScrapper();
//   return (
//     <div className="container-fluid row">
//       <div className="col-md-6 d-flex justify-content-center">
//         <div style={{ marginTop: "2em" }} className="col-md-8">
//           <TransactionComponent mnemonic={localStorage.getItem("mnemonic")} />
//         </div>
//       </div>
//       <div className="col-md-6 d-flex justify-content-center">
//         <div className="col-md-12">
//           <div style={{ marginTop: "5em" }} className="col-md-8">
//             <TransactionOfflineComponent />
//           </div>
//           <div className="col-md-8 mt-4">
//             {/* <PredictedRoundRangeComponent /> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default TransactionPage;
