const workoutService = require('../services/workoutService');
const { all } = require('../v1/routes');

const getAllWorkout = (req, res) => {
    const allWorkouts = workoutService.getAllWorkout();
    res.send({ status: 'OK', data: allWorkouts });
}

const getOneWorkout = (req, res) => {
    const getOneWorkout = workoutService.getOneWorkout(req.params.Id);
    res.send(`Get one wourkout ${req.params.Id}`);
}

const createNewWorkout = (req, res) => { 
    const { body } = req;
    // clausula de cierre
    if(!body.name || !body.mode || !body.equipment || !body.exercises || !body.trainerTips){
        return;
    }

    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips
    };
       
    const createdWorkout = workoutService.createNewWorkout(newWorkout);
    res.status(201).send({status: 'OK', data: createdWorkout});
}

const updateWorkout = (req, res) => {
    const updated = workoutService.updateWorkout(req.params.Id);
    res.send(`Update wourkout ${req.params.Id}`);
}

const deleteWorkout = (req, res) => {
    workoutService.deleteWorkout(req.params.Id);
    res.send(`Delete wourkout ${req.params.Id}`);
}

module.exports = {
    getAllWorkout,
    getOneWorkout,
    createNewWorkout,
    updateWorkout,
    deleteWorkout
}