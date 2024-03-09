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
//update about
router.post("/update-about", async (req, res) => {
    try {
        const about = await About.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: about,
            success: true,
            message: "About updated Successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});
//add experience
router.post("/add-experience", async (req, res) => {
    try {
        const experience = new Experience(req.body);
        await experience.save();
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience added successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//update experience
router.post("/update-experience", async (req, res) => {
    try {
        const experience = await Experience.findOneAndUpdate(
            {_id:req.body._id},
            req.body,
            {new:true},
        );
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience Updated successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//delete experience
router.post("/delete-experience", async (req, res) => {
    try {
        const experience = await Experience.findOneAndDelete({_id:req.body._id});
        res.status(200).send({
            data: experience,
            success: true,
            message: "Experience Deleted successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//add Projects
router.post("/add-project", async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(200).send({
            data: project,
            success: true,
            message: "Project added successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//update project
router.post("/update-project", async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            {_id:req.body._id},
            req.body,
            {new:true},
        );
        res.status(200).send({
            data: project,
            success: true,
            message: "Project Updated successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//delete project
router.post("/delete-project", async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({_id:req.body._id});
        res.status(200).send({
            data: project,
            success: true,
            message: "Project Deleted successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//add Courses
router.post("/add-course", async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(200).send({
            data: course,
            success: true,
            message: "Course added successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//update course
router.post("/update-course", async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate(
            {_id:req.body._id},
            req.body,
            {new:true},
        );
        res.status(200).send({
            data: course,
            success: true,
            message: "Course Updated successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

//delete course
router.post("/delete-course", async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({_id:req.body._id});
        res.status(200).send({
            data: course,
            success: true,
            message: "Course Deleted successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});


//update contact
router.post("/update-contact", async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        );
        res.status(200).send({
            data: contact,
            success: true,
            message: "Contact updated Successfully",
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;




