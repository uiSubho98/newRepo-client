import React from 'react';
import './Navbar.css'


const Navbar = () => {    
    return (
        <>
          <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid ">
    <img className='ms-5 nav-logo' src='https://i.ibb.co/bLNXF8p/Pro-Grad-mee.png' alt="" />
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 ms-5 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active me-5" aria-current="page" href="#">For Students</a>
        </li>

        <li className="nav-item">
          <a className="nav-link active enterprise-nav" aria-current="page" href="#">For Enterprises</a>
        </li>
       
       
      </ul>
      <div className="d-flex btn-div  me-5" role="search">
      <button className='nav-btn me-2'>Login</button>
      <button className='nav-btn ms-2 '>Sign up</button>
      </div>
    </div>
  </div>
</nav>
        </div>

        <style jsx>

          {`
              .nav-btn{
                background-color:#2E2E2E;
                outline: none;
                color: white;
                border: none;
                font-weight: 500;
                
            }
            
            .enterprise-nav{
                margin-left: -35px;
            
            }
            
            .nav-link{
                font-weight: 500;
            }
            
            .navbar{
                height: 82px;
                background-color: #2E2E2E!important;
            }
            
            
            
            
            @media screen and (max-width: 768px)  {
                .navbar{
                  margin-top:0px!important
                    position: static;
                    height: auto;
                    background-color: #2E2E2E!important;
                    // border: 1px solid red !important; 
                    width:100% !important;
                   
                }
                
                .nav-logo{
                    // border: 1px solid red; 
                    margin-left: 0px!important;
                }
            
                .btn-div{
                    color: red!important;
                    margin-left: 42px;
                }
                .nav-btn{
                    /* border: 1px solid red; */
                    margin-left: 8px;
                }
                .navbar-brand{
                     /* border: 1px solid red; */
                     margin-left: -155px!important;
                     font-size: 25px;
            
                    }
                .logo-nav{
                    /* border: 1px solid red; */
                    margin-left: -0px!important;
                    margin-top: 4px;
                    transform: scale(0.95);
                }
                .enterprise-nav{
                    margin-left:0px;
                
                }
            }
            
            
            
          `}
        </style>
        </>
    );
};

export default Navbar;