import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'


class EditItem extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    

    // above shoudl work, needs to just be posted into app.js.  need to set state for editFood_name, qty, exp date, etc in app.js


    render() {
        return(
     
            <div className='editForm'>
            
            <form onSubmit={this.props.handleEdit}>
            
            <label htmlFor="editFood_name">Food Name</label>
            
            <input type='text' id='editFood_name' value={this.props.editFood_name} onChange={this.props.handleChange} />

            <label htmlFor="editFood_qty">Quantity</label>
            <input type='number' id='editFood_qty' value={this.props.editFood_qty} onChange={this.props.handleChange} />
            <label htmlFor="editExpiration_date">Expiration Date</label>
            <input type='date' id='editExpiration_date' value={this.props.editExpiration_date} onChange={this.props.handleChange} />
            <label htmlFor="editStorage_area">Storage Area</label>
            <input type='text' id='editStorage_area' value={this.props.editStorage_area} onChange={this.props.handleChange} />
           
          </form>
          <Link to='/' exact><button onClick={()=>{this.props.handleEdit(this.props.groceriesDetails._id)}}>Edit!</button></Link>

{/* I think all this will work, just need to pass in handle Edit in app.js and all the state info */}
          </div>
        )
    }





}





export default EditItem