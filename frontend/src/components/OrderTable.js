import React from 'react';
import DataTable from 'react-data-table-component';

const OrderTable = ({ orders, onStatusToggle }) => {
    const columns = [
        {
            name: 'Customer Name',
            selector: row => row.customerName,
            sortable: true,
        },
        {
            name: 'Total Amount',
            selector: row => row.totalAmount,
            sortable: true,
        },
        {
            name: 'Products',
            selector: row => row.products.map(product => product.name).join(", "),
            sortable: true,
            cell: row => (
                <div style={{ whiteSpace: 'normal' }}>
                    {row.products.map(product => product.name).join(", ")}
                </div>
            ),
        },
        {
            name: 'Status',
            cell: row => (
                <button onClick={() => onStatusToggle(row)}>
                    {row.status === 'PENDING' ? 'Set as SUCCESS' : 'Set as PENDING'}
                </button>
            ),
            sortable: true,
        },
    ];

    return (
        <DataTable
            title="All Orders"
            columns={columns}
            data={orders}
            pagination
        />
    );
};

export default OrderTable;
