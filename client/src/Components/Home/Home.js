import React from 'react';
import Seller from '../Seller/Seller';
import Buyer from '../Buyer/Buyer'
import { fetchSellers, fetchAllBuyers } from '../../Services/services'
import { Redirect } from "react-router-dom";

const Home = (props) => {
    const [ person, setPerson ] = React.useState('');
    const [ sellers, setSellers ] = React.useState([]);
    const [ buyers, setBuyers ] = React.useState([]);

    React.useEffect(()=> {
        fetchSellers().then(data => setSellers(data));
        fetchAllBuyers().then(data => setBuyers(data));
    }, [])

    const handleRadioChange = (e) => {
        setPerson(e.target.value);
    }

    return (
        <div className="container">
            <div className="mt-5">
            <h1 className="display-4 fw-bold">Appointment Booking System</h1>
            </div>
            {!person && (
                <div>
                <h3 className="fw-bold mt-2">Select Who Are You.</h3>
                <div className="form-check">
                <input className="form-check-input" type="radio" id="seller" name="" value='seller' checked={person === 'seller'} onChange={handleRadioChange}/>
                <label className="form-check-label" htmlFor="seller">Seller</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" id="buyer" name="" value='buyer' checked={person === 'buyer'} onChange={handleRadioChange}/>
                <label className="form-check-label" htmlFor="buyer">Buyer</label>
            </div>
            </div>
            )}
            {person === 'seller' && props.history.push({pathname : '/sellers' , state: { sellers , buyers}})}
            {/* // <Seller sellers={sellers} buyers={buyers}/> */}
            {person === 'buyer' && props.history.push({pathname : '/buyers' , state: { sellers , buyers}})}
            {/* <Buyer sellers={sellers} buyers={buyers}/> */}
        </div>
    )
}

export default Home;