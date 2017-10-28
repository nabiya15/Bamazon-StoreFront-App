create database bamazon;

use bamazon;

create table products (
item_id int auto_increment,
 product_name varchar(200),
 department_name varchar(200),
 price int,
 stock_quantity int,
 primary key(item_id)
);

insert into products ( product_name, department_name, price, stock_quantity)
values ("XBOX", "gaming console", 400, 54);

insert into products ( product_name, department_name, price, stock_quantity)
values ("Play station", "gaming console", 389, 32);

insert into products ( product_name, department_name, price, stock_quantity)
values ("Iphone  X", "Cell phone", 1000, 19);

insert into products ( product_name, department_name, price, stock_quantity)
values ("Women Sweater", "Women Clothing", 70, 20);

insert into products ( product_name, department_name, price, stock_quantity)
values ("Men's Sweater", "Men Clothing", 50, 24);

insert into products ( product_name, department_name, price, stock_quantity)
values ("LG 4K UltraHD TV", "Electronics", 1500, 10);

insert into products ( product_name, department_name, price, stock_quantity)
values ("GE daylight bulbs", "Electronics", 10, 30);

insert into products ( product_name, department_name, price, stock_quantity)
values ("Chi curling iron", "Beauty & Personal Care", 400, 54);

insert into products ( product_name, department_name, price, stock_quantity)
values ("Nexus Shampoo", "Beauty & Personal Care",25, 50);


select * from products where item_id= 4;