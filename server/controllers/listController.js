import connection from "../mysql.js";

class ListController {
  register = async (req, res) => {
    const { formContent } = req.body;
    try {
      await connection.query(
        "INSERT INTO `to_do_list` (task) VALUES (?)",
        formContent.toString()
      );
    } catch (error) {
      console.log("Cant register the info: ", error);
    }
  };
  getTables = async (req, res) => {
    try {
      const results = await connection.query("SELECT * FROM `to_do_list`");
      res.json(results[0]);
    } catch (error) {
      console.log("Cant get the info: ", error);
    }
  };
}

export default ListController;
