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

		if "email" not in data or "password" not in data:
			return jsonify({}), 403
		with Session(self.engine) as session:	
			statement = select(UserModel.id).where(UserModel.email == data["email"], UserModel.password == data["password"])
			row = session.execute(statement).fetchone()
			if row == None:
				return jsonify({}), 403
			row = dict(row)
			token = jwt.encode(row, "secret", algorithm="HS256")
			return jsonify({"token": token}), 200

