import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";



const TransactionList = () =>{
    const [dataList, setDataList] = useState([]);

    // const getData = async () => {
    //     const res = await axios.get(`http://localhost:8080/api/getalltransaction`);;
    //     setDataList(res.data)
    // }

    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/getalltransaction`)
        .then(res=>setDataList(res.data))
        .catch(err=>console.log(err))
        
    },[])

    return(
        <div className="container">
            <div className="row text-right m-2">
                <Link className="col-md-2 btn btn-success" to="/addnew">Add New</Link>
            </div>
            
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    <th width="10%">Date</th>
                    <th>Transaction</th>
                    <th width="10%">Credit</th>
                    <th width="10%">Debit</th>
                    <th width="10%">Balance</th>
                </tr>
                </thead>
                <tbody>
                    
                {  dataList.map((value,index)  => (
                        <tr key={index}>
                            <td>{value.updated_at.split('T')[0]}</td>
                            <td>{value.description}</td>
                            <td>{ value.type==='1' ? value.amount : ""}</td>
                            <td>{ value.type==='0' ? value.amount : ""}</td>
                            <td>{value.balance}</td>
                        </tr>
                ))}
                
                </tbody>
            </table>
        </div>
    )
}

export default TransactionList;