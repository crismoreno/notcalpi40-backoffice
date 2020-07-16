const projectsModel = require("../models/projects.model")
const filteringMadeAtsModel = require("../models/filteringMadeAts.model");


const controller = {
	// Find projects by madeAts
	getProjectsByMadeAtId : (req, res) => {
		let madeAtsIds;
		if (req.query.madeat) {
			madeAtsIds = req.query.madeat;
    	madeAtsIds = madeAtsIds.split(",");
			filteringMadeAtsModel.getProjectsByMadeAtId(madeAtsIds, (err, projects) =>{
				if(err){
					res.send(err)
				}else{
					res.send(projects)
				}
			})
		}else{
			projectsModel.getAllShowableProjects((err, projects) =>{
				if(err){
					res.send(err)
				}else{
					res.send(projects)
				}
			})
		}
	},
	//Get a list with all available madeAts
	getAllAvailableMadeAts: (req, res) => {
		filteringMadeAtsModel.getAllAvailableMadeAts((err, madeAts) =>{
			if(err){
				res.send(err)
			}else{
				res.send(madeAts)
			}
		})
	},
		//Get a list with all available madeats with related projects
	getAllAvailableMadeAtsAndProjects: (req, res) => {
		filteringMadeAtsModel.getAllAvailableMadeAtsAndProjects((err, madeAts) =>{
			if(err){
				res.send(err)
			}else{
				res.send(madeAts)
			}
		})
	},
	//Delete a madeat by id
	deleteMadeAtbyId: (req, res) => {
		filteringMadeAtsModel.deleteMadeAtbyId((err, tags) =>{
			if(err){
				res.send(err)
			}else{
				res.send(tags)
			}
		})
	},
}
module.exports = controller;