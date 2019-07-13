# Building an API using a Relational Database

## Topics

- Joins
- Database Queries
- Knex Queries
- Modular Code

## Assignment

For this lab you will

- write SQL statements against a pre-populated database using an online tool. Once you have the correct SQL Statement for each query, write it inside the queries.md file under the appropriate heading.
- write the db helper methods for the `schemes` resource in `./schemes/scheme-model.js`

### Multi Table Queries


### Database Methods

Write helpers methods in `./schemes/scheme-model.js` that match the following specifications:

- `find()`: Calling find returns a promise that resolves to an array of all schemes in the database, sorted alphabetically by name. No steps are included.
- `findById(id)`: This method expects a scheme `id` as its only paramater and resolve to a scheme object, including correctly ordered steps like so: `{ scheme_name: 'Find Holy Grail', steps: [ 'quest', '...and quest', 'burn a witch', '...and quest some more' ]}`. On an invalid `id`, resolves to `null`.
- `findSteps(id)`: This method expects a scheme `id` and resolves to an array of all step objects for the given scheme, ordered correctly: `[ { id: 17, scheme_id: 5, step_number: 1, instructions: 'quest'}, { id: 18, scheme_id: 5, step_number: 2, instructions: '...and quest'}, etc. ]`.
- `add(scheme)`: This method expects a scheme object and inserts that object into the database. It resolves to the newly inserted scheme, including `id`.
- `update(changes, id)`: This method expects a changes object and an `id`. It will update the scheme with the given id. It resolves to the newly updated scheme object. 
- `remove(id)`: This method removes the scheme object with the provided id. It resolves to the removed scheme or `null` if the id is invalid. (Hint: Only worry about removing the `scheme`, the database is configured to automatically remove all associated steps.)

#### Schemes Schema

| field        | data type        | metadata                                            |
| ------------ | ---------------- | --------------------------------------------------- |
| id           | unsigned integer | primary key, auto-increments, generated by database |
| scheme_name  | string           | required, unique                                    |

#### Steps Schema

| field        | data type        | metadata                                            |
| ------------ | ---------------- | --------------------------------------------------- |
| id           | unsigned integer | primary key, auto-increments, generated by database |
| scheme_id    | unsigned integer | foreign key referencing scheme.id, required         |
| step_number  | unsigned integer | required                                            |
| instructions | string           | required                                            |

#### API

The following endpoints are available to test the functionality of the model methods.

- `GET /api/schemes/` - gets master list of schemes, alphabetizes by name, without steps
- `GET /api/schemes/:id` - gets a single scheme, including ordered steps 
- `GET /api/schemes/:id/steps` - gets all steps for a given scheme, ordered
- `POST /api/schemes` - adds a new scheme
- `PUT /api/schemes:id` - updates a given scheme 
- `DELETE /api/schemes/:id` - removes a given scheme and all associated steps

## Stretch Problems

- Add the following method
  - `addStep(step, scheme_id)`: This method expects a step object and a scheme id. It inserts the new step into the database, correctly linking it to the intended scheme.
  - You may use `POST /api/schemes/:id/addStep` to test this method. 