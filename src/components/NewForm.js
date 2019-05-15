import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  Bootstrap,
  FormLabel,
  Col,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';

class NewForm extends Component {
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit}>
        <FormGroup>
          <Col componentClass={FormLabel} sm={2}>
            Food Name:
          </Col>
          <Col sm={10}>
            <FormControl
              onChange={this.props.handleChange}
              value={this.props.food_name}
              type='text'
              id='food_name'
              placeholder='Food Name'
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={FormLabel} sm={2}>
            Quantity:
          </Col>
          <Col sm={10}>
            <FormControl
              onChange={this.props.handleChange}
              type='number'
              id='food_qty'
              min='1'
              value={this.props.food_qty}
              placeholder='1'
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
              onChange={this.props.handleChange}
              type='date'
              id='expiration_date'
              value={this.props.expiration_date}
              placeholder=''
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={FormLabel} sm={2}>
            Storage Area:
          </Col>
          <Col sm={10}>
            <Form.Control id='storage_area' as='select' onChange={this.props.handleSelect}>
              <option>Choose...</option>
              <option>Freezer</option>
              <option>Pantry</option>
              <option>Refridgerator</option>
            </Form.Control>
          </Col>
        </FormGroup>

        <Col componentClass={FormLabel} sm={2}>
          <Button id='button-submit' bsStyle='primary' type='submit'>
            Add Food
          </Button>
        </Col>
      </Form>
    );
  }
}

export default NewForm;