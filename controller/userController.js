// const db = require('../config/db');
// const util = require('util');


// exports.createUser = async(req, res) =>{
//     const {name, email, role} = req.body;
//     try{
// 		const query = util.promisify(db.query).bind(db);
// 		const tableCheckQuery = `CREATE TABLE IF NOT EXISTS users (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         role VARCHAR(100),
// 		INDEX idx_email (email)`;
// 		await query(tableCheckQuery);
// 		const checkQuery = `SELECT email FROM users WHERE email = ?`;
// 		const existingUser = await query(checkQuery, [email]);
// 		if(existingUser.length > 1){
// 			return res.status(400).json({message:'User already exists', statusCode:'400'});
// 		}else{
// 			const insertQuery = `INSERT INTO users (name, email, role) VALUES (?, ?, ?)`;
// 			const result = await query(insertQuery, [name, email, role]);
// 			return res.status(201).json({message:'User creted successfully', userId: result.insertId, statusCode:'201'});
// 		}
//     }catch(error){
//         console.log(error);
//         return res.status(500).json({message: 'Internal server error', statusCode:'500'});
//     }
// }

// exports.getUserById = async (req, res) =>{
// 	const userId = req.params.id;
//     try{
// 		const query = util.promisify(db.query).bind(db);
// 		const tableCheckQuery = `CREATE TABLE IF NOT EXISTS users (
// 		id INT AUTO_INCREMENT PRIMARY KEY,
// 		name VARCHAR(255) NOT NULL,
// 		email VARCHAR(255) UNIQUE NOT NULL,
// 		role VARCHAR(100),
// 		INDEX idx_email (email)`;
// 		await query(tableCheckQuery);
//         const getQuery = `SELECT * FROM users WHERE id = ?`;
// 		const results = await query(getQuery, [userId]);
// 		if(results.length > 0){
// 			return res.status(200).json({message:'User data fetched succesfully', userData: results, statusCode:'200'});
// 		}else{
// 			return res.status(404).json({message:'No users found', statusCode:'404'});
// 		}
//     }catch(error){
//         console.log(error);
//         return res.status(500).json({message:'Internal server error', statusCode:500});
//     }
// }

// exports.updateUser = async (req, res) => {
//     const { name, email, role } = req.body;
//     const userId = req.params.id;
//     try {
// 		const tableCheckQuery = `CREATE TABLE IF NOT EXISTS users (
// 		id INT AUTO_INCREMENT PRIMARY KEY,
// 		name VARCHAR(255) NOT NULL,
// 		email VARCHAR(255) UNIQUE NOT NULL,
// 		role VARCHAR(100),
// 		INDEX idx_email (email)`;
// 		await query(tableCheckQuery);
// 		const query = util.promisify(db.query).bind(db);
// 		const checkQuery = `SELECT * FROM users WHERE id = ?`;
// 		const userExists = await query(checkQuery, [userId]);
// 		if(userExists.length > 0){
// 			const updateQuery = `UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?`;
// 			await query(updateQuery, [name, email, role, userId]);
// 			return res.status(301).json({message:'User updated succesfully', statusCode:'301'});
// 		}else{
// 			return res.status(404).json({message:'No users Found', stausCode:'404'});
// 		}
//     } catch (error) {
//       return res.status(500).json({ message: 'Internal server error', statusCode:'500' });
//     }
// }

// exports.deleteUser = async (req, res) => {
//     const userId = req.params.id;
//     try{
// 		const tableCheckQuery = `CREATE TABLE IF NOT EXISTS users (
// 		id INT AUTO_INCREMENT PRIMARY KEY,
// 		name VARCHAR(255) NOT NULL,
// 		email VARCHAR(255) UNIQUE NOT NULL,
// 		role VARCHAR(100),
// 		INDEX idx_email (email)`;
// 		await query(tableCheckQuery);
// 		const query = util.promisify(db.query).bind(db);
// 		const checkQuery = `SELECT * FROM users WHERE id = ?`;
// 		const userExists = await query(checkQuery, [userId]);
// 		if(userExists.length > 0){
// 			const deleteQuery = `DELETE FROM users WHERE id = ?`;
// 			await query(deleteQuery, [userId]);
// 			return res.status(200).json({message:'User deleted', statusCode:'200'})
// 		}else{
// 			return res.stsus(404).json({message:'User not found', statusCode:'404'});
// 		}
// 	}catch(error){
// 		return res.status(500).json({message:'Internal server error', statusCode:'500'});
// 	}
// }
const User = require('../model/userModel');

exports.createUser = async(req, res)=>{
	const {name, email, role} = req.body;
	try{
		const userExists = await User.find({email});
		if(userExists.length > 0){
			return res.status(400).json({message:'User already exists', statusCode:'400'});
		}else{
			const userData = await User.create({name, email, role});
			return res.status(201).json({message:'User creted successfully', userData, statusCode:'201'});
		}
	}catch(error){
		console.log(error);
		return res.status(500).json({message:'Internal server error', statusCode:'500'});
	}
}

exports.getUserById = async(req, res)=>{
	const userId = req.params.id;
	try{
		const userExists = await User.findById(userId);
		if(userExists){
			return res.status(200).json({message:'User data fetched succesfully', userExists, statusCode:'200'});
		}else{
			return res.status(404).json({message:'User not found', statusCode:'404'});
		}
	}catch(error){
		console.log(error);
		return res.status(500).json({message:'Internal server error', statusCode:'500'});
	}
}

exports.updateUser = async(req, res)=>{
	const userId = req.params.id;
	const {name, email, role} = req.body;
	try{
		const userExists = await User.findById(userId);
		if(userExists){
			await userExists.updateOne({$set:{name, email, role}});
			return res.status(301).json({message:'User data updated', statusCode:'301'});
		}else{
			return res.status(404).json({message:'User not found', statusCode:'404'});
		}
	}catch(error){
		console.log(error);
		return res.status(500).json({message:'Internal server error', statusCode:'500'});
	}
}

exports.deleteUser = async(req, res)=>{
	const userId = req.params.id;
	try{
		const userExists = await User.findById(userId);
		if(userExists){
			await userExists.deleteOne();
			return res.status(200).json({message:'User deleted', statusCode:'200'});
		}else{
			return res.status(404).json({message:'User not found', statusCode:'200'});
		}
	}catch(error){
		console.log(error);
		return res.status(500).json({message:'Internal server error', statusCode:'500'});
	}
}