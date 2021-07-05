const db = require("../data/dbConfig.js");

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove
};


function find() {
    return db("schemes");
}

function findById(id) {
    return db("schemes").where({ id });
}

function findSteps(id) {
    return db("steps")
        .join("schemes", "schemes.id", "steps.scheme_id")
        .select(
            "steps.id",
            "schemes.scheme_name",
            "steps.step_number",
            "steps.instructions"
        )
        .where("schemes.id", id);
}

function add(newScheme) {
    return db('schemes')
        .insert(newScheme)
        .then(ids => {
            return findById(ids[0]);
        });
}

function addStep(newStep, id){
    return db('steps')
        .where({ scheme_id: id })
        .insert(newStep)
}

function update(changes, id) {
    return db("schemes")
        .update(changes)
        .where({ id });
}

function remove(id) {
    return db("schemes")
        .del()
        .where({ id });
}