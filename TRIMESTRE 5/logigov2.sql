 
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: logigov2
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas` (
  `idArea` bigint NOT NULL AUTO_INCREMENT,
  `nombreArea` varchar(150) NOT NULL,
  `descripcionArea` text,
  PRIMARY KEY (`idArea`),
  UNIQUE KEY `nombreArea` (`nombreArea`),
  KEY `idx_nombreArea` (`nombreArea`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` VALUES (1,'Bodega','Área encargada de almacenar los productos.'),(2,'Devoluciones','Área encargada del proceso de devoluciones de productos.'),(6,'Calidad','Área encargada de velar que los productos esten en perfecto estado para los envios.'),(7,'Logistica y Transporte','Área encargada de la gestion de rutas.'),(8,'Administración','Área acargo de todas las areas y departamentos'),(10,'Cuartos Fríos','Área responsable del almacenamiento, control, distribución y asignación de productos que requieren refrigeración.'),(12,'Contabilidad','Área responsable de las finanzas de la empresa.');
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignacionrutas`
--

DROP TABLE IF EXISTS `asignacionrutas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignacionrutas` (
  `idAsignacionRuta` bigint NOT NULL AUTO_INCREMENT,
  `idVehiculo` bigint NOT NULL,
  `idRuta` bigint NOT NULL,
  PRIMARY KEY (`idAsignacionRuta`),
  KEY `fk_asignacion_vehiculo` (`idVehiculo`),
  KEY `fk_asignacion_ruta` (`idRuta`),
  CONSTRAINT `fk_asignacion_ruta` FOREIGN KEY (`idRuta`) REFERENCES `rutas` (`idRuta`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_asignacion_vehiculo` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculos` (`idVehiculo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignacionrutas`
--

LOCK TABLES `asignacionrutas` WRITE;
/*!40000 ALTER TABLE `asignacionrutas` DISABLE KEYS */;
/*!40000 ALTER TABLE `asignacionrutas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `action` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `resource_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `resource_id` bigint unsigned DEFAULT NULL,
  `details` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=326 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES (1,13,'Solicitud GET','Gestion Areas',NULL,'{\"Detalles\": \"api/gestion_areas\"}','2025-04-15 23:24:43','2025-04-15 23:24:43'),(2,13,'Solicitud GET','Gestion Areas',NULL,'{\"Detalles\": \"api/gestion_areas\"}','2025-04-15 23:27:41','2025-04-15 23:27:41'),(3,13,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-15 23:28:20','2025-04-15 23:28:20'),(4,13,'Solicitud GET','Gestion Areas',NULL,'{\"Detalles\": \"api/gestion_areas\"}','2025-04-16 00:29:55','2025-04-16 00:29:55'),(5,13,'Solicitud POST','Gestion Areas',NULL,'{\"Detalles\": {\"nombreArea\": \"Cuartos Fríos\", \"descripcionArea\": \"Área responsable del almacenamiento, control y distribución de productos que requieren refrigeración.\"}}','2025-04-16 00:32:21','2025-04-16 00:32:21'),(6,13,'Solicitud PATCH Parcial','Gestion Areas',9,'{\"Detalles\": {\"nombreArea\": \"Cuartos cuatos\"}}','2025-04-16 00:33:51','2025-04-16 00:33:51'),(7,13,'Solicitud PUT','Gestion Areas',9,'{\"Detalles\": {\"nombreArea\": \"Cuartos Fríos\", \"descripcionArea\": \"Área responsable del almacenamiento, control, distribución y asignación de productos que requieren refrigeración.\"}}','2025-04-16 00:34:45','2025-04-16 00:34:45'),(8,13,'Solicitud DELETE','Gestion Areas',9,'{\"Detalles\": \"Eliminación del recurso con ID 9\"}','2025-04-16 00:34:58','2025-04-16 00:34:58'),(9,13,'Solicitud POST','Gestion Areas',NULL,'{\"Detalles\": {\"nombreArea\": \"Cuartos Fríos\", \"descripcionArea\": \"Área responsable del almacenamiento, control, distribución y asignación de productos que requieren refrigeración.\"}}','2025-04-16 00:35:08','2025-04-16 00:35:08'),(10,13,'Solicitud GET_by_id','Gestion Areas',10,'{\"Detalles\": \"api/gestion_areas/10\"}','2025-04-16 00:35:20','2025-04-16 00:35:20'),(11,13,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-16 00:56:43','2025-04-16 00:56:43'),(12,11,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-16 00:58:36','2025-04-16 00:58:36'),(13,13,'Solicitud POST','Gestion Categoria de Envios',1,'{\"data\": {\"descripcion\": \"Medicamentos y farmacos generales\", \"nombreCategoria\": \"Fármacos\", \"precioCategoria\": 35}}','2025-04-19 10:26:44','2025-04-19 10:26:44'),(14,13,'Solicitud PATCH','Gestion Categoria de Envios',1,'{\"data\": {\"precioCategoria\": 35000}}','2025-04-19 10:28:22','2025-04-19 10:28:22'),(15,13,'Solicitud POST','Gestion Categoria de Envios',2,'{\"data\": {\"descripcion\": \"Productos de consumo diario como arroz, azúcar y granos.\", \"nombreCategoria\": \"Abarrotes\", \"precioCategoria\": 20000}}','2025-04-19 10:32:56','2025-04-19 10:32:56'),(16,13,'Solicitud POST','Gestion Categoria de Envios',3,'{\"data\": {\"descripcion\": \"Línea blanca y pequeños electrodomésticos.\", \"nombreCategoria\": \"Electrodomésticos\", \"precioCategoria\": 1500000}}','2025-04-19 10:33:18','2025-04-19 10:33:18'),(17,13,'Solicitud POST','Gestion Categoria de Envios',4,'{\"data\": {\"descripcion\": \"Herramientas y materiales para construcción y reparaciones.\", \"nombreCategoria\": \"Ferretería\", \"precioCategoria\": 50000}}','2025-04-19 10:36:37','2025-04-19 10:36:37'),(18,13,'Solicitud POST','Gestion Categoria de Envios',5,'{\"data\": {\"descripcion\": \"Útiles escolares, libros y artículos de oficina.\", \"nombreCategoria\": \"Papelería\", \"precioCategoria\": 18000}}','2025-04-19 10:36:44','2025-04-19 10:36:44'),(19,13,'Solicitud POST','Gestion Categoria de Envios',6,'{\"data\": {\"descripcion\": \"Gaseosas, jugos, agua y bebidas alcohólicas.\", \"nombreCategoria\": \"Bebidas\", \"precioCategoria\": 25000}}','2025-04-19 10:36:51','2025-04-19 10:36:51'),(20,13,'Solicitud POST','Gestion Categoria de Envios',7,'{\"data\": {\"descripcion\": \"Productos agrícolas frescos de origen nacional.\", \"nombreCategoria\": \"Frutas y Verduras\", \"precioCategoria\": 30000}}','2025-04-19 10:36:57','2025-04-19 10:36:57'),(21,13,'Solicitud POST','Gestion Categoria de Envios',8,'{\"data\": {\"descripcion\": \"Muebles, decoración y artículos para el hogar.\", \"nombreCategoria\": \"Hogar y Decoración\", \"precioCategoria\": 120000}}','2025-04-19 10:37:04','2025-04-19 10:37:04'),(22,13,'Solicitud POST','Gestion Categoria de Envios',9,'{\"data\": {\"descripcion\": \"Vestuario y zapatos de fabricación nacional e importada.\", \"nombreCategoria\": \"Ropa y Calzado\", \"precioCategoria\": 95000}}','2025-04-19 10:37:18','2025-04-19 10:37:18'),(23,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:39:46','2025-04-19 10:39:46'),(24,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:40:47','2025-04-19 10:40:47'),(25,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:43:27','2025-04-19 10:43:27'),(26,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:43:30','2025-04-19 10:43:30'),(27,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:44:40','2025-04-19 10:44:40'),(28,13,'Solicitud GET','Gestion Categoria de Envios',2,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/2\"}','2025-04-19 10:45:13','2025-04-19 10:45:13'),(29,13,'Solicitud GET','Gestion Categoria de Envios',3,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/3\"}','2025-04-19 10:45:19','2025-04-19 10:45:19'),(30,13,'Solicitud GET','Gestion Categoria de Envios',4,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/4\"}','2025-04-19 10:45:22','2025-04-19 10:45:22'),(31,13,'Solicitud GET','Gestion Categoria de Envios',1,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/1\"}','2025-04-19 10:45:25','2025-04-19 10:45:25'),(32,13,'Solicitud GET','Gestion Categoria de Envios',5,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/5\"}','2025-04-19 10:45:27','2025-04-19 10:45:27'),(33,13,'Solicitud GET','Gestion Categoria de Envios',6,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/6\"}','2025-04-19 10:45:29','2025-04-19 10:45:29'),(34,13,'Solicitud GET','Gestion Categoria de Envios',7,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/7\"}','2025-04-19 10:45:33','2025-04-19 10:45:33'),(35,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:45:39','2025-04-19 10:45:39'),(36,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:48:45','2025-04-19 10:48:45'),(37,13,'Solicitud DELETE','Gestion Categorias de Envios',9,'[]','2025-04-19 10:49:31','2025-04-19 10:49:31'),(38,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:50:20','2025-04-19 10:50:20'),(39,13,'Solicitud DELETE','Gestion Categorias de Envios',9,'[]','2025-04-19 10:51:29','2025-04-19 10:51:29'),(40,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:52:02','2025-04-19 10:52:02'),(41,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:52:08','2025-04-19 10:52:08'),(42,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:52:10','2025-04-19 10:52:10'),(43,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:52:11','2025-04-19 10:52:11'),(44,13,'Solicitud DELETE','Gestion Categorias de Envios',9,'[]','2025-04-19 10:53:53','2025-04-19 10:53:53'),(45,13,'Solicitud POST','Gestion Categoria de Envios',10,'{\"data\": {\"descripcion\": \"Vestuario y zapatos de fabricación nacional e importada.\", \"nombreCategoria\": \"Ropa y Calzado\", \"precioCategoria\": 95000}}','2025-04-19 10:54:04','2025-04-19 10:54:04'),(46,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:55:10','2025-04-19 10:55:10'),(47,13,'Solicitud POST','Gestion Ciudades',1,'{\"data\": {\"nombreCiudad\": \"Bogota D.C\", \"costoPor_Ciudad\": 15000}}','2025-04-19 12:31:12','2025-04-19 12:31:12'),(48,13,'Solicitud POST','Gestion Ciudades',2,'{\"data\": {\"nombreCiudad\": \"Bucaramanga\", \"costoPor_Ciudad\": 15000}}','2025-04-19 12:31:32','2025-04-19 12:31:32'),(49,13,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-19 12:31:43','2025-04-19 12:31:43'),(50,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-19 12:33:00','2025-04-19 12:33:00'),(51,8,'Solicitud POST','Gestion Ciudades',3,'{\"data\": {\"nombreCiudad\": \"Medellín\", \"costoPor_Ciudad\": \"14000.00\"}}','2025-04-19 12:34:17','2025-04-19 12:34:17'),(52,8,'Solicitud POST','Gestion Ciudades',4,'{\"data\": {\"nombreCiudad\": \"Cali\", \"costoPor_Ciudad\": \"13000.00\"}}','2025-04-19 12:34:28','2025-04-19 12:34:28'),(53,8,'Solicitud POST','Gestion Ciudades',5,'{\"data\": {\"nombreCiudad\": \"Barranquilla\", \"costoPor_Ciudad\": \"16000.00\"}}','2025-04-19 12:34:36','2025-04-19 12:34:36'),(54,8,'Solicitud POST','Gestion Ciudades',6,'{\"data\": {\"nombreCiudad\": \"Cartagena\", \"costoPor_Ciudad\": \"15500.00\"}}','2025-04-19 12:34:47','2025-04-19 12:34:47'),(55,8,'Solicitud POST','Gestion Ciudades',7,'{\"data\": {\"nombreCiudad\": \"Santa Marta\", \"costoPor_Ciudad\": \"14500.00\"}}','2025-04-19 12:34:56','2025-04-19 12:34:56'),(56,8,'Solicitud POST','Gestion Ciudades',8,'{\"data\": {\"nombreCiudad\": \"Cúcuta\", \"costoPor_Ciudad\": \"13500.00\"}}','2025-04-19 12:35:02','2025-04-19 12:35:02'),(57,8,'Solicitud POST','Gestion Ciudades',9,'{\"data\": {\"nombreCiudad\": \"Ibagué\", \"costoPor_Ciudad\": \"12500.00\"}}','2025-04-19 12:35:06','2025-04-19 12:35:06'),(58,8,'Solicitud POST','Gestion Ciudades',10,'{\"data\": {\"nombreCiudad\": \"Pereira\", \"costoPor_Ciudad\": \"12800.00\"}}','2025-04-19 12:35:11','2025-04-19 12:35:11'),(59,8,'Solicitud POST','Gestion Ciudades',11,'{\"data\": {\"nombreCiudad\": \"Manizales\", \"costoPor_Ciudad\": \"12700.00\"}}','2025-04-19 12:35:19','2025-04-19 12:35:19'),(60,8,'Solicitud POST','Gestion Ciudades',12,'{\"data\": {\"nombreCiudad\": \"Neiva\", \"costoPor_Ciudad\": \"12000.00\"}}','2025-04-19 12:35:29','2025-04-19 12:35:29'),(61,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-19 12:35:38','2025-04-19 12:35:38'),(62,8,'Solicitud GET','Gestion Ciudades',2,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/2\"}','2025-04-19 12:36:13','2025-04-19 12:36:13'),(63,8,'Solicitud GET','Gestion Ciudades',1,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/1\"}','2025-04-19 12:36:15','2025-04-19 12:36:15'),(64,8,'Solicitud GET','Gestion Ciudades',4,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/4\"}','2025-04-19 12:36:17','2025-04-19 12:36:17'),(65,8,'Solicitud GET','Gestion Ciudades',5,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/5\"}','2025-04-19 12:36:18','2025-04-19 12:36:18'),(66,8,'Solicitud GET','Gestion Ciudades',6,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/6\"}','2025-04-19 12:36:20','2025-04-19 12:36:20'),(67,8,'Solicitud GET','Gestion Ciudades',7,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/7\"}','2025-04-19 12:36:22','2025-04-19 12:36:22'),(68,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-19 12:36:25','2025-04-19 12:36:25'),(69,8,'Solicitud DELETE','Gestion Ciudades',12,'[]','2025-04-19 12:36:42','2025-04-19 12:36:42'),(70,8,'Solicitud POST','Gestion Ciudades',13,'{\"data\": {\"nombreCiudad\": \"Neiva\", \"costoPor_Ciudad\": \"12000.00\"}}','2025-04-19 12:37:10','2025-04-19 12:37:10'),(71,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-19 12:38:06','2025-04-19 12:38:06'),(72,8,'Solicitud PATCH','Gestion Ciudades',13,'{\"data\": {\"nombreCiudad\": \"Neiva\", \"costoPor_Ciudad\": \"12000\"}}','2025-04-19 12:41:02','2025-04-19 12:41:02'),(73,8,'Solicitud DELETE','Gestion Ciudades',13,'[]','2025-04-19 12:41:46','2025-04-19 12:41:46'),(74,8,'Solicitud POST','Gestion Ciudades',14,'{\"data\": {\"nombreCiudad\": \"Neiva\", \"costoPor_Ciudad\": \"12000\"}}','2025-04-19 12:42:12','2025-04-19 12:42:12'),(75,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-20 04:34:40','2025-04-20 04:34:40'),(76,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-20 04:34:51','2025-04-20 04:34:51'),(77,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-20 11:35:17','2025-04-20 11:35:17'),(78,8,'Solicitud POST','Gestion Recogidas',1,'{\"data\": {\"idCiudad\": 1, \"direccionRecogida\": \"Calle 123, Bogotá\", \"fechaRecogidaFinal\": \"2025-04-26\", \"fechaRecogidaSeleccionada\": \"2025-04-25\"}}','2025-04-20 11:40:41','2025-04-20 11:40:41'),(79,8,'Solicitud POST','Gestion Recogidas',3,'{\"data\": {\"idCiudad\": 3, \"direccionRecogida\": \"Carrera 45, Medellín\", \"fechaRecogidaFinal\": \"2025-04-30\", \"fechaRecogidaSeleccionada\": \"2025-04-28\"}}','2025-04-20 11:41:53','2025-04-20 11:41:53'),(80,8,'Solicitud POST','Gestion Recogidas',4,'{\"data\": {\"idCiudad\": 4, \"direccionRecogida\": \"Avenida 8, Cali\", \"fechaRecogidaFinal\": \"2025-05-05\", \"fechaRecogidaSeleccionada\": \"2025-05-02\"}}','2025-04-20 11:42:00','2025-04-20 11:42:00'),(81,8,'Solicitud POST','Gestion Recogidas',2,'{\"data\": {\"idCiudad\": 2, \"direccionRecogida\": \"Calle 50, Bucaramanga\", \"fechaRecogidaFinal\": \"2025-05-01\", \"fechaRecogidaSeleccionada\": \"2025-04-30\"}}','2025-04-20 11:42:06','2025-04-20 11:42:06'),(82,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-20 11:45:00','2025-04-20 11:45:00'),(83,8,'Solicitud POST','Gestion Recogidas',6,'{\"data\": {\"idCiudad\": 6, \"direccionRecogida\": \"Calle 50B #59 - 90\", \"fechaRecogidaFinal\": \"2025-02-15\", \"fechaRecogidaSeleccionada\": \"2025-02-10\"}}','2025-04-20 11:50:40','2025-04-20 11:50:40'),(84,8,'Solicitud DELETE','Gestion Recogidas',5,'[]','2025-04-20 11:52:07','2025-04-20 11:52:07'),(85,8,'Solicitud POST','Gestion Recogidas',6,'{\"data\": {\"idCiudad\": 6, \"direccionRecogida\": \"Calle 50B #59 - 90\", \"fechaRecogidaFinal\": \"2025-02-15\", \"fechaRecogidaSeleccionada\": \"2025-02-10\"}}','2025-04-20 11:52:20','2025-04-20 11:52:20'),(86,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-21 05:24:12','2025-04-21 05:24:12'),(87,8,'Solicitud POST','Gestion Entregas',7,'{\"data\": {\"idCiudad\": 7, \"direccionEntrega\": \"Calle 10 #12-34, Santa Marta\", \"fechaEntregaFinal\": \"2025-04-25\", \"fechaEntregaSeleccionada\": \"2025-04-22\"}}','2025-04-21 05:25:36','2025-04-21 05:25:36'),(88,8,'Solicitud POST','Gestion Entregas',8,'{\"data\": {\"idCiudad\": 8, \"direccionEntrega\": \"Carrera 45 #56-78, Cúcuta\", \"fechaEntregaFinal\": \"2025-04-26\", \"fechaEntregaSeleccionada\": \"2025-04-23\"}}','2025-04-21 05:28:25','2025-04-21 05:28:25'),(89,8,'Solicitud POST','Gestion Entregas',9,'{\"data\": {\"idCiudad\": 9, \"direccionEntrega\": \"Av. Quinta con calle 60, Ibagué\", \"fechaEntregaFinal\": \"2025-04-27\", \"fechaEntregaSeleccionada\": \"2025-04-24\"}}','2025-04-21 05:28:32','2025-04-21 05:28:32'),(90,8,'Solicitud POST','Gestion Entregas',10,'{\"data\": {\"idCiudad\": 10, \"direccionEntrega\": \"Calle 18 #9-10, Pereira\", \"fechaEntregaFinal\": \"2025-04-28\", \"fechaEntregaSeleccionada\": \"2025-04-25\"}}','2025-04-21 05:28:39','2025-04-21 05:28:39'),(91,8,'Solicitud POST','Gestion Entregas',11,'{\"data\": {\"idCiudad\": 11, \"direccionEntrega\": \"Cra 23 #45-67, Manizales\", \"fechaEntregaFinal\": \"2025-04-29\", \"fechaEntregaSeleccionada\": \"2025-04-26\"}}','2025-04-21 05:28:46','2025-04-21 05:28:46'),(92,8,'Solicitud PATCH','Gestion Entregas',5,'{\"data\": {\"idCiudad\": 11, \"direccionEntrega\": \"Cra 23 #45-67\", \"fechaEntregaFinal\": \"2025-04-29\", \"fechaEntregaSeleccionada\": \"2025-04-26\"}}','2025-04-21 05:32:32','2025-04-21 05:32:32'),(93,8,'Solicitud PATCH','Gestion Entregas',5,'{\"data\": {\"idCiudad\": 10, \"direccionEntrega\": \"Cra 23 #45-67\", \"fechaEntregaFinal\": \"2025-04-29\", \"fechaEntregaSeleccionada\": \"2025-04-26\"}}','2025-04-21 05:32:46','2025-04-21 05:32:46'),(94,8,'Solicitud PATCH','Gestion Entregas',5,'{\"data\": {\"idCiudad\": 11, \"direccionEntrega\": \"Cra 23 #45-67\", \"fechaEntregaFinal\": \"2025-04-29\", \"fechaEntregaSeleccionada\": \"2025-04-26\"}}','2025-04-21 05:32:52','2025-04-21 05:32:52'),(95,8,'Solicitud DELETE','Gestion Entregas',5,'[]','2025-04-21 05:33:13','2025-04-21 05:33:13'),(96,8,'Solicitud POST','Gestion Entregas',11,'{\"data\": {\"idCiudad\": 11, \"direccionEntrega\": \"Cra 23 #45-67\", \"fechaEntregaFinal\": \"2025-04-29\", \"fechaEntregaSeleccionada\": \"2025-04-26\"}}','2025-04-21 05:33:39','2025-04-21 05:33:39'),(97,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 05:46:53','2025-04-21 05:46:53'),(98,8,'Solicitud DELETE','Gestion Usuarios',10,'{\"Detalles\": \"Eliminación del recurso con ID 10\"}','2025-04-21 05:47:21','2025-04-21 05:47:21'),(99,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 05:53:57','2025-04-21 05:53:57'),(100,8,'Solicitud DELETE','Gestion Usuarios',5,'{\"Detalles\": \"Eliminación del recurso con ID 5\"}','2025-04-21 05:54:55','2025-04-21 05:54:55'),(101,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 05:55:02','2025-04-21 05:55:02'),(102,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 05:56:10','2025-04-21 05:56:10'),(103,8,'Solicitud DELETE','Gestion Usuarios',6,'{\"Detalles\": \"Eliminación del recurso con ID 6\"}','2025-04-21 05:56:42','2025-04-21 05:56:42'),(104,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 05:56:46','2025-04-21 05:56:46'),(105,8,'Solicitud PATCH Parcial','Gestion Usuarios',13,'{\"Detalles\": {\"idRole\": 3}}','2025-04-21 06:00:29','2025-04-21 06:00:29'),(106,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:00:45','2025-04-21 06:00:45'),(107,8,'Solicitud POST','Gestion Usuarios',14,'{\"Detalles\": {\"email\": \"gonzdeiv123@gmail.com\", \"idRole\": 3, \"idestado\": 1, \"idPuestos\": 5, \"contrasena\": \"Tigre77777\", \"idVehiculo\": null, \"numContacto\": \"3008901190\", \"nombreCompleto\": \"Sergio Barbosa Bedoya\", \"documentoIdentidad\": \"1234999091\", \"direccionResidencia\": \"Calle 12 sur #90 - 30\"}}','2025-04-21 06:13:03','2025-04-21 06:13:03'),(108,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:28:37','2025-04-21 06:28:37'),(109,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:34:27','2025-04-21 06:34:27'),(110,8,'Solicitud GET por ID','Gestion Usuarios',8,'{\"Detalles\": \"api/gestion_usuarios/buscar_usuario/8\"}','2025-04-21 06:34:37','2025-04-21 06:34:37'),(111,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:36:05','2025-04-21 06:36:05'),(112,8,'Solicitud GET por ID','Gestion Usuarios',8,'{\"Detalles\": \"api/gestion_usuarios/buscar_usuario/8\"}','2025-04-21 06:36:23','2025-04-21 06:36:23'),(113,8,'Solicitud PATCH Parcial','Gestion Usuarios',8,'{\"Detalles\": {\"idPuestos\": 5}}','2025-04-21 06:38:13','2025-04-21 06:38:13'),(114,8,'Solicitud GET por ID','Gestion Usuarios',8,'{\"Detalles\": \"api/gestion_usuarios/buscar_usuario/8\"}','2025-04-21 06:38:28','2025-04-21 06:38:28'),(115,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:38:44','2025-04-21 06:38:44'),(116,14,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:44:52','2025-04-21 06:44:52'),(117,14,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 08:20:36','2025-04-21 08:20:36'),(118,8,'Solicitud GET por ID','Gestion Usuarios',14,'{\"Detalles\": \"api/gestion_usuarios/buscar_usuario/14\"}','2025-04-21 08:24:06','2025-04-21 08:24:06'),(119,8,'Solicitud PATCH Parcial','Gestion Usuarios',14,'{\"Detalles\": {\"email\": \"gonzdeiv123@gmail.com\", \"idRole\": 2, \"idestado\": 1, \"idPuestos\": 5, \"nombreCompleto\": \"Brandon David Gonzalez Lopez\", \"documentoIdentidad\": \"1234999091\"}}','2025-04-21 08:25:11','2025-04-21 08:25:11'),(120,8,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-21 09:59:56','2025-04-21 09:59:56'),(121,8,'Solicitud POST','Gestion Envios',1,'{\"data\": {\"idEntrega\": 1, \"idRecogida\": 1, \"metodoPago\": \"Efectivo\", \"idCategoria\": 2, \"nombreRemitente\": \"Ana Torres\", \"nombreDestinatario\": \"Luis Rojas\", \"num_ContactoRemitente\": \"3105678910\", \"num_ContactoDestinatario\": \"3201234567\"}}','2025-04-21 10:09:37','2025-04-21 10:09:37'),(122,8,'Solicitud POST','Gestion Envios',2,'{\"data\": {\"idEntrega\": 4, \"idRecogida\": 2, \"metodoPago\": \"Tarjeta Debito\", \"idCategoria\": 3, \"nombreRemitente\": \"Carlos Mendoza\", \"nombreDestinatario\": \"Andrea Páez\", \"num_ContactoRemitente\": \"3114567890\", \"num_ContactoDestinatario\": \"3012345678\"}}','2025-04-21 10:11:01','2025-04-21 10:11:01'),(123,8,'Solicitud POST','Gestion Envios',3,'{\"data\": {\"idEntrega\": 3, \"idRecogida\": 6, \"metodoPago\": \"Plataformas Virtuales\", \"idCategoria\": 5, \"nombreRemitente\": \"Paola Suárez\", \"nombreDestinatario\": \"Julián Díaz\", \"num_ContactoRemitente\": \"3127894561\", \"num_ContactoDestinatario\": \"3009876543\"}}','2025-04-21 10:11:15','2025-04-21 10:11:15'),(124,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-21 10:20:17','2025-04-21 10:20:17'),(125,8,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-21 10:22:14','2025-04-21 10:22:14'),(126,8,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-21 10:22:57','2025-04-21 10:22:57'),(127,8,'Solicitud POST','Gestion Envios',4,'{\"data\": {\"idEntrega\": 1, \"idRecogida\": 1, \"metodoPago\": \"Plataformas Virtuales\", \"idCategoria\": 3, \"nombreRemitente\": \"Esteban Giraldo\", \"nombreDestinatario\": \"Brandon David Gonzalez\", \"num_ContactoRemitente\": \"3127894561\", \"num_ContactoDestinatario\": \"3009876543\"}}','2025-04-21 10:27:50','2025-04-21 10:27:50'),(128,8,'Solicitud PATCH','Gestion Envios',4,'{\"data\": {\"idEntrega\": 2, \"idRecogida\": 1, \"metodoPago\": \"Plataformas Virtuales\", \"idCategoria\": 3, \"nombreRemitente\": \"Estebitan XD Giraldo\", \"nombreDestinatario\": \"Brandon David Gonzalez\", \"num_ContactoRemitente\": \"3127894561\", \"num_ContactoDestinatario\": \"3009876543\"}}','2025-04-21 10:31:58','2025-04-21 10:31:58'),(129,8,'Solicitud DELETE','Gestion Envios',4,'[]','2025-04-21 10:35:12','2025-04-21 10:35:12'),(130,8,'Solicitud POST','Gestion Envios',5,'{\"data\": {\"idEntrega\": 2, \"idRecogida\": 1, \"metodoPago\": \"Plataformas Virtuales\", \"idCategoria\": 3, \"nombreRemitente\": \"Esteban Giraldo\", \"nombreDestinatario\": \"Brandon David Gonzalez\", \"num_ContactoRemitente\": \"3127894561\", \"num_ContactoDestinatario\": \"3009876543\"}}','2025-04-21 10:35:24','2025-04-21 10:35:24'),(131,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 10:39:03','2025-04-21 10:39:03'),(132,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 10:44:05','2025-04-21 10:44:05'),(133,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-21 15:49:04','2025-04-21 15:49:04'),(134,8,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-21 15:51:52','2025-04-21 15:51:52'),(135,8,'Solicitud DELETE','Gestion Envios',4,'[]','2025-04-21 22:25:52','2025-04-21 22:25:52'),(136,8,'Solicitud DELETE','Gestion Envios',4,'[]','2025-04-21 22:26:47','2025-04-21 22:26:47'),(137,8,'Solicitud POST','Gestion Envios',6,'{\"data\": {\"idEntrega\": 3, \"idRecogida\": 1, \"metodoPago\": \"Efectivo\", \"idCategoria\": 3, \"nombreRemitente\": \"Dario Gonzalez\", \"nombreDestinatario\": \"Brandon David Gonzalez\", \"num_ContactoRemitente\": \"3127894561\", \"num_ContactoDestinatario\": \"3009876543\"}}','2025-04-21 22:31:57','2025-04-21 22:31:57'),(138,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:26:02','2025-04-22 02:26:02'),(139,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:26:03','2025-04-22 02:26:03'),(140,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:26:03','2025-04-22 02:26:03'),(141,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:26:04','2025-04-22 02:26:04'),(142,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:31:01','2025-04-22 02:31:01'),(143,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:31:01','2025-04-22 02:31:01'),(144,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:31:01','2025-04-22 02:31:01'),(145,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:31:01','2025-04-22 02:31:01'),(146,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:36:10','2025-04-22 02:36:10'),(147,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:36:10','2025-04-22 02:36:10'),(148,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:36:10','2025-04-22 02:36:10'),(149,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:36:11','2025-04-22 02:36:11'),(150,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:23','2025-04-22 02:41:23'),(151,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:23','2025-04-22 02:41:23'),(152,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:23','2025-04-22 02:41:23'),(153,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:23','2025-04-22 02:41:23'),(154,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:26','2025-04-22 02:41:26'),(155,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:26','2025-04-22 02:41:26'),(156,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:26','2025-04-22 02:41:26'),(157,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:27','2025-04-22 02:41:27'),(158,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:29','2025-04-22 02:41:29'),(159,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:30','2025-04-22 02:41:30'),(160,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:30','2025-04-22 02:41:30'),(161,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:30','2025-04-22 02:41:30'),(162,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:38','2025-04-22 02:41:38'),(163,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:38','2025-04-22 02:41:38'),(164,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:38','2025-04-22 02:41:38'),(165,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:39','2025-04-22 02:41:39'),(166,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:45:16','2025-04-22 02:45:16'),(167,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:45:16','2025-04-22 02:45:16'),(168,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:45:16','2025-04-22 02:45:16'),(169,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:45:16','2025-04-22 02:45:16'),(170,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:49:07','2025-04-22 02:49:07'),(171,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:49:07','2025-04-22 02:49:07'),(172,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:49:07','2025-04-22 02:49:07'),(173,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:49:07','2025-04-22 02:49:07'),(174,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:51:15','2025-04-22 02:51:15'),(175,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:51:16','2025-04-22 02:51:16'),(176,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:51:16','2025-04-22 02:51:16'),(177,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:51:16','2025-04-22 02:51:16'),(178,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:51:18','2025-04-22 02:51:18'),(179,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:51:19','2025-04-22 02:51:19'),(180,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:51:19','2025-04-22 02:51:19'),(181,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:51:19','2025-04-22 02:51:19'),(182,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 03:03:18','2025-04-22 03:03:18'),(183,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 03:03:18','2025-04-22 03:03:18'),(184,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 03:03:18','2025-04-22 03:03:18'),(185,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 03:03:18','2025-04-22 03:03:18'),(186,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 04:32:34','2025-04-22 04:32:34'),(187,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 04:32:34','2025-04-22 04:32:34'),(188,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 04:32:34','2025-04-22 04:32:34'),(189,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 04:32:34','2025-04-22 04:32:34'),(190,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 04:56:21','2025-04-22 04:56:21'),(191,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 04:56:21','2025-04-22 04:56:21'),(192,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 04:56:21','2025-04-22 04:56:21'),(193,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 04:56:22','2025-04-22 04:56:22'),(194,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 05:02:36','2025-04-22 05:02:36'),(195,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 05:02:37','2025-04-22 05:02:37'),(196,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 05:02:37','2025-04-22 05:02:37'),(197,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 05:02:37','2025-04-22 05:02:37'),(198,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 07:05:14','2025-04-22 07:05:14'),(199,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 07:05:14','2025-04-22 07:05:14'),(200,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 07:05:15','2025-04-22 07:05:15'),(201,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 07:05:15','2025-04-22 07:05:15'),(202,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 10:49:46','2025-04-22 10:49:46'),(203,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 11:13:07','2025-04-22 11:13:07'),(204,8,'Solicitud GET','Gestion Areas',NULL,'{\"Detalles\": \"api/gestion_areas\"}','2025-04-22 11:20:49','2025-04-22 11:20:49'),(205,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 11:42:45','2025-04-22 11:42:45'),(206,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 11:42:45','2025-04-22 11:42:45'),(207,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 11:42:45','2025-04-22 11:42:45'),(208,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 11:42:45','2025-04-22 11:42:45'),(209,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 12:00:33','2025-04-22 12:00:33'),(210,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 12:00:33','2025-04-22 12:00:33'),(211,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 12:00:33','2025-04-22 12:00:33'),(212,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 12:00:33','2025-04-22 12:00:33'),(213,8,'Solicitud GET','Gestion Areas',NULL,'{\"Detalles\": \"api/gestion_areas\"}','2025-04-22 20:26:58','2025-04-22 20:26:58'),(214,14,'Solicitud POST','Gestion Areas',NULL,'{\"Detalles\": {\"nombreArea\": \"Recepción\", \"descripcionArea\": \"Área encargada de recibir, registrar y gestionar los envíos y solicitudes entrantes dentro de la empresa.\"}}','2025-04-22 22:01:42','2025-04-22 22:01:42'),(215,14,'Solicitud PUT','Gestion Areas',1,'{\"Detalles\": {\"nombreArea\": \"Bodegas\", \"descripcionArea\": \"Área encargada de almacenar los productos.\"}}','2025-04-22 22:05:25','2025-04-22 22:05:25'),(216,14,'Solicitud DELETE','Gestion Areas',11,'{\"Detalles\": \"Eliminación del recurso con ID 11\"}','2025-04-22 22:06:42','2025-04-22 22:06:42'),(217,14,'Solicitud POST','Gestion Areas',NULL,'{\"Detalles\": {\"nombreArea\": \"Contabilidad\", \"descripcionArea\": \"Area encargada de las finanzas\"}}','2025-04-22 22:11:40','2025-04-22 22:11:40'),(218,14,'Solicitud PATCH Parcial','Gestion Areas',12,'{\"Detalles\": {\"nombreArea\": \"Contabilidad\", \"descripcionArea\": \"Área responsable de las finanzas de la empresa.\"}}','2025-04-22 22:12:18','2025-04-22 22:12:18'),(219,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:26:49','2025-04-22 22:26:49'),(220,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:42:28','2025-04-22 22:42:28'),(221,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:42:28','2025-04-22 22:42:28'),(222,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 22:42:29','2025-04-22 22:42:29'),(223,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 22:42:29','2025-04-22 22:42:29'),(224,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:50:45','2025-04-22 22:50:45'),(225,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:50:46','2025-04-22 22:50:46'),(226,14,'Solicitud GET','Gestion Ciudades',4,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/4\"}','2025-04-22 22:50:52','2025-04-22 22:50:52'),(227,14,'Solicitud GET','Gestion Ciudades',3,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/3\"}','2025-04-22 22:50:55','2025-04-22 22:50:55'),(228,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:50:58','2025-04-22 22:50:58'),(229,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:54:19','2025-04-22 22:54:19'),(230,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:54:19','2025-04-22 22:54:19'),(231,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:54:20','2025-04-22 22:54:20'),(232,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:54:21','2025-04-22 22:54:21'),(233,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:04','2025-04-22 22:55:04'),(234,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:04','2025-04-22 22:55:04'),(235,14,'Solicitud PATCH','Gestion Ciudades',1,'{\"data\": {\"nombreCiudad\": \"Bogota D.C\", \"costoPor_Ciudad\": 19000}}','2025-04-22 22:55:18','2025-04-22 22:55:18'),(236,14,'Solicitud GET','Gestion Ciudades',1,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/1\"}','2025-04-22 22:55:32','2025-04-22 22:55:32'),(237,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:39','2025-04-22 22:55:39'),(238,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:39','2025-04-22 22:55:39'),(239,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:42','2025-04-22 22:55:42'),(240,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:45','2025-04-22 22:55:45'),(241,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:45','2025-04-22 22:55:45'),(242,14,'Solicitud PATCH','Gestion Ciudades',1,'{\"data\": {\"nombreCiudad\": \"Bogota D.C\", \"costoPor_Ciudad\": 569000}}','2025-04-22 22:56:04','2025-04-22 22:56:04'),(243,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:08','2025-04-22 22:56:08'),(244,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:08','2025-04-22 22:56:08'),(245,14,'Solicitud PATCH','Gestion Ciudades',1,'{\"data\": {\"nombreCiudad\": \"Bogota D.C\", \"costoPor_Ciudad\": 30000}}','2025-04-22 22:56:24','2025-04-22 22:56:24'),(246,14,'Solicitud GET','Gestion Ciudades',1,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/1\"}','2025-04-22 22:56:26','2025-04-22 22:56:26'),(247,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:38','2025-04-22 22:56:38'),(248,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:38','2025-04-22 22:56:38'),(249,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:42','2025-04-22 22:56:42'),(250,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:42','2025-04-22 22:56:42'),(251,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:57:24','2025-04-22 22:57:24'),(252,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:57:26','2025-04-22 22:57:26'),(253,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:00:49','2025-04-22 23:00:49'),(254,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:00:49','2025-04-22 23:00:49'),(255,14,'Solicitud GET','Gestion Ciudades',11,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/11\"}','2025-04-22 23:00:59','2025-04-22 23:00:59'),(256,14,'Solicitud GET','Gestion Ciudades',10,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/10\"}','2025-04-22 23:01:01','2025-04-22 23:01:01'),(257,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:01:06','2025-04-22 23:01:06'),(258,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:01:06','2025-04-22 23:01:06'),(259,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:00','2025-04-22 23:02:00'),(260,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:00','2025-04-22 23:02:00'),(261,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:01','2025-04-22 23:02:01'),(262,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:02','2025-04-22 23:02:02'),(263,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:02','2025-04-22 23:02:02'),(264,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:02','2025-04-22 23:02:02'),(265,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:27','2025-04-22 23:03:27'),(266,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:27','2025-04-22 23:03:27'),(267,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:27','2025-04-22 23:03:27'),(268,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:28','2025-04-22 23:03:28'),(269,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:28','2025-04-22 23:03:28'),(270,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:28','2025-04-22 23:03:28'),(271,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:31','2025-04-22 23:03:31'),(272,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:31','2025-04-22 23:03:31'),(273,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:34','2025-04-22 23:03:34'),(274,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:34','2025-04-22 23:03:34'),(275,14,'Solicitud POST','Gestion Ciudades',15,'{\"data\": {\"nombreCiudad\": \"Pasto\", \"costoPor_Ciudad\": 22000}}','2025-04-22 23:03:59','2025-04-22 23:03:59'),(276,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:04:01','2025-04-22 23:04:01'),(277,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:04:02','2025-04-22 23:04:02'),(278,14,'Solicitud POST','Gestion Ciudades',16,'{\"data\": {\"nombreCiudad\": \"Nariño\", \"costoPor_Ciudad\": 12000}}','2025-04-22 23:04:38','2025-04-22 23:04:38'),(279,14,'Solicitud POST','Gestion Ciudades',17,'{\"data\": {\"nombreCiudad\": \"Bogotá\", \"costoPor_Ciudad\": 200000}}','2025-04-22 23:04:51','2025-04-22 23:04:51'),(280,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:04:57','2025-04-22 23:04:57'),(281,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:04:58','2025-04-22 23:04:58'),(282,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:10','2025-04-22 23:05:10'),(283,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:10','2025-04-22 23:05:10'),(284,14,'Solicitud GET','Gestion Ciudades',17,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/17\"}','2025-04-22 23:05:15','2025-04-22 23:05:15'),(285,14,'Solicitud DELETE','Gestion Ciudades',17,'[]','2025-04-22 23:05:18','2025-04-22 23:05:18'),(286,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:33','2025-04-22 23:05:33'),(287,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:34','2025-04-22 23:05:34'),(288,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:34','2025-04-22 23:05:34'),(289,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:35','2025-04-22 23:05:35'),(290,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:35','2025-04-22 23:05:35'),(291,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:36','2025-04-22 23:05:36'),(292,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:36','2025-04-22 23:05:36'),(293,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:37','2025-04-22 23:05:37'),(294,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:37','2025-04-22 23:05:37'),(295,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:37','2025-04-22 23:05:37'),(296,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:38','2025-04-22 23:05:38'),(297,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:38','2025-04-22 23:05:38'),(298,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:43','2025-04-22 23:05:43'),(299,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:43','2025-04-22 23:05:43'),(300,14,'Solicitud PATCH','Gestion Ciudades',1,'{\"data\": {\"nombreCiudad\": \"Bogotá\", \"costoPor_Ciudad\": 30000}}','2025-04-22 23:05:53','2025-04-22 23:05:53'),(301,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:57','2025-04-22 23:05:57'),(302,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:57','2025-04-22 23:05:57'),(303,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:23','2025-04-22 23:06:23'),(304,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:23','2025-04-22 23:06:23'),(305,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:41','2025-04-22 23:06:41'),(306,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:41','2025-04-22 23:06:41'),(307,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:46','2025-04-22 23:06:46'),(308,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:46','2025-04-22 23:06:46'),(309,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:47','2025-04-22 23:06:47'),(310,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:47','2025-04-22 23:06:47'),(311,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:49','2025-04-22 23:06:49'),(312,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:50','2025-04-22 23:06:50'),(313,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:07:38','2025-04-22 23:07:38'),(314,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:07:38','2025-04-22 23:07:38'),(315,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:14:06','2025-04-22 23:14:06'),(316,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:14:06','2025-04-22 23:14:06'),(317,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 23:14:07','2025-04-22 23:14:07'),(318,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 23:14:07','2025-04-22 23:14:07'),(319,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:14:48','2025-04-22 23:14:48'),(320,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:14:48','2025-04-22 23:14:48'),(321,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 23:14:48','2025-04-22 23:14:48'),(322,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 23:14:49','2025-04-22 23:14:49'),(323,14,'Solicitud POST','Gestion Areas',NULL,'{\"Detalles\": {\"nombreArea\": \"Ventas\", \"descripcionArea\": \"Area encargada de hacer crecer dinero a la empresa.\"}}','2025-04-22 23:40:38','2025-04-22 23:40:38'),(324,14,'Solicitud PATCH Parcial','Gestion Areas',1,'{\"Detalles\": {\"nombreArea\": \"Bodega\", \"descripcionArea\": \"Área encargada de almacenar los productos.\"}}','2025-04-22 23:40:56','2025-04-22 23:40:56'),(325,14,'Solicitud DELETE','Gestion Areas',13,'{\"Detalles\": \"Eliminación del recurso con ID 13\"}','2025-04-22 23:41:15','2025-04-22 23:41:15');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES ('laravel_cache_0EqepHZHIEf6GuvX','s:7:\"forever\";',2060581526),('laravel_cache_1aa41CW7slIpP0qA','s:7:\"forever\";',2060041203),('laravel_cache_1Q3LNdyd1vHUMR8T','s:7:\"forever\";',2060640264),('laravel_cache_45cNMXDIYzPvscFz','s:7:\"forever\";',2060592152),('laravel_cache_46jo36xzcmXVxvwf','s:7:\"forever\";',2059942075),('laravel_cache_4lL0qe0iPUXVAWuO','s:7:\"forever\";',2060041560),('laravel_cache_5ftM6ydywKfONL0T','s:7:\"forever\";',2060705633),('laravel_cache_7ym5SrpTHl7B0eCx','s:7:\"forever\";',2059960919),('laravel_cache_8p1JWVeRa0FBCTFC','s:7:\"forever\";',2060559854),('laravel_cache_9T1r7KurYlu9C8YR','s:7:\"forever\";',2060623889),('laravel_cache_aMCjgoxWvp1so4xN','s:7:\"forever\";',2060584837),('laravel_cache_AW2LM5DOHZHjgoFI','s:7:\"forever\";',2059967572),('laravel_cache_b8AGAjH8NkBxsutD','s:7:\"forever\";',2059972219),('laravel_cache_BDN9nxu69bzPvxgR','s:7:\"forever\";',2060628874),('laravel_cache_BVdLT2QVFV5voUBW','s:7:\"forever\";',2060138473),('laravel_cache_CDUyL8plYu8730h0','s:7:\"forever\";',2059942221),('laravel_cache_dXowyvPbWBOChcJ9','s:7:\"forever\";',2060109360),('laravel_cache_dyvtPjHmRAFHhkRv','s:7:\"forever\";',2059960213),('laravel_cache_dz1Je5eqQDiUVwFc','s:7:\"forever\";',2060592190),('laravel_cache_Eei1zm7XJKN03n9s','s:7:\"forever\";',2060569496),('laravel_cache_fK9Xtm6dCYBccnO3','s:7:\"forever\";',2060565736),('laravel_cache_fs5N9WNholWqG4pN','s:7:\"forever\";',2059960470),('laravel_cache_FZmueO8kfw1wV8HU','s:7:\"forever\";',2059966313),('laravel_cache_FZX30o4Tth6yYg7d','s:7:\"forever\";',2060592056),('laravel_cache_gbbBYxmuRJD4y5lY','s:7:\"forever\";',2060108645),('laravel_cache_HHjA4OHskInitQLt','s:7:\"forever\";',2059687171),('laravel_cache_HhYRt7I2eOvVxZMO','s:7:\"forever\";',2060107903),('laravel_cache_HUVZi5C1ymsGndjg','s:7:\"forever\";',2060621305),('laravel_cache_HWFOmhd06ZD1Pl4y','s:7:\"forever\";',2060621328),('laravel_cache_I5mKGmboIorV2Sho','s:7:\"forever\";',2059968855),('laravel_cache_iCKWmRc69RsyJzJS','s:7:\"forever\";',2060592035),('laravel_cache_IhQkYolUiVeHc4fS','s:7:\"forever\";',2060658820),('laravel_cache_iki2voPWIrcfkkkq','s:7:\"forever\";',2059963064),('laravel_cache_KCmVZrlue5qqLQwe','s:7:\"forever\";',2060569528),('laravel_cache_Ko5M5sP1UdZ4QGQl','s:7:\"forever\";',2060638902),('laravel_cache_LMgRGbpErjrm8bkC','s:7:\"forever\";',2060173521),('laravel_cache_M2elRXbcEUGxePFN','s:7:\"forever\";',2060640132),('laravel_cache_NigCONy2gf48bdv0','s:7:\"forever\";',2060705718),('laravel_cache_OBKEaQI3fg0Uxnh9','s:7:\"forever\";',2059689218),('laravel_cache_oEbFE4K5LWjizGA5','s:7:\"forever\";',2059968871),('laravel_cache_PkMSglD0lMtPnV8I','s:7:\"forever\";',2060402933),('laravel_cache_pZhLB6GuHbe3rad8','s:7:\"forever\";',2060621270),('laravel_cache_QBZaP92Yp3jXODz6','s:7:\"forever\";',2059967586),('laravel_cache_QHXCZ8GgXP3ZVDWq','s:7:\"forever\";',2059960647),('laravel_cache_QNVsj6txCWJSirSd','s:7:\"forever\";',2060618696),('laravel_cache_qtWhYwVGVZDsRlFH','s:7:\"forever\";',2059687296),('laravel_cache_r8hLNIzE3gzO9HxA','s:7:\"forever\";',2060582992),('laravel_cache_RrMFjwp6uzj8aXWN','a:1:{s:11:\"valid_until\";i:1744329371;}',1745538911),('laravel_cache_sY2Ozt4Q75UvDwZb','s:7:\"forever\";',2060407942),('laravel_cache_TLqHL6Rr2WvHziws','s:7:\"forever\";',2059967895),('laravel_cache_TTV2lvyJXmeJkBXW','s:7:\"forever\";',2059972195),('laravel_cache_UHJDOYBPcqdyFcR2','s:7:\"forever\";',2060173479),('laravel_cache_vCSS7mZMU99zA7jk','s:7:\"forever\";',2060565430),('laravel_cache_VFerhuMXufA0TcIR','s:7:\"forever\";',2060618717),('laravel_cache_W4BAivNybkhNG29X','s:7:\"forever\";',2059962645),('laravel_cache_WHzqMUg9PgSGNVgr','s:7:\"forever\";',2059967241),('laravel_cache_WYbjCiwTb9J3gM7c','s:7:\"forever\";',2060584822),('laravel_cache_xklUNHTXVinbuXuc','a:1:{s:11:\"valid_until\";i:1744329309;}',1745538910),('laravel_cache_Y5ekZseddQ4H87sX','s:7:\"forever\";',2059963140),('laravel_cache_ylyRB8kTn7q3MaoA','s:7:\"forever\";',2060705690),('laravel_cache_zejX4TB29qvFFKWg','s:7:\"forever\";',2060565454),('laravel_cache_ZhZbxJspH9bAZCYv','s:7:\"forever\";',2060107063),('laravel_cache_ZnRhJVP0wyloO80I','s:7:\"forever\";',2059960282),('laravel_cache_zxYpIy4wyHtoyaz8','s:7:\"forever\";',2060580987);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoriaenvios`
