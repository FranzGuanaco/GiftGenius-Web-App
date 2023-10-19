import React from 'react';
import './ProductInfo.css'; 

function ProductInf() {
    return (
      <section className="ac-container">
        <div>
          <input id="ac-1" name="accordion-1" type="radio" defaultChecked={false} />
          <label htmlFor="ac-1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p>details</p>
              <div style={{marginLeft: '33px'}}>
             <p>+</p>
             </div>
          </label>
          <hr/>
          <article className="ac-small">
            <p>Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows.</p>
          </article>
        </div>
        <div>
          <input id="ac-2" name="accordion-1" type="radio" />
          <label htmlFor="ac-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p>about me</p>
              <div style={{marginLeft: '33px'}}>
             <p>+</p>
             </div>
          </label>
          <hr/>
          <article className="ac-medium">
            <p>Like you, I used to think the world was this great place where everybody lived by the same standards I did, then some kid with a nail showed me I was living in his world, a world where chaos rules not order, a world where righteousness is not rewarded. That's Cesar's world, and if you're not willing to play by his rules, then you're gonna have to pay the price.</p>
          </article>
        </div>
      </section>
    );
  }
  
  export default ProductInf;