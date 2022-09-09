import React, { useState } from 'react';
import Navbar from '../Navabr/Navbar';
import checkbox from '../../assets/checkbox.svg'
import benifit1 from '../../assets/enterprise-1.svg'
import 'react-phone-number-input/style.css'
import benifit2 from '../../assets/enterprise-2.svg'
import benifit3 from '../../assets/enterprise-3.svg'
import benifit4 from '../../assets/enterprise-4.svg'
import benifit5 from '../../assets/enterprise-5.svg'
import benifit6 from '../../assets/enterprise-6.svg'
import { BsFacebook,BsYoutube,BsFillHeartFill,BsBoxSeam,BsChatLeftText } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'react-phone-number-input/style.css'
import square from '../../assets/square.svg'
// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import Footer from '../Footer/Footer';
import { useEffect } from 'react';
import PhoneInputWithCountrySelect from 'react-phone-number-input';

import SwiperCore, {
    Autoplay,Pagination,Navigation
  } from 'swiper/core';
import IntlTelInput from 'react-intl-tel-input';
  
  SwiperCore.use([Autoplay,Pagination,Navigation]);


const Enterprise = () => {

    const [value, setValue] = useState();
    const [text1,setText1]=useState(true);
    const [text2,setText2]=useState(false);
    const [text3,setText3]=useState(false);
    const [text4,setText4]=useState(false);
    const [text5,setText5]=useState(false);
    const [check1,setCheck1]=useState(true);
    const [check2,setCheck2]=useState(false);
    const [check3,setCheck3]=useState(false);
    const [check4,setCheck4]=useState(false);
    const [check5,setCheck5]=useState(false);

    const textOne = ()=>{
        setText1(true);
        setCheck1(true)
        setCheck2(false)
        setText2(false);
        setText3(false);
        setText4(false);
        setText5(false);
        
    }
    const textTwo = ()=>{
        setText1(false);
        setText2(true);
        setCheck2(true)
        setText3(false);
        setText4(false);
        setText5(false);
        
    }
    const textThree = ()=>{
        setText1(false);
        setText2(false);
        setText3(true);
        setCheck3(true)
        setText4(false);
        setText5(false);
        
    }
    const textFour = ()=>{
        setText1(false);
        setText2(false);
        setText3(false);
        setText4(true);
        setCheck4(true)
        setText5(false);
        
    }
    const textFive = ()=>{
        setText1(false);
        setText2(false);
        setText3(false);
        setText4(false);
        setText5(true);
        setCheck5(true)

        
    }



   useEffect(()=>{
    setInterval(()=>{
        setTimeout(()=>{
            textOne()
            setCheck1(true)
        },4000)
        setTimeout(()=>{
            textTwo()
            setCheck2(true)
        },8000)
        setTimeout(()=>{
            textThree()
            setCheck3(true)
        },12000)
        setTimeout(()=>{
            textFour()
            setCheck4(true)
        },16000)
        setTimeout(()=>{
            textFive()
            setCheck5(true)
        },20000)
      
        setCheck2(false);
        setCheck3(false);
        setCheck4(false);
        setCheck5(false);
    },21000)

   },[]);

    return (
       <>
             <div>
             <Navbar></Navbar>
             <div className="enterprise-banner">
               <div className='enterprise-banner-text'>
               <h2 className='text-white'>Secure Your Talent Pipeline With Us </h2>
                <button className='enterprise-btn'>Contact us</button>
               </div>
             </div>
             <div className='section-1'>
             <div className='competition'>
             <div className='contact-header container'>
             <div className="containerbackground-enterprise">
             <h1 className='text-center'>Ahead of Rivals </h1>
        </div >
             <div className='overtext'>
             <h2 className='text-center text-white text-header text-over '>Create a high-impact tech team</h2>
             </div>
             </div>
             </div>
             <div className='compitition-content'>
                <div className="checkpoints">
                   <div className='checkbox-text'>
                 {check1? <div className="checkbox-icon">
                    <img src={checkbox} alt="" />
                  </div>:<div className="checkbox-icon">
                     <img src={square} alt="" />
                     </div>}
                  <div onClick={()=>textOne()} className="checbox-quote">
                    {text1?<p className='text-white text-checked'>Onboard high-potential freshers trained as per business requirements </p>:<p className='text-white'>Onboard high-potential freshers trained as per business requirements </p>}
                  </div>
                   </div>

                   <div className='checkbox-text'>
                   {check2? <div className="checkbox-icon">
                    <img src={checkbox} alt="" />
                  </div>:<div className="checkbox-icon">
                     <img src={square} alt="" />
                     </div>}
                  <div onClick={()=>textTwo()} className="checbox-quote">
                   {text2? <p className='text-white text-checked'>Eliminate the possibility of selecting unsuitable candidates</p> : <p className='text-white'>Eliminate the possibility of selecting unsuitable candidates</p>}
                  </div>
                   </div>

                   <div className='checkbox-text'>
                   {check3? <div className="checkbox-icon">
                    <img src={checkbox} alt="" />
                  </div>:<div className="checkbox-icon">
                     <img src={square} alt="" />
                     </div>}
                  <div onClick={()=>textThree()} className="checbox-quote">
                    {text3? <p className='text-white text-checked'>Reduce the cost of hiring and training resources by up to 50%</p> : <p className='text-white'>Reduce the cost of hiring and training resources by up to 50%</p>}
                  </div>
                   </div>

                   <div className='checkbox-text'>
                   {check4? <div className="checkbox-icon">
                    <img src={checkbox} alt="" />
                  </div>:<div className="checkbox-icon">
                     <img src={square} alt="" />
                     </div>}
                  <div onClick={()=>textFour()} className="checbox-quote">
                   {text4?<p className='text-white text-checked'>Consistent & predictable year round supply of readily deployable candidates</p>:<p className='text-white'>Consistent & predictable year round supply of readily deployable candidates</p>}
                  </div>
                   </div>

                   <div className='checkbox-text'>
                   {check5? <div className="checkbox-icon">
                    <img src={checkbox} alt="" />
                  </div>:<div className="checkbox-icon">
                     <img src={square} alt="" />
                     </div>}
                  <div onClick={()=>textFive()} className="checbox-quote">
                    {text5? <p className='text-white text-checked'>Improve employee retention rates & build a long-term talent pipelines</p> : <p className='text-white'>Improve employee retention rates & build a long-term talent pipelines</p>}
                  </div>
                   </div>
                </div>
                {text1?<div className="img">
                    <img className='img-fluid' src="https://cdn.prograd.org/enterprises/changing_vectors/outcomes_1.png" alt="" />
                </div> :""}
                {text2?<div className="img">
                    <img className='img-fluid' src="https://cdn.prograd.org/enterprises/changing_vectors/outcomes_2.png" alt="" />
                </div> :""}
                {text3?<div className="img">
                <img className='img-fluid' src="https://cdn.prograd.org/enterprises/changing_vectors/outcomes_3.png" alt="" />
                </div> :""}
                {text4?<div className="img">
                    <img className='img-fluid' src="https://cdn.prograd.org/enterprises/changing_vectors/outcomes_4.png" alt="" />
                </div> :""}
                {text5?<div className="img">
                    <img className='img-fluid' src="https://cdn.prograd.org/enterprises/changing_vectors/outcomes_5.png" alt="" />
                </div> :""}
            
             </div>
             </div>
             <section>
             <div className='competition-solution'>
             <div className='contact-header container'>
             <div className="containerbackground-solution">
             <h1 className='text-center'>One Step Solution</h1>
        </div >
             <div className='overtext-solution'>
             <h2 className='text-center text-white text-header text-solution text-over '>Why ProGrad is your one-stop talent solution?</h2>
             </div>
             </div>
             </div>
             <div className='benifits mt-2'>
                <div className="each-benifit">
                    <div className="beinifit-icon">
                    <img src={benifit1} alt="" />
                    </div>
                    <div className="benifit-text">
                        <h6 className='benifit-header text-white'>Bespoke Curriculum</h6>
                        <p className='text-white benifit-para'>Deliver a range of training tracks and technologies according to requirement</p>
                    </div>
                </div>

                <div className="each-benifit">
                    <div className="beinifit-icon">
                    <img src={benifit2} alt="" />
                    </div>
                    <div className="benifit-text">
                        <h6 className='benifit-header text-white'>Blended Learning</h6>
                        <p className='text-white benifit-para'>60% of training is done via live classes and 30% via our adaptive learning platform!</p>
                    </div>
                </div>

                <div className="each-benifit">
                    <div className="beinifit-icon">
                    <img src={benifit3} alt="" />
                    </div>
                    <div className="benifit-text">
                        <h6 className='benifit-header text-white'>Expert Developer Mentors</h6>
                        <p className='text-white benifit-para'>Training delivered by developer turned mentors with prior industry experience</p>
                    </div>
                </div>

                <div className="each-benifit">
                    <div className="beinifit-icon">
                    <img src={benifit4} alt="" />
                    </div>
                    <div className="benifit-text">
                        <h6 className='benifit-header text-white'>Fastest TAT!</h6>
                        <p className='text-white benifit-para'>Fetch and train some of the best developer talents within 4-9 weeks</p>
                    </div>
                </div>

                <div className="each-benifit">
                    <div className="beinifit-icon">
                    <img src={benifit5} alt="" />
                    </div>
                    <div className="benifit-text">
                        <h6 className='benifit-header text-white'>Work-Readiness!</h6>
                        <p className='text-white benifit-para'>Learners are exposed to Agile, TDD, Reviews, Refactoring and other workplace realities! </p>
                    </div>
                </div>

                <div className="each-benifit">
                    <div className="beinifit-icon">
                    <img src={benifit6} alt="" />
                    </div>
                    <div className="benifit-text">
                        <h6 className='benifit-header text-white'>Proven Track Record</h6>
                        <p className='text-white benifit-para'>Our learners have consistently rated us 4.8 ⭐ on SwitchUp and NPS above 96%
</p>
                    </div>
                </div>
             </div>
             </section>
             <section className='process'>
             <div className='competition-process'>
             <div className='contact-header container'>
             <div className="containerbackground-process">
             <h1 className='text-center'>The  Process</h1>
        </div >
             <div className='overtext-process'>
             <h2 className='text-center text-white text-header text-over '>The process that we follow</h2>
             </div>
             </div>
             </div>

             <div className='process-step'>
             <div className="gradient-hr"></div>
             <div className="process-container">
             <div className="process1 pr-fb">
                    <div className="step">
                        <p className='text-white'>Step1</p>
                    </div>
                    <div className="process-img">
                        <FiUsers className='process-logo'></FiUsers>
                    </div>
                    <div className="process-description">
                        <p className='text-process'>Understanding Client's Requirement</p>
                    </div>
                </div>
                <div className="process1 pr-fb">
                    <div className="step">
                        <p className='text-white'>Step1</p>
                    </div>
                    <div className="process-img">
                        <BsBoxSeam className='process-logo'></BsBoxSeam>
                    </div>
                    <div className="process-description">
                        <p className='text-process'>Sourcing & Screening</p>
                    </div>
                </div>

                
                <div className="process1 pr-fb">
                    <div className="step">
                        <p className='text-white'>Step3</p>
                    </div>
                    <div className="process-img">
                        <BsFacebook className='process-logo'></BsFacebook>
                    </div>
                    <div className="process-description">
                        <p className='text-process'>Client Interaction & Issuance Of Loi</p>
                    </div>
                </div>
             </div>

             {/* ------------- Step 4 starts here --------- */}
             <div className="gradient-hr2"></div>
             <div className="process-container2">
             <div className="process2">
                    <div className="step ">
                        <p className='text-white ms-2'>Step4</p>
                    </div>
                    <div className="process-img process-img2">
                        <BsFacebook className='process-logo process-logo2 '></BsFacebook>
                    </div>
                    <div className="process-description">
                        <p className='text-process'>Training</p>
                    </div>
                </div>

                <div className="process1  pr-cr">
                    <div className="step">
                        <p className='text-white'>Step5</p>
                    </div>
                    <div className="process-img">
                        <BsChatLeftText className='process-logo'></BsChatLeftText>
                    </div>
                    <div className="process-description">
                        <p className='text-process'>Client Review</p>
                    </div>
                </div>
                
                <div className="process1 pr-cr2">
                    <div className="step">
                        <p className='text-white'>Step6</p>
                    </div>
                    <div className="process-img">
                        <IoDocumentTextOutline className='process-logo'></IoDocumentTextOutline>
                    </div>
                    <div className="process-description">
                        <p className='text-process'>Onboarding</p>
                    </div>
                </div>
             </div>
             </div>
             </section>
            
            <section>
            <div className='competition-solution'>
             <div className='contact-header container'>
             <div className="containerbackground-solution">
             <h1 className='text-center'>Loving Recruiters </h1>
        </div >
             <div className='overtext-solution'>
             <h2 className='text-center text-white text-header text-Recruiters text-over '>Recruiters <BsFillHeartFill className='heart'></BsFillHeartFill> us</h2>
             </div>
             </div>
             </div>

             <div className='testimonials-container'>
             <Swiper className="mySwiper"
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    
      pagination={{
        clickable: true,
      }}

      
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <div className='card-1'>
            <div className='testimonial-header'>
            <div className="left">
            <div className="testimonial-img">
                <img className='reviewers-img' src="https://cdn.prograd.org/enterprises/testimonials/ananthakrishnan.jpg" alt="" />
            </div>
            <div className="testimonials-name">
                <p className='user-name text-white'>Ananthakrishnan G</p>
                <p className='text-white user-designation'>Chief Technology Officer</p>
            </div>
            </div>
            <div className="right">
                <img className='reviewers-comp img-fluid' src="https://cdn.prograd.org/enterprises/testimonials/playablo_testimonial.png" alt="" />
            </div>
            </div>
            <p className='rating'>Definitely happy with the output!</p>
            <p className='comment'>We are extremely happy with the performance of ProGrad’s training from a technical point of view. They inculcate an appetite to learn new tech stacks quickly and adapt to our product engineering needs. More importantly, ProGrad influence a positive attitude towards work . The responsibility & accountability ProGrad has shown certainly is commendable. This is something certainly that reflects throughout our engagement, and we are definitely happy with their output.</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='card-1'>
            <div className='testimonial-header'>
            <div className="left">
            <div className="testimonial-img">
                <img className='reviewers-img' src="https://cdn.prograd.org/enterprises/testimonials/muralidharan.png" alt="" />
            </div>
            <div className="testimonials-name">
                <p className='user-name text-white'>Muralidharan C</p>
                <p className='text-white user-designation'>Vice President, Delivery</p>
            </div>
            </div>
            <div className="right">
                <img className='reviewers-comp img-fluid' src="https://cdn.prograd.org/enterprises/testimonials/yellow_testimonial.png" alt="" />
            </div>
            </div>
            <p className='rating'>More than satisfied with ProGrad’s performance!</p>
            <p className='comment'>All the ProGrad trained candidates that we have recruited have shown excellent attitude and potential. Looking forward to gauge their contributions and continue our association with ProGrad. In addition to the campus recruitment that we did, ProGrad’s effort in our country wide hackathon “Game of Bots” has also been extremely commendable, wishing great success to them. In shot, we are more than satified with ProGrad’s service</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='card-1'>
            <div className='testimonial-header'>
            <div className="left">
            <div className="testimonial-img">
                <img className='reviewers-img' src="https://cdn.prograd.org/enterprises/testimonials/channapa.jpg" alt="" />
            </div>
            <div className="testimonials-name">
                <p className='user-name text-white'>Channapa Jagadish</p>
                <p className='text-white user-designation'>Head of Entry Level Programs</p>
            </div>
            </div>
            <div className="right">
                <img className='reviewers-comp img-fluid' src="https://cdn.prograd.org/enterprises/testimonials/thoughtworks_testimonial.png" alt="" />
            </div>
            </div>
            <p className='rating'>It’s been a delight to work with ProGrad!</p>
            <p className='comment'>Since 2020, ProGrad has been instrumental in helping us source and train talented women graduates from various colleges across the country. ProGrad's service model is quite niche, they engage with us at every stage and always ask the right questions to improvise. They are flexible in their approach and collaborate to deliver the desired outcomes aimed at benefiting both our teams. It’s been a real delight to work with them!</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='card-1'>
            <div className='testimonial-header'>
            <div className="left">
            <div className="testimonial-img">
                <img className='reviewers-img' src="https://cdn.prograd.org/enterprises/testimonials/peter.jpg" alt="" />
            </div>
            <div className="testimonials-name">
                <p className='user-name text-white'>Peter Melbye</p>
                <p className='text-white user-designation'>Vice President, Engineering</p>
            </div>
            </div>
            <div className="right">
                <img className='reviewers-comp img-fluid' src="https://cdn.prograd.org/enterprises/testimonials/taylor_testimonial.png" alt="" />
            </div>
            </div>
            <p className='rating'>Kudos to ProGrad team!</p>
            <p className='comment'>Really excited for the milestones we have achieved through the Young Tech Minds Program in partnership with ProGrad. It has helped us in invest on young tech talents to our global business. Kudos to ProGrad and team T&F for the great efforts into bringing the best talents!</p>
        </div>
      </SwiperSlide>
    </Swiper>
             </div>
            </section>

            <section className='statistics'>
            <div className='competition'>
             <div className='contact-header container'>
             <div className="containerbackground-statistics">
             <h1 className='text-center text-over'>Our Numbers Speak</h1>
        </div >
             <div className='overtext-statistics'>
             <h2 className='text-center text-white text-header text-over-statistics '>Our Statistics</h2>
             </div>
             </div>
             </div>
             <div className="first-container ">
                <div className="left-statistics text-white">
                    <h2 className='statistics-number-header text-white'>3000+</h2>
                    <p className='statistic-para'>Careers launched in last 2 years</p>
                </div>
                <div className="right-statistics text-white">
                    <h2 className='statistics-number-header text-white'>90%</h2>
                    <p className='statistic-para'>Reduction in hiring and training costs</p>
                </div>
             </div>
             <div className="second-container text-white">
             <h2 className='statistics-number-header text-white'>500+</h2>
                    <p className='statistic-para'>Tech enterprise partners</p>
             </div>
            </section>
            {/*------------- Partner section starts here------------------- */}
            <section className='enterprise-partner'>
            <div className='competition'>
             <div className='contact-header container'>
             <div className="containerbackground-partner">
             <h1 className='text-center'>We Are Widely Trusted</h1>
        </div >
             <div className='overtext-partner'>
             <h2 className='text-center text-white text-header text-over-statistics '>We are the Trusted Exclusive Talent Partner for</h2>
             </div>
             </div>
             </div>
             <div className="enterprise-partner-container">
             <div className="enterprise-partners">
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/thoughtworks.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/presidio.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/dunzo.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/magicbricks.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/taylor_and_friends_group.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/talent500.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/progress.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/latent_view.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/career_labs.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid logo-enlarge4' src="https://cdn.prograd.org/about_us/our_partner_brands/ivy.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/core_stack.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid ' src="https://cdn.prograd.org/about_us/our_partner_brands/the_math_company.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/perfomatix.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/iqvia.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/delta.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/yellowai.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/loyalticsai.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/drawinbox.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/espace.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid ' src="https://cdn.prograd.org/about_us/our_partner_brands/ust.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid ' src="https://cdn.prograd.org/about_us/our_partner_brands/vakil_search.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/arre.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/play_ablo.png" alt="" />
            </div>
            <div className="company-card-enterprise">
                <img className='img-fluid' src="https://cdn.prograd.org/about_us/our_partner_brands/quess.png" alt="" />
            </div>
           </div>
             </div>
            </section>
            <section className='contact-section'>
            <div className='contact-section-content'>
            <div className='competition'>
             <div className='contact-header container'>
             <div className="containerbackground-discuss">
             <h1 className='text-center'>Talk to us </h1>
        </div >
             <div className='overtext-discuss'>
             <h2 className='text-center text-white text-header text-over-statistics '>Lets Discuss</h2>
             </div>
             </div>
             </div>
             <p className='discuss-para'>Ready to reinvent your workforce with us? Fill up the form to explore the range of unique solutions specifically designed for your talent needs. </p>
             <form className='form-discussion' action="">
                <div className="form-content">
                    <div className="row-1">
                        <div className="left-row-1">
                       <div>
                       <label className='text-white fw-bold mb-2'  htmlFor="First Name">First Name</label>
                       </div>
                       <div>
                       <input className='form-input-discuss' required placeholder='John' type="text" />
                       </div>
                        </div>
                        <div className="right-row-1">
                       <div>
                       <label className='text-white fw-bold mb-2'  htmlFor="Last Name">Last Name</label>
                       </div>
                       <div>
                       <input className='form-input-discuss' required placeholder='Doe' type="text" />
                       </div>
                        </div>
                    </div>
                    <div className="row-2">
                        <div className="left-row-1">
                       <div>
                       <label className='text-white fw-bold mb-2'  htmlFor="Mobile Number">Mobile Number</label>
                       </div>
                       <div className='phone-input-box'>
                      
                       <IntlTelInput
                                            containerClassName="intl-tel-input"
                                            inputClassName="form-control"
                                            preferredCountries={['in', 'us', 'ca', 'sa', 'qa', 'ae', 'om', 'kw', 'sg']}
                                            defaultCountry={'in'}
                                            fieldName={'mobileNumber'}
                                            autoComplete="phone"
                                            placeholder={"9999999999"}
                                            format/>
                                  
                       </div>
                        </div>
                        <div className="right-row-1">
                       <div>
                       <label className='text-white fw-bold mb-2'  htmlFor="Email">Email</label>
                       </div>
                       <div>
                       <input className='form-input-discuss' required placeholder='John@gmail.com' type="email" />
                       </div>
                        </div>
                    </div>
                    <div className="row-2">
                        <div className="left-row-1">
                       <div>
                       <label className='text-white fw-bold mb-2'  htmlFor="Enterprice / Organisation name">Enterprice / Organisation name</label>
                       </div>
                       <div>
                       <input className='form-input-discuss' required placeholder='John@gmail.com' type="email" />
                       </div>
                        </div>
                        <div className="right-row-3">
                       <div>
                       <label className='text-white fw-bold mb-2'  htmlFor="Preferred mode of contact">Preferred mode of contact</label>
                       </div>
                       <div className='contact-form'>
                       <div className="email-form">
                       <input type="radio" id="html" required name="fav_language" value="HTML"/>
                       <label className='text-white '  htmlFor="Email">Email</label>
                       </div>
                       <div className="whatsapp-form">
                       <input type="radio" id="css" required name="fav_language" value="CSS"/>
                       <label className='text-white whatsapp'  htmlFor="Whatsapp">Whatsapp</label>
                       </div>
                       <div className="call-form">
                       <input type="radio" id="css" required name="fav_language" value="CSS"/>
                       <label className='text-white '  htmlFor="Call">Call</label>
                       </div>
                       </div>
                        </div>
                    </div>
                </div>
                <div className='submit-btn-box'>
                <button className='enterprise-btn'>Get in Touch</button>
                </div>
             </form>
            
            </div>
            </section>
            <Footer></Footer>
        </div>

        <style jsx>
            {`

.enterprise-banner{
    width: 100%;
    height: 540px;
    background-image: url("https://cdn.prograd.org/enterprises/banner/banner.jpg");
    position:relative;
    border-top: 1px solid black;
    /* border-bottom: 1px solid red; */
    background-size: 100% 100%;
    margin-top: 82px;
    background-repeat: no-repeat;
    z-index: 5;
}
.text-checked{
    font-size:15px;
    font-weight: 700;
}


.enterprise-banner-text{
    width: 1000px;
    margin: 0 auto;
    // border: 1px solid red; 
    text-align: center;
    color: white;
    margin-top:400px;
}
.enterprise-banner-text h2{
    font-size: 40px;
    margin-bottom:5px;
}
.enterprise-btn{
    width: 120px;
    height: 45px;
    border-radius: 5px;
    background-image: linear-gradient(to bottom,#0E7DED,#1739E6);
    border: none;
    outline: none;
    color: white;
    font-weight: 500;
}
.section-1{
    background-color:rgba(30, 30, 30, 1);
    height: 630px;
    margin-top: -80px;
    /* border: 1px solid red; */
}
.competition{
    width: 1000px;
    //  border:1px solid rgb(0, 4, 255);    
    margin: 0 auto;
    margin-top: 20px;
    height: 250px;
}
.text-over{
    font-size: 32px;
}
.checkbox-icon img{
    width: 25px;
    margin-top: -18px;
    /* border: 1px solid red; */
}
.checbox-quote{
    text-align: left;
    align-items: center;
    margin-left: 10px!important;
    margin: 0 auto;
    padding-top: 2px;
    /* border: 1px solid rgb(0, 255, 42); */
}
.checkbox-text{
display: flex;
align-items: center;
justify-content:flex-start;
/* border: 1px solid red; */
width: 100%;
margin-bottom: 10px;
font-size: 17px;
cursor: pointer;
}

.containerbackground-enterprise{
    margin-top:70px!important;
}

.containerbackground-enterprise h1 {
    position: absolute;
    font-size: 95px;
    height: 152px;
    width: 100%;
    margin:0 auto;
    z-index: 1;
    color:  rgba(30, 30, 30, 1);
    -webkit-text-stroke-width: 0.25px;
    -webkit-text-stroke-color: rgba(255, 255, 255, 0.205);
    margin-top:70px!important;
    right: 1px;
    // border:1px solid red;
  
}


.overtext{
    position: relative;
    top: 118px;
    z-index: 2;
}
.text-over{
    font-size: 32px;
}
.compitition-content{
    width: 1000px;
    height:250px;
    margin-top: -10px!important;
    //  border: 1px solid rgba(0, 89, 255, 0.829); 
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.checkpoints{
    /* border: 1px solid white; */
    width: 65%;
    height: 100%;
}

.uncheckbox{
    border: 2px solid #0E7DED;
    border-radius: 5px;
    width: 22px;
    height: 22px;
    margin-bottom:12px;
}
.checkbox-icon img{
    width: 25px;
    margin-top: -18px;
    /* border: 1px solid red; */
}
.img{
    width: 32%;
    /* border: 1px solid yellow; */
    height: 100%;
}

.img img{
    height: 100%;
}

/* Solution section starts here */

.containerbackground-solution h1{
    /* position:absolute; */
    font-size: 95px;
    //  border: 1px solid rgb(60, 255, 0); 
    height: 152px;
    width: 100%    ;
    z-index: 1;
    color:   #121212;
    -webkit-text-stroke-width: 0.25px;
    -webkit-text-stroke-color: rgba(255, 255, 255, 0.205);
    margin: 0 auto;
    margin-top:65px!important;
    padding:0px!important;
    right: 8px;

}
.overtext-solution{
    /* border: 1px solid red; */
    position: relative;
    bottom: 110px;
}

.benifits{
    //  border: 1px solid rgb(102, 255, 0); 
    width: 1000px;
    margin: 0 auto;
    height: 420px;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap: 10px;
    

}

.each-benifit{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    /* border: 1px solid white; */
    width: 100%;
    height: 150px;
}
.benifit-header{
    font-size: 20px;
    font-weight: 500;
}
.benifit-text p{
    color:  #AAAAAA!important;
    font-size: 15px;
}
.beinifit-icon img{
    width: 45px;
}


/* Process Section Starts here */
.containerbackground-process h1{
    font-size: 95px;
    //  border: 1px solid red; 
    height: 152px;
    width: 100%;
    z-index: 1;
    color:  #121212;
    -webkit-text-stroke-width: 0.25px;
    -webkit-text-stroke-color: rgba(255, 255, 255, 0.205);
    margin-top:65px!important;
    right: 1px;
}
.overtext-process{
    position: relative;
    bottom: 100px;
    /* border: 1px solid red; */
}

.process-container{
    margin-top: -30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid red;  */
    width: 92%;
}

.gradient-hr{
    width: 1000px;
    height: 2px;
    top: 67px;
    position: relative;
    z-index: -1;
    left: 120px;
    background-image: linear-gradient(to right , #555555DE 80%,rgb(0, 0, 0));
}

.gradient-hr2{
    width: 1100px;
    height: 2px;
    top: 87px;
    position: relative;
    z-index: -16;
    right: 120px;
    background-image: linear-gradient(to left , #555555DE 80%,rgb(0, 0, 0));
}


.process-step{
    width: 1000px;
    margin: 0 auto;
    /* border: 1px solid yellow; */
    height: 325px;
    
}
.process1{
    display: flex;
    flex-direction: column;
    /* border: 1px solid red; */
width: 27%;
justify-content: space-between;
align-items: center;
padding:0px!important;
margin-top: 28px;
}
.process-img{
    margin-bottom: 10px;
    /* border: 1px solid red; */
    text-align: center;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color:  #555555;
    
}
.process-logo{
    color: white;
    transform: scale(2.0);
    margin: 0 auto;
    margin-top: 19px;
    margin-left: 1px;
}





.text-process{
    color:  #0E7DED;
    font-weight: 620;
    font-size: 14px;
}



.process-container2{
    margin-top:-10px;
    /* border: 1px solid red; */
    width: 100%;
    margin-left: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.process2{
    margin-top:22px;
    margin-left: 55px;
}

.heart{
    color: #ffc800;
}

/* testimonials stassrts hetre */
.testimonials-container{
    width: 1000px;
    height: 300px;
    //  border: 1px solid white; 
    margin: 0 auto;
}
.reviewers-img{
    border-radius: 50%;
    margin-right: 15px;
}
.card-1{
    width: 100%;
    height:260px;
    //  border: 1px dashed white; 
    padding: 15px;
    background-color:#1A1A1A;
    border-radius: 10px;
    margin-bottom: 15px;
}
.testimonial-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.left{
    display: flex;
    width:280px;
    margin-left: 15px;
    align-items: center;
    /* border: 1px solid red; */
    justify-content: space-evenly;
}
.testimonials-name{
    margin-top: 15px;
    /* border: 1px solid rgb(0, 255, 85); */
}
.user-designation{
    margin-top: -15px;
}
.right{
    /* border: 1px solid red; */
    width: 18%;
    text-align: right;
    margin-right: 10px
}

.rating{
    color:  #0E7DED;
    font-weight: 600;
    margin-left: 15px;
}
.comment{
    margin-left: 15px;
    /* border: 1px solid red; */
    color:  #777777;
}
.swiper-pagination-bullet {
    background-color: rgb(255, 255, 255);
    opacity: 1;
    width: 8px;
    border-radius: 50%;
     
  }

  .mySwiper{
    //  border: 1px solid yellow;
    height:300px!important;
  }

  .swiper-pagination {
	// border: 1px solid red;
    margin-bottom:-22px!important;
    height:45px;
}
  span.swiper-pagination-bullet.swiper-pagination-bullet-active {
    background-color: blue;

  }

  /* statistics part start here */

  .statistics{
    width: 100%;
    height: 540px;
    margin: 0 auto;
    /* border: 1px solid red; */
    background-image: url("https://cdn.prograd.org/enterprises/statistics/statistics.jpg");
    margin-top: 120px;
    background-size: 100% 100%;
  }

  .containerbackground-statistics h1 {
    position: absolute;
    font-size: 94px;
    /* border: 1px solid red; */
    height: 130px;
    width: 100%;
    margin: 0 auto;
    z-index: 1;
    color:  #0e7ded04;
    -webkit-text-stroke-width: 0.25px;
    -webkit-text-stroke-color: rgba(255, 255, 255, 0.205);
    right: 1px;
    margin-top: 38px;
}

.overtext-statistics{
    position: relative;
    top: 90px;
    /* border: 1px solid red; */
    z-index: 2;
}
.text-over-statistics{
    margin-top: 20px;
    font-size: 32px;
}
.first-container{
    /* border: 1px solid rgb(43, 255, 0); */
    margin: 0 auto;
    margin-top: -44px;
    width: 60%;
    height: 125px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.left-statistics{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
}
.statistics-number-header{
    font-size: 48px;
    font-family: 'Inconsolata', monospace;
}

.statistic-para{
    font-family: sans-serif;   
}
.right-statistics{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
}

.second-container{
    margin-top: 25px!important;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    /* border: 1px solid red; */
}

/* Enterprise-partner starts here */
.containerbackground-partner h1 {
    position: absolute;
    font-size: 95px;
    /* border: 1px solid red; */
    height: 122px;
    width: 100%;
    margin:0 auto;
    z-index: 1;
    color:  #0e7ded04;
    -webkit-text-stroke-width: 0.25px;
    -webkit-text-stroke-color: rgba(255, 255, 255, 0.205);
    right: 1px;
    margin-top: 41px;
}

.overtext-partner{
    position: relative;
    top: 90px;
    z-index: 2;
}
.enterprise-partner-container{
    /* border: 1px solid red; */
    width: 100%;
    height: 345px;
    margin-bottom: 0px;
    margin-top: -54px;
}

.enterprise-partners{
    /* border: 1px solid white; */
    display: grid;
    height: 100%;
    margin-left: 40px;
    /* margin-right: 30px; */
    grid-template-columns: repeat(6,1fr);

}
.company-card-enterprise img{
    object-fit:contain;
    text-align: center;
    width: 120px;
    height: 40px;
    margin: 0 auto;
    margin-left: 20px;
    margin-top: 10px;
}
.company-card-enterprise{
        width: 174px;
        height: 60px;
        /* border: 1px solid red; */
        background-color: white;
        border-radius: 5px;
}

/* Contact Section Starts Here */
.containerbackground-discuss h1 {
    position: absolute;
    font-size: 95px;
    /* border: 1px solid red; */
    height: 122px;
    width: 100%;
    margin:0 auto;
    z-index: 1;
    color:  #0e7ded04;
    -webkit-text-stroke-width: 0.25px;
    -webkit-text-stroke-color: rgba(255, 255, 255, 0.205);
    right: 1px;
    margin-top: 38px;
    margin-bottom: 38px;
}

.overtext-discuss{
    position: relative;
    top: 90px;
    z-index: 2;
}
.contact-section{
    background-color:rgba(30, 30, 30, 1);
}
.contact-section-content{
    width: 1000px;
    margin: 0 auto;
    height: 720px;
    /* border: 1px solid red; */
}
.discuss-para{
    margin-top: -60px;
    color: #AAAAAADE;
    font-size: 18px;
}
.form-discussion{
    width: 68%;
    margin: 0 auto;
    height: 370px;
    margin-top: 50px;
    /* border: 1px solid white */
}

/* form starts here */
.row-1{
    display: flex;
    justify-content: space-between;
}
.row-2{
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
}
.left-row-1{
    display: flex;
    flex-direction: column;
}
.form-input-discuss{
    background-color:  #383838;
    width: 300px;
    height: 50px;
    border: none;
    outline: none;
    color: white;
    padding-left: 20px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 200;
}
.phone-input-box{
    /* border: 1px solid red; */
    width: 300px;
    height: 50px;

}
.intl-tel-input  {
color: black;
opacity: 1;
    width: 100%;
    height: 50px;
   
}



.phone-input{
    padding-left: 12px;
    width: 100%;
    height: 100%;
    color: white;

}
.phone-input input{
    background-color: #383838;
    width: 300px;
    height: 50px;
    border: none;
    outline: none;
    padding-left: 12px;
    border-radius: 5px;
    color: white;


}
.right-row-3{
    /* border: 1px solid red; */
    width: 300px;
    margin-top: px;
}
.contact-form{
    height: 50px;
    display: flex;
    justify-content: space-between;
    /* border: 1px solid red; */
    align-items: center;
}
.email-form {
    /* border: 1px solid red; */
    padding: 10px;
    width: 84px;
    background-color:  #272727;
    border-radius: 5px;

    
    
}
.whatsapp-form{
    /* border: 1px solid red; */
    padding: 9px;
    height:45px;
    width: 120px;
    margin-right: 5px;
    background-color:  #272727;
    border-radius: 5px;
}
 .call-form{
    /* border: 1px solid red; */
    padding: 11px;
    width: 85px;
    background-color:  #272727;
    border-radius: 5px;
    
 }

 .submit-btn-box{
    text-align: right;
    margin-top: 25px;
 }

 /* Responsive from mobile *//* Responsive from mobile *//* Responsive from mobile *//* Responsive from mobile *//* Responsive from mobile *//* Responsive from mobile *//* Responsive from mobile *//* Responsive from mobile *//* Responsive from mobile */

 @media screen and (max-device-width: 768px) {
    .enterprise-banner{
        width: 100%;
        height: 250px;
        background-image: url("https://cdn.prograd.org/enterprises/banner/banner.jpg");
        position:relative;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-top: 1px solid black;
        margin-top: 0px;
    }
    .gradient-enterprise{
        width: 100%;
        margin-top: 15px;
        height: 120px;
        position: relative;
        z-index: -1;
        bottom: 110px;
        /* border: 1px solid red; */
        background-image: linear-gradient(to bottom,rgb(0, 0, 0,0.2),80%,rgb(30, 30, 30, 1));
    }
    .enterprise-banner-text{
        width: 100%;
        margin: 0 auto;
        /* border: 1px solid red; */
        text-align: center;
        margin-top: 125px;
        color: white;
    }
    .enterprise-banner-text h2{
        font-size: 40px;
    }
    .enterprise-btn{
        width: 120px;
        height: 45px;
        border-radius: 5px;
        background-image: linear-gradient(to bottom,#0E7DED,#1739E6);
        border: none;
        outline: none;
        color: white;
        font-weight: 500;
    }


    .section-1{
        background-color:rgba(30, 30, 30, 1);
        height: 940px;
        /* border: 1px solid red; */
        margin-top: -40px;
    }
    
    .competition{
        width: 90%;
        /* border:1px solid rgb(0, 4, 255);    */
        margin: 0 auto;
        margin-top: 0px;
        height: 280px;
    }
    .competition-solution{
        width: 90%;
        /* border:1px solid rgb(0, 4, 255);    */
        margin: 0 auto;
        margin-top: 0px;
        height: 120px;
    }
    .competition-process{
        width: 100%;
        /* border:1px solid rgb(0, 4, 255);    */
        margin: 0 auto;
        margin-top: 0px;
        height: 120px;
    }

    .containerbackground-enterprise h1 {
        position: absolute;
        font-size: 50px;
        /* border: 1px solid red; */
        height: 60px;
        width: 110%;
        z-index: 1;
        left: 0px;
        color:  rgba(30, 30, 30, 1);
        -webkit-text-stroke-width: 0.25px;
        -webkit-text-stroke-color: rgba(255, 255, 255, 0.205);
        margin-top:50px!important;
        margin-right: 5px;
        margin-left: -15px;
    }
    .containerbackground-solution h1 {
        position: absolute;
        font-size: 40px;
        /* border: 1px solid red; */
        height: 55px;
        width: 111%;
        z-index: 1;
        color:  rgb(0, 0, 0);
        -webkit-text-stroke-width: 0.25px;
        -webkit-text-stroke-color: rgba(255, 255, 255, 0.205);
        margin-top:-8px!important;
        margin-bottom:0px!important;
        margin: 0 auto;
        margin-right: -26px!important;
        margin-left: 0px!important;
    }
    .containerbackground-process h1 {
        position: absolute;
        font-size: 50px;
        /* border: 1px solid red; */
        height: 55px;
        width: 100%;
        z-index: 1;
        color:  rgb(0, 0, 0);
        -webkit-text-stroke-width: 0.25px;
        -webkit-text-stroke-color: rgba(255, 255, 255, 0.205);
        margin-top:-8px!important;
        right: 1px;
    }
    .overtext{
        position: relative;
        top: 80px;
        z-index: 2;
        /* border: 1px solid red; */
        width: 119%;
        margin-left: -28px;
    }
    .overtext-process{
        position: relative;
        top: 19px;
        z-index: 2;
        /* border:1px solid red; */
    }
    .text-over{
        font-size: 14px;
    }
    .checkpoints{
        /* border: 1px solid white; */
        width:90%;
        height: 100%;
        margin-top: -32px;
    }
    .text-solution{
        font-size: 15px;
    }
    .overtext-solution{
        position: relative;
        top: 14px;
        z-index: 2;
        /* border: 1px solid red; */
        width: 120%;
        margin-left: -28px;
    }
    .checkbox-icon img{
        width: 25px;
        margin-top: -18px;
        margin-right: 5px;
        /* border: 1px solid red; */
    }
    .checbox-quote {
        text-align: left;
        align-items: center;
        margin: 0 auto;
        padding-top: 0px;
        padding-left: 5px;
        /* border: 1px solid rgb(0, 255, 42); */
    }
    .checkbox-text{
        display: flex;
        align-items: center;
    justify-content: space-evenly;
    /* border: 1px solid red; */
    width: 100%;
    margin-bottom: 10px;
    font-size: 18px;
    cursor: pointer;
    }
    
    .img{
        width: 90%;
        /* border: 1px solid yellow; */
        height: 90%;
    }
    .benifits{
        /* border: 1px solid rgb(21, 255, 0); */
        width: 90%;
        margin: 0 auto;
        height: 1020px;
        display: grid;
        grid-template-columns: repeat(1,1fr);
        grid-gap: 10px;
        padding-left: 0px;
    
    }
    
    .each-benifit{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* border: 1px solid white; */
        width: 100%;
        height: 150px;
    }
    .benifit-header{
        font-size: 20px;
        font-weight: 500;
        text-align: center;
    }
    .benifit-text p{
        color:  #AAAAAA!important;
        font-size: 15px;
        text-align: center;
    }
    .beinifit-icon img{
        width: 45px;
    }
    .gradient-hr{
        width: 90%;
        height: 2px;
        top:72px;
        position: relative;
        z-index: -1;
        left: 50px;
        background-image: linear-gradient(to right , #555555DE 80%,rgb(0, 0, 0));
    }
    
    .gradient-hr2{
        width: 100%;
        height: 2px;
        top: 73px;
        position: relative;
        z-index: -16;
        right: 30px;
        background-image: linear-gradient(to left , #555555DE 80%,rgb(0, 0, 0));
    }
    
    .process-container{
        /* border: 1px solid  red  ; */
        width: 90%;
        height: 50%;
        margin-top: 0px;
    }
    .process-step{
        width: 100%;
        margin: 0 auto;
        /* border: 2px solid yellow; */
        height: 325px;
        
    }
    .process1{
        display: flex;
        flex-direction: column;
        /* border: 1px solid red; */
    width: 30%;
    justify-content: space-evenly;
    align-items: center;
    padding:0px!important;
    margin-top: 0px;
    height:100%
    }
    .process-img{
        margin-bottom: 10px;
        /* border: 1px solid red; */
        text-align: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color:  #555555;
    
    }
    .process-description{
        width: 100%;
        /* border: 1px solid red; */
        text-align: center;
        height: 50px;
    }
    
    .process-logo{
        color: white;
        transform: scale(1.5);
        margin: 0 auto;
        margin-top: 12px;
    }
    
    .text-process{
        color:  #0E7DED;
        font-weight: 620;
        font-size: 8px;
        width:100% ; 
       
    }
    
    .process-container2{
        margin-top:10px;
        /* border: 1px solid red; */
        width: 90%;
        margin-left: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .process2{
        /* border: 1px solid red; */
        margin-left: 65px;
    }

    .step4 p{
        margin-left:54px!important;
    }
 .pr-cr{
    /* border: 1px solid red; */
    margin-left: 50px;
    margin-right: -20px;
 }
 .pr-cr2{
    /* border: 1px solid red; */
    margin-left: 40px;
 }
 .text-Recruiters{
    font-size: 14px;
 }
 .testimonials-container{
    width: 90%;
    height: 300px;
    /* border: 1px solid red; */
    margin: 0 auto;
    margin-top: -25px;
}
.card-1{
    width: 99%;
    height:100%;
    /* border: 1px solid white; */
    padding: 8px;
    background-color:#1A1A1A;
    border-radius: 10px;
    margin-bottom: 15px;
}

.comment{
    margin-left: 5px;
    /* border: 1px solid red; */
    color:  #777777;
    font-size: 12px;
}
.testimonial-img{
    /* border: 1px solid red; */
    margin-left: -10px;
}


.testimonials-name{
    margin-top: 15px;
    margin-right: 58px;
    font-size: 12px;
    /* border: 1px solid rgb(0, 255, 85); */
}

.rating{
    margin-left: 6px;
}

.right img{
    /* border: 1px solid red; */
    margin-left: -20px;
  }

.statistics{
    width: 100%;
    height: 360px;
    margin: 0 auto;
    /* border: 1px solid red; */
    margin-top: 56px;
    
  }


  .containerbackground-statistics h1 {
    position: absolute;
    font-size: 37px;
    /* border: 1px solid red; */
    height: 55px;
    width: 110%;
    z-index: 1;
    color:  #0e7ded25;
    -webkit-text-stroke-width: 0.25px;
    -webkit-text-stroke-color: rgba(255, 255, 255, 0.205);
    margin-top:30px!important;
    margin-bottom:0px!important;
    right: 1px;
    margin-right: -18px;
}

.overtext-statistics{
    position: relative;
    top:48px;
    z-index: 2;
}

.first-container{
    /* border: 1px solid rgb(43, 255, 0); */
    margin: 0 auto;
    margin-top: -180px;
    width: 90%;
    height: 125px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.left-statistics{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
    /* border: 1px solid red; */
}
.statistics-number-header{
    font-size: 40px;
    font-family: 'Inconsolata', monospace;
}

.statistic-para{
    font-size: 10px;
    font-family: sans-serif;   
}
.right-statistics{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 48%;
    /* border: 1px solid red; */
}

.second-container{
    margin-top: 25px!important;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    /* border: 1px solid red; */
}

.containerbackground-partner h1 {
    position: absolute;
    font-size: 30px;
    /* border: 1px solid red; */
    height: 55px;
    width: 100%;
    z-index: 1;
    color:  #0e7ded04;
    -webkit-text-stroke-width: 0.25px;
    -webkit-text-stroke-color: rgba(255, 255, 255, 0.205);
    right: 1px;
    margin-top: 5px;
}

.overtext-partner{
    position: relative;
    top:18px;
    z-index: 2;
}
.text-over-statistics{
    font-size: 12px;
}
.enterprise-partner-container{
    /* border: 1px solid red; */
    width:90%;
    height: 545px;
    margin-bottom: 0px;
    margin-top: -164px;
    margin-left: 20px;
}

.enterprise-partners{
    /* border: 1px solid white; */
    display: grid;
    width: 100%;
    height: 100%;
    margin: 0 auto;   
    margin-right: 0px;
    margin-left: 0px;
    padding-right: 0px!important;
    grid-template-columns: repeat(3,1fr);

}
.company-card-enterprise img{
    object-fit:contain;
    text-align: center;
    width: 80px;
    height: 40px;
    margin: 0 auto;
    margin-left:10px;
     margin-top: 5px;
}
.company-card-enterprise{
        width: 105px;
        height: 50px;
        /* border: 1px solid red; */
        /* background-color: white; */
        border-radius: 5px;
        margin-left: 8px;
}


.containerbackground-discuss h1 {
    position: absolute;
    font-size: 40px;
    /* border: 1px solid red; */
    height: 55px;
    width: 110%;
    z-index: 1;
    color:  #0e7ded04;
    -webkit-text-stroke-width: 0.25px;
    -webkit-text-stroke-color: rgba(255, 255, 255, 0.205);
    right: 1px;
    margin-top: 56px;
    margin-bottom: 38px;
    margin-right: -20px;
}

.overtext-discuss{
    position: relative;
    top: 78px;
    z-index: 2;
}
.contact-section{
    background-color:rgba(30, 30, 30, 1);
}
.contact-section-content{
    width: 100%;
    margin: 0 auto;
    height: 1080px;
    /* border: 1px solid red; */
}
.discuss-para{
    /* border: 1px solid red; */
    width: 89%;
    margin-left: 24px;
    margin-top: -114px;
    color: #AAAAAADE;
    font-size: 18px;
}
.form-discussion{
    width: 90%;
    margin: 0 auto;
    height: 720px;
    margin-top: 50px;
    padding-left: 0px;
    padding-right: 0px;
    /* border: 1px solid white */
}

/* form starts here */
.row-1{
    display: flex;
    width: 100%;
    height: 185px;
    flex-direction: column;
    justify-content: space-between;
    /* border: 1px solid rgb(0, 248, 74) */

}
.row-2{
    margin-top: 25px;
    /* border: 1px solid rgb(0, 248, 74); */
    display: flex;
    flex-direction: column;
    height: 185px;
    justify-content: space-between;
}
.left-row-1{
    display: flex;
    flex-direction: column;
}
.form-input-discuss{
    background-color:  #383838;
    width: 100%;
    height: 50px;
    border: none;
    outline: none;
    color: white;
    padding-left: 20px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 200;
}
.phone-input-box{
    /* border: 1px solid red; */
    width: 100%;
    height: 50px;

}
.phone-input{
    padding-left: 8px;
    width: 100%;
    height: 100%;
    background-color:  #383838;
    color: white;
    font-size: 12px;

}
.phone-input input{
    background-color: #383838;
    width: 180px;
    height: 50px;
    border: none;
    outline: none;
    padding-left: 12px;
    border-radius: 5px;
    color: white;


}
.right-row-3{
    /* border: 1px solid red; */
    width: 100%;
    margin-top: 20px;
}
.contact-form{
    height: 50px;
    display: flex;
    justify-content: space-between;
    /* border: 1px solid red; */
    align-items: center;
}
.email-form {
    /* border: 1px solid red; */
    padding: 0px;
    width: 30%;
    background-color:  #272727;
    border-radius: 5px;
    font-size: 18px;
    display: flex;
align-items: center;
height: 52px;
justify-content: center;
}
.whatsapp-form{
    /* border: 1px solid red; */
    padding: 0px;
    width: 30%;
    margin-right: 10px;
    background-color:  #272727;
    border-radius: 5px;
    font-size: 18px;
    display: flex;
    align-items:center;
    height: 52px;
    justify-content: center;

    
}
 .call-form{
    /* border: 1px solid red; */
    padding: 0px;
    width: 30%;
    background-color:  #272727;
    border-radius: 5px;
    font-size: 18px;
    display: flex;
    align-items: center;
    height: 52px;
    justify-content: center;
    
 }

 .whatsapp{
    margin-bottom: 0px!important;
 }

 .submit-btn-box{
    text-align: right;
    margin-top: 25px;
 }


}


                    `}
            </style>       
       </>
    );
};

export default Enterprise;