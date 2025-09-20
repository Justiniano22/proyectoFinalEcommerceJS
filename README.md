Funcionalidad de la Aplicación:
La página web se basa en un ecommerce sobre Dragon Ball Z donde se muestran 2 categorías (Figuras y Manga), ambas opciones al ser clickeadas te llevan a una nueva página (nuevo archivo HTML) donde en cada una se mostraran unas cards haciendo alusión a la categoría elegida. También tiene un buscador por palabra o letras por coincidencia, al encontrar lo buscado muestra el o los resultados  generando una card por cada “producto” hallado, a su vez la página posee un carrito donde se ira almacenando cada elemento agregado, el cual tiene un precio y se ira sumando a medida que se agreguen productos (dicho carrito tiene una simulación de pago). Finalmente debo mencionar que tiene un apartado llamado “subir producto” que simula la publicación de un producto propio, mostrando una card de cómo quedaría la publicación.
Conceptos Aplicados durante el desarrollo del ecommerce:

1) Se aplicó HTML Semántico.
2) Display Flex para el ordenamiento de elementos en la página.
3) Display Grid para algunos contenedores de la página.
4) Se utilizaron enlaces (dentro del nav) para facilitar el desplazamiento dentro la página.
5) Se aplicaron las media queries necesarias para que la pagina sea lo más responsive posible.
6) Se utilizó la función FETCH, THEN y CATCH para el uso de promesas para así poder interactuar con la API de Dragon Ball y JsonPlaceHolder.
7) Uso de funciones async para trabajar con las APIS.
8) Se realizó el uso del LocalStorage para poder almacenar los “productos”  que fueran agregados al carrito, dichos productos quedan guardados por más que la pagina sea cerrada.
9) Se utilizaron addEventListener (con arrows functions o llamadas a funciones) para dar funcionalidad a la página haciendo que sea más interactiva.
10) Utilización de JsDelivr para utilizar algunas imágenes (con formato webp) almacenadas en un repositorio público en GitHub.
