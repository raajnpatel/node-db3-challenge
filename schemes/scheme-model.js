const db = require("../data/dbConfig.js");

module.exports = {
    find,
    findById,
    findSteps,
    add,
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

function add(scheme) {
    return db("schemes").insert(scheme);
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