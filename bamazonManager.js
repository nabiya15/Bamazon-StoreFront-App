var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection(
{
	host : "localhost",
	port : 3306,
	user : "root",
	password : "Nabi786110",
	database : "bamazon"	
});

connection.connect(function(error){
	if(error){
		throw error;
	}
	promptManager();
});
var spacer = "___________________________________";

function promptManager(){
	inquirer
	.prompt([
	{
		message : "Please select an option.",
		name : "choice",
		type : "list",
		choices :["View Products for sale",
		"View low inventory (Items per product less than 5)",
		"Add to inventory",
		"Add new product",
		"Exit"
		]
	}
	]).then(function(answers){
		console.log(answers.choice);
		switch(answers.choice) {
			case "View Products for sale":
			viewProducts();
			break;
			case "View low inventory (Items per product less than 5)":
			lowInventory();
			break;
			case "Add to inventory":
			addInventory();
			break;
			case "Add new product":
			addProduct();
			break;
			default:
			console.log("Good Bye!!!");
			connection.end();
			return;
		}
	});
}

function viewProducts(){
	
	var query = "SELECT * FROM products ORDER BY department_name";
	connection.query(query, function(error,data){
		data.forEach(function(product){
			console.log(spacer+"\nProduct ID : "+ product.item_id+"\nProduct Name : "+product.product_name+"\nDepartment : "+product.department_name+"\nPrice : "+product.price+"\nQuantity :"+product.stock_quantity+"\n"+spacer);
		})
		promptManager();
	})	
}

function lowInventory(){
	var query = "SELECT * FROM products WHERE stock_quantity < 5";
	connection.query(query, function(error, data){
		if(error){
			return console.log(error);
		}
		if(data.length===0){
			console.log("All prodcucts in your inventory have a stock of greater than 5 items. \n\n");
		}else{
			data.forEach(function(product){
				console.log(spacer+"\nProduct ID : "+ product.item_id+"\nProduct Name : "+product.product_name+"\nDepartment : "+product.department_name+"\nPrice : "+product.price+"\nQuantity :"+product.stock_quantity+"\n"+spacer);
			})
			promptManager();
		}	
	})
	
}

function addInventory(){
	var query = "SELECT * FROM products";
	connection.query(query, function(error, data){
		if(error){
			return console.log(error);
		}
	inquirer
		.prompt([
		{
			message : "WHich of the above listed products you you like to add more in stock",
			name : "item",
			type : "list",
			choices : function(){
				var choices =[];
				for(var i=0; i< data.length ;i++){
					choices.push(data[i].product_name);
				}
				return choices;
			}
		},
		{
			message : "Please enter the quantity you would like to add.",
			name : "quantity",
			type : "input",
			validate : function(value){
				if(isNaN(value) === false){
					return true;
				}
				console.log("Please provide an input in number format only");
				return false;
			}
		}
		]).then(function(answers){
			var productToAdd;
			data.forEach(function(item){
				if(item.product_name === answers.item){
					productToAdd = item;
					return productToAdd;
				}
			})
			var newQuantity = parseInt(productToAdd.stock_quantity) + parseInt(answers.quantity);
			var query = "UPDATE products SET ? WHERE ?";
			connection.query(query,[
				{"stock_quantity" : newQuantity
				},
				{
					"item_id" : productToAdd.item_id
				}] ,function(error, data){
				if(error){
					return console.log(error);
				}
				console.log("Order to add more items to the inventory has been successfully placed!!")
				promptManager();	
			})

		})
	})
}

function addProduct(){
	inquirer	
	.prompt([
		{
			message : "Enter the name of the new product you wish to add to the store.",
			name : "newItem",
			type : "input"
		},
		{
			message : "Enter the name of the department the product belongs to.",
			name : "department",
			type : "input"
		},
		{
			message : "Enter the price of the new product.",
			name: "price",
			type: "input",
			validate : function(input){
				if(isNaN(input) === false){
					return true;
				}
				return false;
			}
		},
		{
			message : "Enter the quantity of the new product.",
			name: "quantity",
			type: "input",
			validate : function(input){
				if(isNaN(input) === false){
					return true;
				}
				return false;
			}
		}
	]).then(function(data){
		var query = "INSERT INTO products SET ?";
		connection.query(query,[
			{
				"product_name" : data.newItem,
				"department_name" : data.department,
				"price" : data.price,
				"stock_quantity" : data.quantity
			}
		],function(error,results){
			console.log(data.newItem+" has been successfully added to the store.");
			promptManager();
			})
		})
}