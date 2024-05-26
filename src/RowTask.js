import './App.css';
import {
  Table,
  Button,
  Card,
  CardHeader,
  Col,
  FormGroup,
  Input,
  InputGroup,
  // InputGroupAddon,
  InputGroupText,
  Row,
} from 'reactstrap';
// import { Toaster, toast } from "react-toastify";
import { useState } from 'react';
// import { toast } from './Toaster';
import toast, { Toaster } from 'react-hot-toast';


const RowTask = () => {

  const [invalidFlag, setInvalidFlag] = useState([{
    email: false, name: false, mobile: false,
  }]);
  const [state, setState] = useState([{ email: '', name: '', mobile: '', index: 0 }]);
  const [contactForm, setContactForm] = useState([]);

  const updateFieldState = (fieldName, fieldValue, idx) => {
    const stateValue = [...state];
    setState((prevState) => {
      stateValue[idx][fieldName] = fieldValue
      return stateValue
    });
    if (fieldValue !== '') {
      const invalid = [...invalidFlag];
      invalid[idx][fieldName] = false;
      setInvalidFlag(invalid);
    }
  }

  // (?: [a-zA-Z]+)
  const validateField = (idx) => {
    let isValid = true;
    const invalid = [...invalidFlag];
    const inputState = [...state];
    if (!inputState[idx].email) {
      invalid[idx].email = true;
      isValid = false
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputState[idx].email)) {
      invalid[idx].email = true;
      isValid = false;
      toast.error('Invalid email address');
    }
    if (!inputState[idx].mobile || (inputState[idx].mobile.length < 10 || inputState[idx].mobile.length > 10)) {
      invalid[idx].mobile = true;
      isValid = false
    }
    if (!inputState[idx].name) {
      invalid[idx].name = true;
      isValid = false
    } else if (!/^[a-zA-Z ]+$/.test(inputState[idx].name)) {
      invalid[idx].name = true;
      isValid = false
    }
    setInvalidFlag(invalid);
    return isValid;
  }
  // const handleEditForm = (item, idx) => {
  //   if (true) {
  //     const fields = [...state];
  //     fields[idx] = item;
  //     setContactForm(prev => (fields))
  //     // setState({ email: '', name: '', mobile: '', index: 0 })
  //   }
  //   console.log('contactForm', contactForm);
  // }

  const isAlreadyExists = (idx, currItem) => {
    let isValid = true;
    const stateValues = [...state];
    const isEmailExist = stateValues.every((x) => (x.email === currItem.email && idx !== x.index));
    const isNameExist = stateValues.every((x) => (x.name === currItem.name && idx !== x.index));
    const isMobileExist = stateValues.every((x) => (x.mobile === currItem.mobile && idx !== x.index));
    if (isEmailExist) {
      isValid = false;
      toast.error(`The email was already exists - ${currItem.email}`)
    }
    if (isMobileExist) {
      isValid = false;
      toast.error(`The mobile was already exists - ${currItem.mobile}`)
    }
    if (isNameExist) {
      isValid = false;
      toast.error(`The name was already exists - ${currItem.name}`)
    }
    return isValid;
  }

  const addNewRow = (item, idx) => {
    if (validateField(idx) && isAlreadyExists(idx, item)) {
      const inputFields = { email: '', name: '', mobile: '', index: null };
      const invalid = { email: false, name: false, mobile: false };
      setState(prevState => [...prevState, inputFields]);
      setInvalidFlag(prevState => [...prevState, invalid]);
      toast.success('Successfully Row Added');
    }
  }

  const submitForm = () => {
    let isValid = true;
    const invalid = [...invalidFlag];
    const stateValues = [...state];
    const fields = [];
    stateValues.forEach((item, idx) => {
      if (!item.name) {
        invalid[idx].name = true;
        isValid = false;
      } else if (!/^[a-zA-Z ]+$/.test(item.name)) {
        invalid[idx].name = true;
        isValid = false
      }

      if (!item.email) {
        invalid[idx].email = true;
        isValid = false;
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(item.email)) {
        invalid[idx].email = true;
        isValid = false;
        toast.error('Invalid Email Address');
      }
      if (!item.mobile || (item.mobile.length > 10 || item.mobile.length < 10)) {
        invalid[idx].mobile = true;
        isValid = false;
      }

      if (isValid) {
        fields.push(item);
      } else {
        toast.error('Kindly check the fields');
      }
    });
    setInvalidFlag(invalid);
    if (isValid) {
      setContactForm(prev => (fields));
    } else {
      setContactForm([]);
    }
  }

  return (
    <div className='divPadding'>
      <Row>
        <Col xl="12" lg="12" md="12">
          <Card className="cardShadow p-4" style={{ borderRadius: 20, background: 'olive' }}>
            <CardHeader>
              <div style={{ textAlign: 'center', color: 'darkblue', fontWeight: 'bold' }}>
                Row Task
              </div>
            </CardHeader>
            <div className="tableFixHead mt-3" >
              <Table
                // borderless
                // className=" font-weight-bold border-0"
                responsive
                borderless
                className="text-center"
                size="sm"
              >
                <thead>
                  <tr className="border">
                    <th className="text-center p-2">S.No</th>
                    <th className="text-center p-2">Name</th>
                    <th className="text-center p-2">Email</th>
                    <th className="text-center p-2">Mobile</th>
                    <th className="text-center p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {true ? (
                    state.map((item, idx) => {
                      return (
                        <tr className="border" key={idx}>
                          <td>{idx + 1}</td>
                          <td >
                            <FormGroup>
                              <InputGroup>
                                {/* <InputGroupAddon addonType="prepend"> */}
                                <InputGroupText>
                                  <i className="fa fa-flag" aria-hidden="true"></i>
                                </InputGroupText>
                                {/* </InputGroupAddon> */}
                                <Input
                                  type="text"
                                  id="country"
                                  value={item.name}
                                  invalid={invalidFlag[idx].name}
                                  onChange={e =>
                                    updateFieldState('name', e.target.value, idx)
                                  }
                                />
                              </InputGroup>
                              {invalidFlag[idx].name ? (
                                <span className="text-danger font-xs">*Only enter alphabets and one space</span>
                              ) : (
                                ''
                              )}
                            </FormGroup>
                          </td>
                          <td>
                            <FormGroup>
                              <InputGroup>
                                {/* <InputGroupAddon addonType="prepend"> */}
                                <InputGroupText>
                                  <i className="fa fa-flag" aria-hidden="true"></i>
                                </InputGroupText>
                                {/* </InputGroupAddon> */}
                                <Input
                                  type="email"
                                  id="email"
                                  value={item.email}
                                  invalid={invalidFlag[idx].email}
                                  onChange={e =>
                                    updateFieldState('email', e.target.value, idx)
                                  }
                                />
                              </InputGroup>
                              {invalidFlag[idx].email ? (
                                <span className="text-danger font-xs">*Enter Alphabets with Special Characters</span>
                              ) : (
                                ''
                              )}
                            </FormGroup>
                          </td>
                          <td >
                            <FormGroup>
                              <InputGroup>
                                {/* <InputGroupAddon addonType="prepend"> */}
                                <InputGroupText>
                                  <i className="fa fa-flag" aria-hidden="true"></i>
                                </InputGroupText>
                                {/* </InputGroupAddon> */}
                                <Input
                                  type="number"
                                  id="mobile"
                                  value={item.mobile}
                                  invalid={invalidFlag[idx].mobile}
                                  onChange={e =>
                                    updateFieldState('mobile', e.target.value, idx)
                                  }
                                />
                              </InputGroup>
                              {invalidFlag[idx].mobile ? (
                                <span className="text-danger font-xs">*Enter Numbers only and Enter 10 digits Number</span>
                              ) : (
                                ''
                              )}
                            </FormGroup>
                          </td>
                          <td className='mb-3'>
                            <Button
                              type="Update"
                              size="sm"
                              className="m-1"
                              color="primary"
                              onClick={() => addNewRow(item, idx)}
                              disabled={state.isButtonPressed}
                            >
                              <i className="fa fa-check"></i>{' '}Add
                            </Button>
                            {/* <Button
                              type="Update"
                              size="sm"
                              className="m-1"
                              color="primary"
                              onClick={() => handleEditForm(item, idx)}
                              disabled={state.isButtonPressed}
                            >
                              <i className="fa fa-check"></i>{' '}Edit
                            </Button> */}
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr className="text-center border">
                      <td colSpan={5}>No Data Available</td>
                    </tr>
                  )}
                </tbody>
                {/* <tfoot> */}
                {/* </tfoot> */}
              </Table>
              <div style={{ textAlign: 'center' }}>
                <Button
                  type="Update"
                  size="sm"
                  className="m-1 text-center"
                  color="danger"
                  onClick={submitForm}
                  disabled={state.isButtonPressed}
                >Save
                </Button>
              </div>
              <Table
                responsive
                bordered
                className="text-center mt-3"
                size="sm"
              >
                <thead>
                  <tr className="border">
                    <th className="border text-center p-0">S.No</th>
                    <th className="border text-center p-0">Name</th>
                    <th className="border text-center p-0">Email</th>
                    <th className="border text-center p-0">Mobile</th>
                  </tr>
                </thead>
                <tbody>
                  {contactForm.length > 0 ? (
                    contactForm.map((item, index) => (
                      <tr className="border" key={index}>
                        <td className="border font-weight-bold text-center p-0">{index + 1}</td>
                        <td className="border font-weight-bold text-center p-0" style={{ color: "green" }}>{item.name}</td>
                        <td className="border font-weight-bold text-center p-0" style={{ color: "blueviolet" }}>{item.email}</td>
                        <td className="border font-weight-bold text-center p-0" style={{ color: "red" }}>{item.mobile}</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-center border">
                      <td colSpan={4}>No Data Available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card>
        </Col>
      </Row>
      {/* <Toaster
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Toaster /> */}
      <Toaster
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition='Bounce'
/>
      {/* Same as */}
      <Toaster />
    </div>
  )
}

export default RowTask;