import React, { useEffect, useState } from 'react';
import './CategoryPage.css'; // Reuse same styles

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    // Form inputs
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const [pincode, setPincode] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    useEffect(() => {
        const newTotal = cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        setTotal(newTotal);
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

   const updateQuantity = (id, qty) => {
    const updated = cartItems.map(item =>
        item.id === id ? { ...item, quantity: qty } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage')); // notify header
};

   const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage')); // notify header
};


    if (cartItems.length === 0) {
        return (
            <div style={{ padding: "100px 20px", textAlign: "center" }}>
                <h2 style={{ fontSize: "28px", color: "#444" }}>Your cart is empty.</h2>
            </div>
        );
    }

    return (
        <div className="category-page">
            <h2 className="category-title">Your Cart</h2>
            <div className="category-grid">
                {cartItems.map(item => (
                    <div className="product-card" key={item.id}>
                        <img src={item.image} alt={item.name} className="product-card-image" />
                        <div className="product-card-info">
                            <h3>{item.name}</h3>
                            <p>₹{item.price}</p>
                            <p>
                                Qty:
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                    style={{ width: "50px", marginLeft: "8px" }}
                                />
                            </p>
                            <button onClick={() => removeItem(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ padding: "30px" }}>
                <h3>Total: ₹{total}</h3>

                <h4>Shipping Details</h4>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                />
                <br /><br />
                <input
                    type="number"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                />
                <br /><br />
                <input
                    type="number"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={e => setPincode(e.target.value)}
                />
                <br /><br />
                <textarea
                    placeholder="Full Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    rows={3}
                />
                <br /><br />
                <button>Place Order</button>
            </div>
        </div>
    );
}

export default CartPage;
