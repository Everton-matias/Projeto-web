CREATE DATABASE  IF NOT EXISTS "defaultdb" /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `defaultdb`;
-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: banco-mysql-08-projetomobilecoding-87ae.c.aivencloud.com    Database: defaultdb
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '46c13613-4c86-11f1-9d6d-8a84d8eacd5a:1-27,
911a4324-5294-11f1-8718-62f9105da041:1-22,
cd4be979-53b1-11f1-97aa-125fade28384:1-561';

--
-- Table structure for table `alimento`
--

DROP TABLE IF EXISTS `alimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alimento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alimento`
--

LOCK TABLES `alimento` WRITE;
/*!40000 ALTER TABLE `alimento` DISABLE KEYS */;
INSERT INTO `alimento` VALUES (1,'Arroz Integral'),(2,'Arroz Branco'),(3,'Feijão Carioca'),(4,'Feijão Preto'),(5,'Frango Grelhado'),(6,'Patinho Moído'),(7,'Filé de Tilápia'),(8,'Ovo Cozido'),(9,'Ovo Estrelado'),(10,'Omelete Simples'),(11,'Pão Francês'),(12,'Pão de Forma Integral'),(13,'Tapioca'),(14,'Cuscuz'),(15,'Aveia em Flocos'),(16,'Banana'),(17,'Maçã'),(18,'Mamão'),(19,'Morango'),(20,'Abacaxi'),(21,'Batata Doce Cozida'),(22,'Batata Inglesa Cozida'),(23,'Mandioca Cozida'),(24,'Macarrão Integral'),(25,'Alface'),(26,'Tomate'),(27,'Cebola'),(28,'Cenoura Ralada'),(29,'Brócolis Cozido'),(30,'Espinafre'),(31,'Azeite de Oliva'),(32,'Castanha de Caju'),(33,'Pasta de Amendoim'),(34,'Queijo Cottage'),(35,'Queijo Minas Frescal'),(36,'Leite Desnatado'),(37,'Leite Integral'),(38,'Iogurte Natural'),(39,'Whey Protein'),(40,'Suco de Laranja Natural'),(41,'Café sem Açúcar'),(42,'Chá Verde'),(43,'Mel de Abelha'),(44,'Atum em Lata'),(45,'Sardinha em Lata'),(46,'Carne de Panela'),(47,'Lombo de Porco Grelhado'),(48,'Abacate'),(49,'Couve-Flor'),(50,'Abóbora Cozida');
/*!40000 ALTER TABLE `alimento` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-11 20:29:26
