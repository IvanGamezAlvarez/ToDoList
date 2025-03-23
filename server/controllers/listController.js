import connection from "../mysql.js";

class ListController {
  register = async (req, res) => {
    const { formContent } = req.body;
    console.log(formContent);
    try {
      await connection.query(
        "INSERT INTO `to_do_list` (task) VALUES (?)",
        formContent.toString()
      );
      return res.status(200).json({ mensaje: "se mando correctamente" });
    } catch (error) {
      console.log("Cant register the info: ", error);
      return res.status(500).json({ mensaje: "no se mando correctamente" });
    }
  };
  getTables = async (req, res) => {
    try {
      const results = await connection.query("SELECT * FROM `to_do_list`");
      return res.status(200).json(results[0]);
    } catch (error) {
      console.log("Cant get the info: ", error);
      return res.status(500).json({ mensaje: "no se mando correctamente" });
    }
  };
  updateData = async (req, res) => {
    try {
      const results = await connection.query(
        "UPDATE to_do_list SET task =(?) WHERE id=(?)",
        [req.body.info, req.body.id]
      );
      return res.status(200).json(results[0]);
    } catch (error) {
      console.log("Cant get the info: ", error);
      return res.status(500).json({ mensaje: "no se mando correctamente" });
    }
  };
  deleteTable = async (req, res) => {
    const taskId = req.params.id;
    try {
      await connection.query("DELETE FROM to_do_list WHERE id = (?)", taskId);
      return res.status(200).json({ mensaje: "se mando correctamente" });
    } catch (error) {
      console.log("Cant delete the info: ", error);
      return res.status(500).json({ mensaje: "no se mando correctamente" });
    }
  };
}

export default ListController;
