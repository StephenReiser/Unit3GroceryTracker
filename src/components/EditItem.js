// import React, { Component } from 'react'
// import { BrowserRouter as Router, Route, Link} from 'react-router-dom'


// class EditItem extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {

//         }
//     }
    

//     // above shoudl work, needs to just be posted into app.js.  need to set state for editFood_name, qty, exp date, etc in app.js


//     render() {
//         return(
     
//             <div className='editForm'>
            
//             <form onSubmit={this.props.handleEdit}>
            
//             <label htmlFor="editFood_name">Food Name</label>
            
//             <input type='text' id='editFood_name' value={this.props.editFood_name} onChange={this.props.handleChange} />

//             <label htmlFor="editFood_qty">Quantity</label>
//             <input type='number' id='editFood_qty' value={this.props.editFood_qty} onChange={this.props.handleChange} />
//             <label htmlFor="editExpiration_date">Expiration Date</label>
//             <input type='date' id='editExpiration_date' value={this.props.editExpiration_date} onChange={this.props.handleChange} />
//             <label htmlFor="editStorage_area">Storage Area</label>
//             {/* <input type='text' id='editStorage_area' value={this.props.editStorage_area} onChange={this.props.handleChange} /> */}

//             <select value={this.props.editStorage_area} onChange={this.props.handleSelect}>
            
//             <option value='cabinet'>Cabinet</option>
//             <option value='refridgerator'>Refridgerator</option>
//             <option value='freezer'>Freezer</option>


//         </select>
           
//           </form>
//           <Link to='/' exact><button onClick={()=>{this.props.handleEdit(this.props.groceriesDetails._id)}}>Edit!</button></Link>

// {/* I think all this will work, just need to pass in handle Edit in app.js and all the state info */}
//           </div>
//         )
//     }





// }





// export default EditItem


import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import {
  Bootstrap,
  FormLabel,
  Col,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';

class EditItem extends Component {
  render() {
    return (
        <div className='editForm'>
      <Form onSubmit={this.props.handleEdit}>
        <FormGroup>
          <Col componentClass={FormLabel} sm={2}>
            Food Name:
          </Col>
          <Col sm={10}>
            <FormControl
                id='editFood_name'
                value={this.props.editFood_name} 
                onChange={this.props.handleChange}
                type='text'
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={FormLabel} sm={2}>
            Quantity:
          </Col>
          <Col sm={10}>
            <FormControl
                 type='number'
                 id='editFood_qty'
                 value={this.props.editFood_qty}
                 onChange={this.props.handleChange}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={FormLabel} sm={2}>
            Expiration Date:
          </Col>
          <Col sm={10}>
            <FormControl
                type='date'
                id='editExpiration_date'
                value={this.props.editExpiration_date}
                 onChange={this.props.handleChange} 
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={FormLabel} sm={2}>
            Storage Area:
          </Col>
          <Col sm={10}>
            <Form.Control id='storage_area' value={this.props.editStorage_area} as='select' onChange={this.props.handleSelect}>
              <option>Choose...</option>
              <option>Freezer</option>
              <option>Pantry</option>
              <option>Refridgerator</option>
            </Form.Control>
          </Col>
        </FormGroup>

        {/* <Col componentClass={FormLabel} sm={2}>
          <Button id='button-submit' bsStyle='primary' type='submit'>
            Add Food
          </Button>
        </Col> */}
      </Form>
      <Link to='/' exact><button onClick={()=>{this.props.handleEdit(this.props.groceriesDetails._id)}}>Edit!</button></Link>

{/* I think all this will work, just need to pass in handle Edit in app.js and all the state info */}
          </div>
    );
  }
}

export default EditItem;