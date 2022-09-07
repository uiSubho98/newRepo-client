import React from 'react';
import './Values.css';
import value2 from '../../assets/value-2.svg';
import value3 from '../../assets/value-3.svg';
import value4 from '../../assets/value-4.svg';
import value5 from '../../assets/value-5.svg';

const Values = () => {
    return (
       <>
         <div className='mt-5'>
            <h2 className='text-center text-header text-white core'>Core Values</h2>
            <div className='value-container container'>
            <div className="each-card  ">
            <div className="card-text first mt-3">
                    <h4 className='card-header-value text-white fw-bold'>Accessibility & efficiency </h4>
                    <p className='card-para'>Offer tech organisations of all sizes affordable and effective talent solutions.
</p>
                </div>
                <div className="cartd-img me-4">
                    <img className='icon' src={value5} alt="" />
                </div>
            </div>
           
            <div className="each-card">
                <div className="card-text first  mt-3">
                    <h4 className='card-header-value text-white fw-bold'>Customer Oriented</h4>
                    <p className='card-para'>Develop growth oriented, impactful solutions for our customers.</p>
                </div>
                <div className="cartd-img me-4">
                    <img className='icon' src={value4} alt="" />
                </div>
            </div>
            <div className="each-card">
                <div className="card-text first mt-3">
                    <h4 className='card-header-value text-white fw-bold'>Lasting Imapct</h4>
                    <p className='card-para'>Impact careers by opening up doors to life changing opportunities.</p>
                </div>
                <div className="cartd-img me-4">
                    <img className='icon' src={value2} alt="" />
                </div>
            </div>
            <div className="each-card">
                <div className="card-text first mt-3">
                    <h4 className='card-header-value text-white fw-bold'>Value Creation
</h4>
                    <p className='card-para'>Create value by fixing the greater tech talent problem.</p>
                </div>
                <div className="cartd-img me-4">
                    <img className='icon' src={value3} alt="" />
                </div>
            </div>
            </div>
        </div>

        <style jsx>

        {`

.value-container{
    height: 400px;
   display: grid;
   grid-template-columns: repeat(2,1fr);
   /* border: 1px solid red; */
   grid-column-gap: 36px;
   width: 1000px;
   padding: 0px!important;
   justify-content: space-between;
   align-items: center;
   /* overflow: hidden; */

   
}

.first-header{
    margin-left: 47px;
}

.card-header-value{
    font-size: 25px;
    margin-bottom:12px;
}

.core{
    margin-bottom: 56px;
}

.card-para{
    color: #C4C4C4;
    font-size: 15px;
}

.icon{
    width: 60px;
}

.each-card{
    margin: 0 auto;
    /* border: 1px solid white; */
    width: 480px;
     display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 160px;
    color: white;
    background: #1E1E1E;
    border-radius: 10px;
}

.first{
    /* border: 1px solid red; */
    margin-left: 30px;
}
.value{
    width: 400%;
    border: 1px solid red
}

.value-para{
    width: 100%;
}

@media screen and (max-width: 768px) {
    .first{
        /* border: 1px solid red; */
        margin-left: 0px;
    }
    
    .card-header-value{
        font-size: 20px;
    }
    
    .core{
        margin-bottom: 56px;
    }
    
    .card-para{
        color: #C4C4C4;
        font-size: 14px;
    }
    
    .icon{
        width: 60px;
    }

    .core{
        margin-bottom: 56px;
        margin-top: 56px;
    }
    .each-card{
        margin:0 auto;
        /* border: 1px solid white; */
        width: 352px!important;
         display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 14px;
        height: 140px;
        color: white;
        background: #1E1E1E;
        
    }
    .value-container{
        height: 700px;
       display: grid;
       grid-template-columns: repeat(1,1fr);
       grid-gap: 20px;
       /* border: 1px solid red; */
       width: 90%;
       margin-bottom: 120px;
    }
    .icon{
        /* border: 1px solid red; */
        margin-right: -10px;
        margin-left: 8px;
    }
}


@media screen and (min-width: 768px) and (max-width: 992px) {
    .each-card{
        margin:0 auto;
        /* border: 1px solid white; */
        width: 100%!important;
         display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 15px;
        height: 180px;
        color: white;
        background: #1E1E1E;
        
    }
    .value-container{
        height: 800px;
       display: grid;
       grid-template-columns: repeat(1,1fr);
       grid-gap: 20px;
       /* border: 1px solid red; */
       width: 98%;
    }

    .icon{
        width: 60px;
    }

}

        
        `}

        </style>
       </>
    );
};

export default Values;