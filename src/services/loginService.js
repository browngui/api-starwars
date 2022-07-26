import conexao from "../repository/conexao.js";

const login = async (email, password) => {
    const acess = await conexao.connect();

    
    async function login(email, password) {
        const conec = await conexao.connect();
        const sql = 'SELECT * FROM Usuario_tb WHERE email = ? and senha = ?;';
        const dataLogin = [email, password];
        const [rows] = await conec.query(sql, dataLogin);
        conec.end();
    }
}

export default {login}; 