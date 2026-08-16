import React from 'react';

export function ProductPreview() {
  const handleCheckout = async () => {
    // TODO: Integrate with Stripe checkout
    console.log('Redirecting to checkout...');
  };

  return (
    <div className="preview-container">
      <div className="image-gallery">
        <img 
          src="https://raw.githubusercontent.com/InkStainedSoul1111/become-your-own-lover/main/public/images/motivate.png" 
          alt="Motivation preview" 
          className="preview-image"
        />
        <img 
          src="https://raw.githubusercontent.com/InkStainedSoul1111/become-your-own-lover/main/public/images/nature.png" 
          alt="Nature preview" 
          className="preview-image"
        />
      </div>
      
      <button 
        onClick={handleCheckout}
        className="checkout-button"
      >
        Purchase Full Access
      </button>
    </div>
  );
}
