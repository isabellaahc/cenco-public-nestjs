
## Descripción
Este proyecto contiene un crud básico para solución de Prueba Técnica Equipo E-commerce.\  

El Backend fue construido con :\  
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.  

La base de datos utilizada fue:\  
[MONGODB](https://www.mongodb.com/) The database for modern applications.\  

El despliegue de esta API fue realizado mediante un server EC2 "free tier":  
[Amazon EC2](https://aws.amazon.com/es/ec2/?nc2=type_a&ec2-whats-new.sort-by=item.additionalFields.postDateTime&ec2-whats-new.sort-order=desc)  

La API se encuentra disponible mediante el gestor de procesos PM2:  
[PM2](https://pm2.keymetrics.io/)   

Para las pruebas se hará entrega de una colección Postman:  
[POSTMAN](https://https://www.postman.com/)   


## Instalación

```bash
$ npm install
```

## Ejecución de la APP

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test
Estos son cargados por defecto gracias a nest.js pero no están implementados para este proyecto.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Conexión a DB
La Base de datos utilizada para este proyecto fue MongoDB.
La cuenta de usuario que está siendo utilizada para los distintos endpoints de este proyecto tiene validez de una semana a contar del 16/10

## Endpoints Disponibles

POST /users/createUser => Crea un nuevo usuario en la base de datos.\ 
GET /users/showAll => Retorna el total de los usuarios con su respectiva información de créditos.\ 
GET /users/getClientBalanceByStore => Entrega la información de creditos segun tienda a consultar. En caso de no encontrar el email, retorna un mensaje.\ 
POST /users/updateClientBalance => Actualiza el saldo del usuario según solicitud de usuario.\ 
```bash 
  #params
  -> Para agregar saldo el campo "operator" del body debe ser "SUM"\ 
  -> Para quitar saldo el campo "operator"de body debe ser "SUBS"\ 
```

## Alcances
Este proyecto tiene incorporadas solo validaciones básicas. 
Para profundizar en una solución robusta, creo que es necesario ahondar más en el negocio y así proponer una mejor solución para las distintas instancias de desarrollo.
No se encuentra disponible el método que retorna el total de créditos por tienda ni el batch de actualización masiva.

## Contacto

- Author - Isabel Anabalón
- Instagram - [https://www.instagram.com/isabellaahc/](https://www.instagram.com/isabellaahc/)
- LinkedIn - [https://www.linkedin.com/in/isabel-anabal%C3%B3n-fuentes-626931151/](https://www.linkedin.com/in/isabel-anabal%C3%B3n-fuentes-626931151/)