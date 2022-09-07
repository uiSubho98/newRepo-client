import React from 'react';
import './Values.css';
import value2 from '../../Assets/value-2.svg';
import value3 from '../../Assets/value-3.svg';
import value4 from '../../Assets/value-4.svg';
import value5 from '../../Assets/value-5.svg';

const Values = () => {
    return (
        <div className='mt-5'>
            <h2 className='text-center text-header text-white core'>Core Values</h2>
            <div className='value-container container'>
            <div className="each-card  ">
            <div className="card-text first mt-3">
                    <h4 className='card-header-value fw-bold'>Accessibility & efficiency </h4>
                    <p className='card-para'>Offer tech organisations of all sizes affordable and effective talent solutions.
</p>
                </div>
                <div className="cartd-img me-4">
                    <img className='icon' src={value5} alt="" />
                </div>
            </div>
           
            <div className="each-card">
                <div className="card-text first  mt-3">
                    <h4 className='card-header-value fw-bold'>Customer Oriented</h4>
                    <p className='card-para'>Develop growth oriented, impactful solutions for our customers.</p>
                </div>
                <div className="cartd-img me-4">
                    <img className='icon' src={value4} alt="" />
                </div>
            </div>
            <div className="each-card">
                <div className="card-text first mt-3">
                    <h4 className='card-header-value fw-bold'>Lasting Imapct</h4>
                    <p className='card-para'>Impact careers by opening up doors to life changing opportunities.</p>
                </div>
                <div className="cartd-img me-4">
                    <img className='icon' src={value2} alt="" />
                </div>
            </div>
            <div className="each-card">
                <div className="card-text first mt-3">
                    <h4 className='card-header-value fw-bold'>Value Creation
</h4>
                    <p className='card-para'>Create value by fixing the greater tech talent problem.</p>
                </div>
                <div className="cartd-img me-4">
                    <img className='icon' src={value3} alt="" />
                </div>
            </div>
            </div>
        </div>
    );
};

export default Values;