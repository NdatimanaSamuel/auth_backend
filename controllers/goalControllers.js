const Goal = require("../Models/goal.model");
const User = require("../Models/user.model");

const getGoals = async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json({ goals });
};

const getSingleGoal = (req, res) => {
  res.status(200).json({ message: "get single goal" });
};

const setGoals = async (req, res) => {
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json({ goal });
};

const updateGoals = async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    return res.status(401).json({ message: "Goal Not Found" }); // Add return statement here
  }
  const user = await User.findById(req.user.id);
  //check for user

  if (!user) {
    return res.status(401).json({ message: "User Not Exist" });
  }
  //make sure  the logged in user matchs the goal user
  if (goal.user.toString() !== user.id) {
    return res.status(401).json({ message: "User Not Authorized" });
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ message: " goal updated" });
};

const deleteGoal = async (req, res) => {
  try {
    
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

    const user = await User.findById(req.user.id);
    //check for user
  
    if (!user) {
      return res.status(401).json({ message: "User Not Exist" });
    }
    //make sure  the logged in user matchs the goal user
    if (deletedGoal.user.toString() !== user.id) {
      return res.status(401).json({ message: "User Not Authorized" });
    }

    if (!deletedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    

    res.status(200).json({ message: "Goal Deleted" });
  } catch (error) {
    console.error("Error deleting goal:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getGoals, getSingleGoal, setGoals, updateGoals, deleteGoal };
