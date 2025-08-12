# VPS Receipt Generator

This is a simple web-based tool to generate receipts for VPS services.

## Features

-   **Dynamic Fields:** Add company and client details, receipt information, and service items.
-   **Add/Remove Items:** Easily add multiple service items to the receipt.
-   **Automatic Calculation:** Subtotal, tax, and total are calculated automatically.
-   **Download as Image:** Download the generated receipt as a PNG image.

## How to Use

1.  **Open `index.html`:** Open the `index.html` file in your web browser.
2.  **Fill in the Details:** Fill out the form with the necessary information.
3.  **Add Service Items:** Click "Add Item" to add more service rows.
4.  **Generate Receipt:** Click "Generate Receipt" to see a preview of the receipt.
5.  **Download:** Click "Download as Image" to save the receipt to your computer.

## Files

-   `index.html`: The main HTML file containing the structure of the web page.
-   `style.css`: The CSS file for styling the page and the receipt.
-   `script.js`: The JavaScript file that handles the logic for generating the receipt and downloading it as an image.

## Dependencies

-   **html2canvas:** A JavaScript library to render HTML to a canvas, used for the "Download as Image" feature. It is included via a CDN in `index.html`.
