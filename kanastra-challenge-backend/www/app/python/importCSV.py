"""Importa arquivo CSV para o Banco de Dados Postgres

Este script permite ao usuário importar arquivo CSV para o Banco de dados.

É possível importar arquivo de valores separados por vírgula (.csv) com a seguinte etrutura:
`name STRING(150)`, `governmentId BIGINTEGER`, `email STRING(150)`, 
`debtAmount DECIMAL(15, 4)`, `debtDueDate DATE(yyyy-mm-dd)`, `debtId UUID`

Necessário ter instalado as bibliotecas `pandas` e `sqlalchemy` dentro do ambiente em que será executado.

Este arquivo contém a seguinte função:

    * import_csv – retorna mensagem de sucesso ou erro
"""

# Bibliotecas
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.types import String, BigInteger, DECIMAL, DATE, Uuid, TIMESTAMP
from datetime import datetime
import timeit
import sys

# Inicia contador para o tempo de execução
tic = timeit.default_timer()

# Define o esquema do CSV/Tabela
df_schema = {
    "name": String(150),
    "governmentId": BigInteger,
    "email": String(150),
    "debtAmount": DECIMAL(15, 4),
    "debtDueDate": DATE,
    "debtId": Uuid,
    "created_at": TIMESTAMP,
    "updated_at": TIMESTAMP
}

def import_csv(path_file, host, database, user, password, table):
    """Executa a importação

    Parâmetros
    ----------
    path_file : str
        Caminho completo do arquivo CSV
    host : str
        URL do banco de dados Postgres
    database : str
        Nome do banco de dados
    user:
        Usuário do banco de dados
    password:
        Senha do banco de dados
    table:
        Nome da tabela no banco de dados

    Retorno
    -------
    str
        uma string de sucesso ou erro
    """
    
    try:
        # Monta STRING de conexão
        str_conn = "postgresql://{}:{}@{}/{}".format(user, password, host, database)
        # Conecta no banco de dados
        engine = create_engine(str_conn)

        # Lê o arquivo CSV
        df = pd.read_csv(path_file)
        # Cria STRING com a data/hora da execução
        date_now = datetime.now()
        str_date_now = date_now.strftime('%Y-%m-%d %H:%M:%S')
        # Cria colunas com a data/hora da execução
        df['created_at'] = str_date_now
        df['updated_at'] = str_date_now

        # Transfere os dados do DF para o Postgres
        df.to_sql(table, engine, if_exists='append',index=False, dtype=df_schema)

        # Retorna mensagem de sucesso
        return f"Importação realizada com sucesso! | Tempo de execução: {round(timeit.default_timer() - tic)} segundo(s)"
    
    except Exception as Argument:
        return Argument
    
if __name__== "__main__":
    print(import_csv(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6]))