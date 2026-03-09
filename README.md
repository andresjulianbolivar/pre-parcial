1. Guía de ejecución.
- Levantar el API de los autores: 
• Realice	un	fork	del	siguiente	repositorio:	
https://github.com/isis3710-uniandes/bookstore-back	
• Realice	el	build	de	la	imagen	docker	usando	el	comando:	
docker	build	./	-t	bookstore	
• Ejecute	la	imagen	usando	el	comando:	
docker	run	-d	-p	127.0.0.1:8080:8080	bookstore	
• Verifique	que	el	API	quedo	funcioando	ingresando	a	la	siguiente	url:	
http://127.0.0.1:8080/api/authors	
- Ejecución de la aplicación: npm run dev

2. Reporte técnico: La estrategia utilizada para que los datos persistan entre rutas se basa en el uso de un contexto con su respectivo proveedor (AutoresContext.tsx). De este modo, cada componente encargado de modificar los datos, tiene acceso a dicho estado (contexto) y lo puede modificar mediante las operaciones correspondientes de eliminación, creación o edición. Además, la lógica de filtrado se mantiene con un estado en el componente de listado que lo que permite es filtrar la renderización de listas. Es decir, toma el contexto global de autores y filtra la información para renderizar solo las coincidencias.
