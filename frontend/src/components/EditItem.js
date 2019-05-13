import React, { Component } from 'react'


class EditItem extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    // handleEdit (id) {
        
    //     fetch(baseURL + '/groceries/' + id, {
    //       method: 'PUT',
    //       body: JSON.stringify({food_name: this.state.editFood_name, food_qty: this.state.editFood_qty, expiration_date: this.state.editExpiration_date, storage_area: this.state.editStorage_area}),
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     }).then (res => res.json())
    //       .then (resJson => {
    //         const findIndex = this.state.groceries.findIndex(item => item._id === id)
    //         const copyGroceries = [...this.state.groceries]
    //         copyGroceries.splice(findIndex, 1, resJson)

    //         this.setState({
    //           groceries: copyGroceries
    //         })
    //     }).catch (error => console.error({'Error': error}))
    //   }

    // above shoudl work, needs to just be posted into app.js.  need to set state for editFood_name, qty, exp date, etc in app.js


    render() {
        return(
            <div className='editForm'>
            
            <form onSubmit={this.handleEdit}>
            <label htmlFor="editFood_name">Food Name</label>
            <input type='text' id='editFood_name' value={this.props.editFood_name} placeholder={this.props.groceriesDetails.food_name} onChange={this.props.handleChange} />
            <label htmlFor="editFood_qty">Quantity</label>
            <input type='number' id='editFood_qty' value={this.props.editFood_qty} placeholder={this.props.groceriesDetails.food_qty} onChange={this.props.handleChange} />
            <label htmlFor="editExpiration_date">Expiration Date</label>
            <input type='date' id='editExpiration_date' value={this.props.editExpiration_date} placeholder='' onChange={this.props.handleChange} />
            <label htmlFor="editStorage_area">Storage Area</label>
            <input type='text' id='editStorage_area' value={this.props.storage_area} placeholder={this.props.groceriesDetails.storage_area} onChange={this.props.handleChange} />
           
          </form>
          <button onClick={()=>{this.props.handleEdit(this.props.groceriesDetails._id)}}>Edit!</button>

{/* I think all this will work, just need to pass in handle Edit in app.js and all the state info */}
          </div>
        )
    }





}





export default EditItem