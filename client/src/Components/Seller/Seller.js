import React from 'react';
import { Button, Modal } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import { createSlot, buyerRequest, cancelRequest, fetchSellers, fetchAllBuyers } from '../../Services/services';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const Seller = (props) => {
    const [person, setPerson] = React.useState('');
    var [seller, setSeller] = React.useState({});
    const [sellers, setSellers] = React.useState([]);
    const [buyers, setBuyers] = React.useState([]);
    const [show, setShow] = React.useState(false);
    const [values, setValues] = React.useState({});
    const [selectedBuyers, setSelectedBuyers] = React.useState([])
    const [date, setDate] = React.useState(new Date());

    React.useEffect(() => {
        fetchSellers().then(data => setSellers(data));
        fetchAllBuyers().then(data => setBuyers(data));
    }, [])

    const handleRadioChange = (e, id) => {
        setPerson(e.target.value);
        setSeller(...sellers.filter(a => a._id === id));
        setBuyers(buyers.filter(r => r.isSlotBooked === 'notBooked' && r.sellerId === id));
        setSelectedBuyers(buyers.filter(r => r.isSlotBooked === 'isBooked' && r.sellerId === id))
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const options = [{ id: 1, slot: '10AM - 11AM' }, { id: 2, slot: '11AM - 12AM' }, { id: 3, slot: '12PM - 1PM' }, { id: 4, slot: '2PM - 3PM' }, { id: 5, slot: '3PM - 4PM' }, { id: 6, slot: '4PM - 5PM' }];

    const handleInputChange = (e) => {setValues({ slot: { time: e.target.value, date: moment(date).format("MMM Do YY")}, id: seller._id });};

    const handleSubmit = (e) => {
        e.preventDefault();
        if (JSON.stringify(values) === '{}') return alert('Please Select Any One Option');
        if (seller.slots.filter(a => a.time === values.slot.time && a.date === values.slot.date).length > 0) return alert('Already Created Please Select Another One');
        seller.slots.push(values.slot);
        createSlot(values).then(() => setSeller(seller));
        setValues({});
        setDate(new Date());
        handleClose();
    };

    const handleAccept = (id) => {
        const addBuyer = buyers.filter(a => a._id === id);
        setSelectedBuyers([...selectedBuyers, ...addBuyer]);
        setBuyers(buyers.filter(a => a._id !== id));
        buyerRequest(id);
    }
    const handleReject = (id) => {
        setBuyers(buyers.filter(a => a._id !== id));
        cancelRequest(id);
    }

    const handleDateInput = (date) => {
        if (!date) return
        setDate(date);
    }

    const isWeekday = date => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    return (
        <div className="container">
            <div className="mt-5">
                <h1 className="display-4 fw-bold">Appointment Booking System</h1>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton><Modal.Title>Add New Slot</Modal.Title></Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row">
                            <div className="col-4 mb-4">
                                <label htmlFor="Date" className="form-label ml-1">Select Date</label><br></br>
                                <DatePicker className="form-control" selected={date} name="date" id="date" label="Date" minDate={new Date()} filterDate={isWeekday} onChange={handleDateInput}/>
                            </div>
                            <div className="col-4 mb-4">
                                <label htmlFor="slot" className="form-label">Select Slot</label>
                                <select name="slot" id="slot" className="form-control" onChange={handleInputChange}>
                                    <option value="" />
                                    {options.map((option) => (<option key={option.id} value={option.slot}>{option.slot}</option>))}
                                </select>
                            </div>
                            <div className="col-4 mt-4">
                                <Button className="mt-2" variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            {!person && sellers.map((seller) => (
                <div className="form-check" key={seller._id}>
                    <input className="form-check-input" style={{ width: "16px", height: "16px" }} type="radio" id={seller._id} name={seller.name} value={seller.name} checked={seller.name === person} onChange={(e) => handleRadioChange(e, seller._id)} />
                    <label htmlFor="seller"><strong className="h5">{seller.name}</strong></label>
                </div>
            ))}
            {person && seller && (
                <div className="px-4 py-5 my-5 text-center bg-info shadow">
                    <h1 className="display-5 fw-bold text-capitalize">{seller.name}</h1>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                        <p className="lead mb-4">Created Slots : {seller.slots.length > 0  && seller.slots.map(a => (<span key={a._id} className="card-text badge badge-secondary p-2 m-1 shadow">{a.time}<small key={a._id} className="mx-2">({a.date})</small></span>))}</p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <button type="button" className="btn btn-warning btn-lg px-4 me-sm-3 shadow" onClick={handleShow}>Add Slot</button>
                        </div>
                    </div>
                </div>)}
            <div className="row" style={{ width: "79rem" }}>
                {person && buyers.length > 0 && (
                    <div className="col-md-5 bg-info shadow" style={{ width: "46rem" }}>
                        <h2 className="display-5 fw-bold py-4">Requested Appointments</h2>
                        {buyers.map(buyer => (
                            <div className="card my-3 bg-secondary shadow" key={buyer._id} style={{ width: "18rem", marginLeft: "6rem", position: 'relative' }}>
                                <div className="card-body text-white">
                                    <h5 className="card-title text-capitalize">{buyer.name}</h5>
                                    <p className="card-text">Contact : {buyer.contact}</p>
                                    <p className="card-text"><span key={buyer._id} className="card-text badge badge-light p-2 m-1 shadow">{buyer.slot.time}<strong key={buyer._id} className="mx-2">({buyer.slot.date})</strong></span></p>
                                    <button onClick={() => handleAccept(buyer._id)} className="btn btn-primary shadow">Accept</button>
                                    <button onClick={() => handleReject(buyer._id)} className="btn btn-danger m-2 shadow">Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="m-5"></div>
                {person && selectedBuyers.length > 0 && (
                    <div className="col-md-5 bg-info shadow" style={{ width: "46rem" }}>
                        <h2 className="display-5 fw-bold py-4">Scheduled Appointments</h2>
                        {selectedBuyers.map(buyer => (
                            <div className="card my-3 bg-secondary shadow" key={buyer._id} style={{ width: "18rem", marginLeft: "6rem", position: 'relative' }}>
                                <div className="card-body text-white text-center">
                                    <h5 className="card-title text-capitalize">{buyer.name}</h5>
                                    <p className="card-text">Contact : {buyer.contact}</p>
                                    <p className="card-text"><span key={buyer._id} className="card-text badge badge-light p-2 m-1 shadow">{buyer.slot.time}<strong key={buyer._id} className="mx-2">({buyer.slot.date})</strong></span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Seller;