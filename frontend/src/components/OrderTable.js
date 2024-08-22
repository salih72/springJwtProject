import React from 'react';
import DataTable from 'react-data-table-component';

const OrderTable = ({ orders, onStatusToggle }) => {
    const columns = [
        {
            name: 'Customer Name',
            selector: row => row.customerName,
            sortable: true,
            style: { padding: '10px', color: '#495057', fontWeight: 'bold' },
        },
        {
            name: 'Total Amount',
            selector: row => `$${row.totalAmount.toFixed(2)}`,
            sortable: true,
            style: { padding: '10px', color: '#17a2b8', fontWeight: 'bold' },
        },
        {
            name: 'Products',
            selector: row => row.products.map(product => product.name).join(", "),
            sortable: true,
            cell: row => (
                <div style={{ whiteSpace: 'normal', padding: '10px' }}>
                    {row.products.map(product => product.name).join(", ")}
                </div>
            ),
        },
        {
            name: 'Status',
            cell: row => (
                <button
                    onClick={() => onStatusToggle(row.userId, row.status)} 
                    className={`btn btn-sm ${row.status === 'PENDING' ? 'btn-warning' : 'btn-success'}`}
                    style={{ margin: '5px', padding: '5px 10px' }}
                >
                    {row.status}
                </button>
            ),
            sortable: true,
            style: { padding: '10px' },
        }
    ];

    // Reverse the orders array before passing it to DataTable
    const reversedOrders = [...orders].reverse();

    return (
        <DataTable
            title="All Orders"
            columns={columns}
            data={reversedOrders}
            pagination
            highlightOnHover
            striped
            responsive
            customStyles={{
                rows: {
                    style: {
                        minHeight: '72px', // override the row height
                    },
                },
                headCells: {
                    style: {
                        paddingLeft: '8px', // override the cell padding for head cells
                        paddingRight: '8px',
                    },
                },
                cells: {
                    style: {
                        paddingLeft: '8px', // override the cell padding for data cells
                        paddingRight: '8px',
                    },
                },
            }}
        />
    );
};

export default OrderTable;
