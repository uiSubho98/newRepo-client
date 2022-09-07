import React from 'react';
import './Partners.css';


const Partners = () => {
    return (
        <>
                <div className='container partner-container'>
           <h2 className='text-white  text-header text-center'>Our Partners</h2>
           <p className='partner-txt text-center'>We trained students from more than 1500 colleges across India</p>
           <div className="colleges">
                <div className='college-card'>
                    <img src="https:/cdn.prograd.org/about_us/our_partner_colleges/1.png" alt="" />
                </div>

                <div className='college-card'>
                    <img src="https:/cdn.prograd.org/about_us/our_partner_colleges/2.png" alt="" />
                </div>

                <div className='college-card'>
                    <img src="https:/cdn.prograd.org/about_us/our_partner_colleges/3.png" alt="" />
                </div>

                <div className='college-card'>
                    <img src="https:/cdn.prograd.org/about_us/our_partner_colleges/4.png" alt="" />
                </div>

                <div className='college-card'>
                    <img src="https:/cdn.prograd.org/about_us/our_partner_colleges/5.png" alt="" />
                </div>

                <div className='college-card'>
                    <img src="https:/cdn.prograd.org/about_us/our_partner_colleges/6.png" alt="" />
                </div>

                <div className='college-card'>
                    <img src="https:/cdn.prograd.org/about_us/our_partner_colleges/7.png" alt="" />
                </div>

                <div className='college-card'>
                    <img src="https:/cdn.prograd.org/about_us/our_partner_colleges/8.png"  alt="" />
                </div>
           </div>

           <p className='partner-txt2 text-center '>We helped them land jobs in Top IT and product companies</p>
           <div className="partners">
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/thoughtworks.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/presidio.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/dunzo.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/magicbricks.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/taylor_and_friends_group.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/talent500.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/progress.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/latent_view.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/career_labs.png" alt="career_labs" />
            </div>
            <div className="company-card">
                <img className='img-fluid logo-enlarge4' src="https:/cdn.prograd.org/about_us/our_partner_brands/ivy.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/core_stack.png" alt="core_stack" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/the_math_company.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/perfomatix.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/iqvia.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/delta.png" alt="delta" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/yellowai.png" alt="yellow.ai" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/loyalticsai.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/drawinbox.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/ust.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid ' src="https:/cdn.prograd.org/about_us/our_partner_brands/vakil_search.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/espace.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/arre.png" alt="arre" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/play_ablo.png" alt="" />
            </div>
            <div className="company-card">
                <img className='img-fluid' src="https:/cdn.prograd.org/about_us/our_partner_brands/quess.png" alt="" />
            </div>
           </div>
        </div>
        <style jsx>
            {`
                .partner-container{
                    width: 1000px;
                    height: 740px;
                    /* border: 1px solid red; */
                    margin-top: 120px;
                
                }
                
                .logo-enlarge{
                    width: 130px!important;
                    margin:0 auto;
                    margin-left: 10px!important;
                }
                
                .logo-enlarge2{
                    transform: scale(2.2);
                    /* margin-left: 35px!important; */
                    
                }
                
                .logo-enlarge4{
                    margin-top: 2px!important;
                     margin-left: 22px!important;
                     margin-top: 10px!important;
                }
                
                .logo-enlarge3{
                    transform: scale(1.8);
                    margin-left: 20px!important;
                    
                }
                .partner-txt{
                    margin-top: 42px;
                    color: #FFFFFFDE;
                    margin-bottom: 56px;
                }
                
                .partner-txt2{
                    margin-top: 56px;
                    color: #FFFFFFDE;
                    margin-bottom: 56px;
                }
                
                
                
                .colleges{
                  display: flex;
                  width: 1000px;
                  /* border: 1px solid rgb(0, 255, 85); */
                  justify-content: center;
                  align-items: center; 
                  position: relative;
                  right: 13.5px;
                
                  
                }
                
                .college-card{
                    width: 80px;
                    height: 70px;
                    /* border: 1px solid red; */
                    background-color: white;
                    margin-right: 30px;
                    
                }
                .college-card img{
                    object-fit: contain;
                    text-align: center;
                    margin-left: 12px;
                    margin-top: 10px;
                width: 55px;
                height: 51px;
                }
                
                .partners{
                  display: grid;
                  grid-template-columns: repeat(6,1fr);
                  grid-column-gap: 15px;
                  grid-row-gap: 20px;
                  width: 1000px;
                  /* border: 1px solid white; */
                  position: relative;
                  right: 13.5px;
                  padding-right: 0px!important;
                }
                
                .company-card img{
                    object-fit:contain;
                    text-align: center;
                    width: 120px;
                    height: 40px;
                    margin: 0 auto;
                    margin-left: 15px;
                    margin-top: 12px;
                }
                
                
                .company-card{
                    width: 154px;
                    height: 60px;
                    /* border: 1px solid red; */
                    background-color: white;
                    border-radius: 5px;
                }
                
                
                @media screen and (max-width: 768px) {
                    .partner-container{
                        width: 90%;
                        height: 1180px;
                        /* border: 1px solid red; */
                        margin-top: 76px;
                    }
                
                    .partner-txt{
                        margin-top: 42px;
                        margin-bottom: 56px;
                        /* border: 1px solid red; */
                        width: 107%;
                        padding: 0px;
                        margin-left: -11px!important;
                    }
                   
                
                
                    .colleges{
                        display: flex;
                        width: 108%;
                        justify-content: space-between;
                        height: 200px;
                        align-items: center;
                        /* border: 1px solid white; */
                        flex-wrap: wrap;
                        margin: 0 auto;
                        margin-left: 0px;
                        
                      }
                .college-card{
                    width: 80px;
                    height: 70px;
                    /* border: 1px solid red; */
                    /* background-color: white; */
                    margin-right: 0px!important;
                    
                }
                .partners{
                    display: grid;
                    grid-template-columns: repeat(3,1fr);
                    grid-column-gap:0px!important;
                    grid-row-gap: 15px;
                    grid-column-gap: 10px!important;
                    width: 108%;
                    /* border: 1px solid white; */
                    position: relative;
                    right: 0px;
                    margin-left: -11px;
                    padding-right: 0px!important;
                  }
                  .company-card{
                    width: 110px;
                    height: 50px;
                    /* border: 1px solid red; */
                    /* background-color: white; */
                    border-radius: 5px;
                }
                .company-card img{
                    object-fit:contain;
                    text-align: center;
                    width: 90px;
                    height: 40px;
                    margin: 0 auto;
                    margin-left: 8px;
                    margin-top: 5px;
                }
                
                .logo-enlarge{
                    width: 98px!important;
                    margin:0 auto;
                    margin-left: 0px!important;
                }
                
                .logo-enlarge2{
                    transform: scale(1.6);
                    /* margin-left: 35px!important; */
                
                    
                }
                
                .logo-enlarge4{
                    
                     margin-left: 5px!important;
                     margin-top: 5px!important;
                
                }
                
                .logo-enlarge3{
                    transform: scale(1.8);
                    margin-left: 5px!important;
                    /* border: 1px solid red; */
                
                    
                }
                
                
                
                }
                
                @media screen and (min-width: 768px) and (max-width: 992px) {
                    
                
                }
                
            `}
        </style>
        </>
    );
};

export default Partners;