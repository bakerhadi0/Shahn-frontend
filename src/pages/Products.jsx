
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Products</h2>
            <ul>
                {products.map((p) => (
                    <li key={p._id}>
                        {p.name} - {p.price} SAR
                    </li>
                ))}
            </ul>
        </div>
    );
}
