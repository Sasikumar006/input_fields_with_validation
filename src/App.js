import './App.css';
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Input,
  InputGroup,
  // InputGroupAddon,
  InputGroupText,
  Label,
  Row
} from 'reactstrap';
// import { ToastContainer, toast } from "react-toastify";
// import { toast.success, toast.error } from './Toaster';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import RowTask from './RowTask';

function App() {

  const [invalidFlag, setInvalidFlag] = useState({
    email: false, name: false, mobile: false,
  });
  const [state, setState] = useState({ email: '', name: '', mobile: '', index: 0 });
  const [contactForm, setContactForm] = useState([]);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);

  const updateFieldState = (fieldName, fieldValue) => {
    setState((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
    if (fieldValue !== '') {
      const invalid = { ...invalidFlag };
      invalid[fieldName] = false;
      setInvalidFlag(invalid);
    }
  }

  const validateField = () => {
    let isValid = true;
    const invalid = { ...invalidFlag };
    const { email, name, mobile } = state;
    if (!email) {
      invalid.email = true;
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      invalid.email = true;
      isValid = false;
    }
    if (!mobile || (mobile.length < 10 || mobile.length > 10)) {
      invalid.mobile = true;
      isValid = false
    }
    if (!name) {
      invalid.name = true;
      isValid = false
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
      invalid.name = true;
      isValid = false;
    }
    setInvalidFlag(invalid);
    if (!isValid) {
      toast.error('Kindly check input fields');
    }
    return isValid;
  }
  const submitForm = () => {
    if (validateField() && isAlreadyAvailable()) {
      const fields = [...contactForm];
      fields.push(state);
      setContactForm(prev => (fields))
      setState({ email: '', name: '', mobile: '', index: 0 });
      toast.success('Successfully fields Added')
    }
  }

  const handleEditForm = (item, idx) => {
    setShowUpdateBtn(prev => !prev);
    if (showUpdateBtn) {
      setState({ email: '', name: '', mobile: '', index: 0 });
    } else {
      setState(prev => ({ ...prev, email: item.email, name: item.name, mobile: item.mobile, index: idx }));
    }
  }

  const updateForm = () => {
    if (validateField()) {
      const stateValue = { ...state };
      const inputValues = [...contactForm];
      inputValues[stateValue.index] = stateValue;
      setContactForm(prev => inputValues);
      setState({ email: '', name: '', mobile: '', index: 0 });
      toast.success('Successfully fields updated')
      setShowUpdateBtn(prev => !prev)
    }
  }

  const isAlreadyAvailable = () => {
    let isValid = true;
    const stateValue = { ...state };
    const inputValues = [...contactForm];
    const invalid = { ...invalidFlag };
    inputValues.forEach((item, idx) => {
      if (item.name === stateValue.name) {
        isValid = false;
        invalid.name = true;
        toast.error(`${item.name} is already exist`);
      }
      if (item.email === stateValue.email) {
        isValid = false;
        invalid.email = true;
        toast.error(`${item.email} is already exist`);
      }
      if (item.mobile === stateValue.mobile) {
        isValid = false;
        invalid.mobile = true;
        toast.error(`${item.mobile} is already exist`);
      }
    });
    setInvalidFlag(invalid);
    return isValid;
  }

  const clearForm = () => {
    const inputFields = { email: '', name: '', mobile: '', index: 0 }
    setState(prev => inputFields);
    setInvalidFlag({ email: false, name: false, mobile: false })
  }

  return (
    <div className="App">
      <RowTask />
      <div className='divPadding'>
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <div style={{ textAlign: 'center', color: 'darkblue', fontWeight: 'bold' }}>
                  React Task
                </div>
                <div style={{ textAlign: 'center', color: 'darkgreen', fontWeight: 'bold' }}>
                  Component A
                </div>
              </CardHeader>
              <CardBody style={{ background: 'olivedrab'}}>
                <FormGroup row className="my-0">
                  <Col md="4">
                    <FormGroup>
                      <Label htmlFor="name">
                        Name:<span className="text-danger">*</span>
                      </Label>
                      <InputGroup>
                        {/* <InputGroupAddon addonType="prepend"> */}
                        <InputGroupText>
                          <i className="fa fa-flag" aria-hidden="true"></i>
                        </InputGroupText>
                        {/* </InputGroupAddon> */}
                        <Input
                          type="text"
                          id="name"
                          value={state.name}
                          invalid={invalidFlag.name}
                          onChange={e =>
                            updateFieldState('name', e.target.value)
                          }
                        />
                      </InputGroup>
                      {invalidFlag.name ? (
                        <span className="text-danger font-xs">*Only enter alphabets and one space</span>
                      ) : (
                        ''
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label htmlFor="name">
                        Email:<span className="text-danger">*</span>
                      </Label>
                      <InputGroup>
                        {/* <InputGroupAddon addonType="prepend"> */}
                        <InputGroupText>
                          <i className="fa fa-flag" aria-hidden="true"></i>
                        </InputGroupText>
                        {/* </InputGroupAddon> */}
                        <Input
                          type="email"
                          id="email"
                          value={state.email}
                          invalid={invalidFlag.email}
                          onChange={e =>
                            updateFieldState('email', e.target.value)
                          }
                        />
                      </InputGroup>
                      {invalidFlag.email ? (
                        <span className="text-danger font-xs">*Enter Alphabets with Special Characters</span>
                      ) : (
                        ''
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label htmlFor="name">
                        Mobile:<span className="text-danger">*</span>
                      </Label>
                      <InputGroup>
                        {/* <InputGroupAddon addonType="prepend"> */}
                        <InputGroupText>
                          <i className="fa fa-flag" aria-hidden="true"></i>
                        </InputGroupText>
                        {/* </InputGroupAddon> */}
                        <Input
                          type="number"
                          id="mobile"
                          value={state.mobile}
                          invalid={invalidFlag.mobile}
                          onChange={e =>
                            updateFieldState('mobile', e.target.value)
                          }
                        />
                      </InputGroup>
                      {invalidFlag.mobile ? (
                        <span className="text-danger font-xs">*Enter Numbers only and Enter 10 digits Number</span>
                      ) : (
                        ''
                      )}
                    </FormGroup>
                  </Col>
                  {/* <Col auto className='mt-4'>
                    <Button
                      type="Update"
                      size="sm"
                      className="m-1"
                      color="danger"
                      onClick={submitForm}
                      disabled={state.isButtonPressed}
                    >
                      <i className="fa fa-check"></i>Save
                    </Button>
                  </Col> */}
                </FormGroup>
              </CardBody>
              <CardFooter className="text-right">
                <div style={{ textAlign: 'center' }}>
                  {!showUpdateBtn && <Button
                    type="Update"
                    size="sm"
                    className="m-1"
                    color="danger"
                    onClick={submitForm}
                    disabled={state.isButtonPressed}
                  >
                    <i className="fa fa-check"></i>Save
                  </Button>}
                  {showUpdateBtn && contactForm.length > 0 && <Button
                    type="Cancel"
                    size="sm"
                    className="m-1"
                    color="primary"
                    onClick={updateForm}
                  >
                    <i className="fa fa-times"></i>Update
                  </Button>}

                  <Button
                    type="Cancel"
                    size="sm"
                    className="m-1"
                    color="warning"
                    onClick={clearForm}
                  >
                    <i className="fa fa-times"></i>Clear
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Col>

        </Row>
      </div>
      <div className='divPadding'>
        <Row>
          <Col xl="12" lg="12" md="12">
            <Card className="cardShadow p-4" style={{ borderRadius: 20 }}>
              <CardHeader>
                <div style={{ textAlign: 'center', color: 'darkgreen', fontWeight: 'bold' }}>
                  Component B
                </div>
              </CardHeader>
              <div className="tableFixHead mt-3" >
                <Table
                  // borderless
                  // className=" font-weight-bold border-0"
                  responsive
                  bordered
                  className="text-center"
                  size="sm"
                >
                  <thead>
                    <tr className="border">
                      <th className="border text-center p-0">S.No</th>
                      <th className="border text-center p-0">Name</th>
                      <th className="border text-center p-0">Email</th>
                      <th className="border text-center p-0">Mobile</th>
                      <th className="border text-center p-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactForm.length > 0 ? (
                      contactForm.map((item, index) => (
                        <tr className="border" key={index}>
                          <td className="text-center font-weight-bold p-0">{index + 1}</td>
                          <td className="text-center font-weight-bold p-0" style={{ color: "green" }}>{item.name}</td>
                          <td className="text-center font-weight-bold p-0" style={{ color: "blueviolet" }}>{item.email}</td>
                          <td className="text-center font-weight-bold p-0" style={{ color: "red" }}>{item.mobile}</td>
                          <td>
                            <Button
                              type="Update"
                              size="sm"
                              className="m-1"
                              color="primary"
                              onClick={() => handleEditForm(item, index)}
                              disabled={state.isButtonPressed}
                            >
                              <i className="fa fa-check"></i>Edit
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="text-center border">
                        <td colSpan={5}>No Data Available</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Toaster
        // position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Toaster />
    </div>
  );
}

export default App;