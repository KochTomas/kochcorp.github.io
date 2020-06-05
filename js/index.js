


var columnas_inicio = [];


var vue = new Vue({
	el: '#app',
	data: {
		filaSeleccionada: 0,
		escribirNombre: '',
		nombreTabla: 'Usuarios',
		nuevaColumna: '',
		columnas: columnas_inicio,
		filas: [],
		filaNueva: [],
		filaEditar: [],
		nuevoOrdenColumnas: []
	},
	methods: {
		cambiarLugares(){
			var cambios = [];
			for(var i = 0; i < this.filas.length; i++){
				cambios[i] = this.filas[i].slice();
			}
			for(var i = 0; i < this.nuevoOrdenColumnas.length; i++){
				if(this.nuevoOrdenColumnas[i] != this.columnas[i]){
					for(var j = 0; j < this.columnas.length; j++){
						if(this.nuevoOrdenColumnas[i] == this.columnas[j]){
							for(var l = 0; l < this.filas.length; l++){
								this.filas[l][i] = cambios[l][j];
							}
						}
					}
				}
			}
		},
		acomodarAntesDeOrdenar(){
			this.nuevoOrdenColumnas = this.columnas;
		},
		guardarOrdenColumna(){
			this.cambiarLugares();
			this.columnas = this.nuevoOrdenColumnas.slice();
			$('#editarOrdenColumna').modal('hide');
		},
		editarFila(){
			this.filas[this.filaSeleccionada] = this.filaEditar;
			$('#editarFila').modal('toggle');
			this.filaEditar = [];
		},
		eliminarFila(){
			this.filas.splice(this.filaSeleccionada, 1);
		},
		modalSeleccionarFila(index){
			this.filaSeleccionada = index;
			this.filaEditar = this.filas[index].slice();
		},
		crearTabla(){
			this.nombreTabla = this.escribirNombre;
		},
		agregarColumna(){
			if(this.nuevaColumna.length > 0){
				this.columnas.push(this.nuevaColumna);
				this.nuevaColumna = '';
				for(let i = 0; i < this.filas.length; i++){
					while(this.filas[i].length != this.columnas.length ){
						this.filas[i].push('');
					}
				}
			}
		},
		agregarFila(){
			if(this.filaNueva.length != this.columnas.length){
				while(this.filasNueva.length != this.columnas.length ){
					this.filasNueva.push('');
				}
			}
			this.filas.push(this.filaNueva);
			this.filaNueva = [];
		},
		exportarTabla(){
			tableToExcel('mainTable', this.nombreTabla, this.columnas.length);
		}
	}
});


