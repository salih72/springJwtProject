import React from 'react';
import DataTable from 'react-data-table-component';

const OrderTable = ({ orders }) => {
    const columns = [
        {
            name: 'Order ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Customer Name',
            selector: row => row.customerName,
            sortable: true,
        },
        {
            name: 'Customer Address',
            selector: row => row.customerAddress,
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
            // Stil ekleyerek metin kesmeyi engelle
            cell: row => (
                <div style={{ whiteSpace: 'normal' }}>
                    {row.products.map(product => product.name).join(", ")}
                </div>
            ),
        },
    ];

    return (
        <DataTable
            title="Last 20 Orders"
            columns={columns}
            data={orders}  // Verileri direkt olarak göster
            pagination
        />
    );
};

export default OrderTable;
