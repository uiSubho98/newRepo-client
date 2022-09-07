import React, {useState} from 'react';

const BillingDetailsForm = () => {
    const [boxActive, setBoxActive] = useState<boolean>(false);

    return (
        <>
        <div className="section-title">Billing Information</div>
        <div 
            className={`StripeElement details-form-block ${boxActive ? 'active' : ''}`} 
            onMouseOver={() => setBoxActive(true)}
            onMouseLeave={() => setBoxActive(false)}
        >
            <fieldset className="with-state">
                <label>
                <span>Name</span>
                <input name="name" className="field" placeholder="Jenny Rosen" required/>
                </label>
                <label>
                <span>Email</span>
                <input name="email" type="email" className="field" placeholder="jenny@example.com" required/>
                </label>
                <label>
                <span>Phone</span>
                <input name="phone" type="tel" className="field" placeholder="+1-202-555-0124"/>
                </label>
                <label>
                <span>Address</span>
                <input name="address" className="field" placeholder="185 Berry Street Suite 550"/>
                </label>
                <label className="city">
                <span>City</span>
                <input name="city" className="field" placeholder="San Francisco"/>
                </label>
                <label className="state">
                <span>State</span>
                <input name="state" className="field" placeholder="CA"/>
                </label>
                <label className="zip">
                <span>ZIP</span>
                <input name="postal_code" className="field" placeholder="94107"/>
                </label>
            </fieldset>
        </div>
        </>
    );
}

export default BillingDetailsForm;
