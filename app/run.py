# from . import app, db

# if __name__ == '__main__':
#     db.create_all()  # Creates database tables from the models
#     app.run(debug=True)


from app import app, db

# Create the database tables within the application context
with app.app_context():
    db.create_all()  # Creates database tables from the models

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
