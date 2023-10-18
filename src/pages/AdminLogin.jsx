import React , {useState} from "react";
import { HiOutlineMail } from "react-icons/hi";
import { GoLock } from "react-icons/go";
import "../stylesheet/login.css"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../image/logo.png"
import axios from 'axios';



const AdminLogin = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [logData, setLogData] = useState(
      {
      email: "",
      password: ""
  
      })
  
      const handleInput = (e)=>{
        const {name , value} = e.target;
        setLogData({...logData, [name]:value})
      }
  
      const  usenavigate = useNavigate()
 
  
      const handleSubmit = (e) => {
        e.preventDefault();
        if (logValidate()) {
          const fd = new FormData()
          Object.entries(logData).forEach(([key, value])=>{
            fd.append(key , value);
          })
          setIsLoading(true);
          axios.post('http://bripan.greenmouseacademy.com.ng/api/auth/admin/login', fd, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            console.log(res);
            if(res.data.code === 200){
            toast.success(res.data.message);
            usenavigate('/admin/')
            // toast.success("welcome " +res.data.first_name)
               
            }else{
            toast.error(res.data.message);
            }
          })
          .catch((err) => {
            toast.error(""+err);
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false); 
          });
        
        }
      };
      
      
  
   
      
      const logValidate = ()=>{
        let result = true
        if (logData.email === "" || logData.email === null){
          result = false
          toast.error("Please enter Email")
        }
  
        if (logData.password === "" || logData.password === null){
          result = false
          toast.error("Please enter Password")
        }
  
        return result
      }
    return (
      <div className="main_login">
        <form onSubmit={handleSubmit} action="submit" className="login">
          <img src={logo} alt="" />
          <div className="log_head">
            <h3>Admin Login</h3>
            <p>Fill in your credentials to login to the dashboard</p>
          </div>
          <div className="input_log">
            <label htmlFor="email">Email</label>
            <div>
              {" "}
              <HiOutlineMail />{" "}
              <input type="text" name="email" placeholder="Email" onChange={handleInput} value={logData.email}/>
            </div>
          </div>
          <div className="input_log">
            <label htmlFor="password">Password</label>
            <div>
              {" "}
              <GoLock />{" "}
              <input type="password" name="password" placeholder="Password" onChange={handleInput} value={logData.password} />
            </div>
          </div>
  
          <button type="submit" className="login_btn" disabled={isLoading}>
    {isLoading ? "Verifying..." : "Login"}
          </button>  
  
          
        </form>
      </div>
    );
  };
  

export default AdminLogin