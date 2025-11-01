import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import React, { useContext, useEffect } from 'react';
import * as Yup from 'yup'
import * as SB from 'react-bootstrap'
import axios from 'axios';
import { SAVE_EMPLOYEE, UPDATE_EMPLOYEE } from './employeeurls';
import Swal from 'sweetalert2';
import { MyContext } from './EmployeeTable';
import allowNumbersOnly, { AllowCharsOnly } from './CommonValidation';


const EmployeeForm = () => {

    const {type,rowdata,backtotable}=useContext(MyContext)
    const formik=useFormik({
        initialValues:{
            empName:"",empDesignation:"",empAddress:"",empSalary:"",email:"",phoneNo:"",joiningdate:""
        },
        validationSchema:Yup.object({
             empName: Yup.string()
                    .matches(/^[aA-zZ\s]+$/, "only enter Alphabetics")
                    .required("required !"),
                    empDesignation:Yup.string().required("required !"),
                      empAddress:Yup.string().required("required !"),
                        empSalary:Yup.string().required("required !"),
                         joiningdate:Yup.string().required("required !"),
                       
                     email: Yup.string().email().required("required !"),
                       phoneNo: Yup.string()
                             .matches(/^[0-9]{10}$/, "Phone number is not valid. Must be 10 digits.")
                             .required("Phone number is required"),


        }),
        onSubmit:(values)=>{

            if(type!=undefined&&type=="update")
            {
                 axios.put(UPDATE_EMPLOYEE+`${rowdata._id}`,values).then((res)=>{
                if(res!=undefined&&res!="")
                {
                    if(res.data.status=="01")
                    {
                        Swal.fire({text:res.data.message,icon:"success"})
                        backtotable()
                        formik.resetForm()
                    }
                    else{
                         Swal.fire({text:res.data.message,icon:"error"})
                        
                    }
                  
                }
            })
            }
            else{
                 axios.post(SAVE_EMPLOYEE,values).then((res)=>{
                if(res!=undefined&&res!="")
                {
                    if(res.data.status=="01")
                    {
                        Swal.fire({text:res.data.message,icon:"success"})
                        backtotable()
                        formik.resetForm()
                    }
                    else{
                         Swal.fire({text:res.data.message,icon:"error"})
                        
                    }
                  
                }
            })
            }
           

        }
    })

    useEffect(()=>{
       
        if(type=="update"&&rowdata!=undefined&&rowdata!="")
        {
            console.log("sdgasg")
           formik.setValues(rowdata)
          

        }
        

    },[rowdata,type])
    return (
        <>

  <button
                  type="button"
                  className="btn btn-outline-primary btn-sm rounded-2  mt-2"
                  onClick={backtotable}
                >
                  Back
                </button>
 <fieldset className='mb-3 mainfieldset mt-4 py-3'>
                                        <legend className='ms-2 mainlegend'>Employee Details</legend>
            <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                    <SB.Row className='mx-0'>
                          <SB.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                          <label>Employee Name : <span className="text-danger">*</span></label>
                                        
                                          <Field
                                            type="text"
                                            name="empName"
                                            className="form-control"
                                            placeholder="Enter Name."
                                            maxlength="30"
                                              onKeyPress={AllowCharsOnly}
                        
                                          />
                        
                                          <ErrorMessage name="empName" className="text-error" component="div" />
                                        </SB.Col>
                                         <SB.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                          <label>Employee Designation : <span className="text-danger">*</span></label>
                                        
                                          <Field
                                            type="text"
                                            name="empDesignation"
                                            className="form-control"
                                            placeholder="Enter Designation."
                                             maxlength="50"
                                              onKeyPress={AllowCharsOnly}
                        
                                          />
                        
                                          <ErrorMessage name="empDesignation" className="text-error" component="div" />
                                        </SB.Col>
                                         <SB.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                          <label>Email : <span className="text-danger">*</span></label>
                                        
                                          <Field
                                            type="text"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter Email."
                        
                                          />
                        
                                          <ErrorMessage name="email" className="text-error" component="div" />
                                        </SB.Col>
                                         <SB.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                          <label>Phone Number : <span className="text-danger">*</span></label>
                                        
                                          <Field
                                            type="text"
                                            name="phoneNo"
                                            className="form-control"
                                            placeholder="Enter Phone Number."
                                             maxlength="10"
                                              onKeyPress={allowNumbersOnly}
                        
                                          />
                        
                                          <ErrorMessage name="phoneNo" className="text-error" component="div"/>
                                          </SB.Col>
                                           <SB.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                          <label>Joining Date:  <span className="text-danger">*</span></label>
                                        
                                          <Field
                                            type="date"
                                            name="joiningdate"
                                            className="form-control"
                                           
                                           
                        
                                          />
                        
                                          <ErrorMessage name="joiningdate" className="text-error" component="div"/>
                                          </SB.Col>
                                           <SB.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                          <label>Salary:  <span className="text-danger">*</span></label>
                                        
                                          <Field
                                            type="text"
                                            name="empSalary"
                                            className="form-control"
                                            placeholder="Enter Salary."
                                             maxlength="10"
                                              onKeyPress={allowNumbersOnly}
                        
                                          />
                        
                                          <ErrorMessage name="empSalary" className="text-error" component="div"/>
                                          </SB.Col>
                                           <SB.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
                                          <label>Address: <span className="text-danger">*</span></label>
                                          <Field as="textarea" rows="2" cols="12" name="empAddress"   className="form-control"
                                            placeholder="Enter Address."/>
                                         
                        
                                          <ErrorMessage name="empAddress" className="text-error" component="div"/>
                                        </SB.Col>
                    </SB.Row>
                    <SB.Row className='mx-0'>
                        <SB.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>

                        </SB.Col>
                         <SB.Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
                              <button
                    type="submit"
                    className="btn btn-success float-end mt-2"
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                     {type!=undefined&&type=="update"?"Update Details":"Save Details"}
                  </button>
                        </SB.Col>
                    </SB.Row>

                </Form>
            </FormikProvider>
</fieldset>

        

            
        </>
    );
};

export default EmployeeForm;