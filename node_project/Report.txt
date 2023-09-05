   
For Run project--
1-cd node_project
2-npm i
3-for run - npm start or node server.
4-for run test -- npm test
---------------------------------------
1- API Design and Implementation Report

This report provides an overview of the design and implementation 
of an API for managing a collection of items. 
The API is designed to support basic CRUD (Create, Read, Update, Delete) operations, 
pagination, filtering, and sorting of items.

## API Design
### Endpoints

The API exposes the following endpoints:

1.Create Item: `POST /items/createitem` (http://localhost:3000/items/createitem)
   - Allows users to create a new item by providing a name and category(required) and description,price.

2. Get All Items: `GET /items`  (http://localhost:3000/items)
   - Retrieves a list of all items, with optional support for pagination, 
   filtering by name and category, and sorting.

3. Get Item by ID: `GET /items/getitembyid/:id` (http://localhost:3000/items/getitembyid/2)
   - Retrieves a single item by ID.

4.Update Item: `PUT /items/updateitem/:id` (http://localhost:3000/items//updateitem/2)
   - Allows users to update an existing item's name and category.

5. Delete Item: `DELETE /items/deleteitem/:id` (http://localhost:3000/items/deleteitem/1)
   - Deletes an item by its ID.

### Query Parameters

- `page`: Specifies the current page for pagination (default is 1).
- `limit`: Specifies the maximum number of items to return per page (default is 10).
- `name`: Filters items by name (case-insensitive).
- `category`: Filters items by category (case-insensitive).
- `sort`: Sorts items by name in ascending or descending order.

## Implementation Details

### Technology Stack

- Node.js and Express.js for building the server and routing.
- Mocha and Chai for unit testing.
- JSON file for data storage .

### Pagination and Filtering

- Pagination is implemented using the `page` and `limit` query parameters.
- Filtering is supported by the `name` and `category` query parameters.

### Sorting

- Sorting is based on the `sort` query parameter,
 allowing items to be sorted in ascending (`name-asc`) or 
 descending (`name-desc`) order by name.

## Challenges Faced

1. **Testing Setup**: Setting up and configuring testing 
using Mocha and Chai initially presented a learning curve,
 but it was essential for ensuring the reliability of the API.

2. **Error Handling**: Implementing robust error handling and 
response formats required careful consideration to provide informative 
and consistent error messages.

3. Data Storage: While this implementation uses a JSON file for data storage,
 a production system would likely use a database for scalability and data integrity.

## Lessons Learned

- Proper testing is crucial: Writing unit tests for each API endpoint helped identify 
and fix issues early in the development process.

- Error handling matters: Thoughtful error handling and clear error messages 
improve the developer experience when using the API.

## Conclusion
The implemented API provides a robust foundation 
for managing items with support for CRUD operations, 
pagination, filtering, and sorting. 
