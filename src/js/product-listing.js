import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const searchTerm = getParam("search");

const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

if (searchTerm) {
  listing.initSearch(searchTerm); // implement this in ProductList
} else {
  listing.init();
}

listing.init();
