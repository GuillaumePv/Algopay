import * as React from "react";
import { useState, useEffect } from "react";
import AlgorandClient from "../../services/algorandsdk";
import {app} from "../../services/firebase";
import TableScrollbar from 'react-table-scrollbar';
import './table.css'

export const ContactComponent = () => {
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

    //change this line to go on transaction
    // function handleClick = (props) => {
    //     alert(props);
    // }

    {
        return (
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
                    <p>create liste of contacts firebase</p>
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


                                            <tr key={user.name} onClick={() => alert(user.public_key)}>
                                                <td>{user.name}</td>
                                                <td>{user.phone}</td>
                                                {/* <td>{user.public_key}</td> */}
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
}

export default ContactComponent;
