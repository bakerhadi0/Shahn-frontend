
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Sales() {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/sales")
            .then((res) => setSales(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Sales Records</h2>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((s, index) => (
                        <tr key={index}>
                            <td>{s.productName}</td>
                            <td>{s.quantity}</td>
                            <td>{s.total} SAR</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
