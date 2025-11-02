import React, { createContext, useEffect, useState } from 'react';
import * as SB from 'react-bootstrap'
import { FaRegEdit } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';
import EmployeeForm from './EmployeeForm';
import axios from 'axios';
import { DELETE_EMPLOYEE, GET_EMPLOYEE } from './employeeurls';
import Swal from 'sweetalert2';
import useLoaderStore from './useLoaderStore';

export const MyContext=createContext()
const EmployeeTable = () => {
   const { setLoading } = useLoaderStore();

    const [empdata,setEmpdata]=useState([])
      const [showform, setShowform] = useState(false);
  const [type, setType] = useState("save");
  const [rowdata,setRowdata]=useState()
  const [data,setData]=useState([])
  const [searchvalue,setSearchvalue]=useState("")

useEffect(()=>{
GetEmployeeDetails()
},[])

  const GetEmployeeDetails=()=>{
     setLoading(true)
    axios.get(GET_EMPLOYEE).then((res)=>{
       setLoading(false)
        if(res!=undefined&&res!="")
        {

            setEmpdata(res.data)
            setData(res.data)
        }
        else{
            setEmpdata([])
            setData([])
        }
    })
  }
    const deleteData=(item)=>{
        Swal.fire({
      text: "Are you sure want to Delete ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    })
      .then((result) => {
        if (result.isConfirmed === true) {
          setLoading(true)
          axios.delete(DELETE_EMPLOYEE + `${item._id}`)
            .then((res) => {
              setLoading(false)
               Swal.fire({ text:res.message, icon: "info" });
               backtotable()
            })
            .catch(() => {
               setLoading(false)
              setTimeout(() => {}, 1500);
            });
        }
      })
      .catch((error) => console.log(error));

    }
    const EditDetails=(item)=>{
        setRowdata(item)
         setShowform(true)
        setType("update")

    }

    const addnewEmployee=()=>{
        setShowform(true)
        setType("save")

    }

    const backtotable=()=>{
        GetEmployeeDetails()
        setShowform(false)
        setType("save")


    }

    const filterdata = (value) => {
    setSearchvalue(value);
    let filterdata = "";
    if (value.trim() == "") {
      filterdata = data;
    } else {
      filterdata = data?.filter(
        (item) =>item.empName.toLowerCase().includes(value.toLowerCase())
      );
    }
    setEmpdata(filterdata);
  };
    return (
        <>
                <SB.Container className="outercontainer">
                  <div className='headtitle'>
                      <h1>Employee Registration</h1>
                  </div>
                    
         
         {
            showform==false&&<>
               <SB.Row>
            
               <SB.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
               
 <input
          type="text"
          name="search"
          placeholder="search By Employee Name.."
          value={searchvalue}
          onChange={(event) => filterdata(event.target.value)}
          className="form-control mt-3"
        />
          
               </SB.Col>
                    <SB.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}></SB.Col>

               <SB.Col xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
 <button
                                type="button"
                                className="btn btn-warning rounded-2 w-100 mt-3 btn-sm"
                                onClick={addnewEmployee}
                              >
                                ADD New Employee
                              </button>
               </SB.Col>
            
        </SB.Row>
        <SB.Row>
          
             <div className="table-responsive">
                        <table
                          className="table table-hover table-bordered table-sm  table_gad"
                          style={{ marginTop: "10px" }}
                        >
                          <thead
                           
                          >
                            <tr >
                              <th style={{ width: "2px" }}>S.No</th>
                              <th>Employee Name</th>
                              <th>Employee Designation </th>
                              <th>Email</th>
                              <th>Phone Number</th>
                              <th>Joining Date</th>
                              <th>Address</th>
                             <th>Salary</th>
                              <th>ACTION</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(empdata == undefined ||
                              empdata?.length == 0) && (
                              <tr>
                                <td colSpan={9} align="center">
                                  NO DATA FOUND
                                </td>
                              </tr>
                            )}
                            {empdata != undefined &&
                              empdata != "" &&
                              empdata.length > 0 &&
                              empdata.map((item, index) => (
                                <tr key={item._id}>
                                  <td>{index + 1}</td>                              
                                  <td>{item.empName}</td>
                                  <td>{item.empDesignation}</td>
                                  <td>{item.email}</td>
                                  <td>{item.phoneNo}</td>
                                  <td>{item?.joiningdate}</td>
                                    <td>{item.empAddress}</td>
                                  <td>{item.empSalary}</td>
                                 
                                  <td>
                                    <div className="d-flex">
                                          <button
                                        type="button"
                                        className="btn btn-outline-success btn-sm me-1"
                                        onClick={() => EditDetails(item)}
                                        title="Action"
                                      >
                                        <FaRegEdit/>
                                      </button>
                                       <button
                                              type="button"
                                              className="btn btn-outline-danger btn-sm"
                                              onClick={() => deleteData(item)}
                                            >
                                              <FiTrash/>
                                            </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>

        </SB.Row>
            </>
         }

         {
            showform&&<>
            <MyContext.Provider value={{type,rowdata,backtotable}}>
                
            <EmployeeForm/>

            </MyContext.Provider>
           
            </>
         }
     
     </SB.Container>
        
            
        </>
    );
};

export default EmployeeTable;