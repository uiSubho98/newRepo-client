import React from 'react';
import './Team.css'
import member1 from '../../Assets/team-1.png';
import member2 from '../../Assets/team-2.png';
import member3 from '../../Assets/team-3.png';
import member4 from '../../Assets/team-4.png';
import member5 from '../../Assets/team-5.png';
import quote from '../../Assets/quote.png'

const Team = () => {
    return (
        <div className='container prograd-team mb-5'>
            <h2 className='text-center text-white team text-header '>The ProGrad Team</h2>
            <div className='team-content'>
            <p className='text-white team-para mb-4'>We are a group of highly motivated developers, educators, and creators in a love affair with technology. Our leadership team is always questioning, innovating, and posing challenges to find exceptional innovation everywhere.</p>
            </div>
            <div className="team-card">
           <div className="first-row">
           <div class="card">
             <div class="content">
            <div class="front">
            <div className="member">
                   <div className="member-img">
                        <img src="https:/cdn.prograd.org/about_us/the_prograd_team/ram_prakash_govindarajan.jpg" alt="" />
                    </div>
                    <div className="member-name text-white">
                        <p className='name fw-bold'>Ram Prakash Govindarajan</p>
                        <p className='designation'>IIM Lucknow Alumnus</p>
                    </div>
                   </div>
            </div>
            <div class="back">

     <div className="member-msg">
        <p>Ram, an IIM Lucknow alumnus, has worked in the higher education industry for more than 9 years and has closely observed how the IT sector's talent needs have changed over time. With the intention of bridging the IT skills gap, he started ProGrad.</p>
     </div>
             </div>
             </div>
            </div>
            <div class="card">
             <div class="content">
            <div class="front">
            <div className="member">
                   <div className="member-img">
                        <img src="https:/cdn.prograd.org/about_us/the_prograd_team/siddharthan_panneerselvam.jpg" alt="" />
                    </div>
                    <div className="member-name text-white">
                    <p className='name fw-bold'>Siddharthan Panneerselvam</p>
                        <p className='designation'>IIM Ahmedabad Alumnus</p>
                    </div>
                   </div>
            </div>
            <div class="back">
            <div className="member-msg">
        <p>Sid is an IIM Ahmedabad alumunus. He  has over 15 years of IT delivery experience and more than 5 years of entrepreneurial experience. He played a key role in setting Tech Mahindra's operations in South America. He oversees ProGrad's marketing and sales efforts.</p>
     </div>
             </div>
             </div>
            </div>
            <div class="card">
             <div class="content">
            <div class="front">
            <div className="member">
                   <div className="member-img">
                        <img src="https:/cdn.prograd.org/about_us/the_prograd_team/akarsh_agrawal.png" alt="" />
                    </div>
                    <div className="member-name text-white">
                    <p className='name fw-bold'>Akarsh Agrawal</p>
                        <p className='designation'>BITS Pilani</p>
                    </div>
                   </div>
            </div>
            <div class="back">
            <div className="member-msg">
        <p>Our CTO, Akarsh, is a BITS Pilani graduate. He genuinely enjoys technology and has been creating high-impact IT products through his SAAS company for over a decade. He is now in charge of ProGrad's technology division.

</p>
     </div>
             </div>
             </div>
            </div>
               
           </div>

           <div className="second-row">
           <div class="card">
             <div class="content">
            <div class="front">
            <div className="member">
                   <div className="member-img">
                        <img src="https:/cdn.prograd.org/about_us/the_prograd_team/venkataraghulan_v.jpg" alt="" />
                    </div>
                    <div className="member-name text-white">
                    <p className='name fw-bold'>Venkataraghulan V</p>
                        <p className='designation'>IIM kozhikode</p>
                    </div>
                   </div>
            </div>
            <div class="back">
            <div className="member-msg">
            <p>Venkat is an IIM Kozhikode alumnus and and has extensive experience working in the ed-tech sector and was on of the co-founders at Face Prep. He is a serial entrepreneur and a ProGrad early investor.</p>
       
     </div>
             </div>
             </div>
            </div>
            <div class="card">
             <div class="content">
            <div class="front">
            <div className="member">
                   <div className="member-img">
                        <img src="https:/cdn.prograd.org/about_us/the_prograd_team/rajesh_kumar_b.jpg" alt="" />
                    </div>
                    <div className="member-name text-white">
                    <p className='name fw-bold'>Rajesh Kumar B</p>
                    <p className='designation'>IIM kozhikode</p>
                  
                    </div>
                   </div>
            </div>
            <div class="back">
            <div className="member-msg">
            <p>IIM Kozhikode alumni Rajesh has experience working for renowned global corporations.  He is the founder of Face Prep one of the earliest ed-tech organizations in India and an early stage investor in ProGrad.</p>
     </div>
             </div>
             </div>
            </div>
           </div>
            </div>
        </div>
    );
};

export default Team;