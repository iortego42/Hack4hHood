from flask import request
from flask import jsonify
from sqlalchemy.orm import Session
from sqlalchemy import select
from models import UserModel
from middlewares import auth_check

class User:
	def __init__(self, engine):
		self.engine = engine

	# GET /user/
	def get_all_users(self):
		return "Hola"

	# GET /user/<id>
	def get_user(self, id):
		with Session(self.engine) as session:
			statement = select(UserModel.id, UserModel.name, UserModel.last_name, UserModel.email, UserModel.phone, UserModel.creation_date).where(UserModel.id == id)
			result = session.execute(statement).fetchone()
			if result == None:
				return jsonify({"error": "None user exists with the provided ID."}), 403
			row = {
				"id": result.id,
				"name": result.name,
				"last_name": result.last_name,
				"email": result.email,
				"phone": result.phone,
				"creation_date": result.creation_date
			}
			return jsonify(row), 200

	# POST /user/
	def create_user(self):
		if auth_check() == False:
			return jsonify({}), 401
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

		return jsonify({}), 403

	# PATCH /user/<id>
	def update_user(self, id):
		return "Updated"