import React from 'react';
import { Button, Modal } from "react-bootstrap";
import { createSlot, buyerRequest, cancelRequest } from '../../Services/services';

const Seller = (props) => {
    const [person, setPerson] = React.useState('');
    var [seller, setSeller] = React.useState({});
    const [buyers, setBuyers] = React.useState([]);
    const [show, setShow] = React.useState(false);
    const [values, setValues] = React.useState({});
    const [selectedBuyers, setSelectedBuyers] = React.useState([])

    const handleRadioChange = (e, id) => {
        setPerson(e.target.value);
        setSeller(...props.location.state.sellers.filter(a => a._id === id));
        setBuyers(props.location.state.buyers.filter(r => r.isSlotBooked === 'notBooked' && r.sellerId === id));
        setSelectedBuyers(props.location.state.buyers.filter(r => r.isSlotBooked === 'isBooked' && r.sellerId === id))
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const options = [
        { id: 1, slot: '10AM - 11AM' },
        { id: 2, slot: '11AM - 12AM' },
        { id: 3, slot: '12PM - 1PM' },
        { id: 4, slot: '2PM - 3PM' },
        { id: 5, slot: '3PM - 4PM' },
        { id: 6, slot: '4PM - 5PM' },
    ]

    const handleInputChange = (e) => {
        // const err = errors;
        const { name, value } = e.target;
        // const errorMessages = validateProperty(name, value);
        // if (errorMessages) err[name] = errorMessages;
        // else delete err[name];
        // setErrors((errors) => err || {});
        setValues({ slot: value, id: seller._id });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(seller.slots.includes(values.slot)) return alert('Already Created Please Select Another One');
        if(!values.slot) return alert('Please Select Any One Option');
        seller.slots.push(values.slot);
        // const er = validate();
        // setErrors((errors) => er || {});
        // if (er) return;
        // dispatch(addProject(values,token));
        createSlot(values).then(() => setSeller(seller));
        setValues({});
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
    const date = new Date().toDateString();

    return (
        <div className="container">
            <div className="mt-5">
            <h1 className="display-4 fw-bold">Appointment Booking System</h1>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton><Modal.Title>Add New Slot</Modal.Title></Modal.Header>
                <Modal.Body>
                <p className="fw-bold ml-3"> {date}</p>
                    <form>
                        <div className="col-4">
                            <label htmlFor="slot" className="form-label">Select Slot</label>
                            <select name="slot" id="slot" className="form-control" onChange={handleInputChange}>
                                <option value="" />
                                {options.map((option) => (
                                    <option key={option.id} value={option.slot}>
                                        {option.slot}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="m-3">
                            <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            {!person && props.location && props.location.state.sellers.map((seller) => (
                <div className="form-check" key={seller._id}>
                    <input className="form-check-input" style={{width:"16px", height:"16px"}} type="radio" id={seller.id} name={seller.name} value={seller.name} checked={seller.name === person} onChange={(e) => handleRadioChange(e, seller._id)} />
                    <label htmlFor="seller"><strong className="h5">{seller.name}</strong></label>
                </div>
            ))}
            {person && seller && (
                <div className="px-4 py-5 my-5 text-center bg-info shadow">
                    <h1 className="display-5 fw-bold text-capitalize">{seller.name}</h1>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                        <p className="lead mb-4">Created Slots : {seller.slots.map(a => (<span class="card-text badge badge-secondary p-2 m-1 shadow">{a}</span>))}</p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <button type="button" className="btn btn-warning btn-lg px-4 me-sm-3 shadow" onClick={handleShow}>Add Slot</button>
                        </div>
                    </div>
                </div>)}
            <div className="row" style={{ width: "79rem" }}>
                {buyers.length > 0 && (
                    <div className="col-md-5 bg-info shadow" style={{ width: "46rem" }}>
                        <h2 className="display-5 fw-bold py-4">Requested Appointments</h2>
                        {buyers.map(buyer => (
                            <div className="card my-3 bg-secondary shadow" style={{ width: "18rem", marginLeft:"6rem", position:'relative' }}>
                                <div className="card-body text-white">
                                    <h5 className="card-title text-capitalize">{buyer.name}</h5>
                                    <p className="card-text">Contact : {buyer.contact}</p>
                                    <p className="card-text">Slot Request : {buyer.slot}</p>
                                    <button onClick={() => handleAccept(buyer._id)} className="btn btn-primary shadow">Accept</button>
                                    <button onClick={() => handleReject(buyer._id)} className="btn btn-danger m-2 shadow">Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="m-5"></div>
                {selectedBuyers.length > 0 && (
                    <div className="col-md-5 bg-info shadow" style={{ width: "46rem" }}>
                        <h2 className="display-5 fw-bold py-4">Scheduled Appointments</h2>
                        {selectedBuyers.map(buyer => (
                            <div className="card my-3 bg-secondary shadow" style={{ width: "18rem", marginLeft: "6rem", position:'relative' }}>
                                <div className="card-body text-white text-center">
                                    <h5 className="card-title text-capitalize">{buyer.name}</h5>
                                    <p className="card-text">Contact : {buyer.contact}</p>
                                    <p className="card-text">Slot Request : {buyer.slot}</p>
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