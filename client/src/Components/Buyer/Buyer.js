import React from 'react';
import { Button, Modal } from "react-bootstrap";
import { bookSlot, removeSlot, fetchSellers } from '../../Services/services'

const initialValues = {
  name: "",
  contact: "",
  slot: "",
  sellerId: ""
};

const Buyer = (props) => {
  const [show, setShow] = React.useState(false);
  const [values, setValues] = React.useState(initialValues);
  const [sellers, setSellers] = React.useState(props.location.state && props.location.state.sellers);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleClose = () => setShow(false);
  const handleShow = (id, slot) => {
    setShow(true);
    setValues({ ...values, slot: slot, sellerId: id });
  };

  React.useEffect(() => {
    if (searchQuery !== "") {
      let filtered =props.location.state && props.location.state.sellers.filter((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setSellers(filtered)
    }
    if (searchQuery === "") setSellers(props.location.state && props.location.state.sellers)
  }, [searchQuery]);

  const handleInputChange = (e) => {
    // const err = errors;
    const { name, value } = e.target;
    // const errorMessages = validateProperty(name, value);
    // if (errorMessages) err[name] = errorMessages;
    // else delete err[name];
    // setErrors((errors) => err || {});
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const er = validate();
    // setErrors((errors) => er || {});
    // if (er) return;
    // dispatch(addProject(values,token));
    if(values.name === '' && values.contact === '') return alert('Please fill out the all Fields');
    if(values.name === '' || values.contact === '') return alert('Please fill out the all Fields');
    bookSlot(values);
    removeSlot(values).then(() => fetchSellers().then(data => setSellers(data)));
    setValues(initialValues);
    handleClose();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.currentTarget.value)
  };

  const date = new Date().toDateString();

  return (
    <div className="container">
      <div className="mt-5">
            <h1 className="display-4 fw-bold">Appointment Booking System</h1>
            </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton><Modal.Title>Book Slot</Modal.Title></Modal.Header>
        <Modal.Body>
          <p className="card-text badge badge-secondary p-2 mx-1">{values.slot}</p>
          <p className="fw-bold"> {date}</p>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input value={values.name} onChange={handleInputChange} name="name" type="text" placeholder="Your Name" className="form-control"/>
            </div>
            <div className="mb-3">
              <label htmlFor="contact" className="form-label">Contact</label>
              <input value={values.contact} onChange={handleInputChange} name="contact" type="text"placeholder="Your Contact No." className="form-control"/>
            </div>
            {/* <div> {errors.description && (<small className="text-danger">{errors.description}</small>)}</div> */}
            <div className="m-3">
              <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className="row">
      <input type="text" name="search" className="form-control m-3" placeholder="Search By Seller Name..." value={searchQuery} onChange={handleSearch} />
      </div>
      <div className="row">
        {sellers.map((person, index) =>
          <div className="col-sm-6 my-3" key={person._id}>
            <div className="card bg-light shadow h-100 w-100">
              <div className="card-body">
                <h4 className="card-title text-capitalize fw-bold">{person.name}</h4>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                {person.slots.length > 0 ? ( <div>
                 <p className="card-text">All Availabel Slots</p> 
                 {person.slots.map(a => (<span key={a} className="card-text badge badge-secondary p-2 mx-1 shadow" style={{ cursor: 'pointer' }} onClick={() => handleShow(person._id, a)}>{a}</span>))}</div>) : <p className="text-danger"> This Seller Does Not Allow Any Booking For Now.</p>
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Buyer;