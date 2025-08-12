document.addEventListener('DOMContentLoaded', () => {
    const addItemButton = document.getElementById('add-item');
    const serviceItemsContainer = document.getElementById('service-items');
    const generateReceiptButton = document.getElementById('generate-receipt');
    const downloadReceiptButton = document.getElementById('download-receipt');
    const receiptContainer = document.getElementById('receipt-container');
    const receiptDiv = document.getElementById('receipt');

    let serviceItemCount = 1;

    addItemButton.addEventListener('click', () => {
        serviceItemCount++;
        const newItem = document.createElement('div');
        newItem.classList.add('service-item');
        newItem.innerHTML = `
            <input type="text" class="service-description" placeholder="Service Description ${serviceItemCount}">
            <input type="number" class="service-price" placeholder="Price">
        `;
        serviceItemsContainer.appendChild(newItem);
    });

    generateReceiptButton.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value;
        const companyAddress = document.getElementById('company-address').value;
        const companyCity = document.getElementById('company-city').value;
        const companyCountry = document.getElementById('company-country').value;

        const clientName = document.getElementById('client-name').value;
        const clientAddress = document.getElementById('client-address').value;
        const clientCity = document.getElementById('client-city').value;
        const clientCountry = document.getElementById('client-country').value;

        const receiptId = document.getElementById('receipt-id').value;
        const issueDate = document.getElementById('issue-date').value;
        const dueDate = document.getElementById('due-date').value;

        const serviceDescriptions = document.querySelectorAll('.service-description');
        const servicePrices = document.querySelectorAll('.service-price');

        const paymentMethod = document.getElementById('payment-method').value;
        const taxRate = parseFloat(document.getElementById('tax-rate').value) || 0;

        let subtotal = 0;
        let itemsHtml = '';

        for (let i = 0; i < servicePrices.length; i++) {
            const description = serviceDescriptions[i].value;
            const price = parseFloat(servicePrices[i].value) || 0;
            subtotal += price;
            itemsHtml += `
                <tr>
                    <td>${description}</td>
                    <td>$${price.toFixed(2)}</td>
                </tr>
            `;
        }

        const taxAmount = (subtotal * taxRate) / 100;
        const total = subtotal + taxAmount;

        const receiptHtml = `
            <style>
                .receipt-inner {
                    border: 1px solid #eee;
                    padding: 20px;
                    font-family: 'Arial', sans-serif;
                    color: #333;
                }
                .receipt-header {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                }
                .receipt-header h2 {
                    margin: 0;
                    font-size: 24px;
                    color: #000;
                }
                .company-details, .client-details {
                    width: 48%;
                }
                .receipt-info {
                    text-align: right;
                }
                .receipt-body table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .receipt-body th, .receipt-body td {
                    border-bottom: 1px solid #eee;
                    padding: 10px 0;
                    text-align: left;
                }
                .receipt-body th {
                    background-color: #f7f7f7;
                }
                .receipt-footer {
                    margin-top: 20px;
                    text-align: right;
                }
                .total-table {
                    display: inline-block;
                    width: auto;
                }
                 .total-table td {
                    padding: 5px 10px;
                }
            </style>
            <div class="receipt-inner">
                <div class="receipt-header">
                    <div class="company-details">
                        <h2>${companyName}</h2>
                        <p>${companyAddress}</p>
                        <p>${companyCity}</p>
                        <p>${companyCountry}</p>
                    </div>
                    <div class="receipt-info">
                        <h2>INVOICE</h2>
                        <p><strong>Invoice #:</strong> ${receiptId}</p>
                        <p><strong>Date Issued:</strong> ${issueDate}</p>
                        <p><strong>Date Due:</strong> ${dueDate}</p>
                    </div>
                </div>
                <div class="client-details">
                    <h3>Bill To:</h3>
                    <p>${clientName}</p>
                    <p>${clientAddress}</p>
                    <p>${clientCity}</p>
                    <p>${clientCountry}</p>
                </div>
                <div class="receipt-body">
                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>
                </div>
                <div class="receipt-footer">
                    <table class="total-table">
                        <tr>
                            <td>Subtotal:</td>
                            <td>$${subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Tax (${taxRate}%):</td>
                            <td>$${taxAmount.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td><strong>Total:</strong></td>
                            <td><strong>$${total.toFixed(2)}</strong></td>
                        </tr>
                    </table>
                    <p>Payment Method: ${paymentMethod}</p>
                </div>
            </div>
        `;

        receiptDiv.innerHTML = receiptHtml;
        receiptContainer.style.display = 'block';
        downloadReceiptButton.style.display = 'block';
    });

    downloadReceiptButton.addEventListener('click', () => {
        html2canvas(receiptDiv).then(canvas => {
            const link = document.createElement('a');
            link.download = 'receipt.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });
});