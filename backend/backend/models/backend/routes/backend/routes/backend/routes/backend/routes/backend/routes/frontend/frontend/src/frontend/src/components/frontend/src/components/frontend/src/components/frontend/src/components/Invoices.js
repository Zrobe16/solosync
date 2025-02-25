import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    client_id: '',
    project_id: '',
    amount: '',
    due_date: '',
    status: 'pending'
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/invoices') // Update this URL later
      .then(res => setInvoices(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/invoices', newInvoice) // Update this URL later
      .then(res => setInvoices([...invoices, res.data]))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Invoices</h2>
      <ul>
        {invoices.map(invoice => (
          <li key={invoice.id}>
            Invoice #{invoice.id} – Amount: {invoice.amount} – Status: {invoice.status}
          </li>
        ))}
      </ul>
      <h3>Create Invoice</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Client ID"
          value={newInvoice.client_id}
          onChange={e => setNewInvoice({ ...newInvoice, client_id: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Project ID"
          value={newInvoice.project_id}
          onChange={e => setNewInvoice({ ...newInvoice, project_id: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={newInvoice.amount}
          onChange={e => setNewInvoice({ ...newInvoice, amount: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Due Date"
          value={newInvoice.due_date}
          onChange={e => setNewInvoice({ ...newInvoice, due_date: e.target.value })}
        />
        <button type="submit">Create Invoice</button>
      </form>
    </div>
  );
}

export default Invoices;
