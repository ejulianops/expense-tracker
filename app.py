import streamlit as st

import db

st.set_page_config(page_title="Expenses", layout="centered")
st.title("Expense tracker")

accounts = db.get_accounts(st.secrets["db"]["url"])
st.write(accounts)
