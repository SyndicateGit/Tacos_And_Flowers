#! /usr/bin/env node

console.log('This script populates some test items and category to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://shileizeng98:zZ28889112m@syndicatecluster0.ycws9yh.mongodb.net/?retryWrites=true&w=majority"');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const categoriesList = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
	console.log("Debug: About to connect");
	await mongoose.connect("mongodb+srv://shileizeng98:zZ28889112m@syndicatecluster0.ycws9yh.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true,
  dbName: "tacos_and_flowers"});
	console.log("Debug: Should be connected?");
	await createCategories();
	await createItems();
	console.log("Debug: Closing mongoose");
	mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// category[0] will always be the Electronics, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
	const category = new Category({ name: name, description: description });
	await category.save();
	categoriesList[index] = category;
	console.log(`Added category: ${name}`);
}

async function itemCreate(name, description, category, price,) {
   const item = new Item({name: name, description: description, category: category, price: price,});
   await item.save();
   console.log(`Added item: ${name}`);
}

async function createCategories() {
	console.log("Adding categories");
	await Promise.all([
      categoryCreate(0, "Tacos", "Tacos and other Mexican food."),
      categoryCreate(1, "Flowers", "Beautiful flowers for all occasions."), 
   ]);
}
 
async function createItems() {
   console.log("Adding items");
   const itemsData = [
       {
           name: "Taco Al Pastor",
           description: "Taco with marinated pork, pineapple, and onions.",
           category: categoriesList[0], // Electronics
           price: 3,
       },
       {
           name: "Taco de Carnitas",
           description: "Taco with slow-cooked pork, onions, and cilantro.",
           category: categoriesList[0], // Electronics
           price: 3,
           
       },
       {
        name: "Taco de Birria",
        description: "Taco with slow-cooked beef, onions, and cilantro.",
        category: categoriesList[0], 
        price: 3,
      },
      {
        name: "Taco de Chorizo",
        description: "Taco with spicy Mexican sausage, onions, and cilantro.",
        category: categoriesList[0], 
        price: 3,
      },
       {
           name: "Sunflowers",
           description: "Bright and cheery sunflowers.",
           category: categoriesList[1], 
           price: 5,
       },
       {
           name: "Roses",
           description: "Classic red roses.",
           category: categoriesList[1], 
           price: 5,
       },
       {
        name: "Lavender",
        description: "Beautiful and fragrant lavender.",
        category: categoriesList[1], 
        price: 5,
      },
   ];

   const itemPromises = itemsData.map(async (item) => {
       await itemCreate(item.name, item.description, item.category, item.price, item.numInStock);
   });

   await Promise.all(itemPromises);
   console.log("Added items");
}
