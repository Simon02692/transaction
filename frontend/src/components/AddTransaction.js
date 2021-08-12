import React, {useState} from "react";
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";





const AddTransaction = () =>{
    const [isValid, setIsValid] = useState(true);
    const [isShow, setIsShow] = useState(false);
    const [state, setState]=useState({
        addType:"",
        addDescription:"",
        addAmount:"",
    
    })
    
    function handleChange(evet){
        const values = evet.target.value;
        console.log(evet.target.value);
        setState({
            ...state,
            [evet.target.name]:values
        });
    }
    function submitData(){
        if(state.addDescription==="" || state.addAmount==="" || state.addType===""){
            setIsValid(false)
            setIsShow(true)
        }else{
            axios.post(process.env.REACT_APP_API_URL+"inserttransaction",{
                description:state.addDescription,
                amount:state.addAmount,
                type:state.addType
            })
            .then(res=>
                {
                    if(res.status===200){
                        setIsValid(true)
                        setIsShow(true)
                    }
                }
            )
            .catch(err=>console.log(err))
            setState({
                addType:"",
                addDescription:"",
                addAmount:"",
            });
        }
        
        
    }
    

    return(
        <div className="container">
            <div className="row text-end m-2">
                <div className="col-md-12 text-end m-2">
                    <Link className="col-md-2 btn btn-primary" to="/">Get All</Link>
                    
                </div>
                <div className="col-md-12 text-start mt-2">
                {isValid 
                        ? <Alert variant="success" show={isShow}>Hurray! Transaction Save Successfully.<button className="float-end" onClick={() => setIsShow(false)}>X</button></Alert>
                        : <Alert variant="danger" show={isShow} >Sorry! Please Try again After Some Time<button className="float-end" onClick={() => setIsShow(false)}>X</button></Alert>
                    }
                </div>
            </div>
            
            <div className="row text-start">
                <div className="form-group">
                    <label htmlFor="desc">Description:</label>
                    <select className="form-control" name="addType" onChange={handleChange} id="sel1" required value={state.addType}>
                        <option value="">--Select--</option>
                        <option value="0">Debit</option>
                        <option value="1">Credit</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="desc">Description:</label>
                    <input type="text" name="addDescription" className="form-control" value={state.addDescription} onChange={handleChange} placeholder="Description" id="desc" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="amnt">Amount:</label>
                    <input onKeyPress={(event) => {
                    if (!/^[0-9]*\.?[0-9]*$/.test(event.key)) {
                    event.preventDefault();
                    }
                    }} type="text" name="addAmount" pattern="[0-9]*" className="form-control"  value={state.addAmount} onChange={handleChange} placeholder="Enter Amount" id="amnt" required/>
                </div>
                
                <button type="submit" className="col-md-2 mt-2 btn btn-primary" onClick={submitData}>Submit</button>
            </div>
        </div>
    )
}

export default AddTransaction;