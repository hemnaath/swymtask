// const db = require('../config/db');
// const util = require('util');


// exports.createTask = async(req, res) =>{
//     const {title, desc, status, assignedTo} = req.body;
//     try{
// 		const query = util.promisify(db.query).bind(db);
// 		const tableCheckQuery = `CREATE TABLE IF NOT EXISTS tasks (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         title VARCHAR(255) NOT NULL,
//         desc VARCHAR(255) NOT NULL,
//         status VARCHAR(100),
//         assigned_to INT,
//         FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL),
//         INDEX idx_status_assigned_to (status, assigned_to)`;
// 		await query(tableCheckQuery);
// 		const checkQuery = `SELECT title FROM tasks WHERE title = ?`;
// 		const existingTask = await query(checkQuery, [title]);
// 		if(existingTask.length > 1){
// 			return res.status(400).json({message:'Task already exists', statusCode:'400'});
// 		}else{
// 			const insertQuery = `INSERT INTO tasks (title, desc, status, assigned_to) VALUES (?, ?, ?, ?)`;
// 			const result = await query(insertQuery, [title, desc, status, assignedTo]);
// 			return res.status(201).json({message:'Task creted successfully', taskId: result.insertId, statusCode:'201'});
// 		}
//     }catch(error){
//         console.log(error);
//         return res.status(500).json({message: 'Internal server error', statusCode:'500'});
//     }
// }

// exports.getTask = async (req, res) =>{
//     const {status, assignedTo, limit, page} = req.body;
//     try{
// 		const query = util.promisify(db.query).bind(db);
// 		const tableCheckQuery = `CREATE TABLE IF NOT EXISTS tasks (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         title VARCHAR(255) NOT NULL,
//         desc VARCHAR(255) NOT NULL,
//         status VARCHAR(100),
//         assigned_to INT,
//         FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL),
//         INDEX idx_status_assigned_to (status, assigned_to)`;
//         await query(tableCheckQuery);
//         const offSet = (page - 1) * limit;
//         const getQuery = 'SELECT * FROM tasks WHERE status = ? OR assigned_to = ? LIMIT ? OFFSET ?';
// 		const results = await query(getQuery, [status, assignedTo, limit, offSet]);
// 		if(results.length > 0){
// 			return res.status(200).json({message:'Task data fetched succesfully', taskData: results, statusCode:'200'});
// 		}else{
// 			return res.status(404).json({message:'No tasks found', statusCode:'404'});
// 		}
//     }catch(error){
//         console.log(error);
//         return res.status(500).json({message:'Internal server error', statusCode:500});
//     }
// }

// exports.updateTask = async (req, res) => {
//     const { status, assignedTo } = req.body;
//     const taskId = req.params.id;
//     try {
//         const tableCheckQuery = `CREATE TABLE IF NOT EXISTS tasks (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         title VARCHAR(255) NOT NULL,
//         desc VARCHAR(255) NOT NULL,
//         status VARCHAR(100),
//         assigned_to INT,
//         FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL),
//         INDEX idx_status_assigned_to (status, assigned_to)`;
//         await query(tableCheckQuery);
// 		const query = util.promisify(db.query).bind(db);
// 		const checkQuery = `SELECT * FROM tasks WHERE id = ?`;
// 		const taskExists = await query(checkQuery, [taskId]);
// 		if(taskExists.length > 0){
// 			const updateQuery = `UPDATE tasks SET status = ?, assigned_to = ? WHERE id = ?`;
// 			await query(updateQuery, [status, assignedTo, taskId]);
// 			return res.status(301).json({message:'Task updated succesfully', statusCode:'301'});
// 		}else{
// 			return res.status(404).json({message:'No tasks Found', stausCode:'404'});
// 		}
//     } catch (error) {
//       return res.status(500).json({ message: 'Internal server error', statusCode:'500' });
//     }
// }

// exports.deleteTask = async (req, res) => {
//     const taskId = req.params.id;
//     try{
//         const tableCheckQuery = `CREATE TABLE IF NOT EXISTS tasks (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         title VARCHAR(255) NOT NULL,
//         desc VARCHAR(255) NOT NULL,
//         status VARCHAR(100),
//         assigned_to INT,
//         FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL),
//         INDEX idx_status_assigned_to (status, assigned_to)`;
//         await query(tableCheckQuery);
// 		const query = util.promisify(db.query).bind(db);
// 		const checkQuery = `SELECT * FROM tasks WHERE id = ?`;
// 		const taskExists = await query(checkQuery, [taskId]);
// 		if(taskExists.length > 0){
// 			const deleteQuery = `DELETE FROM tasks WHERE id = ?`;
// 			await query(deleteQuery, [taskId]);
// 			return res.status(200).json({message:'Task deleted', statusCode:'200'})
// 		}else{
// 			return res.stsus(404).json({message:'Task not found', statusCode:'404'});
// 		}
// 	}catch(error){
// 		return res.status(500).json({message:'Internal server error', statusCode:'500'});
// 	}
// }
const Task = require('../model/taskModel');

exports.createTask = async(req, res)=>{
	const {title, desc, status, assignedTo} = req.body;
	try{
		const taskExists = await Task.find({title});
		if(taskExists.length > 0){
			return res.status(400).json({message:'Task already exists', statusCode:'400'});
		}else{
			const taskData = await Task.create({title, desc, status, assigned_to:assignedTo});
			return res.status(201).json({message:'Task creted successfully', taskData, statusCode:'201'});
		}
	}catch(error){
		console.log(error);
		return res.status(500).json({message:'Internal server error', statusCode:'500'});
	}
}

exports.getTask = async(req, res)=>{
    const {status, assignedTo, limit, page} = req.query;
	try{
        const data = {};
        if(status){
            data.status = status;
        }if(assignedTo){
            data.assigned_to = assignedTo;
        }
		const skip = (page-1)*limit;
		const taskExists = await Task.find(data).skip(skip).limit(limit);  
		if(taskExists){
			return res.status(200).json({message:'Task data fetched succesfully', taskExists, statusCode:'200'});
		}else{
			return res.status(404).json({message:'Task not found', statusCode:'404'});
		}
	}catch(error){
		console.log(error);
		return res.status(500).json({message:'Internal server error', statusCode:'500'});
	}
}

exports.updateTask = async(req, res)=>{
	const taskId = req.params.id;
	const {status, assignedTo} = req.body;
	try{
		const taskExists = await Task.findById(taskId);
		if(taskExists){
			await taskExists.updateOne({$set:{status, assigned_to:assignedTo}});
			return res.status(301).json({message:'Task data updated', statusCode:'301'});
		}else{
			return res.status(404).json({message:'Task not found', statusCode:'404'});
		}
	}catch(error){
		console.log(error);
		return res.status(500).json({message:'Internal server error', statusCode:'500'});
	}
}

exports.deleteTask = async(req, res)=>{
	const taskId = req.params.id;
	try{
		const taskExists = await Task.findById(taskId);
		if(taskExists){
			await taskExists.deleteOne();
			return res.status(200).json({message:'Task deleted', statusCode:'200'});
		}else{
			return res.status(404).json({message:'Task not found', statusCode:'200'});
		}
	}catch(error){
		console.log(error);
		return res.status(500).json({message:'Internal server error', statusCode:'500'});
	}
}