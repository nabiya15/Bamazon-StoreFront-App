# Bamazon

An Amazon-like storefront built with the MySQL. The app will take in orders from customers and depletes stock from the store's inventory in the customers view. In the manager's view, It allows to view complete inventory details and lets the manager update or add new inventory to the store.

## Bamazon.js
> Customers side view of the application

First the database was set up with MySql that contains the inventory information. When the app starts and connection is made to the database, it displays all the products available in the store. The user is prompted to chose the item_id and the quantity. Once the input is provided, it reflects on the database.

To demonstrate, lets take an example of a product in the inventory, say Iphone X.

* Initially the quantity of Iphone X is 11.
<img src="/images/customerjs/initialSQL.JPG" height=400px>

* The user makes a request for 1 Iphone which is passed to the database.
<img src="/images/customerjs/example1.gif" height=400px>

* This request reflects to the database where the availaible quantity is checked and the requested amount subtracted from the available quantity. 
<img src="/images/customerjs/sql2.JPG" height=400px>

* Finally, if the user makes a request for a quantity greater than what's available in the stock, the request is identified and handled accordingly.
<img src="/images/customerjs/example2.gif" height=400px>