--

DROP TABLE IF EXISTS `categoriaenvios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoriaenvios` (
  `idCategoria` bigint NOT NULL AUTO_INCREMENT,
  `nombreCategoria` varchar(200) NOT NULL,
  `precioCategoria` decimal(20,2) NOT NULL,
  `descripcion` text NOT NULL,
  PRIMARY KEY (`idCategoria`),
  UNIQUE KEY `unique_nombreCategoria` (`nombreCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoriaenvios`
--

LOCK TABLES `categoriaenvios` WRITE;
/*!40000 ALTER TABLE `categoriaenvios` DISABLE KEYS */;
INSERT INTO `categoriaenvios` VALUES (1,'Fármacos',35000.00,'Medicamentos y farmacos generales'),(2,'Abarrotes',20000.00,'Productos de consumo diario como arroz, azúcar y granos.'),(3,'Electrodomésticos',1500000.00,'Línea blanca y pequeños electrodomésticos.'),(4,'Ferretería',50000.00,'Herramientas y materiales para construcción y reparaciones.'),(5,'Papelería',18000.00,'Útiles escolares, libros y artículos de oficina.'),(6,'Bebidas',25000.00,'Gaseosas, jugos, agua y bebidas alcohólicas.'),(7,'Frutas y Verduras',30000.00,'Productos agrícolas frescos de origen nacional.'),(8,'Hogar y Decoración',120000.00,'Muebles, decoración y artículos para el hogar.'),(10,'Ropa y Calzado',95000.00,'Vestuario y zapatos de fabricación nacional e importada.');
/*!40000 ALTER TABLE `categoriaenvios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudades`
--

DROP TABLE IF EXISTS `ciudades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudades` (
  `idCiudad` bigint NOT NULL AUTO_INCREMENT,
  `nombreCiudad` varchar(255) NOT NULL,
  `costoPor_Ciudad` decimal(20,2) NOT NULL,
  PRIMARY KEY (`idCiudad`),
  UNIQUE KEY `unique_nombreCiudad` (`nombreCiudad`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudades`
--

LOCK TABLES `ciudades` WRITE;
/*!40000 ALTER TABLE `ciudades` DISABLE KEYS */;
INSERT INTO `ciudades` VALUES (1,'Bogotá',30000.00),(2,'Bucaramanga',15000.00),(3,'Medellín',14000.00),(4,'Cali',13000.00),(5,'Barranquilla',16000.00),(6,'Cartagena',15500.00),(7,'Santa Marta',14500.00),(8,'Cúcuta',13500.00),(9,'Ibagué',12500.00),(10,'Pereira',12800.00),(11,'Manizales',12700.00),(14,'Neiva',12000.00),(15,'Pasto',22000.00),(16,'Nariño',12000.00);
/*!40000 ALTER TABLE `ciudades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dispositivosautorizados`
--

DROP TABLE IF EXISTS `dispositivosautorizados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dispositivosautorizados` (
  `idDispositivosAutorizados` bigint NOT NULL AUTO_INCREMENT,
  `fechaAutorizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `macAddress` varchar(500) NOT NULL,
  `descripcionDispositivo` text,
  PRIMARY KEY (`idDispositivosAutorizados`),
  KEY `idx_macAddress` (`macAddress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivosautorizados`
--

LOCK TABLES `dispositivosautorizados` WRITE;
/*!40000 ALTER TABLE `dispositivosautorizados` DISABLE KEYS */;
/*!40000 ALTER TABLE `dispositivosautorizados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entregas`
--

DROP TABLE IF EXISTS `entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entregas` (
  `idEntrega` bigint NOT NULL AUTO_INCREMENT,
  `fechaEntregaSeleccionada` datetime NOT NULL,
  `fechaEntregaFinal` datetime DEFAULT NULL,
  `direccionEntrega` varchar(255) NOT NULL,
  `idCiudad` bigint NOT NULL,
  PRIMARY KEY (`idEntrega`),
  KEY `fk_entregas_ciudad` (`idCiudad`),
  CONSTRAINT `fk_entregas_ciudad` FOREIGN KEY (`idCiudad`) REFERENCES `ciudades` (`idCiudad`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entregas`
--

LOCK TABLES `entregas` WRITE;
/*!40000 ALTER TABLE `entregas` DISABLE KEYS */;
INSERT INTO `entregas` VALUES (1,'2025-04-22 00:00:00','2025-04-25 00:00:00','Calle 10 #12-34, Santa Marta',7),(2,'2025-04-23 00:00:00','2025-04-26 00:00:00','Carrera 45 #56-78, Cúcuta',8),(3,'2025-04-24 00:00:00','2025-04-27 00:00:00','Av. Quinta con calle 60, Ibagué',9),(4,'2025-04-25 00:00:00','2025-04-28 00:00:00','Calle 18 #9-10, Pereira',10),(6,'2025-04-26 00:00:00','2025-04-29 00:00:00','Cra 23 #45-67',11);
/*!40000 ALTER TABLE `entregas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envios`
--

DROP TABLE IF EXISTS `envios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envios` (
  `idEnvio` bigint NOT NULL AUTO_INCREMENT,
  `nombreRemitente` varchar(255) NOT NULL,
  `num_ContactoRemitente` varchar(14) NOT NULL,
  `nombreDestinatario` varchar(255) NOT NULL,
  `num_ContactoDestinatario` varchar(14) NOT NULL,
  `metodoPago` enum('Efectivo','Tarjeta Debito','Tarjeta Credito','Plataformas Virtuales','Cupones') NOT NULL,
  `costosTotal_Envio` decimal(20,2) NOT NULL,
  `fechaEnvio` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idusuarios` bigint NOT NULL,
  `idRecogida` bigint NOT NULL,
  `idEntrega` bigint NOT NULL,
  `idCategoria` bigint NOT NULL,
  PRIMARY KEY (`idEnvio`),
  KEY `fk_envios_por_usuario` (`idusuarios`),
  KEY `fk_envios_por_recogida` (`idRecogida`),
  KEY `fk_envios_entrega` (`idEntrega`),
  KEY `fk_categoria_por_envio` (`idCategoria`),
  CONSTRAINT `fk_categoria_por_envio` FOREIGN KEY (`idCategoria`) REFERENCES `categoriaenvios` (`idCategoria`),
  CONSTRAINT `fk_envios_entrega` FOREIGN KEY (`idEntrega`) REFERENCES `entregas` (`idEntrega`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_envios_por_recogida` FOREIGN KEY (`idRecogida`) REFERENCES `recogidas` (`idRecogida`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_envios_por_usuario` FOREIGN KEY (`idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envios`
--

LOCK TABLES `envios` WRITE;
/*!40000 ALTER TABLE `envios` DISABLE KEYS */;
INSERT INTO `envios` VALUES (1,'Ana Torres','3105678910','Luis Rojas','3201234567','Efectivo',55440.00,'2025-04-21 05:09:37',8,1,1,2),(2,'Carlos Mendoza','3114567890','Andrea Páez','3012345678','Tarjeta Debito',1710016.00,'2025-04-21 05:11:01',8,2,4,3),(3,'Paola Suárez','3127894561','Julián Díaz','3009876543','Plataformas Virtuales',51520.00,'2025-04-21 05:11:14',8,6,3,5),(5,'Esteban Giraldo','3127894561','Brandon David Gonzalez','3009876543','Plataformas Virtuales',1711920.00,'2025-04-21 05:35:24',8,1,2,3),(6,'Dario Gonzalez','3127894561','Brandon David Gonzalez','3009876543','Efectivo',1710800.00,'2025-04-21 17:31:57',8,1,3,3);
/*!40000 ALTER TABLE `envios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `idestado` bigint NOT NULL AUTO_INCREMENT,
  `estado` enum('ACTIVO','INACTIVO','BLOQUEADO','SUSPENDIDO') NOT NULL,
  PRIMARY KEY (`idestado`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'ACTIVO'),(2,'INACTIVO'),(3,'BLOQUEADO'),(5,'SUSPENDIDO');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historiallogeoeventos`
--

DROP TABLE IF EXISTS `historiallogeoeventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historiallogeoeventos` (
  `idHistorialLogeoEventos` bigint NOT NULL AUTO_INCREMENT,
  `tipoEvento` enum('ACESSO','FALLIDO') NOT NULL,
  `fechaEvento` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IP` varchar(500) NOT NULL,
  `descripcionEvento` text,
  PRIMARY KEY (`idHistorialLogeoEventos`),
  KEY `idx_tipoEvento` (`tipoEvento`),
  KEY `idx_IP` (`IP`),
  KEY `idx_fechaEvento` (`fechaEvento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historiallogeoeventos`
--

LOCK TABLES `historiallogeoeventos` WRITE;
/*!40000 ALTER TABLE `historiallogeoeventos` DISABLE KEYS */;
/*!40000 ALTER TABLE `historiallogeoeventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `intentosfallidos`
--

DROP TABLE IF EXISTS `intentosfallidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `intentosfallidos` (
  `idIntentosFallidos` bigint NOT NULL AUTO_INCREMENT,
  `numeroIntentos` int NOT NULL DEFAULT (0),
  `fechaIntento` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idIntentosFallidos`),
  KEY `idx_numeroIntentos` (`numeroIntentos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `intentosfallidos`
--

LOCK TABLES `intentosfallidos` WRITE;
/*!40000 ALTER TABLE `intentosfallidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `intentosfallidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000001_create_cache_table',1),(2,'0001_01_01_000002_create_jobs_table',1),(3,'2025_04_04_202107_create_personal_access_tokens_table',1),(4,'2025_04_14_171217_create_audit_logs_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puestos`
--

DROP TABLE IF EXISTS `puestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puestos` (
  `idPuestos` bigint NOT NULL AUTO_INCREMENT,
  `nombrePuesto` varchar(100) NOT NULL,
  `fechaAsignacionPuesto` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `descripcionPuesto` text,
  `idArea` bigint NOT NULL,
  PRIMARY KEY (`idPuestos`),
  UNIQUE KEY `nombrePuesto` (`nombrePuesto`),
  KEY `idx_nombrePuesto` (`nombrePuesto`),
  KEY `fk_puestos_areas` (`idArea`),
  CONSTRAINT `fk_puestos_areas` FOREIGN KEY (`idArea`) REFERENCES `areas` (`idArea`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puestos`
--

LOCK TABLES `puestos` WRITE;
/*!40000 ALTER TABLE `puestos` DISABLE KEYS */;
INSERT INTO `puestos` VALUES (2,'Auxiliar Logístico','2025-04-09 19:17:03','Apoya en tareas operativas del área de logística.',7),(3,'Auxiliar de Bodega','2025-04-09 19:18:00','Encargado de organizar, recibir y despachar productos del almacén.',7),(4,'Supervisor de Rutas','2025-04-09 19:22:37','Supervisa la planificación y ejecución de las rutas de entrega.',7),(5,'Coordinador de Logística','2025-04-09 19:22:51','Coordina las operaciones logísticas diarias y optimiza procesos de transporte.',7),(6,'Analista de Transporte','2025-04-09 19:23:08','Analiza indicadores de desempeño y eficiencia de rutas y vehículos.',7),(7,'Planificador de Rutas','2025-04-09 19:23:22','Diseña las rutas de entrega para asegurar eficiencia y cumplimiento.',7),(8,'Conductor','2025-04-09 19:24:41','Responsable de realizar la recogida y entrega de envíos, garantizando el cumplimiento de rutas asignadas, el cuidado de la mercancía y la trazabilidad del servicio.',7),(9,'Gerente General de Sistemas','2025-04-10 15:25:02','Responsable de liderar la estrategia tecnológica de la organización, supervisar el desarrollo e implementación de sistemas informáticos, garantizar la seguridad de la información y optimizar los procesos mediante soluciones digitales innovadoras alineadas con los objetivos del negocio.',8);
/*!40000 ALTER TABLE `puestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recogidas`
--

DROP TABLE IF EXISTS `recogidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recogidas` (
  `idRecogida` bigint NOT NULL AUTO_INCREMENT,
  `fechaRecogidaSeleccionada` datetime NOT NULL,
  `fechaRecogidaFinal` datetime DEFAULT NULL,
  `direccionRecogida` varchar(255) NOT NULL,
  `idCiudad` bigint NOT NULL,
  PRIMARY KEY (`idRecogida`),
  KEY `fk_recogidas_ciudad` (`idCiudad`),
  CONSTRAINT `fk_recogidas_ciudad` FOREIGN KEY (`idCiudad`) REFERENCES `ciudades` (`idCiudad`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recogidas`
--

LOCK TABLES `recogidas` WRITE;
/*!40000 ALTER TABLE `recogidas` DISABLE KEYS */;
INSERT INTO `recogidas` VALUES (1,'2025-04-25 00:00:00','2025-04-26 00:00:00','Calle 123, Bogotá',1),(2,'2025-04-28 00:00:00','2025-04-30 00:00:00','Carrera 45, Medellín',3),(3,'2025-05-02 00:00:00','2025-05-05 00:00:00','Avenida 8, Cali',4),(4,'2025-04-30 00:00:00','2025-05-01 00:00:00','Calle 50, Bucaramanga',2),(6,'2025-02-10 00:00:00','2025-02-15 00:00:00','Calle 50B #59 - 90',6);
/*!40000 ALTER TABLE `recogidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportes`
--

DROP TABLE IF EXISTS `reportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportes` (
  `idReporte` bigint NOT NULL AUTO_INCREMENT,
  `tipoReporte` varchar(150) NOT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `fechaCreacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idusuarios` bigint NOT NULL,
  PRIMARY KEY (`idReporte`),
  KEY `fk_reportes_usuarios` (`idusuarios`),
  CONSTRAINT `fk_reportes_usuarios` FOREIGN KEY (`idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportes`
--

LOCK TABLES `reportes` WRITE;
/*!40000 ALTER TABLE `reportes` DISABLE KEYS */;
/*!40000 ALTER TABLE `reportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `idRole` bigint NOT NULL AUTO_INCREMENT,
  `nombreRole` varchar(100) NOT NULL,
  `descripcionRole` text,
  `fechaAsignacionRole` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idRole`),
  UNIQUE KEY `nombreRole` (`nombreRole`),
  KEY `idx_nombreRole` (`nombreRole`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (2,'Manager','Acceso total al sistema','2025-03-13 18:57:07'),(3,'Empleado','Tiene tareas limitadas','2025-04-08 12:00:00');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rutas`
--

DROP TABLE IF EXISTS `rutas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rutas` (
  `idRuta` bigint NOT NULL AUTO_INCREMENT,
  `nombreRuta` varchar(255) NOT NULL,
  `fechaAsignacionRuta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `horaEntrada` datetime NOT NULL,
  `horaSalida` datetime NOT NULL,
  `idCiudad` bigint NOT NULL,
  PRIMARY KEY (`idRuta`),
  KEY `fk_rutas_ciudad` (`idCiudad`),
  CONSTRAINT `fk_rutas_ciudad` FOREIGN KEY (`idCiudad`) REFERENCES `ciudades` (`idCiudad`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rutas`
--

LOCK TABLES `rutas` WRITE;
/*!40000 ALTER TABLE `rutas` DISABLE KEYS */;
/*!40000 ALTER TABLE `rutas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuariodispositivosautorizados`
--

DROP TABLE IF EXISTS `usuariodispositivosautorizados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuariodispositivosautorizados` (
  `idusuarioDispositivoAutorizados` bigint NOT NULL AUTO_INCREMENT,
  `fechaAutorizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estadoAutorizacion` enum('PENDIENTE','APROBADO','DENEGADO') NOT NULL,
  `descripcionEvento` text,
  PRIMARY KEY (`idusuarioDispositivoAutorizados`),
  KEY `idx_estadoAutorizacion` (`estadoAutorizacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuariodispositivosautorizados`
--

LOCK TABLES `usuariodispositivosautorizados` WRITE;
/*!40000 ALTER TABLE `usuariodispositivosautorizados` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuariodispositivosautorizados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idusuarios` bigint NOT NULL AUTO_INCREMENT,
  `documentoIdentidad` varchar(50) NOT NULL,
  `nombreCompleto` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `numContacto` varchar(20) DEFAULT NULL,
  `contrasena` varchar(250) NOT NULL,
  `direccionResidencia` text,
  `fechaCreacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `idRole` bigint NOT NULL,
  `idestado` bigint NOT NULL,
  `idPuestos` bigint NOT NULL,
  `idVehiculo` bigint DEFAULT NULL,
  PRIMARY KEY (`idusuarios`),
  UNIQUE KEY `documentoIdentidad` (`documentoIdentidad`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_documentoIdentidad` (`documentoIdentidad`),
  KEY `idx_email` (`email`),
  KEY `idx_contrasena` (`contrasena`),
  KEY `fk_usuarios_roles` (`idRole`),
  KEY `fk_usuarios_estado` (`idestado`),
  KEY `fk_usuarios_por_puesto` (`idPuestos`),
  KEY `fk_vehiculo_por_usuarios` (`idVehiculo`),
  CONSTRAINT `fk_usuarios_estado` FOREIGN KEY (`idestado`) REFERENCES `estado` (`idestado`) ON UPDATE CASCADE,
  CONSTRAINT `fk_usuarios_por_puesto` FOREIGN KEY (`idPuestos`) REFERENCES `puestos` (`idPuestos`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_usuarios_roles` FOREIGN KEY (`idRole`) REFERENCES `roles` (`idRole`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_vehiculo_por_usuarios` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculos` (`idVehiculo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (8,'0987654321','Sofia Vergara','sofi777@gmail.com','987654321','$2y$12$pONVvzmN5i/GF5WR/ozjbOMk4DppwqMSwCw./5WAl7Bd3fwoATGeC','Calle Falsa 123','2025-04-10 19:34:04',2,1,5,NULL),(9,'828273727722','Javier Yara','yarayara123@gmail.com','987654321','$2y$12$5muGGKLb9ldt5MMRD9khE.ABWxBV8RClZpW3/N3xyy6oG3bx6m4Dm','Calle Falsa 123','2025-04-10 19:54:30',2,1,3,NULL),(11,'1780289012','Samuel Felipe Ayala','samu289sam@gmail.com','987654321','$2y$12$rwHIdbXq1drET/gXN270Yek9YKKPpAoUYmIJzsZ3arSI2KvexaRnW','Calle Falsa 123','2025-04-13 21:43:46',3,1,5,NULL),(13,'1000898776','Sergio Barbosa Bedoya','sergiii230sdas@gmail.com','3008901190','$2y$12$A9uHO0HYJhPk.WutEiIJIOUYSyJhKv2K/4toqrwMIAXPVNWLQKl0u','Calle 12 sur #90 - 30','2025-04-14 20:45:18',3,1,5,NULL),(14,'1234999091','Brandon David Gonzalez Lopez','gonzdeiv123@gmail.com','3008901190','$2y$12$4ZtY2grv9CLuo0ozlpawduPUOQ/8ru4HAdUIF9bR8pd.66vU9wfEq','Calle 12 sur #90 - 30','2025-04-20 20:13:03',2,1,5,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculos`
--

DROP TABLE IF EXISTS `vehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehiculos` (
  `idVehiculo` bigint NOT NULL AUTO_INCREMENT,
  `marcaVehiculo` varchar(155) NOT NULL,
  `tipoVehiculo` varchar(100) NOT NULL,
  `placa` varchar(7) NOT NULL,
  PRIMARY KEY (`idVehiculo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculos`
--

LOCK TABLES `vehiculos` WRITE;
/*!40000 ALTER TABLE `vehiculos` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehiculos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-22 13:46:19
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: logigov2
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas` (
  `idArea` bigint NOT NULL AUTO_INCREMENT,
  `nombreArea` varchar(150) NOT NULL,
  `descripcionArea` text,
  PRIMARY KEY (`idArea`),
  UNIQUE KEY `nombreArea` (`nombreArea`),
  KEY `idx_nombreArea` (`nombreArea`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` VALUES (1,'Bodega','Área encargada de almacenar los productos.'),(2,'Devoluciones','Área encargada del proceso de devoluciones de productos.'),(6,'Calidad','Área encargada de velar que los productos esten en perfecto estado para los envios.'),(7,'Logistica y Transporte','Área encargada de la gestion de rutas.'),(8,'Administración','Área acargo de todas las areas y departamentos'),(10,'Cuartos Fríos','Área responsable del almacenamiento, control, distribución y asignación de productos que requieren refrigeración.'),(12,'Contabilidad','Área responsable de las finanzas de la empresa.');
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignacionrutas`
--

DROP TABLE IF EXISTS `asignacionrutas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignacionrutas` (
  `idAsignacionRuta` bigint NOT NULL AUTO_INCREMENT,
  `idVehiculo` bigint NOT NULL,
  `idRuta` bigint NOT NULL,
  PRIMARY KEY (`idAsignacionRuta`),
  KEY `fk_asignacion_vehiculo` (`idVehiculo`),
  KEY `fk_asignacion_ruta` (`idRuta`),
  CONSTRAINT `fk_asignacion_ruta` FOREIGN KEY (`idRuta`) REFERENCES `rutas` (`idRuta`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_asignacion_vehiculo` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculos` (`idVehiculo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignacionrutas`
--

LOCK TABLES `asignacionrutas` WRITE;
/*!40000 ALTER TABLE `asignacionrutas` DISABLE KEYS */;
/*!40000 ALTER TABLE `asignacionrutas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `action` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `resource_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `resource_id` bigint unsigned DEFAULT NULL,
  `details` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=326 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES (1,13,'Solicitud GET','Gestion Areas',NULL,'{\"Detalles\": \"api/gestion_areas\"}','2025-04-15 23:24:43','2025-04-15 23:24:43'),(2,13,'Solicitud GET','Gestion Areas',NULL,'{\"Detalles\": \"api/gestion_areas\"}','2025-04-15 23:27:41','2025-04-15 23:27:41'),(3,13,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-15 23:28:20','2025-04-15 23:28:20'),(4,13,'Solicitud GET','Gestion Areas',NULL,'{\"Detalles\": \"api/gestion_areas\"}','2025-04-16 00:29:55','2025-04-16 00:29:55'),(5,13,'Solicitud POST','Gestion Areas',NULL,'{\"Detalles\": {\"nombreArea\": \"Cuartos Fríos\", \"descripcionArea\": \"Área responsable del almacenamiento, control y distribución de productos que requieren refrigeración.\"}}','2025-04-16 00:32:21','2025-04-16 00:32:21'),(6,13,'Solicitud PATCH Parcial','Gestion Areas',9,'{\"Detalles\": {\"nombreArea\": \"Cuartos cuatos\"}}','2025-04-16 00:33:51','2025-04-16 00:33:51'),(7,13,'Solicitud PUT','Gestion Areas',9,'{\"Detalles\": {\"nombreArea\": \"Cuartos Fríos\", \"descripcionArea\": \"Área responsable del almacenamiento, control, distribución y asignación de productos que requieren refrigeración.\"}}','2025-04-16 00:34:45','2025-04-16 00:34:45'),(8,13,'Solicitud DELETE','Gestion Areas',9,'{\"Detalles\": \"Eliminación del recurso con ID 9\"}','2025-04-16 00:34:58','2025-04-16 00:34:58'),(9,13,'Solicitud POST','Gestion Areas',NULL,'{\"Detalles\": {\"nombreArea\": \"Cuartos Fríos\", \"descripcionArea\": \"Área responsable del almacenamiento, control, distribución y asignación de productos que requieren refrigeración.\"}}','2025-04-16 00:35:08','2025-04-16 00:35:08'),(10,13,'Solicitud GET_by_id','Gestion Areas',10,'{\"Detalles\": \"api/gestion_areas/10\"}','2025-04-16 00:35:20','2025-04-16 00:35:20'),(11,13,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-16 00:56:43','2025-04-16 00:56:43'),(12,11,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-16 00:58:36','2025-04-16 00:58:36'),(13,13,'Solicitud POST','Gestion Categoria de Envios',1,'{\"data\": {\"descripcion\": \"Medicamentos y farmacos generales\", \"nombreCategoria\": \"Fármacos\", \"precioCategoria\": 35}}','2025-04-19 10:26:44','2025-04-19 10:26:44'),(14,13,'Solicitud PATCH','Gestion Categoria de Envios',1,'{\"data\": {\"precioCategoria\": 35000}}','2025-04-19 10:28:22','2025-04-19 10:28:22'),(15,13,'Solicitud POST','Gestion Categoria de Envios',2,'{\"data\": {\"descripcion\": \"Productos de consumo diario como arroz, azúcar y granos.\", \"nombreCategoria\": \"Abarrotes\", \"precioCategoria\": 20000}}','2025-04-19 10:32:56','2025-04-19 10:32:56'),(16,13,'Solicitud POST','Gestion Categoria de Envios',3,'{\"data\": {\"descripcion\": \"Línea blanca y pequeños electrodomésticos.\", \"nombreCategoria\": \"Electrodomésticos\", \"precioCategoria\": 1500000}}','2025-04-19 10:33:18','2025-04-19 10:33:18'),(17,13,'Solicitud POST','Gestion Categoria de Envios',4,'{\"data\": {\"descripcion\": \"Herramientas y materiales para construcción y reparaciones.\", \"nombreCategoria\": \"Ferretería\", \"precioCategoria\": 50000}}','2025-04-19 10:36:37','2025-04-19 10:36:37'),(18,13,'Solicitud POST','Gestion Categoria de Envios',5,'{\"data\": {\"descripcion\": \"Útiles escolares, libros y artículos de oficina.\", \"nombreCategoria\": \"Papelería\", \"precioCategoria\": 18000}}','2025-04-19 10:36:44','2025-04-19 10:36:44'),(19,13,'Solicitud POST','Gestion Categoria de Envios',6,'{\"data\": {\"descripcion\": \"Gaseosas, jugos, agua y bebidas alcohólicas.\", \"nombreCategoria\": \"Bebidas\", \"precioCategoria\": 25000}}','2025-04-19 10:36:51','2025-04-19 10:36:51'),(20,13,'Solicitud POST','Gestion Categoria de Envios',7,'{\"data\": {\"descripcion\": \"Productos agrícolas frescos de origen nacional.\", \"nombreCategoria\": \"Frutas y Verduras\", \"precioCategoria\": 30000}}','2025-04-19 10:36:57','2025-04-19 10:36:57'),(21,13,'Solicitud POST','Gestion Categoria de Envios',8,'{\"data\": {\"descripcion\": \"Muebles, decoración y artículos para el hogar.\", \"nombreCategoria\": \"Hogar y Decoración\", \"precioCategoria\": 120000}}','2025-04-19 10:37:04','2025-04-19 10:37:04'),(22,13,'Solicitud POST','Gestion Categoria de Envios',9,'{\"data\": {\"descripcion\": \"Vestuario y zapatos de fabricación nacional e importada.\", \"nombreCategoria\": \"Ropa y Calzado\", \"precioCategoria\": 95000}}','2025-04-19 10:37:18','2025-04-19 10:37:18'),(23,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:39:46','2025-04-19 10:39:46'),(24,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:40:47','2025-04-19 10:40:47'),(25,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:43:27','2025-04-19 10:43:27'),(26,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:43:30','2025-04-19 10:43:30'),(27,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:44:40','2025-04-19 10:44:40'),(28,13,'Solicitud GET','Gestion Categoria de Envios',2,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/2\"}','2025-04-19 10:45:13','2025-04-19 10:45:13'),(29,13,'Solicitud GET','Gestion Categoria de Envios',3,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/3\"}','2025-04-19 10:45:19','2025-04-19 10:45:19'),(30,13,'Solicitud GET','Gestion Categoria de Envios',4,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/4\"}','2025-04-19 10:45:22','2025-04-19 10:45:22'),(31,13,'Solicitud GET','Gestion Categoria de Envios',1,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/1\"}','2025-04-19 10:45:25','2025-04-19 10:45:25'),(32,13,'Solicitud GET','Gestion Categoria de Envios',5,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/5\"}','2025-04-19 10:45:27','2025-04-19 10:45:27'),(33,13,'Solicitud GET','Gestion Categoria de Envios',6,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/6\"}','2025-04-19 10:45:29','2025-04-19 10:45:29'),(34,13,'Solicitud GET','Gestion Categoria de Envios',7,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/7\"}','2025-04-19 10:45:33','2025-04-19 10:45:33'),(35,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:45:39','2025-04-19 10:45:39'),(36,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:48:45','2025-04-19 10:48:45'),(37,13,'Solicitud DELETE','Gestion Categorias de Envios',9,'[]','2025-04-19 10:49:31','2025-04-19 10:49:31'),(38,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:50:20','2025-04-19 10:50:20'),(39,13,'Solicitud DELETE','Gestion Categorias de Envios',9,'[]','2025-04-19 10:51:29','2025-04-19 10:51:29'),(40,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:52:02','2025-04-19 10:52:02'),(41,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:52:08','2025-04-19 10:52:08'),(42,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:52:10','2025-04-19 10:52:10'),(43,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:52:11','2025-04-19 10:52:11'),(44,13,'Solicitud DELETE','Gestion Categorias de Envios',9,'[]','2025-04-19 10:53:53','2025-04-19 10:53:53'),(45,13,'Solicitud POST','Gestion Categoria de Envios',10,'{\"data\": {\"descripcion\": \"Vestuario y zapatos de fabricación nacional e importada.\", \"nombreCategoria\": \"Ropa y Calzado\", \"precioCategoria\": 95000}}','2025-04-19 10:54:04','2025-04-19 10:54:04'),(46,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:55:10','2025-04-19 10:55:10'),(47,13,'Solicitud POST','Gestion Ciudades',1,'{\"data\": {\"nombreCiudad\": \"Bogota D.C\", \"costoPor_Ciudad\": 15000}}','2025-04-19 12:31:12','2025-04-19 12:31:12'),(48,13,'Solicitud POST','Gestion Ciudades',2,'{\"data\": {\"nombreCiudad\": \"Bucaramanga\", \"costoPor_Ciudad\": 15000}}','2025-04-19 12:31:32','2025-04-19 12:31:32'),(49,13,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-19 12:31:43','2025-04-19 12:31:43'),(50,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-19 12:33:00','2025-04-19 12:33:00'),(51,8,'Solicitud POST','Gestion Ciudades',3,'{\"data\": {\"nombreCiudad\": \"Medellín\", \"costoPor_Ciudad\": \"14000.00\"}}','2025-04-19 12:34:17','2025-04-19 12:34:17'),(52,8,'Solicitud POST','Gestion Ciudades',4,'{\"data\": {\"nombreCiudad\": \"Cali\", \"costoPor_Ciudad\": \"13000.00\"}}','2025-04-19 12:34:28','2025-04-19 12:34:28'),(53,8,'Solicitud POST','Gestion Ciudades',5,'{\"data\": {\"nombreCiudad\": \"Barranquilla\", \"costoPor_Ciudad\": \"16000.00\"}}','2025-04-19 12:34:36','2025-04-19 12:34:36'),(54,8,'Solicitud POST','Gestion Ciudades',6,'{\"data\": {\"nombreCiudad\": \"Cartagena\", \"costoPor_Ciudad\": \"15500.00\"}}','2025-04-19 12:34:47','2025-04-19 12:34:47'),(55,8,'Solicitud POST','Gestion Ciudades',7,'{\"data\": {\"nombreCiudad\": \"Santa Marta\", \"costoPor_Ciudad\": \"14500.00\"}}','2025-04-19 12:34:56','2025-04-19 12:34:56'),(56,8,'Solicitud POST','Gestion Ciudades',8,'{\"data\": {\"nombreCiudad\": \"Cúcuta\", \"costoPor_Ciudad\": \"13500.00\"}}','2025-04-19 12:35:02','2025-04-19 12:35:02'),(57,8,'Solicitud POST','Gestion Ciudades',9,'{\"data\": {\"nombreCiudad\": \"Ibagué\", \"costoPor_Ciudad\": \"12500.00\"}}','2025-04-19 12:35:06','2025-04-19 12:35:06'),(58,8,'Solicitud POST','Gestion Ciudades',10,'{\"data\": {\"nombreCiudad\": \"Pereira\", \"costoPor_Ciudad\": \"12800.00\"}}','2025-04-19 12:35:11','2025-04-19 12:35:11'),(59,8,'Solicitud POST','Gestion Ciudades',11,'{\"data\": {\"nombreCiudad\": \"Manizales\", \"costoPor_Ciudad\": \"12700.00\"}}','2025-04-19 12:35:19','2025-04-19 12:35:19'),(60,8,'Solicitud POST','Gestion Ciudades',12,'{\"data\": {\"nombreCiudad\": \"Neiva\", \"costoPor_Ciudad\": \"12000.00\"}}','2025-04-19 12:35:29','2025-04-19 12:35:29'),(61,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-19 12:35:38','2025-04-19 12:35:38'),(62,8,'Solicitud GET','Gestion Ciudades',2,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/2\"}','2025-04-19 12:36:13','2025-04-19 12:36:13'),(63,8,'Solicitud GET','Gestion Ciudades',1,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/1\"}','2025-04-19 12:36:15','2025-04-19 12:36:15'),(64,8,'Solicitud GET','Gestion Ciudades',4,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/4\"}','2025-04-19 12:36:17','2025-04-19 12:36:17'),(65,8,'Solicitud GET','Gestion Ciudades',5,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/5\"}','2025-04-19 12:36:18','2025-04-19 12:36:18'),(66,8,'Solicitud GET','Gestion Ciudades',6,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/6\"}','2025-04-19 12:36:20','2025-04-19 12:36:20'),(67,8,'Solicitud GET','Gestion Ciudades',7,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/7\"}','2025-04-19 12:36:22','2025-04-19 12:36:22'),(68,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-19 12:36:25','2025-04-19 12:36:25'),(69,8,'Solicitud DELETE','Gestion Ciudades',12,'[]','2025-04-19 12:36:42','2025-04-19 12:36:42'),(70,8,'Solicitud POST','Gestion Ciudades',13,'{\"data\": {\"nombreCiudad\": \"Neiva\", \"costoPor_Ciudad\": \"12000.00\"}}','2025-04-19 12:37:10','2025-04-19 12:37:10'),(71,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-19 12:38:06','2025-04-19 12:38:06'),(72,8,'Solicitud PATCH','Gestion Ciudades',13,'{\"data\": {\"nombreCiudad\": \"Neiva\", \"costoPor_Ciudad\": \"12000\"}}','2025-04-19 12:41:02','2025-04-19 12:41:02'),(73,8,'Solicitud DELETE','Gestion Ciudades',13,'[]','2025-04-19 12:41:46','2025-04-19 12:41:46'),(74,8,'Solicitud POST','Gestion Ciudades',14,'{\"data\": {\"nombreCiudad\": \"Neiva\", \"costoPor_Ciudad\": \"12000\"}}','2025-04-19 12:42:12','2025-04-19 12:42:12'),(75,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-20 04:34:40','2025-04-20 04:34:40'),(76,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-20 04:34:51','2025-04-20 04:34:51'),(77,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-20 11:35:17','2025-04-20 11:35:17'),(78,8,'Solicitud POST','Gestion Recogidas',1,'{\"data\": {\"idCiudad\": 1, \"direccionRecogida\": \"Calle 123, Bogotá\", \"fechaRecogidaFinal\": \"2025-04-26\", \"fechaRecogidaSeleccionada\": \"2025-04-25\"}}','2025-04-20 11:40:41','2025-04-20 11:40:41'),(79,8,'Solicitud POST','Gestion Recogidas',3,'{\"data\": {\"idCiudad\": 3, \"direccionRecogida\": \"Carrera 45, Medellín\", \"fechaRecogidaFinal\": \"2025-04-30\", \"fechaRecogidaSeleccionada\": \"2025-04-28\"}}','2025-04-20 11:41:53','2025-04-20 11:41:53'),(80,8,'Solicitud POST','Gestion Recogidas',4,'{\"data\": {\"idCiudad\": 4, \"direccionRecogida\": \"Avenida 8, Cali\", \"fechaRecogidaFinal\": \"2025-05-05\", \"fechaRecogidaSeleccionada\": \"2025-05-02\"}}','2025-04-20 11:42:00','2025-04-20 11:42:00'),(81,8,'Solicitud POST','Gestion Recogidas',2,'{\"data\": {\"idCiudad\": 2, \"direccionRecogida\": \"Calle 50, Bucaramanga\", \"fechaRecogidaFinal\": \"2025-05-01\", \"fechaRecogidaSeleccionada\": \"2025-04-30\"}}','2025-04-20 11:42:06','2025-04-20 11:42:06'),(82,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-20 11:45:00','2025-04-20 11:45:00'),(83,8,'Solicitud POST','Gestion Recogidas',6,'{\"data\": {\"idCiudad\": 6, \"direccionRecogida\": \"Calle 50B #59 - 90\", \"fechaRecogidaFinal\": \"2025-02-15\", \"fechaRecogidaSeleccionada\": \"2025-02-10\"}}','2025-04-20 11:50:40','2025-04-20 11:50:40'),(84,8,'Solicitud DELETE','Gestion Recogidas',5,'[]','2025-04-20 11:52:07','2025-04-20 11:52:07'),(85,8,'Solicitud POST','Gestion Recogidas',6,'{\"data\": {\"idCiudad\": 6, \"direccionRecogida\": \"Calle 50B #59 - 90\", \"fechaRecogidaFinal\": \"2025-02-15\", \"fechaRecogidaSeleccionada\": \"2025-02-10\"}}','2025-04-20 11:52:20','2025-04-20 11:52:20'),(86,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-21 05:24:12','2025-04-21 05:24:12'),(87,8,'Solicitud POST','Gestion Entregas',7,'{\"data\": {\"idCiudad\": 7, \"direccionEntrega\": \"Calle 10 #12-34, Santa Marta\", \"fechaEntregaFinal\": \"2025-04-25\", \"fechaEntregaSeleccionada\": \"2025-04-22\"}}','2025-04-21 05:25:36','2025-04-21 05:25:36'),(88,8,'Solicitud POST','Gestion Entregas',8,'{\"data\": {\"idCiudad\": 8, \"direccionEntrega\": \"Carrera 45 #56-78, Cúcuta\", \"fechaEntregaFinal\": \"2025-04-26\", \"fechaEntregaSeleccionada\": \"2025-04-23\"}}','2025-04-21 05:28:25','2025-04-21 05:28:25'),(89,8,'Solicitud POST','Gestion Entregas',9,'{\"data\": {\"idCiudad\": 9, \"direccionEntrega\": \"Av. Quinta con calle 60, Ibagué\", \"fechaEntregaFinal\": \"2025-04-27\", \"fechaEntregaSeleccionada\": \"2025-04-24\"}}','2025-04-21 05:28:32','2025-04-21 05:28:32'),(90,8,'Solicitud POST','Gestion Entregas',10,'{\"data\": {\"idCiudad\": 10, \"direccionEntrega\": \"Calle 18 #9-10, Pereira\", \"fechaEntregaFinal\": \"2025-04-28\", \"fechaEntregaSeleccionada\": \"2025-04-25\"}}','2025-04-21 05:28:39','2025-04-21 05:28:39'),(91,8,'Solicitud POST','Gestion Entregas',11,'{\"data\": {\"idCiudad\": 11, \"direccionEntrega\": \"Cra 23 #45-67, Manizales\", \"fechaEntregaFinal\": \"2025-04-29\", \"fechaEntregaSeleccionada\": \"2025-04-26\"}}','2025-04-21 05:28:46','2025-04-21 05:28:46'),(92,8,'Solicitud PATCH','Gestion Entregas',5,'{\"data\": {\"idCiudad\": 11, \"direccionEntrega\": \"Cra 23 #45-67\", \"fechaEntregaFinal\": \"2025-04-29\", \"fechaEntregaSeleccionada\": \"2025-04-26\"}}','2025-04-21 05:32:32','2025-04-21 05:32:32'),(93,8,'Solicitud PATCH','Gestion Entregas',5,'{\"data\": {\"idCiudad\": 10, \"direccionEntrega\": \"Cra 23 #45-67\", \"fechaEntregaFinal\": \"2025-04-29\", \"fechaEntregaSeleccionada\": \"2025-04-26\"}}','2025-04-21 05:32:46','2025-04-21 05:32:46'),(94,8,'Solicitud PATCH','Gestion Entregas',5,'{\"data\": {\"idCiudad\": 11, \"direccionEntrega\": \"Cra 23 #45-67\", \"fechaEntregaFinal\": \"2025-04-29\", \"fechaEntregaSeleccionada\": \"2025-04-26\"}}','2025-04-21 05:32:52','2025-04-21 05:32:52'),(95,8,'Solicitud DELETE','Gestion Entregas',5,'[]','2025-04-21 05:33:13','2025-04-21 05:33:13'),(96,8,'Solicitud POST','Gestion Entregas',11,'{\"data\": {\"idCiudad\": 11, \"direccionEntrega\": \"Cra 23 #45-67\", \"fechaEntregaFinal\": \"2025-04-29\", \"fechaEntregaSeleccionada\": \"2025-04-26\"}}','2025-04-21 05:33:39','2025-04-21 05:33:39'),(97,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 05:46:53','2025-04-21 05:46:53'),(98,8,'Solicitud DELETE','Gestion Usuarios',10,'{\"Detalles\": \"Eliminación del recurso con ID 10\"}','2025-04-21 05:47:21','2025-04-21 05:47:21'),(99,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 05:53:57','2025-04-21 05:53:57'),(100,8,'Solicitud DELETE','Gestion Usuarios',5,'{\"Detalles\": \"Eliminación del recurso con ID 5\"}','2025-04-21 05:54:55','2025-04-21 05:54:55'),(101,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 05:55:02','2025-04-21 05:55:02'),(102,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 05:56:10','2025-04-21 05:56:10'),(103,8,'Solicitud DELETE','Gestion Usuarios',6,'{\"Detalles\": \"Eliminación del recurso con ID 6\"}','2025-04-21 05:56:42','2025-04-21 05:56:42'),(104,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 05:56:46','2025-04-21 05:56:46'),(105,8,'Solicitud PATCH Parcial','Gestion Usuarios',13,'{\"Detalles\": {\"idRole\": 3}}','2025-04-21 06:00:29','2025-04-21 06:00:29'),(106,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:00:45','2025-04-21 06:00:45'),(107,8,'Solicitud POST','Gestion Usuarios',14,'{\"Detalles\": {\"email\": \"gonzdeiv123@gmail.com\", \"idRole\": 3, \"idestado\": 1, \"idPuestos\": 5, \"contrasena\": \"Tigre77777\", \"idVehiculo\": null, \"numContacto\": \"3008901190\", \"nombreCompleto\": \"Sergio Barbosa Bedoya\", \"documentoIdentidad\": \"1234999091\", \"direccionResidencia\": \"Calle 12 sur #90 - 30\"}}','2025-04-21 06:13:03','2025-04-21 06:13:03'),(108,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:28:37','2025-04-21 06:28:37'),(109,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:34:27','2025-04-21 06:34:27'),(110,8,'Solicitud GET por ID','Gestion Usuarios',8,'{\"Detalles\": \"api/gestion_usuarios/buscar_usuario/8\"}','2025-04-21 06:34:37','2025-04-21 06:34:37'),(111,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:36:05','2025-04-21 06:36:05'),(112,8,'Solicitud GET por ID','Gestion Usuarios',8,'{\"Detalles\": \"api/gestion_usuarios/buscar_usuario/8\"}','2025-04-21 06:36:23','2025-04-21 06:36:23'),(113,8,'Solicitud PATCH Parcial','Gestion Usuarios',8,'{\"Detalles\": {\"idPuestos\": 5}}','2025-04-21 06:38:13','2025-04-21 06:38:13'),(114,8,'Solicitud GET por ID','Gestion Usuarios',8,'{\"Detalles\": \"api/gestion_usuarios/buscar_usuario/8\"}','2025-04-21 06:38:28','2025-04-21 06:38:28'),(115,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:38:44','2025-04-21 06:38:44'),(116,14,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:44:52','2025-04-21 06:44:52'),(117,14,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 08:20:36','2025-04-21 08:20:36'),(118,8,'Solicitud GET por ID','Gestion Usuarios',14,'{\"Detalles\": \"api/gestion_usuarios/buscar_usuario/14\"}','2025-04-21 08:24:06','2025-04-21 08:24:06'),(119,8,'Solicitud PATCH Parcial','Gestion Usuarios',14,'{\"Detalles\": {\"email\": \"gonzdeiv123@gmail.com\", \"idRole\": 2, \"idestado\": 1, \"idPuestos\": 5, \"nombreCompleto\": \"Brandon David Gonzalez Lopez\", \"documentoIdentidad\": \"1234999091\"}}','2025-04-21 08:25:11','2025-04-21 08:25:11'),(120,8,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-21 09:59:56','2025-04-21 09:59:56'),(121,8,'Solicitud POST','Gestion Envios',1,'{\"data\": {\"idEntrega\": 1, \"idRecogida\": 1, \"metodoPago\": \"Efectivo\", \"idCategoria\": 2, \"nombreRemitente\": \"Ana Torres\", \"nombreDestinatario\": \"Luis Rojas\", \"num_ContactoRemitente\": \"3105678910\", \"num_ContactoDestinatario\": \"3201234567\"}}','2025-04-21 10:09:37','2025-04-21 10:09:37'),(122,8,'Solicitud POST','Gestion Envios',2,'{\"data\": {\"idEntrega\": 4, \"idRecogida\": 2, \"metodoPago\": \"Tarjeta Debito\", \"idCategoria\": 3, \"nombreRemitente\": \"Carlos Mendoza\", \"nombreDestinatario\": \"Andrea Páez\", \"num_ContactoRemitente\": \"3114567890\", \"num_ContactoDestinatario\": \"3012345678\"}}','2025-04-21 10:11:01','2025-04-21 10:11:01'),(123,8,'Solicitud POST','Gestion Envios',3,'{\"data\": {\"idEntrega\": 3, \"idRecogida\": 6, \"metodoPago\": \"Plataformas Virtuales\", \"idCategoria\": 5, \"nombreRemitente\": \"Paola Suárez\", \"nombreDestinatario\": \"Julián Díaz\", \"num_ContactoRemitente\": \"3127894561\", \"num_ContactoDestinatario\": \"3009876543\"}}','2025-04-21 10:11:15','2025-04-21 10:11:15'),(124,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-21 10:20:17','2025-04-21 10:20:17'),(125,8,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-21 10:22:14','2025-04-21 10:22:14'),(126,8,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-21 10:22:57','2025-04-21 10:22:57'),(127,8,'Solicitud POST','Gestion Envios',4,'{\"data\": {\"idEntrega\": 1, \"idRecogida\": 1, \"metodoPago\": \"Plataformas Virtuales\", \"idCategoria\": 3, \"nombreRemitente\": \"Esteban Giraldo\", \"nombreDestinatario\": \"Brandon David Gonzalez\", \"num_ContactoRemitente\": \"3127894561\", \"num_ContactoDestinatario\": \"3009876543\"}}','2025-04-21 10:27:50','2025-04-21 10:27:50'),(128,8,'Solicitud PATCH','Gestion Envios',4,'{\"data\": {\"idEntrega\": 2, \"idRecogida\": 1, \"metodoPago\": \"Plataformas Virtuales\", \"idCategoria\": 3, \"nombreRemitente\": \"Estebitan XD Giraldo\", \"nombreDestinatario\": \"Brandon David Gonzalez\", \"num_ContactoRemitente\": \"3127894561\", \"num_ContactoDestinatario\": \"3009876543\"}}','2025-04-21 10:31:58','2025-04-21 10:31:58'),(129,8,'Solicitud DELETE','Gestion Envios',4,'[]','2025-04-21 10:35:12','2025-04-21 10:35:12'),(130,8,'Solicitud POST','Gestion Envios',5,'{\"data\": {\"idEntrega\": 2, \"idRecogida\": 1, \"metodoPago\": \"Plataformas Virtuales\", \"idCategoria\": 3, \"nombreRemitente\": \"Esteban Giraldo\", \"nombreDestinatario\": \"Brandon David Gonzalez\", \"num_ContactoRemitente\": \"3127894561\", \"num_ContactoDestinatario\": \"3009876543\"}}','2025-04-21 10:35:24','2025-04-21 10:35:24'),(131,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 10:39:03','2025-04-21 10:39:03'),(132,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 10:44:05','2025-04-21 10:44:05'),(133,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-21 15:49:04','2025-04-21 15:49:04'),(134,8,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-21 15:51:52','2025-04-21 15:51:52'),(135,8,'Solicitud DELETE','Gestion Envios',4,'[]','2025-04-21 22:25:52','2025-04-21 22:25:52'),(136,8,'Solicitud DELETE','Gestion Envios',4,'[]','2025-04-21 22:26:47','2025-04-21 22:26:47'),(137,8,'Solicitud POST','Gestion Envios',6,'{\"data\": {\"idEntrega\": 3, \"idRecogida\": 1, \"metodoPago\": \"Efectivo\", \"idCategoria\": 3, \"nombreRemitente\": \"Dario Gonzalez\", \"nombreDestinatario\": \"Brandon David Gonzalez\", \"num_ContactoRemitente\": \"3127894561\", \"num_ContactoDestinatario\": \"3009876543\"}}','2025-04-21 22:31:57','2025-04-21 22:31:57'),(138,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:26:02','2025-04-22 02:26:02'),(139,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:26:03','2025-04-22 02:26:03'),(140,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:26:03','2025-04-22 02:26:03'),(141,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:26:04','2025-04-22 02:26:04'),(142,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:31:01','2025-04-22 02:31:01'),(143,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:31:01','2025-04-22 02:31:01'),(144,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:31:01','2025-04-22 02:31:01'),(145,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:31:01','2025-04-22 02:31:01'),(146,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:36:10','2025-04-22 02:36:10'),(147,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:36:10','2025-04-22 02:36:10'),(148,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:36:10','2025-04-22 02:36:10'),(149,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:36:11','2025-04-22 02:36:11'),(150,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:23','2025-04-22 02:41:23'),(151,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:23','2025-04-22 02:41:23'),(152,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:23','2025-04-22 02:41:23'),(153,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:23','2025-04-22 02:41:23'),(154,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:26','2025-04-22 02:41:26'),(155,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:26','2025-04-22 02:41:26'),(156,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:26','2025-04-22 02:41:26'),(157,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:27','2025-04-22 02:41:27'),(158,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:29','2025-04-22 02:41:29'),(159,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:30','2025-04-22 02:41:30'),(160,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:30','2025-04-22 02:41:30'),(161,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:30','2025-04-22 02:41:30'),(162,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:38','2025-04-22 02:41:38'),(163,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:38','2025-04-22 02:41:38'),(164,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:38','2025-04-22 02:41:38'),(165,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:39','2025-04-22 02:41:39'),(166,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:45:16','2025-04-22 02:45:16'),(167,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:45:16','2025-04-22 02:45:16'),(168,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:45:16','2025-04-22 02:45:16'),(169,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:45:16','2025-04-22 02:45:16'),(170,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:49:07','2025-04-22 02:49:07'),(171,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:49:07','2025-04-22 02:49:07'),(172,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:49:07','2025-04-22 02:49:07'),(173,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:49:07','2025-04-22 02:49:07'),(174,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:51:15','2025-04-22 02:51:15'),(175,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:51:16','2025-04-22 02:51:16'),(176,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:51:16','2025-04-22 02:51:16'),(177,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:51:16','2025-04-22 02:51:16'),(178,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:51:18','2025-04-22 02:51:18'),(179,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:51:19','2025-04-22 02:51:19'),(180,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:51:19','2025-04-22 02:51:19'),(181,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:51:19','2025-04-22 02:51:19'),(182,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 03:03:18','2025-04-22 03:03:18'),(183,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 03:03:18','2025-04-22 03:03:18'),(184,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 03:03:18','2025-04-22 03:03:18'),(185,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 03:03:18','2025-04-22 03:03:18'),(186,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 04:32:34','2025-04-22 04:32:34'),(187,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 04:32:34','2025-04-22 04:32:34'),(188,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 04:32:34','2025-04-22 04:32:34'),(189,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 04:32:34','2025-04-22 04:32:34'),(190,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 04:56:21','2025-04-22 04:56:21'),(191,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 04:56:21','2025-04-22 04:56:21'),(192,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 04:56:21','2025-04-22 04:56:21'),(193,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 04:56:22','2025-04-22 04:56:22'),(194,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 05:02:36','2025-04-22 05:02:36'),(195,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 05:02:37','2025-04-22 05:02:37'),(196,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 05:02:37','2025-04-22 05:02:37'),(197,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 05:02:37','2025-04-22 05:02:37'),(198,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 07:05:14','2025-04-22 07:05:14'),(199,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 07:05:14','2025-04-22 07:05:14'),(200,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 07:05:15','2025-04-22 07:05:15'),(201,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 07:05:15','2025-04-22 07:05:15'),(202,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 10:49:46','2025-04-22 10:49:46'),(203,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 11:13:07','2025-04-22 11:13:07'),(204,8,'Solicitud GET','Gestion Areas',NULL,'{\"Detalles\": \"api/gestion_areas\"}','2025-04-22 11:20:49','2025-04-22 11:20:49'),(205,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 11:42:45','2025-04-22 11:42:45'),(206,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 11:42:45','2025-04-22 11:42:45'),(207,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 11:42:45','2025-04-22 11:42:45'),(208,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 11:42:45','2025-04-22 11:42:45'),(209,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 12:00:33','2025-04-22 12:00:33'),(210,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 12:00:33','2025-04-22 12:00:33'),(211,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 12:00:33','2025-04-22 12:00:33'),(212,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 12:00:33','2025-04-22 12:00:33'),(213,8,'Solicitud GET','Gestion Areas',NULL,'{\"Detalles\": \"api/gestion_areas\"}','2025-04-22 20:26:58','2025-04-22 20:26:58'),(214,14,'Solicitud POST','Gestion Areas',NULL,'{\"Detalles\": {\"nombreArea\": \"Recepción\", \"descripcionArea\": \"Área encargada de recibir, registrar y gestionar los envíos y solicitudes entrantes dentro de la empresa.\"}}','2025-04-22 22:01:42','2025-04-22 22:01:42'),(215,14,'Solicitud PUT','Gestion Areas',1,'{\"Detalles\": {\"nombreArea\": \"Bodegas\", \"descripcionArea\": \"Área encargada de almacenar los productos.\"}}','2025-04-22 22:05:25','2025-04-22 22:05:25'),(216,14,'Solicitud DELETE','Gestion Areas',11,'{\"Detalles\": \"Eliminación del recurso con ID 11\"}','2025-04-22 22:06:42','2025-04-22 22:06:42'),(217,14,'Solicitud POST','Gestion Areas',NULL,'{\"Detalles\": {\"nombreArea\": \"Contabilidad\", \"descripcionArea\": \"Area encargada de las finanzas\"}}','2025-04-22 22:11:40','2025-04-22 22:11:40'),(218,14,'Solicitud PATCH Parcial','Gestion Areas',12,'{\"Detalles\": {\"nombreArea\": \"Contabilidad\", \"descripcionArea\": \"Área responsable de las finanzas de la empresa.\"}}','2025-04-22 22:12:18','2025-04-22 22:12:18'),(219,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:26:49','2025-04-22 22:26:49'),(220,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:42:28','2025-04-22 22:42:28'),(221,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:42:28','2025-04-22 22:42:28'),(222,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 22:42:29','2025-04-22 22:42:29'),(223,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 22:42:29','2025-04-22 22:42:29'),(224,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:50:45','2025-04-22 22:50:45'),(225,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:50:46','2025-04-22 22:50:46'),(226,14,'Solicitud GET','Gestion Ciudades',4,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/4\"}','2025-04-22 22:50:52','2025-04-22 22:50:52'),(227,14,'Solicitud GET','Gestion Ciudades',3,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/3\"}','2025-04-22 22:50:55','2025-04-22 22:50:55'),(228,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:50:58','2025-04-22 22:50:58'),(229,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:54:19','2025-04-22 22:54:19'),(230,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:54:19','2025-04-22 22:54:19'),(231,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:54:20','2025-04-22 22:54:20'),(232,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:54:21','2025-04-22 22:54:21'),(233,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:04','2025-04-22 22:55:04'),(234,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:04','2025-04-22 22:55:04'),(235,14,'Solicitud PATCH','Gestion Ciudades',1,'{\"data\": {\"nombreCiudad\": \"Bogota D.C\", \"costoPor_Ciudad\": 19000}}','2025-04-22 22:55:18','2025-04-22 22:55:18'),(236,14,'Solicitud GET','Gestion Ciudades',1,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/1\"}','2025-04-22 22:55:32','2025-04-22 22:55:32'),(237,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:39','2025-04-22 22:55:39'),(238,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:39','2025-04-22 22:55:39'),(239,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:42','2025-04-22 22:55:42'),(240,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:45','2025-04-22 22:55:45'),(241,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:45','2025-04-22 22:55:45'),(242,14,'Solicitud PATCH','Gestion Ciudades',1,'{\"data\": {\"nombreCiudad\": \"Bogota D.C\", \"costoPor_Ciudad\": 569000}}','2025-04-22 22:56:04','2025-04-22 22:56:04'),(243,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:08','2025-04-22 22:56:08'),(244,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:08','2025-04-22 22:56:08'),(245,14,'Solicitud PATCH','Gestion Ciudades',1,'{\"data\": {\"nombreCiudad\": \"Bogota D.C\", \"costoPor_Ciudad\": 30000}}','2025-04-22 22:56:24','2025-04-22 22:56:24'),(246,14,'Solicitud GET','Gestion Ciudades',1,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/1\"}','2025-04-22 22:56:26','2025-04-22 22:56:26'),(247,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:38','2025-04-22 22:56:38'),(248,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:38','2025-04-22 22:56:38'),(249,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:42','2025-04-22 22:56:42'),(250,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:42','2025-04-22 22:56:42'),(251,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:57:24','2025-04-22 22:57:24'),(252,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:57:26','2025-04-22 22:57:26'),(253,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:00:49','2025-04-22 23:00:49'),(254,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:00:49','2025-04-22 23:00:49'),(255,14,'Solicitud GET','Gestion Ciudades',11,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/11\"}','2025-04-22 23:00:59','2025-04-22 23:00:59'),(256,14,'Solicitud GET','Gestion Ciudades',10,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/10\"}','2025-04-22 23:01:01','2025-04-22 23:01:01'),(257,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:01:06','2025-04-22 23:01:06'),(258,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:01:06','2025-04-22 23:01:06'),(259,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:00','2025-04-22 23:02:00'),(260,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:00','2025-04-22 23:02:00'),(261,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:01','2025-04-22 23:02:01'),(262,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:02','2025-04-22 23:02:02'),(263,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:02','2025-04-22 23:02:02'),(264,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:02','2025-04-22 23:02:02'),(265,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:27','2025-04-22 23:03:27'),(266,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:27','2025-04-22 23:03:27'),(267,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:27','2025-04-22 23:03:27'),(268,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:28','2025-04-22 23:03:28'),(269,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:28','2025-04-22 23:03:28'),(270,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:28','2025-04-22 23:03:28'),(271,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:31','2025-04-22 23:03:31'),(272,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:31','2025-04-22 23:03:31'),(273,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:34','2025-04-22 23:03:34'),(274,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:34','2025-04-22 23:03:34'),(275,14,'Solicitud POST','Gestion Ciudades',15,'{\"data\": {\"nombreCiudad\": \"Pasto\", \"costoPor_Ciudad\": 22000}}','2025-04-22 23:03:59','2025-04-22 23:03:59'),(276,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:04:01','2025-04-22 23:04:01'),(277,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:04:02','2025-04-22 23:04:02'),(278,14,'Solicitud POST','Gestion Ciudades',16,'{\"data\": {\"nombreCiudad\": \"Nariño\", \"costoPor_Ciudad\": 12000}}','2025-04-22 23:04:38','2025-04-22 23:04:38'),(279,14,'Solicitud POST','Gestion Ciudades',17,'{\"data\": {\"nombreCiudad\": \"Bogotá\", \"costoPor_Ciudad\": 200000}}','2025-04-22 23:04:51','2025-04-22 23:04:51'),(280,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:04:57','2025-04-22 23:04:57'),(281,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:04:58','2025-04-22 23:04:58'),(282,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:10','2025-04-22 23:05:10'),(283,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:10','2025-04-22 23:05:10'),(284,14,'Solicitud GET','Gestion Ciudades',17,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/17\"}','2025-04-22 23:05:15','2025-04-22 23:05:15'),(285,14,'Solicitud DELETE','Gestion Ciudades',17,'[]','2025-04-22 23:05:18','2025-04-22 23:05:18'),(286,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:33','2025-04-22 23:05:33'),(287,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:34','2025-04-22 23:05:34'),(288,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:34','2025-04-22 23:05:34'),(289,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:35','2025-04-22 23:05:35'),(290,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:35','2025-04-22 23:05:35'),(291,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:36','2025-04-22 23:05:36'),(292,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:36','2025-04-22 23:05:36'),(293,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:37','2025-04-22 23:05:37'),(294,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:37','2025-04-22 23:05:37'),(295,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:37','2025-04-22 23:05:37'),(296,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:38','2025-04-22 23:05:38'),(297,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:38','2025-04-22 23:05:38'),(298,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:43','2025-04-22 23:05:43'),(299,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:43','2025-04-22 23:05:43'),(300,14,'Solicitud PATCH','Gestion Ciudades',1,'{\"data\": {\"nombreCiudad\": \"Bogotá\", \"costoPor_Ciudad\": 30000}}','2025-04-22 23:05:53','2025-04-22 23:05:53'),(301,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:57','2025-04-22 23:05:57'),(302,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:57','2025-04-22 23:05:57'),(303,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:23','2025-04-22 23:06:23'),(304,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:23','2025-04-22 23:06:23'),(305,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:41','2025-04-22 23:06:41'),(306,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:41','2025-04-22 23:06:41'),(307,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:46','2025-04-22 23:06:46'),(308,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:46','2025-04-22 23:06:46'),(309,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:47','2025-04-22 23:06:47'),(310,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:47','2025-04-22 23:06:47'),(311,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:49','2025-04-22 23:06:49'),(312,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:50','2025-04-22 23:06:50'),(313,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:07:38','2025-04-22 23:07:38'),(314,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:07:38','2025-04-22 23:07:38'),(315,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:14:06','2025-04-22 23:14:06'),(316,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:14:06','2025-04-22 23:14:06'),(317,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 23:14:07','2025-04-22 23:14:07'),(318,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 23:14:07','2025-04-22 23:14:07'),(319,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:14:48','2025-04-22 23:14:48'),(320,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:14:48','2025-04-22 23:14:48'),(321,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 23:14:48','2025-04-22 23:14:48'),(322,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 23:14:49','2025-04-22 23:14:49'),(323,14,'Solicitud POST','Gestion Areas',NULL,'{\"Detalles\": {\"nombreArea\": \"Ventas\", \"descripcionArea\": \"Area encargada de hacer crecer dinero a la empresa.\"}}','2025-04-22 23:40:38','2025-04-22 23:40:38'),(324,14,'Solicitud PATCH Parcial','Gestion Areas',1,'{\"Detalles\": {\"nombreArea\": \"Bodega\", \"descripcionArea\": \"Área encargada de almacenar los productos.\"}}','2025-04-22 23:40:56','2025-04-22 23:40:56'),(325,14,'Solicitud DELETE','Gestion Areas',13,'{\"Detalles\": \"Eliminación del recurso con ID 13\"}','2025-04-22 23:41:15','2025-04-22 23:41:15');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES ('laravel_cache_0EqepHZHIEf6GuvX','s:7:\"forever\";',2060581526),('laravel_cache_1aa41CW7slIpP0qA','s:7:\"forever\";',2060041203),('laravel_cache_1Q3LNdyd1vHUMR8T','s:7:\"forever\";',2060640264),('laravel_cache_45cNMXDIYzPvscFz','s:7:\"forever\";',2060592152),('laravel_cache_46jo36xzcmXVxvwf','s:7:\"forever\";',2059942075),('laravel_cache_4lL0qe0iPUXVAWuO','s:7:\"forever\";',2060041560),('laravel_cache_5ftM6ydywKfONL0T','s:7:\"forever\";',2060705633),('laravel_cache_7ym5SrpTHl7B0eCx','s:7:\"forever\";',2059960919),('laravel_cache_8p1JWVeRa0FBCTFC','s:7:\"forever\";',2060559854),('laravel_cache_9T1r7KurYlu9C8YR','s:7:\"forever\";',2060623889),('laravel_cache_aMCjgoxWvp1so4xN','s:7:\"forever\";',2060584837),('laravel_cache_AW2LM5DOHZHjgoFI','s:7:\"forever\";',2059967572),('laravel_cache_b8AGAjH8NkBxsutD','s:7:\"forever\";',2059972219),('laravel_cache_BDN9nxu69bzPvxgR','s:7:\"forever\";',2060628874),('laravel_cache_BVdLT2QVFV5voUBW','s:7:\"forever\";',2060138473),('laravel_cache_CDUyL8plYu8730h0','s:7:\"forever\";',2059942221),('laravel_cache_dXowyvPbWBOChcJ9','s:7:\"forever\";',2060109360),('laravel_cache_dyvtPjHmRAFHhkRv','s:7:\"forever\";',2059960213),('laravel_cache_dz1Je5eqQDiUVwFc','s:7:\"forever\";',2060592190),('laravel_cache_Eei1zm7XJKN03n9s','s:7:\"forever\";',2060569496),('laravel_cache_fK9Xtm6dCYBccnO3','s:7:\"forever\";',2060565736),('laravel_cache_fs5N9WNholWqG4pN','s:7:\"forever\";',2059960470),('laravel_cache_FZmueO8kfw1wV8HU','s:7:\"forever\";',2059966313),('laravel_cache_FZX30o4Tth6yYg7d','s:7:\"forever\";',2060592056),('laravel_cache_gbbBYxmuRJD4y5lY','s:7:\"forever\";',2060108645),('laravel_cache_HHjA4OHskInitQLt','s:7:\"forever\";',2059687171),('laravel_cache_HhYRt7I2eOvVxZMO','s:7:\"forever\";',2060107903),('laravel_cache_HUVZi5C1ymsGndjg','s:7:\"forever\";',2060621305),('laravel_cache_HWFOmhd06ZD1Pl4y','s:7:\"forever\";',2060621328),('laravel_cache_I5mKGmboIorV2Sho','s:7:\"forever\";',2059968855),('laravel_cache_iCKWmRc69RsyJzJS','s:7:\"forever\";',2060592035),('laravel_cache_IhQkYolUiVeHc4fS','s:7:\"forever\";',2060658820),('laravel_cache_iki2voPWIrcfkkkq','s:7:\"forever\";',2059963064),('laravel_cache_KCmVZrlue5qqLQwe','s:7:\"forever\";',2060569528),('laravel_cache_Ko5M5sP1UdZ4QGQl','s:7:\"forever\";',2060638902),('laravel_cache_LMgRGbpErjrm8bkC','s:7:\"forever\";',2060173521),('laravel_cache_M2elRXbcEUGxePFN','s:7:\"forever\";',2060640132),('laravel_cache_NigCONy2gf48bdv0','s:7:\"forever\";',2060705718),('laravel_cache_OBKEaQI3fg0Uxnh9','s:7:\"forever\";',2059689218),('laravel_cache_oEbFE4K5LWjizGA5','s:7:\"forever\";',2059968871),('laravel_cache_PkMSglD0lMtPnV8I','s:7:\"forever\";',2060402933),('laravel_cache_pZhLB6GuHbe3rad8','s:7:\"forever\";',2060621270),('laravel_cache_QBZaP92Yp3jXODz6','s:7:\"forever\";',2059967586),('laravel_cache_QHXCZ8GgXP3ZVDWq','s:7:\"forever\";',2059960647),('laravel_cache_QNVsj6txCWJSirSd','s:7:\"forever\";',2060618696),('laravel_cache_qtWhYwVGVZDsRlFH','s:7:\"forever\";',2059687296),('laravel_cache_r8hLNIzE3gzO9HxA','s:7:\"forever\";',2060582992),('laravel_cache_RrMFjwp6uzj8aXWN','a:1:{s:11:\"valid_until\";i:1744329371;}',1745538911),('laravel_cache_sY2Ozt4Q75UvDwZb','s:7:\"forever\";',2060407942),('laravel_cache_TLqHL6Rr2WvHziws','s:7:\"forever\";',2059967895),('laravel_cache_TTV2lvyJXmeJkBXW','s:7:\"forever\";',2059972195),('laravel_cache_UHJDOYBPcqdyFcR2','s:7:\"forever\";',2060173479),('laravel_cache_vCSS7mZMU99zA7jk','s:7:\"forever\";',2060565430),('laravel_cache_VFerhuMXufA0TcIR','s:7:\"forever\";',2060618717),('laravel_cache_W4BAivNybkhNG29X','s:7:\"forever\";',2059962645),('laravel_cache_WHzqMUg9PgSGNVgr','s:7:\"forever\";',2059967241),('laravel_cache_WYbjCiwTb9J3gM7c','s:7:\"forever\";',2060584822),('laravel_cache_xklUNHTXVinbuXuc','a:1:{s:11:\"valid_until\";i:1744329309;}',1745538910),('laravel_cache_Y5ekZseddQ4H87sX','s:7:\"forever\";',2059963140),('laravel_cache_ylyRB8kTn7q3MaoA','s:7:\"forever\";',2060705690),('laravel_cache_zejX4TB29qvFFKWg','s:7:\"forever\";',2060565454),('laravel_cache_ZhZbxJspH9bAZCYv','s:7:\"forever\";',2060107063),('laravel_cache_ZnRhJVP0wyloO80I','s:7:\"forever\";',2059960282),('laravel_cache_zxYpIy4wyHtoyaz8','s:7:\"forever\";',2060580987);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoriaenvios`
--

DROP TABLE IF EXISTS `categoriaenvios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoriaenvios` (
  `idCategoria` bigint NOT NULL AUTO_INCREMENT,
  `nombreCategoria` varchar(200) NOT NULL,
  `precioCategoria` decimal(20,2) NOT NULL,
  `descripcion` text NOT NULL,
  PRIMARY KEY (`idCategoria`),
  UNIQUE KEY `unique_nombreCategoria` (`nombreCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoriaenvios`
--

LOCK TABLES `categoriaenvios` WRITE;
/*!40000 ALTER TABLE `categoriaenvios` DISABLE KEYS */;
INSERT INTO `categoriaenvios` VALUES (1,'Fármacos',35000.00,'Medicamentos y farmacos generales'),(2,'Abarrotes',20000.00,'Productos de consumo diario como arroz, azúcar y granos.'),(3,'Electrodomésticos',1500000.00,'Línea blanca y pequeños electrodomésticos.'),(4,'Ferretería',50000.00,'Herramientas y materiales para construcción y reparaciones.'),(5,'Papelería',18000.00,'Útiles escolares, libros y artículos de oficina.'),(6,'Bebidas',25000.00,'Gaseosas, jugos, agua y bebidas alcohólicas.'),(7,'Frutas y Verduras',30000.00,'Productos agrícolas frescos de origen nacional.'),(8,'Hogar y Decoración',120000.00,'Muebles, decoración y artículos para el hogar.'),(10,'Ropa y Calzado',95000.00,'Vestuario y zapatos de fabricación nacional e importada.');
/*!40000 ALTER TABLE `categoriaenvios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudades`
--

DROP TABLE IF EXISTS `ciudades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudades` (
  `idCiudad` bigint NOT NULL AUTO_INCREMENT,
  `nombreCiudad` varchar(255) NOT NULL,
  `costoPor_Ciudad` decimal(20,2) NOT NULL,
  PRIMARY KEY (`idCiudad`),
  UNIQUE KEY `unique_nombreCiudad` (`nombreCiudad`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudades`
--

LOCK TABLES `ciudades` WRITE;
/*!40000 ALTER TABLE `ciudades` DISABLE KEYS */;
INSERT INTO `ciudades` VALUES (1,'Bogotá',30000.00),(2,'Bucaramanga',15000.00),(3,'Medellín',14000.00),(4,'Cali',13000.00),(5,'Barranquilla',16000.00),(6,'Cartagena',15500.00),(7,'Santa Marta',14500.00),(8,'Cúcuta',13500.00),(9,'Ibagué',12500.00),(10,'Pereira',12800.00),(11,'Manizales',12700.00),(14,'Neiva',12000.00),(15,'Pasto',22000.00),(16,'Nariño',12000.00);
/*!40000 ALTER TABLE `ciudades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dispositivosautorizados`
--

DROP TABLE IF EXISTS `dispositivosautorizados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dispositivosautorizados` (
  `idDispositivosAutorizados` bigint NOT NULL AUTO_INCREMENT,
  `fechaAutorizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `macAddress` varchar(500) NOT NULL,
  `descripcionDispositivo` text,
  PRIMARY KEY (`idDispositivosAutorizados`),
  KEY `idx_macAddress` (`macAddress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivosautorizados`
--

LOCK TABLES `dispositivosautorizados` WRITE;
/*!40000 ALTER TABLE `dispositivosautorizados` DISABLE KEYS */;
/*!40000 ALTER TABLE `dispositivosautorizados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entregas`
--

DROP TABLE IF EXISTS `entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entregas` (
  `idEntrega` bigint NOT NULL AUTO_INCREMENT,
  `fechaEntregaSeleccionada` datetime NOT NULL,
  `fechaEntregaFinal` datetime DEFAULT NULL,
  `direccionEntrega` varchar(255) NOT NULL,
  `idCiudad` bigint NOT NULL,
  PRIMARY KEY (`idEntrega`),
  KEY `fk_entregas_ciudad` (`idCiudad`),
  CONSTRAINT `fk_entregas_ciudad` FOREIGN KEY (`idCiudad`) REFERENCES `ciudades` (`idCiudad`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entregas`
--

LOCK TABLES `entregas` WRITE;
/*!40000 ALTER TABLE `entregas` DISABLE KEYS */;
INSERT INTO `entregas` VALUES (1,'2025-04-22 00:00:00','2025-04-25 00:00:00','Calle 10 #12-34, Santa Marta',7),(2,'2025-04-23 00:00:00','2025-04-26 00:00:00','Carrera 45 #56-78, Cúcuta',8),(3,'2025-04-24 00:00:00','2025-04-27 00:00:00','Av. Quinta con calle 60, Ibagué',9),(4,'2025-04-25 00:00:00','2025-04-28 00:00:00','Calle 18 #9-10, Pereira',10),(6,'2025-04-26 00:00:00','2025-04-29 00:00:00','Cra 23 #45-67',11);
/*!40000 ALTER TABLE `entregas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envios`
--

DROP TABLE IF EXISTS `envios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envios` (
  `idEnvio` bigint NOT NULL AUTO_INCREMENT,
  `nombreRemitente` varchar(255) NOT NULL,
  `num_ContactoRemitente` varchar(14) NOT NULL,
  `nombreDestinatario` varchar(255) NOT NULL,
  `num_ContactoDestinatario` varchar(14) NOT NULL,
  `metodoPago` enum('Efectivo','Tarjeta Debito','Tarjeta Credito','Plataformas Virtuales','Cupones') NOT NULL,
  `costosTotal_Envio` decimal(20,2) NOT NULL,
  `fechaEnvio` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idusuarios` bigint NOT NULL,
  `idRecogida` bigint NOT NULL,
  `idEntrega` bigint NOT NULL,
  `idCategoria` bigint NOT NULL,
  PRIMARY KEY (`idEnvio`),
  KEY `fk_envios_por_usuario` (`idusuarios`),
  KEY `fk_envios_por_recogida` (`idRecogida`),
  KEY `fk_envios_entrega` (`idEntrega`),
  KEY `fk_categoria_por_envio` (`idCategoria`),
  CONSTRAINT `fk_categoria_por_envio` FOREIGN KEY (`idCategoria`) REFERENCES `categoriaenvios` (`idCategoria`),
  CONSTRAINT `fk_envios_entrega` FOREIGN KEY (`idEntrega`) REFERENCES `entregas` (`idEntrega`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_envios_por_recogida` FOREIGN KEY (`idRecogida`) REFERENCES `recogidas` (`idRecogida`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_envios_por_usuario` FOREIGN KEY (`idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envios`
--

LOCK TABLES `envios` WRITE;
/*!40000 ALTER TABLE `envios` DISABLE KEYS */;
INSERT INTO `envios` VALUES (1,'Ana Torres','3105678910','Luis Rojas','3201234567','Efectivo',55440.00,'2025-04-21 05:09:37',8,1,1,2),(2,'Carlos Mendoza','3114567890','Andrea Páez','3012345678','Tarjeta Debito',1710016.00,'2025-04-21 05:11:01',8,2,4,3),(3,'Paola Suárez','3127894561','Julián Díaz','3009876543','Plataformas Virtuales',51520.00,'2025-04-21 05:11:14',8,6,3,5),(5,'Esteban Giraldo','3127894561','Brandon David Gonzalez','3009876543','Plataformas Virtuales',1711920.00,'2025-04-21 05:35:24',8,1,2,3),(6,'Dario Gonzalez','3127894561','Brandon David Gonzalez','3009876543','Efectivo',1710800.00,'2025-04-21 17:31:57',8,1,3,3);
/*!40000 ALTER TABLE `envios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `idestado` bigint NOT NULL AUTO_INCREMENT,
  `estado` enum('ACTIVO','INACTIVO','BLOQUEADO','SUSPENDIDO') NOT NULL,
  PRIMARY KEY (`idestado`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'ACTIVO'),(2,'INACTIVO'),(3,'BLOQUEADO'),(5,'SUSPENDIDO');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historiallogeoeventos`
--

DROP TABLE IF EXISTS `historiallogeoeventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historiallogeoeventos` (
  `idHistorialLogeoEventos` bigint NOT NULL AUTO_INCREMENT,
  `tipoEvento` enum('ACESSO','FALLIDO') NOT NULL,
  `fechaEvento` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IP` varchar(500) NOT NULL,
  `descripcionEvento` text,
  PRIMARY KEY (`idHistorialLogeoEventos`),
  KEY `idx_tipoEvento` (`tipoEvento`),
  KEY `idx_IP` (`IP`),
  KEY `idx_fechaEvento` (`fechaEvento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historiallogeoeventos`
--

LOCK TABLES `historiallogeoeventos` WRITE;
/*!40000 ALTER TABLE `historiallogeoeventos` DISABLE KEYS */;
/*!40000 ALTER TABLE `historiallogeoeventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `intentosfallidos`
--

DROP TABLE IF EXISTS `intentosfallidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `intentosfallidos` (
  `idIntentosFallidos` bigint NOT NULL AUTO_INCREMENT,
  `numeroIntentos` int NOT NULL DEFAULT (0),
  `fechaIntento` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idIntentosFallidos`),
  KEY `idx_numeroIntentos` (`numeroIntentos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `intentosfallidos`
--

LOCK TABLES `intentosfallidos` WRITE;
/*!40000 ALTER TABLE `intentosfallidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `intentosfallidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000001_create_cache_table',1),(2,'0001_01_01_000002_create_jobs_table',1),(3,'2025_04_04_202107_create_personal_access_tokens_table',1),(4,'2025_04_14_171217_create_audit_logs_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puestos`
--

DROP TABLE IF EXISTS `puestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puestos` (
  `idPuestos` bigint NOT NULL AUTO_INCREMENT,
  `nombrePuesto` varchar(100) NOT NULL,
  `fechaAsignacionPuesto` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `descripcionPuesto` text,
  `idArea` bigint NOT NULL,
  PRIMARY KEY (`idPuestos`),
  UNIQUE KEY `nombrePuesto` (`nombrePuesto`),
  KEY `idx_nombrePuesto` (`nombrePuesto`),
  KEY `fk_puestos_areas` (`idArea`),
  CONSTRAINT `fk_puestos_areas` FOREIGN KEY (`idArea`) REFERENCES `areas` (`idArea`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puestos`
--

LOCK TABLES `puestos` WRITE;
/*!40000 ALTER TABLE `puestos` DISABLE KEYS */;
INSERT INTO `puestos` VALUES (2,'Auxiliar Logístico','2025-04-09 19:17:03','Apoya en tareas operativas del área de logística.',7),(3,'Auxiliar de Bodega','2025-04-09 19:18:00','Encargado de organizar, recibir y despachar productos del almacén.',7),(4,'Supervisor de Rutas','2025-04-09 19:22:37','Supervisa la planificación y ejecución de las rutas de entrega.',7),(5,'Coordinador de Logística','2025-04-09 19:22:51','Coordina las operaciones logísticas diarias y optimiza procesos de transporte.',7),(6,'Analista de Transporte','2025-04-09 19:23:08','Analiza indicadores de desempeño y eficiencia de rutas y vehículos.',7),(7,'Planificador de Rutas','2025-04-09 19:23:22','Diseña las rutas de entrega para asegurar eficiencia y cumplimiento.',7),(8,'Conductor','2025-04-09 19:24:41','Responsable de realizar la recogida y entrega de envíos, garantizando el cumplimiento de rutas asignadas, el cuidado de la mercancía y la trazabilidad del servicio.',7),(9,'Gerente General de Sistemas','2025-04-10 15:25:02','Responsable de liderar la estrategia tecnológica de la organización, supervisar el desarrollo e implementación de sistemas informáticos, garantizar la seguridad de la información y optimizar los procesos mediante soluciones digitales innovadoras alineadas con los objetivos del negocio.',8);
/*!40000 ALTER TABLE `puestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recogidas`
--

DROP TABLE IF EXISTS `recogidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recogidas` (
  `idRecogida` bigint NOT NULL AUTO_INCREMENT,
  `fechaRecogidaSeleccionada` datetime NOT NULL,
  `fechaRecogidaFinal` datetime DEFAULT NULL,
  `direccionRecogida` varchar(255) NOT NULL,
  `idCiudad` bigint NOT NULL,
  PRIMARY KEY (`idRecogida`),
  KEY `fk_recogidas_ciudad` (`idCiudad`),
  CONSTRAINT `fk_recogidas_ciudad` FOREIGN KEY (`idCiudad`) REFERENCES `ciudades` (`idCiudad`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recogidas`
--

LOCK TABLES `recogidas` WRITE;
/*!40000 ALTER TABLE `recogidas` DISABLE KEYS */;
INSERT INTO `recogidas` VALUES (1,'2025-04-25 00:00:00','2025-04-26 00:00:00','Calle 123, Bogotá',1),(2,'2025-04-28 00:00:00','2025-04-30 00:00:00','Carrera 45, Medellín',3),(3,'2025-05-02 00:00:00','2025-05-05 00:00:00','Avenida 8, Cali',4),(4,'2025-04-30 00:00:00','2025-05-01 00:00:00','Calle 50, Bucaramanga',2),(6,'2025-02-10 00:00:00','2025-02-15 00:00:00','Calle 50B #59 - 90',6);
/*!40000 ALTER TABLE `recogidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportes`
--

DROP TABLE IF EXISTS `reportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportes` (
  `idReporte` bigint NOT NULL AUTO_INCREMENT,
  `tipoReporte` varchar(150) NOT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `fechaCreacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idusuarios` bigint NOT NULL,
  PRIMARY KEY (`idReporte`),
  KEY `fk_reportes_usuarios` (`idusuarios`),
  CONSTRAINT `fk_reportes_usuarios` FOREIGN KEY (`idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportes`
--

LOCK TABLES `reportes` WRITE;
/*!40000 ALTER TABLE `reportes` DISABLE KEYS */;
/*!40000 ALTER TABLE `reportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `idRole` bigint NOT NULL AUTO_INCREMENT,
  `nombreRole` varchar(100) NOT NULL,
  `descripcionRole` text,
  `fechaAsignacionRole` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idRole`),
  UNIQUE KEY `nombreRole` (`nombreRole`),
  KEY `idx_nombreRole` (`nombreRole`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (2,'Manager','Acceso total al sistema','2025-03-13 18:57:07'),(3,'Empleado','Tiene tareas limitadas','2025-04-08 12:00:00');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rutas`
--

DROP TABLE IF EXISTS `rutas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rutas` (
  `idRuta` bigint NOT NULL AUTO_INCREMENT,
  `nombreRuta` varchar(255) NOT NULL,
  `fechaAsignacionRuta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `horaEntrada` datetime NOT NULL,
  `horaSalida` datetime NOT NULL,
  `idCiudad` bigint NOT NULL,
  PRIMARY KEY (`idRuta`),
  KEY `fk_rutas_ciudad` (`idCiudad`),
  CONSTRAINT `fk_rutas_ciudad` FOREIGN KEY (`idCiudad`) REFERENCES `ciudades` (`idCiudad`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rutas`
--

LOCK TABLES `rutas` WRITE;
/*!40000 ALTER TABLE `rutas` DISABLE KEYS */;
/*!40000 ALTER TABLE `rutas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuariodispositivosautorizados`
--

DROP TABLE IF EXISTS `usuariodispositivosautorizados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuariodispositivosautorizados` (
  `idusuarioDispositivoAutorizados` bigint NOT NULL AUTO_INCREMENT,
  `fechaAutorizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estadoAutorizacion` enum('PENDIENTE','APROBADO','DENEGADO') NOT NULL,
  `descripcionEvento` text,
  PRIMARY KEY (`idusuarioDispositivoAutorizados`),
  KEY `idx_estadoAutorizacion` (`estadoAutorizacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuariodispositivosautorizados`
--

LOCK TABLES `usuariodispositivosautorizados` WRITE;
/*!40000 ALTER TABLE `usuariodispositivosautorizados` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuariodispositivosautorizados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idusuarios` bigint NOT NULL AUTO_INCREMENT,
  `documentoIdentidad` varchar(50) NOT NULL,
  `nombreCompleto` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `numContacto` varchar(20) DEFAULT NULL,
  `contrasena` varchar(250) NOT NULL,
  `direccionResidencia` text,
  `fechaCreacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `idRole` bigint NOT NULL,
  `idestado` bigint NOT NULL,
  `idPuestos` bigint NOT NULL,
  `idVehiculo` bigint DEFAULT NULL,
  PRIMARY KEY (`idusuarios`),
  UNIQUE KEY `documentoIdentidad` (`documentoIdentidad`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_documentoIdentidad` (`documentoIdentidad`),
  KEY `idx_email` (`email`),
  KEY `idx_contrasena` (`contrasena`),
  KEY `fk_usuarios_roles` (`idRole`),
  KEY `fk_usuarios_estado` (`idestado`),
  KEY `fk_usuarios_por_puesto` (`idPuestos`),
  KEY `fk_vehiculo_por_usuarios` (`idVehiculo`),
  CONSTRAINT `fk_usuarios_estado` FOREIGN KEY (`idestado`) REFERENCES `estado` (`idestado`) ON UPDATE CASCADE,
  CONSTRAINT `fk_usuarios_por_puesto` FOREIGN KEY (`idPuestos`) REFERENCES `puestos` (`idPuestos`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_usuarios_roles` FOREIGN KEY (`idRole`) REFERENCES `roles` (`idRole`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_vehiculo_por_usuarios` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculos` (`idVehiculo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (8,'0987654321','Sofia Vergara','sofi777@gmail.com','987654321','$2y$12$pONVvzmN5i/GF5WR/ozjbOMk4DppwqMSwCw./5WAl7Bd3fwoATGeC','Calle Falsa 123','2025-04-10 19:34:04',2,1,5,NULL),(9,'828273727722','Javier Yara','yarayara123@gmail.com','987654321','$2y$12$5muGGKLb9ldt5MMRD9khE.ABWxBV8RClZpW3/N3xyy6oG3bx6m4Dm','Calle Falsa 123','2025-04-10 19:54:30',2,1,3,NULL),(11,'1780289012','Samuel Felipe Ayala','samu289sam@gmail.com','987654321','$2y$12$rwHIdbXq1drET/gXN270Yek9YKKPpAoUYmIJzsZ3arSI2KvexaRnW','Calle Falsa 123','2025-04-13 21:43:46',3,1,5,NULL),(13,'1000898776','Sergio Barbosa Bedoya','sergiii230sdas@gmail.com','3008901190','$2y$12$A9uHO0HYJhPk.WutEiIJIOUYSyJhKv2K/4toqrwMIAXPVNWLQKl0u','Calle 12 sur #90 - 30','2025-04-14 20:45:18',3,1,5,NULL),(14,'1234999091','Brandon David Gonzalez Lopez','gonzdeiv123@gmail.com','3008901190','$2y$12$4ZtY2grv9CLuo0ozlpawduPUOQ/8ru4HAdUIF9bR8pd.66vU9wfEq','Calle 12 sur #90 - 30','2025-04-20 20:13:03',2,1,5,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculos`
--

DROP TABLE IF EXISTS `vehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehiculos` (
  `idVehiculo` bigint NOT NULL AUTO_INCREMENT,
  `marcaVehiculo` varchar(155) NOT NULL,
  `tipoVehiculo` varchar(100) NOT NULL,
  `placa` varchar(7) NOT NULL,
  PRIMARY KEY (`idVehiculo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculos`
--

LOCK TABLES `vehiculos` WRITE;
/*!40000 ALTER TABLE `vehiculos` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehiculos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-22 13:46:19
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: logigov2
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `areas` (
  `idArea` bigint NOT NULL AUTO_INCREMENT,
  `nombreArea` varchar(150) NOT NULL,
  `descripcionArea` text,
  PRIMARY KEY (`idArea`),
  UNIQUE KEY `nombreArea` (`nombreArea`),
  KEY `idx_nombreArea` (`nombreArea`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `areas`
--

LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` VALUES (1,'Bodega','Área encargada de almacenar los productos.'),(2,'Devoluciones','Área encargada del proceso de devoluciones de productos.'),(6,'Calidad','Área encargada de velar que los productos esten en perfecto estado para los envios.'),(7,'Logistica y Transporte','Área encargada de la gestion de rutas.'),(8,'Administración','Área acargo de todas las areas y departamentos'),(10,'Cuartos Fríos','Área responsable del almacenamiento, control, distribución y asignación de productos que requieren refrigeración.'),(12,'Contabilidad','Área responsable de las finanzas de la empresa.');
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignacionrutas`
--

DROP TABLE IF EXISTS `asignacionrutas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignacionrutas` (
  `idAsignacionRuta` bigint NOT NULL AUTO_INCREMENT,
  `idVehiculo` bigint NOT NULL,
  `idRuta` bigint NOT NULL,
  PRIMARY KEY (`idAsignacionRuta`),
  KEY `fk_asignacion_vehiculo` (`idVehiculo`),
  KEY `fk_asignacion_ruta` (`idRuta`),
  CONSTRAINT `fk_asignacion_ruta` FOREIGN KEY (`idRuta`) REFERENCES `rutas` (`idRuta`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_asignacion_vehiculo` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculos` (`idVehiculo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignacionrutas`
--

LOCK TABLES `asignacionrutas` WRITE;
/*!40000 ALTER TABLE `asignacionrutas` DISABLE KEYS */;
/*!40000 ALTER TABLE `asignacionrutas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `action` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `resource_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `resource_id` bigint unsigned DEFAULT NULL,
  `details` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=326 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES (1,13,'Solicitud GET','Gestion Areas',NULL,'{\"Detalles\": \"api/gestion_areas\"}','2025-04-15 23:24:43','2025-04-15 23:24:43'),(2,13,'Solicitud GET','Gestion Areas',NULL,'{\"Detalles\": \"api/gestion_areas\"}','2025-04-15 23:27:41','2025-04-15 23:27:41'),(3,13,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-15 23:28:20','2025-04-15 23:28:20'),(4,13,'Solicitud GET','Gestion Areas',NULL,'{\"Detalles\": \"api/gestion_areas\"}','2025-04-16 00:29:55','2025-04-16 00:29:55'),(5,13,'Solicitud POST','Gestion Areas',NULL,'{\"Detalles\": {\"nombreArea\": \"Cuartos Fríos\", \"descripcionArea\": \"Área responsable del almacenamiento, control y distribución de productos que requieren refrigeración.\"}}','2025-04-16 00:32:21','2025-04-16 00:32:21'),(6,13,'Solicitud PATCH Parcial','Gestion Areas',9,'{\"Detalles\": {\"nombreArea\": \"Cuartos cuatos\"}}','2025-04-16 00:33:51','2025-04-16 00:33:51'),(7,13,'Solicitud PUT','Gestion Areas',9,'{\"Detalles\": {\"nombreArea\": \"Cuartos Fríos\", \"descripcionArea\": \"Área responsable del almacenamiento, control, distribución y asignación de productos que requieren refrigeración.\"}}','2025-04-16 00:34:45','2025-04-16 00:34:45'),(8,13,'Solicitud DELETE','Gestion Areas',9,'{\"Detalles\": \"Eliminación del recurso con ID 9\"}','2025-04-16 00:34:58','2025-04-16 00:34:58'),(9,13,'Solicitud POST','Gestion Areas',NULL,'{\"Detalles\": {\"nombreArea\": \"Cuartos Fríos\", \"descripcionArea\": \"Área responsable del almacenamiento, control, distribución y asignación de productos que requieren refrigeración.\"}}','2025-04-16 00:35:08','2025-04-16 00:35:08'),(10,13,'Solicitud GET_by_id','Gestion Areas',10,'{\"Detalles\": \"api/gestion_areas/10\"}','2025-04-16 00:35:20','2025-04-16 00:35:20'),(11,13,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-16 00:56:43','2025-04-16 00:56:43'),(12,11,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-16 00:58:36','2025-04-16 00:58:36'),(13,13,'Solicitud POST','Gestion Categoria de Envios',1,'{\"data\": {\"descripcion\": \"Medicamentos y farmacos generales\", \"nombreCategoria\": \"Fármacos\", \"precioCategoria\": 35}}','2025-04-19 10:26:44','2025-04-19 10:26:44'),(14,13,'Solicitud PATCH','Gestion Categoria de Envios',1,'{\"data\": {\"precioCategoria\": 35000}}','2025-04-19 10:28:22','2025-04-19 10:28:22'),(15,13,'Solicitud POST','Gestion Categoria de Envios',2,'{\"data\": {\"descripcion\": \"Productos de consumo diario como arroz, azúcar y granos.\", \"nombreCategoria\": \"Abarrotes\", \"precioCategoria\": 20000}}','2025-04-19 10:32:56','2025-04-19 10:32:56'),(16,13,'Solicitud POST','Gestion Categoria de Envios',3,'{\"data\": {\"descripcion\": \"Línea blanca y pequeños electrodomésticos.\", \"nombreCategoria\": \"Electrodomésticos\", \"precioCategoria\": 1500000}}','2025-04-19 10:33:18','2025-04-19 10:33:18'),(17,13,'Solicitud POST','Gestion Categoria de Envios',4,'{\"data\": {\"descripcion\": \"Herramientas y materiales para construcción y reparaciones.\", \"nombreCategoria\": \"Ferretería\", \"precioCategoria\": 50000}}','2025-04-19 10:36:37','2025-04-19 10:36:37'),(18,13,'Solicitud POST','Gestion Categoria de Envios',5,'{\"data\": {\"descripcion\": \"Útiles escolares, libros y artículos de oficina.\", \"nombreCategoria\": \"Papelería\", \"precioCategoria\": 18000}}','2025-04-19 10:36:44','2025-04-19 10:36:44'),(19,13,'Solicitud POST','Gestion Categoria de Envios',6,'{\"data\": {\"descripcion\": \"Gaseosas, jugos, agua y bebidas alcohólicas.\", \"nombreCategoria\": \"Bebidas\", \"precioCategoria\": 25000}}','2025-04-19 10:36:51','2025-04-19 10:36:51'),(20,13,'Solicitud POST','Gestion Categoria de Envios',7,'{\"data\": {\"descripcion\": \"Productos agrícolas frescos de origen nacional.\", \"nombreCategoria\": \"Frutas y Verduras\", \"precioCategoria\": 30000}}','2025-04-19 10:36:57','2025-04-19 10:36:57'),(21,13,'Solicitud POST','Gestion Categoria de Envios',8,'{\"data\": {\"descripcion\": \"Muebles, decoración y artículos para el hogar.\", \"nombreCategoria\": \"Hogar y Decoración\", \"precioCategoria\": 120000}}','2025-04-19 10:37:04','2025-04-19 10:37:04'),(22,13,'Solicitud POST','Gestion Categoria de Envios',9,'{\"data\": {\"descripcion\": \"Vestuario y zapatos de fabricación nacional e importada.\", \"nombreCategoria\": \"Ropa y Calzado\", \"precioCategoria\": 95000}}','2025-04-19 10:37:18','2025-04-19 10:37:18'),(23,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:39:46','2025-04-19 10:39:46'),(24,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:40:47','2025-04-19 10:40:47'),(25,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:43:27','2025-04-19 10:43:27'),(26,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:43:30','2025-04-19 10:43:30'),(27,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:44:40','2025-04-19 10:44:40'),(28,13,'Solicitud GET','Gestion Categoria de Envios',2,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/2\"}','2025-04-19 10:45:13','2025-04-19 10:45:13'),(29,13,'Solicitud GET','Gestion Categoria de Envios',3,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/3\"}','2025-04-19 10:45:19','2025-04-19 10:45:19'),(30,13,'Solicitud GET','Gestion Categoria de Envios',4,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/4\"}','2025-04-19 10:45:22','2025-04-19 10:45:22'),(31,13,'Solicitud GET','Gestion Categoria de Envios',1,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/1\"}','2025-04-19 10:45:25','2025-04-19 10:45:25'),(32,13,'Solicitud GET','Gestion Categoria de Envios',5,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/5\"}','2025-04-19 10:45:27','2025-04-19 10:45:27'),(33,13,'Solicitud GET','Gestion Categoria de Envios',6,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/6\"}','2025-04-19 10:45:29','2025-04-19 10:45:29'),(34,13,'Solicitud GET','Gestion Categoria de Envios',7,'{\"path\": \"api/gestion_categoria_envios/buscar_ce/7\"}','2025-04-19 10:45:33','2025-04-19 10:45:33'),(35,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:45:39','2025-04-19 10:45:39'),(36,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:48:45','2025-04-19 10:48:45'),(37,13,'Solicitud DELETE','Gestion Categorias de Envios',9,'[]','2025-04-19 10:49:31','2025-04-19 10:49:31'),(38,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:50:20','2025-04-19 10:50:20'),(39,13,'Solicitud DELETE','Gestion Categorias de Envios',9,'[]','2025-04-19 10:51:29','2025-04-19 10:51:29'),(40,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:52:02','2025-04-19 10:52:02'),(41,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:52:08','2025-04-19 10:52:08'),(42,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:52:10','2025-04-19 10:52:10'),(43,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:52:11','2025-04-19 10:52:11'),(44,13,'Solicitud DELETE','Gestion Categorias de Envios',9,'[]','2025-04-19 10:53:53','2025-04-19 10:53:53'),(45,13,'Solicitud POST','Gestion Categoria de Envios',10,'{\"data\": {\"descripcion\": \"Vestuario y zapatos de fabricación nacional e importada.\", \"nombreCategoria\": \"Ropa y Calzado\", \"precioCategoria\": 95000}}','2025-04-19 10:54:04','2025-04-19 10:54:04'),(46,13,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-19 10:55:10','2025-04-19 10:55:10'),(47,13,'Solicitud POST','Gestion Ciudades',1,'{\"data\": {\"nombreCiudad\": \"Bogota D.C\", \"costoPor_Ciudad\": 15000}}','2025-04-19 12:31:12','2025-04-19 12:31:12'),(48,13,'Solicitud POST','Gestion Ciudades',2,'{\"data\": {\"nombreCiudad\": \"Bucaramanga\", \"costoPor_Ciudad\": 15000}}','2025-04-19 12:31:32','2025-04-19 12:31:32'),(49,13,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-19 12:31:43','2025-04-19 12:31:43'),(50,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-19 12:33:00','2025-04-19 12:33:00'),(51,8,'Solicitud POST','Gestion Ciudades',3,'{\"data\": {\"nombreCiudad\": \"Medellín\", \"costoPor_Ciudad\": \"14000.00\"}}','2025-04-19 12:34:17','2025-04-19 12:34:17'),(52,8,'Solicitud POST','Gestion Ciudades',4,'{\"data\": {\"nombreCiudad\": \"Cali\", \"costoPor_Ciudad\": \"13000.00\"}}','2025-04-19 12:34:28','2025-04-19 12:34:28'),(53,8,'Solicitud POST','Gestion Ciudades',5,'{\"data\": {\"nombreCiudad\": \"Barranquilla\", \"costoPor_Ciudad\": \"16000.00\"}}','2025-04-19 12:34:36','2025-04-19 12:34:36'),(54,8,'Solicitud POST','Gestion Ciudades',6,'{\"data\": {\"nombreCiudad\": \"Cartagena\", \"costoPor_Ciudad\": \"15500.00\"}}','2025-04-19 12:34:47','2025-04-19 12:34:47'),(55,8,'Solicitud POST','Gestion Ciudades',7,'{\"data\": {\"nombreCiudad\": \"Santa Marta\", \"costoPor_Ciudad\": \"14500.00\"}}','2025-04-19 12:34:56','2025-04-19 12:34:56'),(56,8,'Solicitud POST','Gestion Ciudades',8,'{\"data\": {\"nombreCiudad\": \"Cúcuta\", \"costoPor_Ciudad\": \"13500.00\"}}','2025-04-19 12:35:02','2025-04-19 12:35:02'),(57,8,'Solicitud POST','Gestion Ciudades',9,'{\"data\": {\"nombreCiudad\": \"Ibagué\", \"costoPor_Ciudad\": \"12500.00\"}}','2025-04-19 12:35:06','2025-04-19 12:35:06'),(58,8,'Solicitud POST','Gestion Ciudades',10,'{\"data\": {\"nombreCiudad\": \"Pereira\", \"costoPor_Ciudad\": \"12800.00\"}}','2025-04-19 12:35:11','2025-04-19 12:35:11'),(59,8,'Solicitud POST','Gestion Ciudades',11,'{\"data\": {\"nombreCiudad\": \"Manizales\", \"costoPor_Ciudad\": \"12700.00\"}}','2025-04-19 12:35:19','2025-04-19 12:35:19'),(60,8,'Solicitud POST','Gestion Ciudades',12,'{\"data\": {\"nombreCiudad\": \"Neiva\", \"costoPor_Ciudad\": \"12000.00\"}}','2025-04-19 12:35:29','2025-04-19 12:35:29'),(61,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-19 12:35:38','2025-04-19 12:35:38'),(62,8,'Solicitud GET','Gestion Ciudades',2,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/2\"}','2025-04-19 12:36:13','2025-04-19 12:36:13'),(63,8,'Solicitud GET','Gestion Ciudades',1,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/1\"}','2025-04-19 12:36:15','2025-04-19 12:36:15'),(64,8,'Solicitud GET','Gestion Ciudades',4,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/4\"}','2025-04-19 12:36:17','2025-04-19 12:36:17'),(65,8,'Solicitud GET','Gestion Ciudades',5,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/5\"}','2025-04-19 12:36:18','2025-04-19 12:36:18'),(66,8,'Solicitud GET','Gestion Ciudades',6,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/6\"}','2025-04-19 12:36:20','2025-04-19 12:36:20'),(67,8,'Solicitud GET','Gestion Ciudades',7,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/7\"}','2025-04-19 12:36:22','2025-04-19 12:36:22'),(68,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-19 12:36:25','2025-04-19 12:36:25'),(69,8,'Solicitud DELETE','Gestion Ciudades',12,'[]','2025-04-19 12:36:42','2025-04-19 12:36:42'),(70,8,'Solicitud POST','Gestion Ciudades',13,'{\"data\": {\"nombreCiudad\": \"Neiva\", \"costoPor_Ciudad\": \"12000.00\"}}','2025-04-19 12:37:10','2025-04-19 12:37:10'),(71,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-19 12:38:06','2025-04-19 12:38:06'),(72,8,'Solicitud PATCH','Gestion Ciudades',13,'{\"data\": {\"nombreCiudad\": \"Neiva\", \"costoPor_Ciudad\": \"12000\"}}','2025-04-19 12:41:02','2025-04-19 12:41:02'),(73,8,'Solicitud DELETE','Gestion Ciudades',13,'[]','2025-04-19 12:41:46','2025-04-19 12:41:46'),(74,8,'Solicitud POST','Gestion Ciudades',14,'{\"data\": {\"nombreCiudad\": \"Neiva\", \"costoPor_Ciudad\": \"12000\"}}','2025-04-19 12:42:12','2025-04-19 12:42:12'),(75,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-20 04:34:40','2025-04-20 04:34:40'),(76,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-20 04:34:51','2025-04-20 04:34:51'),(77,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-20 11:35:17','2025-04-20 11:35:17'),(78,8,'Solicitud POST','Gestion Recogidas',1,'{\"data\": {\"idCiudad\": 1, \"direccionRecogida\": \"Calle 123, Bogotá\", \"fechaRecogidaFinal\": \"2025-04-26\", \"fechaRecogidaSeleccionada\": \"2025-04-25\"}}','2025-04-20 11:40:41','2025-04-20 11:40:41'),(79,8,'Solicitud POST','Gestion Recogidas',3,'{\"data\": {\"idCiudad\": 3, \"direccionRecogida\": \"Carrera 45, Medellín\", \"fechaRecogidaFinal\": \"2025-04-30\", \"fechaRecogidaSeleccionada\": \"2025-04-28\"}}','2025-04-20 11:41:53','2025-04-20 11:41:53'),(80,8,'Solicitud POST','Gestion Recogidas',4,'{\"data\": {\"idCiudad\": 4, \"direccionRecogida\": \"Avenida 8, Cali\", \"fechaRecogidaFinal\": \"2025-05-05\", \"fechaRecogidaSeleccionada\": \"2025-05-02\"}}','2025-04-20 11:42:00','2025-04-20 11:42:00'),(81,8,'Solicitud POST','Gestion Recogidas',2,'{\"data\": {\"idCiudad\": 2, \"direccionRecogida\": \"Calle 50, Bucaramanga\", \"fechaRecogidaFinal\": \"2025-05-01\", \"fechaRecogidaSeleccionada\": \"2025-04-30\"}}','2025-04-20 11:42:06','2025-04-20 11:42:06'),(82,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-20 11:45:00','2025-04-20 11:45:00'),(83,8,'Solicitud POST','Gestion Recogidas',6,'{\"data\": {\"idCiudad\": 6, \"direccionRecogida\": \"Calle 50B #59 - 90\", \"fechaRecogidaFinal\": \"2025-02-15\", \"fechaRecogidaSeleccionada\": \"2025-02-10\"}}','2025-04-20 11:50:40','2025-04-20 11:50:40'),(84,8,'Solicitud DELETE','Gestion Recogidas',5,'[]','2025-04-20 11:52:07','2025-04-20 11:52:07'),(85,8,'Solicitud POST','Gestion Recogidas',6,'{\"data\": {\"idCiudad\": 6, \"direccionRecogida\": \"Calle 50B #59 - 90\", \"fechaRecogidaFinal\": \"2025-02-15\", \"fechaRecogidaSeleccionada\": \"2025-02-10\"}}','2025-04-20 11:52:20','2025-04-20 11:52:20'),(86,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-21 05:24:12','2025-04-21 05:24:12'),(87,8,'Solicitud POST','Gestion Entregas',7,'{\"data\": {\"idCiudad\": 7, \"direccionEntrega\": \"Calle 10 #12-34, Santa Marta\", \"fechaEntregaFinal\": \"2025-04-25\", \"fechaEntregaSeleccionada\": \"2025-04-22\"}}','2025-04-21 05:25:36','2025-04-21 05:25:36'),(88,8,'Solicitud POST','Gestion Entregas',8,'{\"data\": {\"idCiudad\": 8, \"direccionEntrega\": \"Carrera 45 #56-78, Cúcuta\", \"fechaEntregaFinal\": \"2025-04-26\", \"fechaEntregaSeleccionada\": \"2025-04-23\"}}','2025-04-21 05:28:25','2025-04-21 05:28:25'),(89,8,'Solicitud POST','Gestion Entregas',9,'{\"data\": {\"idCiudad\": 9, \"direccionEntrega\": \"Av. Quinta con calle 60, Ibagué\", \"fechaEntregaFinal\": \"2025-04-27\", \"fechaEntregaSeleccionada\": \"2025-04-24\"}}','2025-04-21 05:28:32','2025-04-21 05:28:32'),(90,8,'Solicitud POST','Gestion Entregas',10,'{\"data\": {\"idCiudad\": 10, \"direccionEntrega\": \"Calle 18 #9-10, Pereira\", \"fechaEntregaFinal\": \"2025-04-28\", \"fechaEntregaSeleccionada\": \"2025-04-25\"}}','2025-04-21 05:28:39','2025-04-21 05:28:39'),(91,8,'Solicitud POST','Gestion Entregas',11,'{\"data\": {\"idCiudad\": 11, \"direccionEntrega\": \"Cra 23 #45-67, Manizales\", \"fechaEntregaFinal\": \"2025-04-29\", \"fechaEntregaSeleccionada\": \"2025-04-26\"}}','2025-04-21 05:28:46','2025-04-21 05:28:46'),(92,8,'Solicitud PATCH','Gestion Entregas',5,'{\"data\": {\"idCiudad\": 11, \"direccionEntrega\": \"Cra 23 #45-67\", \"fechaEntregaFinal\": \"2025-04-29\", \"fechaEntregaSeleccionada\": \"2025-04-26\"}}','2025-04-21 05:32:32','2025-04-21 05:32:32'),(93,8,'Solicitud PATCH','Gestion Entregas',5,'{\"data\": {\"idCiudad\": 10, \"direccionEntrega\": \"Cra 23 #45-67\", \"fechaEntregaFinal\": \"2025-04-29\", \"fechaEntregaSeleccionada\": \"2025-04-26\"}}','2025-04-21 05:32:46','2025-04-21 05:32:46'),(94,8,'Solicitud PATCH','Gestion Entregas',5,'{\"data\": {\"idCiudad\": 11, \"direccionEntrega\": \"Cra 23 #45-67\", \"fechaEntregaFinal\": \"2025-04-29\", \"fechaEntregaSeleccionada\": \"2025-04-26\"}}','2025-04-21 05:32:52','2025-04-21 05:32:52'),(95,8,'Solicitud DELETE','Gestion Entregas',5,'[]','2025-04-21 05:33:13','2025-04-21 05:33:13'),(96,8,'Solicitud POST','Gestion Entregas',11,'{\"data\": {\"idCiudad\": 11, \"direccionEntrega\": \"Cra 23 #45-67\", \"fechaEntregaFinal\": \"2025-04-29\", \"fechaEntregaSeleccionada\": \"2025-04-26\"}}','2025-04-21 05:33:39','2025-04-21 05:33:39'),(97,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 05:46:53','2025-04-21 05:46:53'),(98,8,'Solicitud DELETE','Gestion Usuarios',10,'{\"Detalles\": \"Eliminación del recurso con ID 10\"}','2025-04-21 05:47:21','2025-04-21 05:47:21'),(99,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 05:53:57','2025-04-21 05:53:57'),(100,8,'Solicitud DELETE','Gestion Usuarios',5,'{\"Detalles\": \"Eliminación del recurso con ID 5\"}','2025-04-21 05:54:55','2025-04-21 05:54:55'),(101,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 05:55:02','2025-04-21 05:55:02'),(102,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 05:56:10','2025-04-21 05:56:10'),(103,8,'Solicitud DELETE','Gestion Usuarios',6,'{\"Detalles\": \"Eliminación del recurso con ID 6\"}','2025-04-21 05:56:42','2025-04-21 05:56:42'),(104,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 05:56:46','2025-04-21 05:56:46'),(105,8,'Solicitud PATCH Parcial','Gestion Usuarios',13,'{\"Detalles\": {\"idRole\": 3}}','2025-04-21 06:00:29','2025-04-21 06:00:29'),(106,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:00:45','2025-04-21 06:00:45'),(107,8,'Solicitud POST','Gestion Usuarios',14,'{\"Detalles\": {\"email\": \"gonzdeiv123@gmail.com\", \"idRole\": 3, \"idestado\": 1, \"idPuestos\": 5, \"contrasena\": \"Tigre77777\", \"idVehiculo\": null, \"numContacto\": \"3008901190\", \"nombreCompleto\": \"Sergio Barbosa Bedoya\", \"documentoIdentidad\": \"1234999091\", \"direccionResidencia\": \"Calle 12 sur #90 - 30\"}}','2025-04-21 06:13:03','2025-04-21 06:13:03'),(108,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:28:37','2025-04-21 06:28:37'),(109,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:34:27','2025-04-21 06:34:27'),(110,8,'Solicitud GET por ID','Gestion Usuarios',8,'{\"Detalles\": \"api/gestion_usuarios/buscar_usuario/8\"}','2025-04-21 06:34:37','2025-04-21 06:34:37'),(111,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:36:05','2025-04-21 06:36:05'),(112,8,'Solicitud GET por ID','Gestion Usuarios',8,'{\"Detalles\": \"api/gestion_usuarios/buscar_usuario/8\"}','2025-04-21 06:36:23','2025-04-21 06:36:23'),(113,8,'Solicitud PATCH Parcial','Gestion Usuarios',8,'{\"Detalles\": {\"idPuestos\": 5}}','2025-04-21 06:38:13','2025-04-21 06:38:13'),(114,8,'Solicitud GET por ID','Gestion Usuarios',8,'{\"Detalles\": \"api/gestion_usuarios/buscar_usuario/8\"}','2025-04-21 06:38:28','2025-04-21 06:38:28'),(115,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:38:44','2025-04-21 06:38:44'),(116,14,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 06:44:52','2025-04-21 06:44:52'),(117,14,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 08:20:36','2025-04-21 08:20:36'),(118,8,'Solicitud GET por ID','Gestion Usuarios',14,'{\"Detalles\": \"api/gestion_usuarios/buscar_usuario/14\"}','2025-04-21 08:24:06','2025-04-21 08:24:06'),(119,8,'Solicitud PATCH Parcial','Gestion Usuarios',14,'{\"Detalles\": {\"email\": \"gonzdeiv123@gmail.com\", \"idRole\": 2, \"idestado\": 1, \"idPuestos\": 5, \"nombreCompleto\": \"Brandon David Gonzalez Lopez\", \"documentoIdentidad\": \"1234999091\"}}','2025-04-21 08:25:11','2025-04-21 08:25:11'),(120,8,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-21 09:59:56','2025-04-21 09:59:56'),(121,8,'Solicitud POST','Gestion Envios',1,'{\"data\": {\"idEntrega\": 1, \"idRecogida\": 1, \"metodoPago\": \"Efectivo\", \"idCategoria\": 2, \"nombreRemitente\": \"Ana Torres\", \"nombreDestinatario\": \"Luis Rojas\", \"num_ContactoRemitente\": \"3105678910\", \"num_ContactoDestinatario\": \"3201234567\"}}','2025-04-21 10:09:37','2025-04-21 10:09:37'),(122,8,'Solicitud POST','Gestion Envios',2,'{\"data\": {\"idEntrega\": 4, \"idRecogida\": 2, \"metodoPago\": \"Tarjeta Debito\", \"idCategoria\": 3, \"nombreRemitente\": \"Carlos Mendoza\", \"nombreDestinatario\": \"Andrea Páez\", \"num_ContactoRemitente\": \"3114567890\", \"num_ContactoDestinatario\": \"3012345678\"}}','2025-04-21 10:11:01','2025-04-21 10:11:01'),(123,8,'Solicitud POST','Gestion Envios',3,'{\"data\": {\"idEntrega\": 3, \"idRecogida\": 6, \"metodoPago\": \"Plataformas Virtuales\", \"idCategoria\": 5, \"nombreRemitente\": \"Paola Suárez\", \"nombreDestinatario\": \"Julián Díaz\", \"num_ContactoRemitente\": \"3127894561\", \"num_ContactoDestinatario\": \"3009876543\"}}','2025-04-21 10:11:15','2025-04-21 10:11:15'),(124,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-21 10:20:17','2025-04-21 10:20:17'),(125,8,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-21 10:22:14','2025-04-21 10:22:14'),(126,8,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-21 10:22:57','2025-04-21 10:22:57'),(127,8,'Solicitud POST','Gestion Envios',4,'{\"data\": {\"idEntrega\": 1, \"idRecogida\": 1, \"metodoPago\": \"Plataformas Virtuales\", \"idCategoria\": 3, \"nombreRemitente\": \"Esteban Giraldo\", \"nombreDestinatario\": \"Brandon David Gonzalez\", \"num_ContactoRemitente\": \"3127894561\", \"num_ContactoDestinatario\": \"3009876543\"}}','2025-04-21 10:27:50','2025-04-21 10:27:50'),(128,8,'Solicitud PATCH','Gestion Envios',4,'{\"data\": {\"idEntrega\": 2, \"idRecogida\": 1, \"metodoPago\": \"Plataformas Virtuales\", \"idCategoria\": 3, \"nombreRemitente\": \"Estebitan XD Giraldo\", \"nombreDestinatario\": \"Brandon David Gonzalez\", \"num_ContactoRemitente\": \"3127894561\", \"num_ContactoDestinatario\": \"3009876543\"}}','2025-04-21 10:31:58','2025-04-21 10:31:58'),(129,8,'Solicitud DELETE','Gestion Envios',4,'[]','2025-04-21 10:35:12','2025-04-21 10:35:12'),(130,8,'Solicitud POST','Gestion Envios',5,'{\"data\": {\"idEntrega\": 2, \"idRecogida\": 1, \"metodoPago\": \"Plataformas Virtuales\", \"idCategoria\": 3, \"nombreRemitente\": \"Esteban Giraldo\", \"nombreDestinatario\": \"Brandon David Gonzalez\", \"num_ContactoRemitente\": \"3127894561\", \"num_ContactoDestinatario\": \"3009876543\"}}','2025-04-21 10:35:24','2025-04-21 10:35:24'),(131,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 10:39:03','2025-04-21 10:39:03'),(132,8,'Solicitud GET','Gestion Usuarios',NULL,'{\"Detalles\": \"api/gestion_usuarios\"}','2025-04-21 10:44:05','2025-04-21 10:44:05'),(133,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-21 15:49:04','2025-04-21 15:49:04'),(134,8,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-21 15:51:52','2025-04-21 15:51:52'),(135,8,'Solicitud DELETE','Gestion Envios',4,'[]','2025-04-21 22:25:52','2025-04-21 22:25:52'),(136,8,'Solicitud DELETE','Gestion Envios',4,'[]','2025-04-21 22:26:47','2025-04-21 22:26:47'),(137,8,'Solicitud POST','Gestion Envios',6,'{\"data\": {\"idEntrega\": 3, \"idRecogida\": 1, \"metodoPago\": \"Efectivo\", \"idCategoria\": 3, \"nombreRemitente\": \"Dario Gonzalez\", \"nombreDestinatario\": \"Brandon David Gonzalez\", \"num_ContactoRemitente\": \"3127894561\", \"num_ContactoDestinatario\": \"3009876543\"}}','2025-04-21 22:31:57','2025-04-21 22:31:57'),(138,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:26:02','2025-04-22 02:26:02'),(139,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:26:03','2025-04-22 02:26:03'),(140,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:26:03','2025-04-22 02:26:03'),(141,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:26:04','2025-04-22 02:26:04'),(142,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:31:01','2025-04-22 02:31:01'),(143,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:31:01','2025-04-22 02:31:01'),(144,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:31:01','2025-04-22 02:31:01'),(145,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:31:01','2025-04-22 02:31:01'),(146,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:36:10','2025-04-22 02:36:10'),(147,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:36:10','2025-04-22 02:36:10'),(148,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:36:10','2025-04-22 02:36:10'),(149,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:36:11','2025-04-22 02:36:11'),(150,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:23','2025-04-22 02:41:23'),(151,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:23','2025-04-22 02:41:23'),(152,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:23','2025-04-22 02:41:23'),(153,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:23','2025-04-22 02:41:23'),(154,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:26','2025-04-22 02:41:26'),(155,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:26','2025-04-22 02:41:26'),(156,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:26','2025-04-22 02:41:26'),(157,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:27','2025-04-22 02:41:27'),(158,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:29','2025-04-22 02:41:29'),(159,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:30','2025-04-22 02:41:30'),(160,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:30','2025-04-22 02:41:30'),(161,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:30','2025-04-22 02:41:30'),(162,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:38','2025-04-22 02:41:38'),(163,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:38','2025-04-22 02:41:38'),(164,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:41:38','2025-04-22 02:41:38'),(165,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:41:39','2025-04-22 02:41:39'),(166,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:45:16','2025-04-22 02:45:16'),(167,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:45:16','2025-04-22 02:45:16'),(168,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:45:16','2025-04-22 02:45:16'),(169,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:45:16','2025-04-22 02:45:16'),(170,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:49:07','2025-04-22 02:49:07'),(171,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:49:07','2025-04-22 02:49:07'),(172,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:49:07','2025-04-22 02:49:07'),(173,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:49:07','2025-04-22 02:49:07'),(174,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:51:15','2025-04-22 02:51:15'),(175,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:51:16','2025-04-22 02:51:16'),(176,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:51:16','2025-04-22 02:51:16'),(177,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:51:16','2025-04-22 02:51:16'),(178,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:51:18','2025-04-22 02:51:18'),(179,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:51:19','2025-04-22 02:51:19'),(180,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 02:51:19','2025-04-22 02:51:19'),(181,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 02:51:19','2025-04-22 02:51:19'),(182,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 03:03:18','2025-04-22 03:03:18'),(183,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 03:03:18','2025-04-22 03:03:18'),(184,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 03:03:18','2025-04-22 03:03:18'),(185,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 03:03:18','2025-04-22 03:03:18'),(186,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 04:32:34','2025-04-22 04:32:34'),(187,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 04:32:34','2025-04-22 04:32:34'),(188,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 04:32:34','2025-04-22 04:32:34'),(189,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 04:32:34','2025-04-22 04:32:34'),(190,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 04:56:21','2025-04-22 04:56:21'),(191,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 04:56:21','2025-04-22 04:56:21'),(192,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 04:56:21','2025-04-22 04:56:21'),(193,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 04:56:22','2025-04-22 04:56:22'),(194,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 05:02:36','2025-04-22 05:02:36'),(195,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 05:02:37','2025-04-22 05:02:37'),(196,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 05:02:37','2025-04-22 05:02:37'),(197,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 05:02:37','2025-04-22 05:02:37'),(198,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 07:05:14','2025-04-22 07:05:14'),(199,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 07:05:14','2025-04-22 07:05:14'),(200,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 07:05:15','2025-04-22 07:05:15'),(201,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 07:05:15','2025-04-22 07:05:15'),(202,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 10:49:46','2025-04-22 10:49:46'),(203,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 11:13:07','2025-04-22 11:13:07'),(204,8,'Solicitud GET','Gestion Areas',NULL,'{\"Detalles\": \"api/gestion_areas\"}','2025-04-22 11:20:49','2025-04-22 11:20:49'),(205,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 11:42:45','2025-04-22 11:42:45'),(206,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 11:42:45','2025-04-22 11:42:45'),(207,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 11:42:45','2025-04-22 11:42:45'),(208,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 11:42:45','2025-04-22 11:42:45'),(209,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 12:00:33','2025-04-22 12:00:33'),(210,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 12:00:33','2025-04-22 12:00:33'),(211,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 12:00:33','2025-04-22 12:00:33'),(212,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 12:00:33','2025-04-22 12:00:33'),(213,8,'Solicitud GET','Gestion Areas',NULL,'{\"Detalles\": \"api/gestion_areas\"}','2025-04-22 20:26:58','2025-04-22 20:26:58'),(214,14,'Solicitud POST','Gestion Areas',NULL,'{\"Detalles\": {\"nombreArea\": \"Recepción\", \"descripcionArea\": \"Área encargada de recibir, registrar y gestionar los envíos y solicitudes entrantes dentro de la empresa.\"}}','2025-04-22 22:01:42','2025-04-22 22:01:42'),(215,14,'Solicitud PUT','Gestion Areas',1,'{\"Detalles\": {\"nombreArea\": \"Bodegas\", \"descripcionArea\": \"Área encargada de almacenar los productos.\"}}','2025-04-22 22:05:25','2025-04-22 22:05:25'),(216,14,'Solicitud DELETE','Gestion Areas',11,'{\"Detalles\": \"Eliminación del recurso con ID 11\"}','2025-04-22 22:06:42','2025-04-22 22:06:42'),(217,14,'Solicitud POST','Gestion Areas',NULL,'{\"Detalles\": {\"nombreArea\": \"Contabilidad\", \"descripcionArea\": \"Area encargada de las finanzas\"}}','2025-04-22 22:11:40','2025-04-22 22:11:40'),(218,14,'Solicitud PATCH Parcial','Gestion Areas',12,'{\"Detalles\": {\"nombreArea\": \"Contabilidad\", \"descripcionArea\": \"Área responsable de las finanzas de la empresa.\"}}','2025-04-22 22:12:18','2025-04-22 22:12:18'),(219,8,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:26:49','2025-04-22 22:26:49'),(220,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:42:28','2025-04-22 22:42:28'),(221,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:42:28','2025-04-22 22:42:28'),(222,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 22:42:29','2025-04-22 22:42:29'),(223,14,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 22:42:29','2025-04-22 22:42:29'),(224,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:50:45','2025-04-22 22:50:45'),(225,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:50:46','2025-04-22 22:50:46'),(226,14,'Solicitud GET','Gestion Ciudades',4,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/4\"}','2025-04-22 22:50:52','2025-04-22 22:50:52'),(227,14,'Solicitud GET','Gestion Ciudades',3,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/3\"}','2025-04-22 22:50:55','2025-04-22 22:50:55'),(228,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:50:58','2025-04-22 22:50:58'),(229,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:54:19','2025-04-22 22:54:19'),(230,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:54:19','2025-04-22 22:54:19'),(231,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:54:20','2025-04-22 22:54:20'),(232,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:54:21','2025-04-22 22:54:21'),(233,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:04','2025-04-22 22:55:04'),(234,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:04','2025-04-22 22:55:04'),(235,14,'Solicitud PATCH','Gestion Ciudades',1,'{\"data\": {\"nombreCiudad\": \"Bogota D.C\", \"costoPor_Ciudad\": 19000}}','2025-04-22 22:55:18','2025-04-22 22:55:18'),(236,14,'Solicitud GET','Gestion Ciudades',1,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/1\"}','2025-04-22 22:55:32','2025-04-22 22:55:32'),(237,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:39','2025-04-22 22:55:39'),(238,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:39','2025-04-22 22:55:39'),(239,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:42','2025-04-22 22:55:42'),(240,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:45','2025-04-22 22:55:45'),(241,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:55:45','2025-04-22 22:55:45'),(242,14,'Solicitud PATCH','Gestion Ciudades',1,'{\"data\": {\"nombreCiudad\": \"Bogota D.C\", \"costoPor_Ciudad\": 569000}}','2025-04-22 22:56:04','2025-04-22 22:56:04'),(243,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:08','2025-04-22 22:56:08'),(244,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:08','2025-04-22 22:56:08'),(245,14,'Solicitud PATCH','Gestion Ciudades',1,'{\"data\": {\"nombreCiudad\": \"Bogota D.C\", \"costoPor_Ciudad\": 30000}}','2025-04-22 22:56:24','2025-04-22 22:56:24'),(246,14,'Solicitud GET','Gestion Ciudades',1,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/1\"}','2025-04-22 22:56:26','2025-04-22 22:56:26'),(247,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:38','2025-04-22 22:56:38'),(248,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:38','2025-04-22 22:56:38'),(249,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:42','2025-04-22 22:56:42'),(250,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:56:42','2025-04-22 22:56:42'),(251,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:57:24','2025-04-22 22:57:24'),(252,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 22:57:26','2025-04-22 22:57:26'),(253,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:00:49','2025-04-22 23:00:49'),(254,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:00:49','2025-04-22 23:00:49'),(255,14,'Solicitud GET','Gestion Ciudades',11,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/11\"}','2025-04-22 23:00:59','2025-04-22 23:00:59'),(256,14,'Solicitud GET','Gestion Ciudades',10,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/10\"}','2025-04-22 23:01:01','2025-04-22 23:01:01'),(257,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:01:06','2025-04-22 23:01:06'),(258,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:01:06','2025-04-22 23:01:06'),(259,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:00','2025-04-22 23:02:00'),(260,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:00','2025-04-22 23:02:00'),(261,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:01','2025-04-22 23:02:01'),(262,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:02','2025-04-22 23:02:02'),(263,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:02','2025-04-22 23:02:02'),(264,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:02:02','2025-04-22 23:02:02'),(265,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:27','2025-04-22 23:03:27'),(266,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:27','2025-04-22 23:03:27'),(267,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:27','2025-04-22 23:03:27'),(268,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:28','2025-04-22 23:03:28'),(269,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:28','2025-04-22 23:03:28'),(270,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:28','2025-04-22 23:03:28'),(271,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:31','2025-04-22 23:03:31'),(272,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:31','2025-04-22 23:03:31'),(273,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:34','2025-04-22 23:03:34'),(274,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:03:34','2025-04-22 23:03:34'),(275,14,'Solicitud POST','Gestion Ciudades',15,'{\"data\": {\"nombreCiudad\": \"Pasto\", \"costoPor_Ciudad\": 22000}}','2025-04-22 23:03:59','2025-04-22 23:03:59'),(276,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:04:01','2025-04-22 23:04:01'),(277,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:04:02','2025-04-22 23:04:02'),(278,14,'Solicitud POST','Gestion Ciudades',16,'{\"data\": {\"nombreCiudad\": \"Nariño\", \"costoPor_Ciudad\": 12000}}','2025-04-22 23:04:38','2025-04-22 23:04:38'),(279,14,'Solicitud POST','Gestion Ciudades',17,'{\"data\": {\"nombreCiudad\": \"Bogotá\", \"costoPor_Ciudad\": 200000}}','2025-04-22 23:04:51','2025-04-22 23:04:51'),(280,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:04:57','2025-04-22 23:04:57'),(281,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:04:58','2025-04-22 23:04:58'),(282,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:10','2025-04-22 23:05:10'),(283,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:10','2025-04-22 23:05:10'),(284,14,'Solicitud GET','Gestion Ciudades',17,'{\"path\": \"api/gestion_ciudades/buscar_ciudad/17\"}','2025-04-22 23:05:15','2025-04-22 23:05:15'),(285,14,'Solicitud DELETE','Gestion Ciudades',17,'[]','2025-04-22 23:05:18','2025-04-22 23:05:18'),(286,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:33','2025-04-22 23:05:33'),(287,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:34','2025-04-22 23:05:34'),(288,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:34','2025-04-22 23:05:34'),(289,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:35','2025-04-22 23:05:35'),(290,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:35','2025-04-22 23:05:35'),(291,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:36','2025-04-22 23:05:36'),(292,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:36','2025-04-22 23:05:36'),(293,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:37','2025-04-22 23:05:37'),(294,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:37','2025-04-22 23:05:37'),(295,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:37','2025-04-22 23:05:37'),(296,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:38','2025-04-22 23:05:38'),(297,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:38','2025-04-22 23:05:38'),(298,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:43','2025-04-22 23:05:43'),(299,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:43','2025-04-22 23:05:43'),(300,14,'Solicitud PATCH','Gestion Ciudades',1,'{\"data\": {\"nombreCiudad\": \"Bogotá\", \"costoPor_Ciudad\": 30000}}','2025-04-22 23:05:53','2025-04-22 23:05:53'),(301,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:57','2025-04-22 23:05:57'),(302,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:05:57','2025-04-22 23:05:57'),(303,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:23','2025-04-22 23:06:23'),(304,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:23','2025-04-22 23:06:23'),(305,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:41','2025-04-22 23:06:41'),(306,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:41','2025-04-22 23:06:41'),(307,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:46','2025-04-22 23:06:46'),(308,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:46','2025-04-22 23:06:46'),(309,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:47','2025-04-22 23:06:47'),(310,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:47','2025-04-22 23:06:47'),(311,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:49','2025-04-22 23:06:49'),(312,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:06:50','2025-04-22 23:06:50'),(313,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:07:38','2025-04-22 23:07:38'),(314,14,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:07:38','2025-04-22 23:07:38'),(315,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:14:06','2025-04-22 23:14:06'),(316,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:14:06','2025-04-22 23:14:06'),(317,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 23:14:07','2025-04-22 23:14:07'),(318,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 23:14:07','2025-04-22 23:14:07'),(319,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:14:48','2025-04-22 23:14:48'),(320,11,'Solicitud GET','Gestion Ciudades',NULL,'{\"Detalles\": \"api/gestion_ciudades\"}','2025-04-22 23:14:48','2025-04-22 23:14:48'),(321,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 23:14:48','2025-04-22 23:14:48'),(322,11,'Solicitud GET','Gestion Categoria de Envios',NULL,'{\"Detalles\": \"api/gestion_categoria_envios\"}','2025-04-22 23:14:49','2025-04-22 23:14:49'),(323,14,'Solicitud POST','Gestion Areas',NULL,'{\"Detalles\": {\"nombreArea\": \"Ventas\", \"descripcionArea\": \"Area encargada de hacer crecer dinero a la empresa.\"}}','2025-04-22 23:40:38','2025-04-22 23:40:38'),(324,14,'Solicitud PATCH Parcial','Gestion Areas',1,'{\"Detalles\": {\"nombreArea\": \"Bodega\", \"descripcionArea\": \"Área encargada de almacenar los productos.\"}}','2025-04-22 23:40:56','2025-04-22 23:40:56'),(325,14,'Solicitud DELETE','Gestion Areas',13,'{\"Detalles\": \"Eliminación del recurso con ID 13\"}','2025-04-22 23:41:15','2025-04-22 23:41:15');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES ('laravel_cache_0EqepHZHIEf6GuvX','s:7:\"forever\";',2060581526),('laravel_cache_1aa41CW7slIpP0qA','s:7:\"forever\";',2060041203),('laravel_cache_1Q3LNdyd1vHUMR8T','s:7:\"forever\";',2060640264),('laravel_cache_45cNMXDIYzPvscFz','s:7:\"forever\";',2060592152),('laravel_cache_46jo36xzcmXVxvwf','s:7:\"forever\";',2059942075),('laravel_cache_4lL0qe0iPUXVAWuO','s:7:\"forever\";',2060041560),('laravel_cache_5ftM6ydywKfONL0T','s:7:\"forever\";',2060705633),('laravel_cache_7ym5SrpTHl7B0eCx','s:7:\"forever\";',2059960919),('laravel_cache_8p1JWVeRa0FBCTFC','s:7:\"forever\";',2060559854),('laravel_cache_9T1r7KurYlu9C8YR','s:7:\"forever\";',2060623889),('laravel_cache_aMCjgoxWvp1so4xN','s:7:\"forever\";',2060584837),('laravel_cache_AW2LM5DOHZHjgoFI','s:7:\"forever\";',2059967572),('laravel_cache_b8AGAjH8NkBxsutD','s:7:\"forever\";',2059972219),('laravel_cache_BDN9nxu69bzPvxgR','s:7:\"forever\";',2060628874),('laravel_cache_BVdLT2QVFV5voUBW','s:7:\"forever\";',2060138473),('laravel_cache_CDUyL8plYu8730h0','s:7:\"forever\";',2059942221),('laravel_cache_dXowyvPbWBOChcJ9','s:7:\"forever\";',2060109360),('laravel_cache_dyvtPjHmRAFHhkRv','s:7:\"forever\";',2059960213),('laravel_cache_dz1Je5eqQDiUVwFc','s:7:\"forever\";',2060592190),('laravel_cache_Eei1zm7XJKN03n9s','s:7:\"forever\";',2060569496),('laravel_cache_fK9Xtm6dCYBccnO3','s:7:\"forever\";',2060565736),('laravel_cache_fs5N9WNholWqG4pN','s:7:\"forever\";',2059960470),('laravel_cache_FZmueO8kfw1wV8HU','s:7:\"forever\";',2059966313),('laravel_cache_FZX30o4Tth6yYg7d','s:7:\"forever\";',2060592056),('laravel_cache_gbbBYxmuRJD4y5lY','s:7:\"forever\";',2060108645),('laravel_cache_HHjA4OHskInitQLt','s:7:\"forever\";',2059687171),('laravel_cache_HhYRt7I2eOvVxZMO','s:7:\"forever\";',2060107903),('laravel_cache_HUVZi5C1ymsGndjg','s:7:\"forever\";',2060621305),('laravel_cache_HWFOmhd06ZD1Pl4y','s:7:\"forever\";',2060621328),('laravel_cache_I5mKGmboIorV2Sho','s:7:\"forever\";',2059968855),('laravel_cache_iCKWmRc69RsyJzJS','s:7:\"forever\";',2060592035),('laravel_cache_IhQkYolUiVeHc4fS','s:7:\"forever\";',2060658820),('laravel_cache_iki2voPWIrcfkkkq','s:7:\"forever\";',2059963064),('laravel_cache_KCmVZrlue5qqLQwe','s:7:\"forever\";',2060569528),('laravel_cache_Ko5M5sP1UdZ4QGQl','s:7:\"forever\";',2060638902),('laravel_cache_LMgRGbpErjrm8bkC','s:7:\"forever\";',2060173521),('laravel_cache_M2elRXbcEUGxePFN','s:7:\"forever\";',2060640132),('laravel_cache_NigCONy2gf48bdv0','s:7:\"forever\";',2060705718),('laravel_cache_OBKEaQI3fg0Uxnh9','s:7:\"forever\";',2059689218),('laravel_cache_oEbFE4K5LWjizGA5','s:7:\"forever\";',2059968871),('laravel_cache_PkMSglD0lMtPnV8I','s:7:\"forever\";',2060402933),('laravel_cache_pZhLB6GuHbe3rad8','s:7:\"forever\";',2060621270),('laravel_cache_QBZaP92Yp3jXODz6','s:7:\"forever\";',2059967586),('laravel_cache_QHXCZ8GgXP3ZVDWq','s:7:\"forever\";',2059960647),('laravel_cache_QNVsj6txCWJSirSd','s:7:\"forever\";',2060618696),('laravel_cache_qtWhYwVGVZDsRlFH','s:7:\"forever\";',2059687296),('laravel_cache_r8hLNIzE3gzO9HxA','s:7:\"forever\";',2060582992),('laravel_cache_RrMFjwp6uzj8aXWN','a:1:{s:11:\"valid_until\";i:1744329371;}',1745538911),('laravel_cache_sY2Ozt4Q75UvDwZb','s:7:\"forever\";',2060407942),('laravel_cache_TLqHL6Rr2WvHziws','s:7:\"forever\";',2059967895),('laravel_cache_TTV2lvyJXmeJkBXW','s:7:\"forever\";',2059972195),('laravel_cache_UHJDOYBPcqdyFcR2','s:7:\"forever\";',2060173479),('laravel_cache_vCSS7mZMU99zA7jk','s:7:\"forever\";',2060565430),('laravel_cache_VFerhuMXufA0TcIR','s:7:\"forever\";',2060618717),('laravel_cache_W4BAivNybkhNG29X','s:7:\"forever\";',2059962645),('laravel_cache_WHzqMUg9PgSGNVgr','s:7:\"forever\";',2059967241),('laravel_cache_WYbjCiwTb9J3gM7c','s:7:\"forever\";',2060584822),('laravel_cache_xklUNHTXVinbuXuc','a:1:{s:11:\"valid_until\";i:1744329309;}',1745538910),('laravel_cache_Y5ekZseddQ4H87sX','s:7:\"forever\";',2059963140),('laravel_cache_ylyRB8kTn7q3MaoA','s:7:\"forever\";',2060705690),('laravel_cache_zejX4TB29qvFFKWg','s:7:\"forever\";',2060565454),('laravel_cache_ZhZbxJspH9bAZCYv','s:7:\"forever\";',2060107063),('laravel_cache_ZnRhJVP0wyloO80I','s:7:\"forever\";',2059960282),('laravel_cache_zxYpIy4wyHtoyaz8','s:7:\"forever\";',2060580987);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoriaenvios`
--

DROP TABLE IF EXISTS `categoriaenvios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoriaenvios` (
  `idCategoria` bigint NOT NULL AUTO_INCREMENT,
  `nombreCategoria` varchar(200) NOT NULL,
  `precioCategoria` decimal(20,2) NOT NULL,
  `descripcion` text NOT NULL,
  PRIMARY KEY (`idCategoria`),
  UNIQUE KEY `unique_nombreCategoria` (`nombreCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoriaenvios`
--

LOCK TABLES `categoriaenvios` WRITE;
/*!40000 ALTER TABLE `categoriaenvios` DISABLE KEYS */;
INSERT INTO `categoriaenvios` VALUES (1,'Fármacos',35000.00,'Medicamentos y farmacos generales'),(2,'Abarrotes',20000.00,'Productos de consumo diario como arroz, azúcar y granos.'),(3,'Electrodomésticos',1500000.00,'Línea blanca y pequeños electrodomésticos.'),(4,'Ferretería',50000.00,'Herramientas y materiales para construcción y reparaciones.'),(5,'Papelería',18000.00,'Útiles escolares, libros y artículos de oficina.'),(6,'Bebidas',25000.00,'Gaseosas, jugos, agua y bebidas alcohólicas.'),(7,'Frutas y Verduras',30000.00,'Productos agrícolas frescos de origen nacional.'),(8,'Hogar y Decoración',120000.00,'Muebles, decoración y artículos para el hogar.'),(10,'Ropa y Calzado',95000.00,'Vestuario y zapatos de fabricación nacional e importada.');
/*!40000 ALTER TABLE `categoriaenvios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudades`
--

DROP TABLE IF EXISTS `ciudades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudades` (
  `idCiudad` bigint NOT NULL AUTO_INCREMENT,
  `nombreCiudad` varchar(255) NOT NULL,
  `costoPor_Ciudad` decimal(20,2) NOT NULL,
  PRIMARY KEY (`idCiudad`),
  UNIQUE KEY `unique_nombreCiudad` (`nombreCiudad`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudades`
--

LOCK TABLES `ciudades` WRITE;
/*!40000 ALTER TABLE `ciudades` DISABLE KEYS */;
INSERT INTO `ciudades` VALUES (1,'Bogotá',30000.00),(2,'Bucaramanga',15000.00),(3,'Medellín',14000.00),(4,'Cali',13000.00),(5,'Barranquilla',16000.00),(6,'Cartagena',15500.00),(7,'Santa Marta',14500.00),(8,'Cúcuta',13500.00),(9,'Ibagué',12500.00),(10,'Pereira',12800.00),(11,'Manizales',12700.00),(14,'Neiva',12000.00),(15,'Pasto',22000.00),(16,'Nariño',12000.00);
/*!40000 ALTER TABLE `ciudades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dispositivosautorizados`
--

DROP TABLE IF EXISTS `dispositivosautorizados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dispositivosautorizados` (
  `idDispositivosAutorizados` bigint NOT NULL AUTO_INCREMENT,
  `fechaAutorizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `macAddress` varchar(500) NOT NULL,
  `descripcionDispositivo` text,
  PRIMARY KEY (`idDispositivosAutorizados`),
  KEY `idx_macAddress` (`macAddress`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivosautorizados`
--

LOCK TABLES `dispositivosautorizados` WRITE;
/*!40000 ALTER TABLE `dispositivosautorizados` DISABLE KEYS */;
/*!40000 ALTER TABLE `dispositivosautorizados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entregas`
--

DROP TABLE IF EXISTS `entregas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entregas` (
  `idEntrega` bigint NOT NULL AUTO_INCREMENT,
  `fechaEntregaSeleccionada` datetime NOT NULL,
  `fechaEntregaFinal` datetime DEFAULT NULL,
  `direccionEntrega` varchar(255) NOT NULL,
  `idCiudad` bigint NOT NULL,
  PRIMARY KEY (`idEntrega`),
  KEY `fk_entregas_ciudad` (`idCiudad`),
  CONSTRAINT `fk_entregas_ciudad` FOREIGN KEY (`idCiudad`) REFERENCES `ciudades` (`idCiudad`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entregas`
--

LOCK TABLES `entregas` WRITE;
/*!40000 ALTER TABLE `entregas` DISABLE KEYS */;
INSERT INTO `entregas` VALUES (1,'2025-04-22 00:00:00','2025-04-25 00:00:00','Calle 10 #12-34, Santa Marta',7),(2,'2025-04-23 00:00:00','2025-04-26 00:00:00','Carrera 45 #56-78, Cúcuta',8),(3,'2025-04-24 00:00:00','2025-04-27 00:00:00','Av. Quinta con calle 60, Ibagué',9),(4,'2025-04-25 00:00:00','2025-04-28 00:00:00','Calle 18 #9-10, Pereira',10),(6,'2025-04-26 00:00:00','2025-04-29 00:00:00','Cra 23 #45-67',11);
/*!40000 ALTER TABLE `entregas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envios`
--

DROP TABLE IF EXISTS `envios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envios` (
  `idEnvio` bigint NOT NULL AUTO_INCREMENT,
  `nombreRemitente` varchar(255) NOT NULL,
  `num_ContactoRemitente` varchar(14) NOT NULL,
  `nombreDestinatario` varchar(255) NOT NULL,
  `num_ContactoDestinatario` varchar(14) NOT NULL,
  `metodoPago` enum('Efectivo','Tarjeta Debito','Tarjeta Credito','Plataformas Virtuales','Cupones') NOT NULL,
  `costosTotal_Envio` decimal(20,2) NOT NULL,
  `fechaEnvio` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idusuarios` bigint NOT NULL,
  `idRecogida` bigint NOT NULL,
  `idEntrega` bigint NOT NULL,
  `idCategoria` bigint NOT NULL,
  PRIMARY KEY (`idEnvio`),
  KEY `fk_envios_por_usuario` (`idusuarios`),
  KEY `fk_envios_por_recogida` (`idRecogida`),
  KEY `fk_envios_entrega` (`idEntrega`),
  KEY `fk_categoria_por_envio` (`idCategoria`),
  CONSTRAINT `fk_categoria_por_envio` FOREIGN KEY (`idCategoria`) REFERENCES `categoriaenvios` (`idCategoria`),
  CONSTRAINT `fk_envios_entrega` FOREIGN KEY (`idEntrega`) REFERENCES `entregas` (`idEntrega`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_envios_por_recogida` FOREIGN KEY (`idRecogida`) REFERENCES `recogidas` (`idRecogida`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_envios_por_usuario` FOREIGN KEY (`idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envios`
--

LOCK TABLES `envios` WRITE;
/*!40000 ALTER TABLE `envios` DISABLE KEYS */;
INSERT INTO `envios` VALUES (1,'Ana Torres','3105678910','Luis Rojas','3201234567','Efectivo',55440.00,'2025-04-21 05:09:37',8,1,1,2),(2,'Carlos Mendoza','3114567890','Andrea Páez','3012345678','Tarjeta Debito',1710016.00,'2025-04-21 05:11:01',8,2,4,3),(3,'Paola Suárez','3127894561','Julián Díaz','3009876543','Plataformas Virtuales',51520.00,'2025-04-21 05:11:14',8,6,3,5),(5,'Esteban Giraldo','3127894561','Brandon David Gonzalez','3009876543','Plataformas Virtuales',1711920.00,'2025-04-21 05:35:24',8,1,2,3),(6,'Dario Gonzalez','3127894561','Brandon David Gonzalez','3009876543','Efectivo',1710800.00,'2025-04-21 17:31:57',8,1,3,3);
/*!40000 ALTER TABLE `envios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `idestado` bigint NOT NULL AUTO_INCREMENT,
  `estado` enum('ACTIVO','INACTIVO','BLOQUEADO','SUSPENDIDO') NOT NULL,
  PRIMARY KEY (`idestado`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'ACTIVO'),(2,'INACTIVO'),(3,'BLOQUEADO'),(5,'SUSPENDIDO');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historiallogeoeventos`
--

DROP TABLE IF EXISTS `historiallogeoeventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historiallogeoeventos` (
  `idHistorialLogeoEventos` bigint NOT NULL AUTO_INCREMENT,
  `tipoEvento` enum('ACESSO','FALLIDO') NOT NULL,
  `fechaEvento` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IP` varchar(500) NOT NULL,
  `descripcionEvento` text,
  PRIMARY KEY (`idHistorialLogeoEventos`),
  KEY `idx_tipoEvento` (`tipoEvento`),
  KEY `idx_IP` (`IP`),
  KEY `idx_fechaEvento` (`fechaEvento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historiallogeoeventos`
--

LOCK TABLES `historiallogeoeventos` WRITE;
/*!40000 ALTER TABLE `historiallogeoeventos` DISABLE KEYS */;
/*!40000 ALTER TABLE `historiallogeoeventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `intentosfallidos`
--

DROP TABLE IF EXISTS `intentosfallidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `intentosfallidos` (
  `idIntentosFallidos` bigint NOT NULL AUTO_INCREMENT,
  `numeroIntentos` int NOT NULL DEFAULT (0),
  `fechaIntento` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idIntentosFallidos`),
  KEY `idx_numeroIntentos` (`numeroIntentos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `intentosfallidos`
--

LOCK TABLES `intentosfallidos` WRITE;
/*!40000 ALTER TABLE `intentosfallidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `intentosfallidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000001_create_cache_table',1),(2,'0001_01_01_000002_create_jobs_table',1),(3,'2025_04_04_202107_create_personal_access_tokens_table',1),(4,'2025_04_14_171217_create_audit_logs_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puestos`
--

DROP TABLE IF EXISTS `puestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puestos` (
  `idPuestos` bigint NOT NULL AUTO_INCREMENT,
  `nombrePuesto` varchar(100) NOT NULL,
  `fechaAsignacionPuesto` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `descripcionPuesto` text,
  `idArea` bigint NOT NULL,
  PRIMARY KEY (`idPuestos`),
  UNIQUE KEY `nombrePuesto` (`nombrePuesto`),
  KEY `idx_nombrePuesto` (`nombrePuesto`),
  KEY `fk_puestos_areas` (`idArea`),
  CONSTRAINT `fk_puestos_areas` FOREIGN KEY (`idArea`) REFERENCES `areas` (`idArea`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puestos`
--

LOCK TABLES `puestos` WRITE;
/*!40000 ALTER TABLE `puestos` DISABLE KEYS */;
INSERT INTO `puestos` VALUES (2,'Auxiliar Logístico','2025-04-09 19:17:03','Apoya en tareas operativas del área de logística.',7),(3,'Auxiliar de Bodega','2025-04-09 19:18:00','Encargado de organizar, recibir y despachar productos del almacén.',7),(4,'Supervisor de Rutas','2025-04-09 19:22:37','Supervisa la planificación y ejecución de las rutas de entrega.',7),(5,'Coordinador de Logística','2025-04-09 19:22:51','Coordina las operaciones logísticas diarias y optimiza procesos de transporte.',7),(6,'Analista de Transporte','2025-04-09 19:23:08','Analiza indicadores de desempeño y eficiencia de rutas y vehículos.',7),(7,'Planificador de Rutas','2025-04-09 19:23:22','Diseña las rutas de entrega para asegurar eficiencia y cumplimiento.',7),(8,'Conductor','2025-04-09 19:24:41','Responsable de realizar la recogida y entrega de envíos, garantizando el cumplimiento de rutas asignadas, el cuidado de la mercancía y la trazabilidad del servicio.',7),(9,'Gerente General de Sistemas','2025-04-10 15:25:02','Responsable de liderar la estrategia tecnológica de la organización, supervisar el desarrollo e implementación de sistemas informáticos, garantizar la seguridad de la información y optimizar los procesos mediante soluciones digitales innovadoras alineadas con los objetivos del negocio.',8);
/*!40000 ALTER TABLE `puestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recogidas`
--

DROP TABLE IF EXISTS `recogidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recogidas` (
  `idRecogida` bigint NOT NULL AUTO_INCREMENT,
  `fechaRecogidaSeleccionada` datetime NOT NULL,
  `fechaRecogidaFinal` datetime DEFAULT NULL,
  `direccionRecogida` varchar(255) NOT NULL,
  `idCiudad` bigint NOT NULL,
  PRIMARY KEY (`idRecogida`),
  KEY `fk_recogidas_ciudad` (`idCiudad`),
  CONSTRAINT `fk_recogidas_ciudad` FOREIGN KEY (`idCiudad`) REFERENCES `ciudades` (`idCiudad`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recogidas`
--

LOCK TABLES `recogidas` WRITE;
/*!40000 ALTER TABLE `recogidas` DISABLE KEYS */;
INSERT INTO `recogidas` VALUES (1,'2025-04-25 00:00:00','2025-04-26 00:00:00','Calle 123, Bogotá',1),(2,'2025-04-28 00:00:00','2025-04-30 00:00:00','Carrera 45, Medellín',3),(3,'2025-05-02 00:00:00','2025-05-05 00:00:00','Avenida 8, Cali',4),(4,'2025-04-30 00:00:00','2025-05-01 00:00:00','Calle 50, Bucaramanga',2),(6,'2025-02-10 00:00:00','2025-02-15 00:00:00','Calle 50B #59 - 90',6);
/*!40000 ALTER TABLE `recogidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportes`
--

DROP TABLE IF EXISTS `reportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportes` (
  `idReporte` bigint NOT NULL AUTO_INCREMENT,
  `tipoReporte` varchar(150) NOT NULL,
  `descripcion` varchar(1000) DEFAULT NULL,
  `fechaCreacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idusuarios` bigint NOT NULL,
  PRIMARY KEY (`idReporte`),
  KEY `fk_reportes_usuarios` (`idusuarios`),
  CONSTRAINT `fk_reportes_usuarios` FOREIGN KEY (`idusuarios`) REFERENCES `usuarios` (`idusuarios`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportes`
--

LOCK TABLES `reportes` WRITE;
/*!40000 ALTER TABLE `reportes` DISABLE KEYS */;
/*!40000 ALTER TABLE `reportes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `idRole` bigint NOT NULL AUTO_INCREMENT,
  `nombreRole` varchar(100) NOT NULL,
  `descripcionRole` text,
  `fechaAsignacionRole` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idRole`),
  UNIQUE KEY `nombreRole` (`nombreRole`),
  KEY `idx_nombreRole` (`nombreRole`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (2,'Manager','Acceso total al sistema','2025-03-13 18:57:07'),(3,'Empleado','Tiene tareas limitadas','2025-04-08 12:00:00');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rutas`
--

DROP TABLE IF EXISTS `rutas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rutas` (
  `idRuta` bigint NOT NULL AUTO_INCREMENT,
  `nombreRuta` varchar(255) NOT NULL,
  `fechaAsignacionRuta` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `horaEntrada` datetime NOT NULL,
  `horaSalida` datetime NOT NULL,
  `idCiudad` bigint NOT NULL,
  PRIMARY KEY (`idRuta`),
  KEY `fk_rutas_ciudad` (`idCiudad`),
  CONSTRAINT `fk_rutas_ciudad` FOREIGN KEY (`idCiudad`) REFERENCES `ciudades` (`idCiudad`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rutas`
--

LOCK TABLES `rutas` WRITE;
/*!40000 ALTER TABLE `rutas` DISABLE KEYS */;
/*!40000 ALTER TABLE `rutas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuariodispositivosautorizados`
--

DROP TABLE IF EXISTS `usuariodispositivosautorizados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuariodispositivosautorizados` (
  `idusuarioDispositivoAutorizados` bigint NOT NULL AUTO_INCREMENT,
  `fechaAutorizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estadoAutorizacion` enum('PENDIENTE','APROBADO','DENEGADO') NOT NULL,
  `descripcionEvento` text,
  PRIMARY KEY (`idusuarioDispositivoAutorizados`),
  KEY `idx_estadoAutorizacion` (`estadoAutorizacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuariodispositivosautorizados`
--

LOCK TABLES `usuariodispositivosautorizados` WRITE;
/*!40000 ALTER TABLE `usuariodispositivosautorizados` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuariodispositivosautorizados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idusuarios` bigint NOT NULL AUTO_INCREMENT,
  `documentoIdentidad` varchar(50) NOT NULL,
  `nombreCompleto` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `numContacto` varchar(20) DEFAULT NULL,
  `contrasena` varchar(250) NOT NULL,
  `direccionResidencia` text,
  `fechaCreacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `idRole` bigint NOT NULL,
  `idestado` bigint NOT NULL,
  `idPuestos` bigint NOT NULL,
  `idVehiculo` bigint DEFAULT NULL,
  PRIMARY KEY (`idusuarios`),
  UNIQUE KEY `documentoIdentidad` (`documentoIdentidad`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_documentoIdentidad` (`documentoIdentidad`),
  KEY `idx_email` (`email`),
  KEY `idx_contrasena` (`contrasena`),
  KEY `fk_usuarios_roles` (`idRole`),
  KEY `fk_usuarios_estado` (`idestado`),
  KEY `fk_usuarios_por_puesto` (`idPuestos`),
  KEY `fk_vehiculo_por_usuarios` (`idVehiculo`),
  CONSTRAINT `fk_usuarios_estado` FOREIGN KEY (`idestado`) REFERENCES `estado` (`idestado`) ON UPDATE CASCADE,
  CONSTRAINT `fk_usuarios_por_puesto` FOREIGN KEY (`idPuestos`) REFERENCES `puestos` (`idPuestos`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_usuarios_roles` FOREIGN KEY (`idRole`) REFERENCES `roles` (`idRole`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_vehiculo_por_usuarios` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculos` (`idVehiculo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (8,'0987654321','Sofia Vergara','sofi777@gmail.com','987654321','$2y$12$pONVvzmN5i/GF5WR/ozjbOMk4DppwqMSwCw./5WAl7Bd3fwoATGeC','Calle Falsa 123','2025-04-10 19:34:04',2,1,5,NULL),(9,'828273727722','Javier Yara','yarayara123@gmail.com','987654321','$2y$12$5muGGKLb9ldt5MMRD9khE.ABWxBV8RClZpW3/N3xyy6oG3bx6m4Dm','Calle Falsa 123','2025-04-10 19:54:30',2,1,3,NULL),(11,'1780289012','Samuel Felipe Ayala','samu289sam@gmail.com','987654321','$2y$12$rwHIdbXq1drET/gXN270Yek9YKKPpAoUYmIJzsZ3arSI2KvexaRnW','Calle Falsa 123','2025-04-13 21:43:46',3,1,5,NULL),(13,'1000898776','Sergio Barbosa Bedoya','sergiii230sdas@gmail.com','3008901190','$2y$12$A9uHO0HYJhPk.WutEiIJIOUYSyJhKv2K/4toqrwMIAXPVNWLQKl0u','Calle 12 sur #90 - 30','2025-04-14 20:45:18',3,1,5,NULL),(14,'1234999091','Brandon David Gonzalez Lopez','gonzdeiv123@gmail.com','3008901190','$2y$12$4ZtY2grv9CLuo0ozlpawduPUOQ/8ru4HAdUIF9bR8pd.66vU9wfEq','Calle 12 sur #90 - 30','2025-04-20 20:13:03',2,1,5,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculos`
--

DROP TABLE IF EXISTS `vehiculos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehiculos` (
  `idVehiculo` bigint NOT NULL AUTO_INCREMENT,
  `marcaVehiculo` varchar(155) NOT NULL,
  `tipoVehiculo` varchar(100) NOT NULL,
  `placa` varchar(7) NOT NULL,
  PRIMARY KEY (`idVehiculo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculos`
--

LOCK TABLES `vehiculos` WRITE;
/*!40000 ALTER TABLE `vehiculos` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehiculos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-22 13:46:19
feature/gestion_vehiculos_backend

