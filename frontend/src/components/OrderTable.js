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
            selector: row => `$${row.totalAmount.toFixed(2)}`,
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
                <button
                    onClick={() => onStatusToggle(row.userId)} 
                    className={`btn btn-sm ${row.status === 'PENDING' ? 'btn-warning' : 'btn-success'}`}
                >
                    {row.status === 'PENDING' ? 'Set as PENDING' : 'Set as SUCCESS'}
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
            highlightOnHover
            striped
            responsive
        />
    );
};

export default OrderTable;
