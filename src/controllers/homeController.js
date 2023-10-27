import db from "../models";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log(error);
  }
};

let createUser = (req, res) => {
  return res.render("createCrud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send("post user to database");
};

let displayGetCRUD = async (req, res) => {
  let listUsers = await CRUDService.getAllUsers();
  return res.render("getCrud.ejs", { listUsers: listUsers });
};

let editCRUD = async (req, res) => {
  let idUser = req.query.id;
  let userData = await CRUDService.getUserById(idUser);
  if (userData) {
    return res.render("editCrud.ejs", { userData: userData });
  } else {
    return res.send("Cannot find user");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let listUsers = await CRUDService.updateUserData(data);
  return res.render("getCrud.ejs", { listUsers });
};

module.exports = {
  getHomePage,
  createUser,
  postCRUD,
  displayGetCRUD,
  editCRUD,
  putCRUD,
};
