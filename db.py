import psycopg


def get_accounts(db_url):
    with psycopg.connect(db_url) as conn:
        return conn.execute("select id, name from accounts order by id").fetchall()

# add a function to write expenses
def add_expense(db_url, date, account_id, amount, expense):
    with psycopg.connect(db_url) as conn:
        conn.execute(
            "insert into transactions (date, account_id, amount, expense) "
            "values (%s, %s, %s, %s)",
            (date, account_id, amount, expense),
        )

# add a function to read recent expenses
def get_recent_expenses(db_url, limit=20):
    with psycopg.connect(db_url) as conn:
        return conn.execute(
            "select t.id, t.date, a.name, t.amount, t.expense "
            "from transactions t "
            "join accounts a on a.id = t.account_id "
            "order by t.date desc, t.id desc "
            "limit %s",
            (limit,),
        ).fetchall()

# add a function to delete an expense
def delete_expense(db_url, expense_id):
    with psycopg.connect(db_url) as conn:
        conn.execute("delete from transactions where id = %s", (expense_id,))
