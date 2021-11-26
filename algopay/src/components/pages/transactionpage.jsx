import * as React from "react";
import { useState, useEffect } from "react";
import TransactionComponent from "../stateful/transactioncomponent";
import TransactionOfflineComponent from "../stateful/transactionofflinecomponent";
import PredictedRoundRangeComponent from "../stateful/predictedroundrangecomponent";
import { useParams } from 'react-router';
import Header from "../stateless/headercomponent";
import {app} from "../../services/firebase";
import TableScrollbar from 'react-table-scrollbar';
import './table.css'
/**
 * This component contain transaction components.
 * 
 * Modification of code created by:
 * @author [Mitrasish Mukherjee](https://github.com/mmitrasish)
 */

var valueAdressSender = "";
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
          <TransactionComponent mnemonic={localStorage.getItem("mnemonic")} adressSender={valueAdressSender}/>
        </div>
      </div>
      <div className="col-md-6 d-flex justify-content-center">
        <div className="col-md-12">
          {/* <div style={{ marginTop: "5em" }} className="col-md-8">
            <TransactionOfflineComponent />
          </div> */}
          <div className="col-md-8 mt-4">
            <PhoneTab/>
            {/* <PredictedRoundRangeComponent /> */}
          </div>
        </div>
      </div>
    </div>
      </div>
      
    );
  }
}

function PhoneTab(){

  const [users, setUsers] = useState();

    const fetchUsers = async () => {
        const res = app.firestore().collection('users');
        const data = await res.get();
        let dataUser = []
        console.log(data.docs.values); // we need to obtain json data
        data.docs.forEach(item => {
            console.log(item.id); //id of document
            dataUser.push(item.data());
            // setUsers([...users, item.data()])

        });
        setUsers(dataUser);
    }
    useEffect(() => {
        fetchUsers();
    }, [])

    const onClick = async (adress) => {
      window.location.reload(false);
      // alert(adress);
  }
  return(
    <div
                style={{ padding: "4em" }}
                className="rounded-lg shadow border bg-light p-4"
            >
                <h2>Available Contacts</h2>
                <div
                    style={{ padding: "4em" }}
                    className="rounded-lg shadow border bg-light p-4"
                >
                    <h3>List of contacts</h3>
                    <TableScrollbar rows={7}>
                        <table >
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Phone</th>
                                    {/* <th>public Key</th> */}
                                </tr>
                            </thead>

                            <tbody >
                                {
                                    users && users.map(user => {
                                        console.log(user)
                                        
                                        return (


                                            <tr key={user.name} onClick={valueAdressSender = user.public_key }>
                                                <td>{user.name}</td>
                                                <td>{user.phone}</td>
                                                {/* <td>{user.public_key}</td> user.public_key*/}
                                                {/* <td><a href={email_club_link}>{user.email_club}</a></td>
                                                <td><a href={email_athlete_link}>{user.email_athlete}</a></td>
                                                <td><button id="basic_user" onClick={modifClick}><IconEdit /></button></td>
                                                <td><button id="basic_user" onClick={deleteClick}><IconDelete /></button></td> */}
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </TableScrollbar>
                </div>
            </div>
  );
}
export default TransactionPage;

///////////////////
// web scrapper //
/////////////////

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
