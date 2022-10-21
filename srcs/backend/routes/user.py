from flask import request
from flask import jsonify
from sqlalchemy.orm import Session
from sqlalchemy import select
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
			statement = select(UserModel.id, UserModel.email).where(UserModel.email == data["email"])
			rows = session.execute(statement).fetchone()

			if rows != None:
				return jsonify({"error": "Email already exists."}), 403

			session.add(user_obj)
			session.commit()
			return jsonify({}), 200

	# PATCH /user/<id>
	def update_user(self, id):
		return "Updated"