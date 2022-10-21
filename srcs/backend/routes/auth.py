from flask import request
from sqlalchemy.orm import Session
from sqlalchemy import select
from flask import jsonify
import jwt

from models import UserModel

class Auth:
	def __init__(self, engine):
		self.engine = engine
	
	def auth(self):
		data = request.json

		with Session(self.engine) as session:
			statement = select(UserModel.id, UserModel.email).where(UserModel.email == data["email"], UserModel.password == data["password"])
			rows = session.execute(statement).fetchone()

			if rows == None:
				return jsonify({}), 403

			token = jwt.encode({"some": "payload"}, "secret", algorithm="HS256")
			return jsonify({"token": token}), 200