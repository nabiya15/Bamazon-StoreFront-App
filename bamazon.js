var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection(
	{
		host : "localhost",
		port : 3306,
		user : "root",
		password : "Nabi786110",
		database : "bamazon"	
});
//connects to the server and once connected calls the diplayProduct()
connection.connect(function(error){
	if(error){
		throw error;
	}else{
		displayProducts();
	}
});
// Displays all the products in stock and goes to the placeOrder()
function displayProducts(){
	var spacer = "===================================================";
	var query = "SELECT * FROM products ORDER BY department_name";
	connection.query(query, function(error,data){
		data.forEach(function(product){
			console.log("\nProduct ID : "+ product.item_id+"\nProduct Name : "+product.product_name+"\nDepartment : "+product.department_name+"\nPrice : "+product.price+"\n"+spacer);
		})
	placeOrder();
	})	
}
//places the order and goes to the depletestock()
function placeOrder(){
	inquirer
	.prompt([
		{
			name : "id",
			message : "Please enter the ID of the product you need to place the order for.\n",
			type : "input",
			validate : function(value){
				if(isNaN(value) === false){
					return true;
				}
				return false;
			}
		},
		{
			name : "quantity",
			message : "Please enter the quantity.\n",
			type : "input",
			validate : function(value){
				if(isNaN(value) === false){
					return true;
				}
				return false;
			}

		}
	]).then(function(answer){
		var query = "SELECT * FROM products WHERE ?";
		connection.query(query, {item_id : answer.id}, function(error,response){
			if(error) throw error;
			
			if(response[0].stock_quantity >= answer.quantity){
				console.log("Placing order....");
				var newquantity = parseInt(response[0].stock_quantity) - parseInt(answer.quantity); 
				depleteStock(answer.id,newquantity);
			}else{
				console.log("Sorry!! The requested quantity for "+response[0].product_name+" is not available currently. \nAvailable quantity in stock: "+response[0].stock_quantity);
				connection.end();
			}

		})

	})
}
//updates the quantity of the ordered product and prompts the user if they wish to continue
function depleteStock(id,quantity){

	var query = "UPDATE products SET stock_quantity=? WHERE item_id=?";
 
	connection.query(query,[quantity,id],function(error,response){
		if(error) throw error;   
		console.log("Order is placed successfully!\n");
		inquirer
		.prompt([
			{
				message : "Would you like to shop more?",
				type : "list",
				choices : ["Yes","No"],
				name : "choice"
			}
		]).then(function(answer){
			if(answer.choice==="Yes"){
				displayProducts();
			}else{
				connection.end();
				return;
			}
		})
	})	
}