const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  // returns a list of the schemes
  return db('schemes');
}

function findById(id) {
  // return the scheme if found or null if not found
  return db('schemes')
    .where({ id }) // .where always returns an array
    .first()
    .then(scheme => {
      if (scheme) {
        return scheme;
      } else {
        return null;
      }
    });
}

function findSteps(id) {
  return db('schemes as s')
    .innerJoin('steps as st', 's.id', 'st.scheme_id')
    .where({ scheme_id: id })
    .select('st.id as StepID', 's.scheme_name as SchemeName','st.step_number as StepNumber','st.instructions as Instructions');
}

function add(scheme) {
  return db('schemes')
    .insert( scheme )
}

function update(changes,id) {
  return db('schemes')
    .where({ id: id })
    .update( changes )
}

function remove(id) {
  return db('schemes')
    .where({ scheme_id: id })
    .del()
}

//commennnttttt