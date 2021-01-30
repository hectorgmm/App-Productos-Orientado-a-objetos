class Product {
    constructor(name,price,year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}
class UI {
    //PROGRAMAR EVENTOS  
    addProduct(product) {
        const productList= document.getElementById('product-list'); //OBTENER ELEMENTO DEL PRODUCTO
        const element = document.createElement('div');
        //INSERTAR ELEMENTO HTML
        element.innerHTML = `
            <div class= "card text-center mb-4">
                <div class = "card-body">
                    <strong>Product Name </strong>: ${product.name}
                    <strong>Product Price </strong>: ${product.price}
                    <strong>Product Year </strong>: ${product.year}
                    <a href="#" class= "btn btn-danger" name="delete"> Delete</a>
                </div>
            </div>
       `;
       productList.appendChild(element);
       

    }

    resetForm() { //Resetear formulario
        document.getElementById('product-form').reset();
    }

    deleteProduct(element) {  //ELIMINAR PRODUCTO
        if(element.name === 'delete' ){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product Deleted Succesfully', 'info');
        }
    }
        //MENSAJES DE ALERTA
    showMessage(message, cssClass) {
        const div =  document.createElement("div");
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message)); //AGREGAR ELEMENTO HIJO
        //MOSTRANDO MENSAJE EN EL DOM
        const container = document.querySelector(".container");
        const app = document.querySelector ("#App");
        container.insertBefore(div, app);
        //Temporizador para remover mensaje de alerta
        setTimeout(function () {
            document.querySelector(".alert").remove(); 
        }, 3000);
    }
}

//EVENTOS EN DOM
document.getElementById('product-form')
    .addEventListener('submit', function (e) {
        //OBTENER ELEMENTOS INGRESADOS Y GUARDARLOS EN UNA CONSTANTE
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;
        const product = new Product(name, price, year);
        const ui = new UI();

        //DATOS VALIDOS
        if(name ==='' || price ==='' || year ===''){
           return ui.showMessage("Please Insert data in all flieds", "danger");
        }
        ui.addProduct(product); //agregar producto
        ui.showMessage('Product Added Successfully','success');
        ui.resetForm();
    });

//EVENTO PARA ELIMINAR CON BOTON
document.getElementById('product-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteProduct(e.target);
    e.preventDefault();//PARA EVITAR REFRESCAR LA PAGINA DESPUES DE INGRESAR LOS DATOS 
});