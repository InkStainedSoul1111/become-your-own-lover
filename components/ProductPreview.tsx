'use client'
import React from 'react';

export function ProductPreview() {
  return (
    <div className="product-preview">
      <div className="image-gallery">
        <img
          src="/images/motivate.png"
          alt="Motivation preview"
          className="preview-image"
        />
      </div>

      <a 
        href="https://buy.stripe.com/14A8wPd059gPgQz0057bW01" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <button className="buy-button">
          Purchase Full Access
        </button>
      </a>
    </div>
  )
}
