import React from 'react';
import './Team.css'


const Team = () => {
    return (
        <>
            <div className='container prograd-team mb-5'>
            <h2 className='text-center text-white team text-header '>The ProGrad Team</h2>
            <div className='team-content'>
            <p className='text-white team-para mb-4'>We are a group of highly motivated developers, educators, and creators in a love affair with technology. Our leadership team is always questioning, innovating, and posing challenges to find exceptional innovation everywhere.</p>
            </div>
            <div className="team-card">
           <div className="first-row">
           <div className="card">
             <div className="content">
            <div className="front">
            <div className="member">
                   <div className="member-img">
                        <img src="https://cdn.prograd.org/about_us/the_prograd_team/ram_prakash_govindarajan.jpg" alt="" />
                    </div>
                    <div className="member-name text-white">
                        <p className='name fw-bold'>Ram Prakash Govindarajan</p>
                        <p className='designation'>IIM Lucknow Alumnus</p>
                    </div>
                   </div>
            </div>
            <div className="back">

     <div className="member-msg">
        <p>Ram, an IIM Lucknow alumnus, has worked in the higher education industry for more than 9 years and has closely observed how the IT sector's talent needs have changed over time. With the intention of bridging the IT skills gap, he started ProGrad.</p>
     </div>
             </div>
             </div>
            </div>
            <div className="card">
             <div className="content">
            <div className="front">
            <div className="member">
                   <div className="member-img">
                        <img src={`https://cdn.prograd.org/about_us/the_prograd_team/siddharthan_panneerselvam.jpg`} alt="" />
                    </div>
                    <div className="member-name text-white">
                    <p className='name fw-bold'>Siddharthan Panneerselvam</p>
                        <p className='designation'>IIM Ahmedabad Alumnus</p>
                    </div>
                   </div>
            </div>
            <div className="back">
            <div className="member-msg">
        <p>Sid is an IIM Ahmedabad alumunus. He  has over 15 years of IT delivery experience and more than 5 years of entrepreneurial experience. He played a key role in setting Tech Mahindra's operations in South America. He oversees ProGrad's marketing and sales efforts.</p>
     </div>
             </div>
             </div>
            </div>
            <div className="card">
             <div className="content">
            <div className="front">
            <div className="member">
                   <div className="member-img">
                        <img src="https://cdn.prograd.org/about_us/the_prograd_team/akarsh_agrawal.png" alt="" />
                    </div>
                    <div className="member-name text-white">
                    <p className='name fw-bold'>Akarsh Agrawal</p>
                        <p className='designation'>BITS Pilani</p>
                    </div>
                   </div>
            </div>
            <div className="back">
            <div className="member-msg">
        <p>Our CTO, Akarsh, is a BITS Pilani graduate. He genuinely enjoys technology and has been creating high-impact IT products through his SAAS company for over a decade. He is now in charge of ProGrad's technology division.

</p>
     </div>
             </div>
             </div>
            </div>
               
           </div>

           <div className="second-row">
           <div className="card">
             <div className="content">
            <div className="front">
            <div className="member">
                   <div className="member-img">
                        <img src="https://cdn.prograd.org/about_us/the_prograd_team/venkataraghulan_v.jpg" alt="" />
                    </div>
                    <div className="member-name text-white">
                    <p className='name fw-bold'>Venkataraghulan V</p>
                        <p className='designation'>IIM kozhikode</p>
                    </div>
                   </div>
            </div>
            <div className="back">
            <div className="member-msg">
            <p>Venkat is an IIM Kozhikode alumnus and and has extensive experience working in the ed-tech sector and was on of the co-founders at Face Prep. He is a serial entrepreneur and a ProGrad early investor.</p>
       
     </div>
             </div>
             </div>
            </div>
            <div className="card">
             <div className="content">
            <div className="front">
            <div className="member">
                   <div className="member-img">
                        <img src="https://cdn.prograd.org/about_us/the_prograd_team/rajesh_kumar_b.jpg"alt="" />
                    </div>
                    <div className="member-name text-white">
                    <p className='name fw-bold'>Rajesh Kumar B</p>
                    <p className='designation'>IIM kozhikode</p>
                  
                    </div>
                   </div>
            </div>
            <div className="back">
            <div className="member-msg">
            <p>IIM Kozhikode alumni Rajesh has experience working for renowned global corporations.  He is the founder of Face Prep one of the earliest ed-tech organizations in India and an early stage investor in ProGrad.</p>
     </div>
             </div>
             </div>
            </div>
           </div>
            </div>
        </div>

        <style jsx>

            {`
                .prograd-team{
                    /* border:1px solid red; */
                    margin-top: 120px;
                }
                
                
                
                
                
                .card {
                    width: 282px;
                    height: 370px;
                    margin: 0px;
                    float: left;
                    perspective: 500px;
                    background-color: #121212;
                    /* border: 1px solid red; */
                    cursor: pointer;
                  }
                  
                  .content {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    transition: transform 1s;
                    transform-style: preserve-3d;
                  }
                  
                  .card:hover .content {
                    transform: rotateY( 180deg ) ;
                    transition: transform 0.8s;
                  }
                  
                  .front,
                  .back {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    background: #121212;
                    color: #03446A;
                    font-size: 15px;
                    backface-visibility: hidden;
                    border-radius: 5px;
                  }
                  
                  .back {
                    background: #2e2e2e;
                    color: white;
                    transform: rotateY( 180deg );
                    text-align: center;
                  }
                
                .member-msg{
                  
                    width: 90%;
                    margin:  0 auto;
                    margin-top: 110px;
                }
                
                
                
                
                
                .team-content{
                
                    width: 1000px;
                    padding-right: 0px;
                    padding-left: 0px;
                    margin: 0 auto;
                    margin-top: 56px;
                    margin-bottom: 56px;
                    font-size: 18px;
                }
                
                .designation{
                    font-size: 15px;
                }
                
                .first-row{
                    /* border: 1px solid red; */
                    width: 1000px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .second-row{
                    margin-top: 40px!important;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    /* border: 1px solid white; */
                    width: 80%;
                    margin: 0 auto;
                
                }
                
                .team-card{
                    margin-top: 30px;
                    width: 1000px;
                  margin: 0 auto;
                    /* border: 1px solid rgb(0, 255, 55); */
                    height: 850px;
                    margin-bottom: 352px;
                    padding: 0px;
                }
                
                .member-name{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    
                    margin:0 auto;
                    /* border: 1px solid white; */
                    background-color:#2E2E2E;
                    ;
                    width: 280px;
                }
                
                .member-img img{
                    width: 280px;
                    border-top-left-radius: 5px;
                    border-top-right-radius: 5px;
                }
                
                .name{
                    margin-top: 12px;
                    margin-bottom: 4px;
                }
                
                
                
                
                
                @media screen and (max-width: 768px) {
                    .prograd-team{
                        /* border:1px solid red; */
                        width: 90%;
                        margin-top: 56px;
                        height: 2630px;
                    }
                    .team{
                        margin-right: 5px;
                    }
                    .team-content{
                        /* border: 1px solid red; */
                        width: 100%;
                        padding-right: 0px;
                        padding-left: 0px;
                        margin: 0px;
                        margin-top: 56px;
                        margin-bottom: 56px;
                        font-size: 18px;
                    }
                    .first-row{
                        /* border: 1px solid red; */
                        width: 100%;
                        display: flex;
                        height: 1180px;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 50px;
                        
                    }
                    
                    .second-row{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-direction: column;
                        /* border: 1px solid white; */
                        width: 100%;
                        margin: 0 auto;
                        height: 775px;
                    
                    }
                    
                    .team-card{
                        margin-top: 30px;
                        width: 100%;
                      margin: 0 auto;
                        /* border: 1px solid rgb(0, 255, 55); */
                        height: 850px;
                        padding: 0px;
                       
                    }
                
                
                    .card {
                    width: 282px;
                    height: 370px;
                    margin: 0px;
                    float: left;
                    perspective: 500px;
                    background-color:  #121212;
                    /* border: 1px solid red; */
                    cursor: pointer;
                  }
                  
                  .content {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    transition: transform 1s;
                    transform-style: preserve-3d;
                  }
                  
                  .card:hover .content {
                    transform: rotateY( 180deg ) ;
                    transition: transform 0.8s;
                  }
                  
                  .front,
                  .back {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    background: #121212;
                    color: #000000;
                    text-align: center;
                    font-size: 15px;
                    backface-visibility: hidden;
                    border-radius: 5px;
                  }
                  
                  .back {
                    background: #2e2e2e;
                    color: white;
                    transform: rotateY( 180deg );
                    
                  }
                
                }
                
                @media screen and (min-width: 768px) and (max-width: 992px) {
                   
                    
                
                }
                
            `}
        </style>
        </>
    );
};

export default Team;