const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const { validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

const userController = 

{	/* LOGIN */
    login: (req, res) => 
    {
       return res.render('users/login',{titulo:'Mundo Mascota DH-Login'});        
    },
	
	/* INICIAR SESION */
    loginProcess: (req, res) => {

		/* aqui hacemos la comparacion contra el email que se loguea el usuario */
		const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		let userToLogin = usuarios.filter(x => x.email == req.body.email);
		
		if(userToLogin){
			/* let isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password); */
			if(userToLogin){
				return res.send('users/login',{titulo:'Mundo Mascota DH-Login'});
			}
			return res.render('users/login',{titulo:'Mundo Mascota DH-Login'}, {
				errors: {
					email: {
						msg: "No se encuentra en nuestra base de datos"
					}
				}
			});
		}

		
    },


	/* PERFIL DEL USUARIO*/
	profile: (req,res) => 
	{
		return res.render('users/profile');
	},


	/* REGISTRACION */
    register: (req, res) => 
    {
        res.render('users/register',{titulo:'Mundo Mascota DH-Register'});        
    },
	
    create : (req, res) => {
		console.log(req.file);
		let errors = validationResult(req);
        
		if(errors.isEmpty()){
			const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
	
			let newUser = {
	
				id: usuarios[usuarios.length-1].id + 1,
				name: req.body.name,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 10),
				/* rePassword: bcrypt.hashSync(req.body.rePassword, 10), */
				image: req.file.filename,
				isAdmin:0

			} 
	
			usuarios.push(newUser);
			fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, " "));
			 
	
			res.redirect('/user/login');
	   

		} else{
			
			return res.render('users/register', {titulo:'Mundo Mascota DH-Register', errors : errors.errors } );
		}
			
    }, 

    edit: (req, res) => {
		const usersFilePath = path.join(__dirname, '../data/usuarios.json');
		const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		const iduser = req.params.id;
		const userToEdit = usuarios.find(row =>{ return row.id == iduser})
		res.render('users/editar', {userToEdit, titulo:'Editar usuario'})

	},

    update: (req, res) => {
		
		const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		
		let userToEdit = usuarios.find(user => req.params.id == user.id);

		let isAdminAux= req.body.isAdmin;
		if (isAdminAux=="on") 
		{
			isAdminAux=1;
		} else {isAdminAux=0;}

		let editedUser = {
			id: req.
			params.id,
			name: req.body.name,
			email: req.body.email,
			password:userToEdit.password,
			isAdmin: isAdminAux,
			/* rePassword: req.body.rePassword, */
			// if ternario ===> condicion? verdadero : falso
			image: req.file ? req.file.filename : userToEdit.image
		}

		let indice = usuarios.findIndex(user => user.id == req.params.id);
		usuarios[indice] = editedUser;

		fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, " "));
		res.redirect("/user/list");
	},

	list: function (req, res){

        /* let archivoJSON = fs.readFileSync('usuarios.json', {encoding : 'utf-8'}); */
        /* let lista = JSON.parse(archivoJSON); */

		const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        res.render('users/users', {usuarios, titulo:'Lista usuarios' })
    },

	destroy : (req, res) => {
		const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		let finalUsuarios = usuarios.filter(product => product.id != req.params.id)
		fs.writeFileSync(usersFilePath, JSON.stringify(finalUsuarios, null, " "));
		res.redirect('/user/list');
		
	}
       
}

module.exports = userController;