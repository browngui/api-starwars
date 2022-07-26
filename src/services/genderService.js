import conexao from "../repository/conexao.js";

const insertGender = async (genero)=> {
    const con = await conexao.connect(); //abre conexão com o banco entre API

    const sql = 'INSERT INTO Genero_tb (genero) VALUES(?);'; //os valores em interrogação serão os valores recebidos pelo front-end
    
    const dataUser = [genero]; //esses valores serão repassados pelo controller

    await con.query(sql, dataUser); //o comando .query serve para executar a ação dentro do banco. A variavel do SQL são os dados que serão que estão em "?" 

    con.end();

}

async function findGender() {
    const conn = await conexao.connect();
    const sql = 'SELECT * FROM Genero_tb';
    const [rows] = await conn.query(sql);
    conn.end();

    return rows;
}

export default {insertGender, findGender}