import psycopg


def connect(db_url):
    return psycopg.connect(db_url, autocommit=True)


def get_accounts(conn):
    return conn.execute("select id, name from accounts order by id").fetchall()


def add_expense(conn, date, account_id, amount, expense):
    conn.execute(
        "insert into transactions (date, account_id, amount, expense) "
        "values (%s, %s, %s, %s)",
        (date, account_id, amount, expense),
    )


def get_recent_expenses(conn, limit=20):
    return conn.execute(
        "select t.id, t.date, a.name, t.amount, t.expense "
        "from transactions t "
        "join accounts a on a.id = t.account_id "
        "order by t.date desc, t.id desc "
        "limit %s",
        (limit,),
    ).fetchall()


def delete_expense(conn, expense_id):
    conn.execute("delete from transactions where id = %s", (expense_id,))
