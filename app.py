from decimal import Decimal

import streamlit as st

import db

DB_URL = st.secrets["db"]["url"]

st.set_page_config(page_title="Expenses", layout="centered")
st.title("Expense tracker")

accounts = db.get_accounts(DB_URL)

with st.form("add_expense", clear_on_submit=True):
    date = st.date_input("Date", format="YYYY-MM-DD")
    account = st.selectbox("Account", accounts, format_func=lambda a: a[1])
    amount = st.number_input("Amount", min_value=0.0, step=0.01, format="%.2f")
    expense = st.text_input("Expense")
    submitted = st.form_submit_button("Add expense")

if submitted:
    if amount <= 0 or not expense.strip():
        st.error("Enter an amount above 0 and a description.")
    else:
        db.add_expense(DB_URL, date, account[0], Decimal(str(amount)), expense.strip())
        st.success("Expense added.")

# show the list in the app
st.subheader("Recent expenses")

rows = db.get_recent_expenses(DB_URL)
if rows:
    st.dataframe(
        [
            {"Date": r[1], "Account": r[2], "Amount": r[3], "Expense": r[4]}
            for r in rows
        ],
        hide_index=True,
    )
else:
    st.info("No expenses yet.")

# add the delete control to the app
if rows:
    with st.expander("Delete an expense"):
        to_delete = st.selectbox(
            "Choose expense",
            rows,
            format_func=lambda r: f"{r[1]} · {r[2]} · {r[3]} · {r[4]}",
        )
        if st.button("Delete"):
            db.delete_expense(DB_URL, to_delete[0])
            st.rerun()
