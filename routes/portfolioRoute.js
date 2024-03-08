const router = require("express").Router();
const { Intro, About, Experience, Project, Course, Contact } = require("../models/portfolioModel");

//get all portfolio data
router.get("/get-portfolio-data", async (req, res) => {
    try {
        const intros = await Intro.find();
        const abouts = await About.find();
        const projects = await Project.find();
        const contacts = await Contact.find();
        const experiences = await Experience.find();
        const courses = await Course.find();

        res.status(200).send({
            intros: intros[0],
            abouts: abouts[0],
            projects: projects,
            contacts: contacts[0],
            experiences: experiences,
            courses: courses,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//update into
router.post("/update-intro", async (req, res) => {
    try {
        const intro = await Intro.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: intro,
            success: true,
            message: "Intro updated Successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});




module.exports = router;




