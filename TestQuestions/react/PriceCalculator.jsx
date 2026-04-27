import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

function getDiscountedPrice(cartWeight, totalPrice, discountType) {
  if (discountType === "seasonal") {
    return totalPrice - (totalPrice * 12 / 100);
  } else if (discountType === "standard") {
    return totalPrice - (totalPrice * 6 / 100);
  } else if (discountType === "weight") {
    if (cartWeight > 10) {
      return totalPrice - (totalPrice * 18 / 100);
    }
    return totalPrice - (totalPrice * 6 / 100);
  }
  return totalPrice;
}

const PriceCalculator = () => {

  const [type, setType] = useState("standard");
  const [weight, setWeight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const discountedPrice = getDiscountedPrice(weight, totalPrice, type);

  return (
    <div>
      <label htmlFor="type">Select Type:</label>
      <select id="type" name="type" value={type}
  onChange={(e) => setType(e.target.value)}>
        <option value="standard">Standard</option>
        <option value="seasonal">Seasonal</option>
        <option value="weight">Weight</option>
      </select>

      <label htmlFor="weight">Weight (kg):</label>
      <input type="number" id="weight" name="weight" step="0.01" value={weight}
  onChange={(e) => setWeight(Number(e.target.value))} />

      <label htmlFor="totalPrice">Total Price ($):</label>
      <input type="number" id="totalPrice" name="totalPrice" step="0.01"   value={totalPrice}
  onChange={(e) => setTotalPrice(Number(e.target.value))}/>

      <div>Discounted price:<span id="discountedPrice">{discountedPrice}</span></div>
    </div>
  );
};

document.body.innerHTML = "<div id='root'></div>";

const root = createRoot(document.getElementById("root"));
root.render(<PriceCalculator />);