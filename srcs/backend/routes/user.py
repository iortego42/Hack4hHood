from flask import request, jsonify
from sqlalchemy.orm import Session
from sqlalchemy import select, update

from models import UserModel
from middlewares import auth_check

class User:
	def __init__(self, engine):
		self.engine = engine

	# GET /user/
	def get_all_users(self):
		with Session(self.engine) as session:
			statement = select(UserModel.id, UserModel.name, UserModel.last_name, UserModel.email, UserModel.phone, UserModel.creation_date)
			result = session.execute(statement)
			if result == None:
				return jsonify({"error": "None users exists"}), 403
			users = []
			for r in result:
				print(r)
				row = {
					"id": r.id,
					"name": r.name,
					"last_name": r.last_name,
					"email": r.email,
					"phone": r.phone,
					"creation_date": r.creation_date
				}
				users.append(row)

			return jsonify(users), 200

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
		auth_user = auth_check()
		if auth_user == None:
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
		auth_user = auth_check()
		if auth_user == None:
			return jsonify({}), 401

		if (int(auth_user["id"]) != int(id)):
			return jsonify({}), 401

		data = request.json

		if "name" not in data or "last_name" not in data or "phone" not in data or "email" not in data:
			return jsonify({"Errror": "Could not update user"}), 403


		with Session(self.engine) as session:
			statement = update(UserModel).where(UserModel.id == id).values(
				name=data["name"],
				last_name=data["last_name"],
				email=data["email"],
				phone=data["phone"]
			)
			rows = session.execute(statement)
			if (rows == None):
				return jsonify({"Errror": "Could not update user"}), 403
			session.commit()
			return jsonify({}), 200

		return jsonify({"Errror": "Could not update user"}), 403