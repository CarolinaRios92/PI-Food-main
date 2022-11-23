const { Router } = require("express");
const getAllDiets = require("../controllers/c_diets")

const router = Router();

router.get("/", async(req, res) => {
    try {
        const allDiets = await getAllDiets();
        res.status(200).send(allDiets)
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;