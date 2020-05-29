

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
		temas_materias: temas_cargar,
		contenidos_temas: contenidos_temas_cargar,
		buscar: '',
		nuevaMateria: '',
		nuevoTemaTitulo: '',
		nuevoTemaContenido: '',

	},
	methods: {
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
			this.contenidos_temas[this.materia_seleccionada].push(this.nuevoTemaContenido.replace(/\n\r?/g, '<br />'));
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
		var check = new RegExp(query, "ig");
	  	return word.toString().replace(check, function(matchedText,a,b){
	  		
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