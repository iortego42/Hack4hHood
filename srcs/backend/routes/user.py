from flask import request
from sqlalchemy.orm import Session
from models import UserModel

class User:
	def __init__(self, engine):
		self.engine = engine

	# GET /user/
	def get_all_users(self):
		return "Hola"

	# GET /user/<id>
	def get_user(self, id):
		return id

	# POST /user/
	def create_user(self):
		data = request.json
		user_obj = UserModel(
			name = data["name"],
			last_name = data["last_name"],
			email = data["email"],
			phone = data["phone"],
			password = data["password"]
		)

		with Session(self.engine) as session:
			session.add(user_obj)
			session.commit()
		
		return "User created"

	# PATCH /user/<id>
	def update_user(self, id):
		return "Updated"