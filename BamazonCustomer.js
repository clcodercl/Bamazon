//Week of 12 HW: Node.js & MySQL

//orders from customers
// deplete stock from the store's inventory
//
//
//
// . As a bonus track product sales across your store's departments provide a summary of the highest-grossing departments in the store.

//Make sure you save and require the MySQL and Prompt npm packages in your homework files--your app will need them for data input and storage.
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "cynthe17",
    database: "bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
});


//show items and prompts for customer

var inventory = function() {

    connection.query('SELECT * FROM Bamazon.Products', function(err, res) {
        allProducts = res;
        for (var i = 0; i < res.length; i++) {
            console.log('Item #:' + res[i].ItemID + ' ' + 'Item:' + ' ' + res[i].ProductName + ' ' + 'Department: ' + res[i].DepartmentName + ' ' + 'Price: ' + '$' + res[i].Price + ' ' + 'Quantity: ' + res[i].StockQuantity);

        }
        inquirer.prompt([{
            type: 'input',
            message: 'What is the Product Number of the item you would like to buy?',
            name: 'id'
        }, {
            type: 'input',
            message: 'How many items would you like?',
            name: 'unit'
        }]).then(function(buy) {
            var ItemID = buy.id;
            var quantity = buy.unit;
            var item = ItemID - 1;
            var oldQuantity = allProducts[item].StockQuantity;
            var newQuantity = oldQuantity - quantity;

            if (newQuantity <= 0) {
                console.log('We do not have that item in stock.');
            } else {
                var query = 'UPDATE Bamazon.Products SET StockQuantity = ' + newQuantity + 'WHERE ItemID = ' + ItemID;
                connection.query(query, function(res){

                    console.log('Your order has been placed. You have been charged: ' + (allProducts[item].Price * quantity))

                })
            }

        });
    });
}

inventory();

//Make sure you use the normal GitHub and Heroku process. This time, though, you need to include screenshots and/or a
//video showing us that you got the app working with no bugs. You can include these screenshots or a link to a video
//in a README.md file.

//If you haven't written a markdown file yet, click here for a rundown, or just take a look at the raw file of these
//instructions

// Then create a Node application called BamazonCustomer.js.
//

// first display all of the items available for sale. Include the ids, names, and prices of products for sale.


console.log()



// The app should then prompt users with two messages.
//




//The first should ask them the ID of the product they would like to buy.




//
// The second message should ask how many units of the product they would like to buy.



//
// Once the customer has placed the order, your application should check if your store has enough of the product to
// meet the customer's request.


//
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.


//
// However, if your store does have enough of the product, you should fulfill the customer's order.



// This means updating the SQL database to reflect the remaining quantity.







// Once the update goes through, show the customer the total cost of their purchase.
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// If this activity took you between 8-10 hours, then you've put enough time into this assignment. Feel free to stop
// here -- unless you want to take on the next challenge.
//     Challenge #2: Manager View (Next Level)
//
// Create a new Node application called BamazonManager.js. Running this application will:
//
//     List a set of menu options:
//
//     View Products for Sale
//     View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices,
//     and quantities.
//
//     If a manager selects View Low Inventory, then it should list all items with a inventory count lower than five.
//
//     If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any
// item currently in the store.
//
//     If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
//
//     If you finished Challenge #2 and put in all the hours you were willing to spend on this activity, then rest easy!
//     Otherwise continue to the next and final challenge.
//     Challenge #3: Executive View (Final Level)
//
// Create a new MySQL table called Departments. Your table should include the following columns:
//
//     DepartmentID
//
// DepartmentName
//
// OverHeadCosts (A dummy number you set for each department)
//
// TotalSales
//
// Modify your BamazonCustomer.js app so that when a customer purchases anything from the store, the program will
// calculate the total sales from each transaction.
//
//     Add the revenue from each transaction to the TotalSales column for the related department.
//     Make sure your app still updates the inventory listed in the Products column.
//     Create another Node app called BamazonExecutive.js. Running this application will list a set of menu options:
//
//     View Product Sales by Department
// Create New Department
// When an executive selects View Product Sales by Department, the app should display a summarized table in their
// terminal/bash window. Use the table below as a guide.
//
//     DepartmentID	DepartmentName	OverHeadCosts	ProductSales	TotalProfit
// 01	Electronics	10000	20000	10000
// 02	Clothing	60000	100000	40000
// The TotalProfit should be calculated on the fly using the difference between OverheadCosts and ProductSales.
//     TotalProfit should not be stored in any database. You should use a custom alias.
//
//     If you can't get the table to display properly after a few hours, then feel free to go back and just add TotalProfit
// to the Departments table.
//
//     Hint: You will need to use joins to make this work.
//
//     Hint: You may need to look into grouping in MySQL.
//
//     HINT: There may be an NPM package that can log the table to the console. What's is it? Good question :)
//
// One More Thing
//
// If you have any questions about this project or about the material we covered, the instructor and your TAs are only
// a Slack message away.
//
//     Good Luck!