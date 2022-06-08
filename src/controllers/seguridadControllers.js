const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usuarios.json');

const seguridadController = 
{
    login: (req, res) => 
    {
        res.render('login',{titulo:'Mundo Mascota DH-Login'});        
    },
    register: (req, res) => 
    {
        res.render('register',{titulo:'Mundo Mascota DH-Register'});        
    },


    create : (req, res) => {
        
		const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

		let newUser = {

			id: usuarios[usuarios.length-1].id + 1,
  			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			rePassword: req.body.rePassword
		} 

        

		usuarios.push(newUser);
		fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, " "));
		 

		res.redirect('/seguridad/login');
   
    },

    edit: (req, res) => {
		const usersFilePath = path.join(__dirname, '../data/usuarios.json');
		const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		const iduser = req.params.id;
		const userToEdit = usuarios.find(row =>{ return row.id == iduser})
		res.render('editar', {userToEdit})

	},

    update: (req, res) => {
		
		const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
		
		let userToEdit = usuarios.find(user => req.params.id == user.id);

		let editedUser = {
			id: req.params.id,
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			rePassword: req.body.rePassword
		}


		let indice = usuarios.findIndex(user => user.id == req.params.id);
		usuarios[indice] = editedUser;

		fs.writeFileSync(usersFilePath, JSON.stringify(usuarios, null, " "));
		res.redirect("/seguridad/login");
	},

	list: function (req, res){

        /* let archivoJSON = fs.readFileSync('usuarios.json', {encoding : 'utf-8'}); */
        /* let lista = JSON.parse(archivoJSON); */

		const usuarios = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        res.render('users', {usuarios : usuarios})
    },

    admin: (req, res) => 
    {
        res.render('admin',{titulo:'Mundo Mascota DH-ABM Producto'});        
    }
                
}

module.exports = seguridadController;