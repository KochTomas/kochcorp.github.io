

//var materias_cargar = ['Historia', 'Geografia', 'Matematicas', 'Lengua'];
//var temas_cargar = [['Revolución industrialZ', 'Revolucion de mayo'], ['Geolocalizacion', 'Tipo de piedras'], ['Gauss', 'LHopital'], ['Pronombres', 'Verbos']];
//var contenidos_temas_cargar = [['La revolución intrustrialY...', 'La revolucion de mayo..'], ['La Geolocalizacion..', 'Los tipos de piedras...'], ['Gauss fue un tipo...', 'LHopital era..'], ['Los pronombres son...', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.']];
var materias_cargar = [];
var temas_cargar = [];
var contenidos_temas_cargar = [];
if(localStorage.getItem('materias') && localStorage.getItem('temas') && localStorage.getItem('contenidos')){
	let materias = JSON.parse(localStorage.getItem('materias'));
	materias_cargar = materias;
	let temas = JSON.parse(localStorage.getItem('temas'));
	temas_cargar = temas;
	let contenidos = JSON.parse(localStorage.getItem('contenidos'));
	contenidos_temas_cargar = contenidos;
}else{
	localStorage.setItem('materias', JSON.stringify([]));
	localStorage.setItem('temas', JSON.stringify([]));
	localStorage.setItem('contenidos', JSON.stringify([]));
}


var app = new Vue({
	el: '#app',
	data: {
		materias: materias_cargar,
		materia_seleccionada: -1,
		tema_seleccionado: -1,
		temas_materias: temas_cargar,
		contenidos_temas: contenidos_temas_cargar,
		buscar: '',
		nuevaMateria: '',
		nuevoTemaTitulo: '',
		nuevoTemaContenido: '',
		nuevoOrdenMaterias: [],
		editarTema: '',
		editarContenido: '',

	},
	methods: {
		guardarEdicionTema(){
			this.temas_materias[this.materia_seleccionada][this.tema_seleccionado] = this.editarTema;
			//this.contenidos_temas[this.materia_seleccionada][this.tema_seleccionado] = this.editarContenido.replace(/\n\r?/g, '<br />');
			this.contenidos_temas[this.materia_seleccionada][this.tema_seleccionado] = CKEDITOR.instances.txtAreaEditarContenido.getData();
			this.editarTema = '';
			this.editarContenido = '';
			this.ingresarLocalStorage();
		},
		configurarEdicionTema(){
			this.editarTema = this.temas_materias[this.materia_seleccionada][this.tema_seleccionado]; 
			//this.editarContenido = this.contenidos_temas[this.materia_seleccionada][this.tema_seleccionado].replace(/<br\s*[\/]?>/gi, '\n');
			CKEDITOR.instances.txtAreaEditarContenido.setData(this.contenidos_temas[this.materia_seleccionada][this.tema_seleccionado].replace(/<br\s*[\/]?>/gi, '\n'));
		},
		eliminarTema(){
			this.temas_materias[this.materia_seleccionada].splice(this.tema_seleccionado, 1);
			this.contenidos_temas[this.materia_seleccionada].splice(this.tema_seleccionado, 1);
			this.tema_seleccionado = -1;
			this.ingresarLocalStorage();
		},
		guardarConfiguracion(){
			var temas_respaldo = [];
			for(var i = 0; i < this.temas_materias.length; i++){
				temas_respaldo[i] = this.temas_materias[i].slice();
			}
			var contenidos_respaldo = [];
			for(var i = 0; i < this.contenidos_temas.length; i++){
				contenidos_respaldo[i] = this.contenidos_temas[i].slice();
			}

			for(var i = 0; i < this.nuevoOrdenMaterias.length; i++){
				if(this.nuevoOrdenMaterias[i] != this.materias[i]){
					for(var j = 0; j < this.materias.length; j++){
						if(this.nuevoOrdenMaterias[i] == this.materias[j]){
							this.temas_materias[i] = temas_respaldo[j];
							this.contenidos_temas[i] = contenidos_respaldo[j];
						}
					}
				}
			}
			this.materias = this.nuevoOrdenMaterias.slice();
			this.ingresarLocalStorage();
			$('#btnGuardarConfiguracion').tooltip('show');
			setTimeout(() =>{
				$('#btnGuardarConfiguracion').tooltip('hide');
			}, 2000);
		},
		borrarDatos(){
			localStorage.clear();
			this.materias = [];
			this.temas_materias = [];
			this.contenidos_temas = [];
			this.materia_seleccionada = -1;
		},
		ingresarLocalStorage(){
			localStorage.clear();
			localStorage.setItem('materias', JSON.stringify(this.materias));
			localStorage.setItem('temas', JSON.stringify(this.temas_materias));
			localStorage.setItem('contenidos', JSON.stringify(this.contenidos_temas));
		},
		abrir_collapses(){
			if(this.buscar.length > 0){
				$('.collapse').addClass('show');
			}else{
				$('.collapse').removeClass('show');
			}
		},
		agregar_materia(){
			$('#alertaAgregarMateria').empty();
			if(this.materias.indexOf(this.nuevaMateria) > -1){
				let div = document.createElement('div');
				div.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
								  Ya tienes agregada esta materia en tu lista.
								  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
								    <span aria-hidden="true">&times;</span>
								  </button>
								</div>`
				$('#alertaAgregarMateria').append(div);
			}else{
				let div = document.createElement('div');
				div.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
								 Agregada correctamente: <strong>${this.nuevaMateria}</strong>
								  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
								    <span aria-hidden="true">&times;</span>
								  </button>
								</div>`;
				$('#alertaAgregarMateria').append(div);
				this.materias.push(this.nuevaMateria);
				this.temas_materias.push([]);
				this.contenidos_temas.push([]);
				//Agregar al Local Storage
				this.ingresarLocalStorage();
				this.nuevaMateria = '';
			}
		},
		insertar_tema(){
			this.temas_materias[this.materia_seleccionada].push(this.nuevoTemaTitulo);
			//this.contenidos_temas[this.materia_seleccionada].push(this.nuevoTemaContenido.replace(/\n\r?/g, '<br />'));
			this.contenidos_temas[this.materia_seleccionada].push(CKEDITOR.instances.txtAreaNuevoContenido.getData());
			CKEDITOR.instances.txtAreaNuevoContenido.setData('');
			//Agregar al Local Storage
			this.ingresarLocalStorage();
			this.nuevoTemaTitulo = '';
			this.nuevoTemaContenido = '';
		},
		resaltar_letras(){

		}
	}
});
Vue.filter('highlight', function(word, query){
	if(query.length>0){
		
		query2 = query.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize();
     	word2 = word.normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi,"$1$2").normalize();
     	var check = new RegExp(query2, "ig");
	  	return word2.toString().replace(check, function(matchedText,a,b){
	  		
	     	return ('<strong class="bg-warning">' + matchedText + '</strong>');
	  	});
	  }else{
	  	return word;
	  }
});
Vue.filter('jumps', (word) =>{
	// /<br\s*[\/]?>/gi      /<br[^>]*>/gi
	return word = word.toString().replace(/<br ?\/?>/g, "<br>");
});