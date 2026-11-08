import psycopg


def get_accounts(db_url):
    with psycopg.connect(db_url) as conn:
        return conn.execute("select id, name from accounts order by id").fetchall()
