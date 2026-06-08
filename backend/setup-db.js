const mysql = require('mysql2/promise');
require('dotenv').config();

async function setup() {
    console.log('Iniciando configuração do banco de dados...');
    
    // Conecta sem especificar banco para poder criá-lo
    const connection = await mysql.createConnection({
        host: process.env.db_host || 'localhost',
        port: process.env.db_port || 3306,
        user: process.env.db_user || 'root',
        password: process.env.db_password || '',
    });

    console.log('Conectado ao servidor MySQL.');

    const dbName = process.env.db_database || 'not_fat_db';
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    await connection.query(`USE ${dbName}`);
    console.log(`Banco de dados "${dbName}" pronto.`);

    // Criar Tabela usuario
    await connection.query(`
        CREATE TABLE IF NOT EXISTS usuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome_completo VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL
        )
    `);

    // Criar Tabela alimento
    await connection.query(`
        CREATE TABLE IF NOT EXISTS alimento (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            calorias FLOAT,
            proteinas FLOAT,
            carboidratos FLOAT,
            gorduras FLOAT
        )
    `);

    // Criar Tabela refeicao_usuario
    await connection.query(`
        CREATE TABLE IF NOT EXISTS refeicao_usuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario INT,
            refeicao INT,
            alimento INT,
            quantidade FLOAT,
            FOREIGN KEY (usuario) REFERENCES usuario(id),
            FOREIGN KEY (alimento) REFERENCES alimento(id)
        )
    `);

    // Criar Tabela consumo_agua
    await connection.query(`
        CREATE TABLE IF NOT EXISTS consumo_agua (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario INT,
            quantidade_ml INT NOT NULL,
            data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (usuario) REFERENCES usuario(id)
        )
    `);

    // Inserir dados iniciais se estiver vazio
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM alimento');
    if (rows[0].count === 0) {
        await connection.query(`
            INSERT INTO alimento (nome, calorias, proteinas, carboidratos, gorduras) VALUES
            ('Arroz Branco', 130, 2.5, 28, 0.2),
            ('Feijão', 76, 5, 14, 0.5),
            ('Frango Grelhado', 165, 31, 0, 3.6),
            ('Ovo Cozido', 155, 13, 1.1, 11),
            ('Banana', 89, 1.1, 23, 0.3)
        `);
        console.log('Dados iniciais de alimentos inseridos.');
    }

    console.log('Tudo pronto! O banco de dados foi configurado com sucesso.');
    await connection.end();
    process.exit(0);
}

setup().catch(err => {
    console.error('ERRO AO CONFIGURAR BANCO:', err);
    process.exit(1);
});
